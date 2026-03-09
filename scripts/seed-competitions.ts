import { getWriteClient } from "../src/sanity/client";
import { competitions, walkOnCompetition } from "../src/data/competitions";
import { createReadStream } from "fs";
import path from "path";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function seedCompetitions() {
  const client = getWriteClient();
  const allCompetitions = [...competitions, walkOnCompetition];
  console.log(`Syncing ${allCompetitions.length} competitions...`);

  // Fetch existing competition docs to check for existing images
  const existing = await client.fetch<{ _id: string; hasImage: boolean }[]>(
    `*[_type == "competition"]{ _id, "hasImage": defined(image.asset._ref) }`
  );
  const existingMap = new Map(existing.map((e) => [e._id, e]));

  const featuredNames = new Set(["The PDI", "WPDI", "Walk-on of the Year", "The Shield"]);
  const syncedIds: string[] = [];

  // Separate into existing (patch metadata only) and new (need image upload)
  const patchTx = client.transaction();
  let patchCount = 0;
  const needsUpload: { comp: typeof allCompetitions[0]; index: number; _id: string }[] = [];

  for (let i = 0; i < allCompetitions.length; i++) {
    const comp = allCompetitions[i];
    const slug = toSlug(comp.name);
    const _id = `competition-${slug}`;
    syncedIds.push(_id);

    const existingDoc = existingMap.get(_id);
    if (existingDoc?.hasImage) {
      console.log(`  Skip image upload (exists): ${comp.image}`);
      patchTx.patch(_id, (p) => p.set({
        name: comp.name,
        description: comp.description,
        slug: { _type: "slug" as const, current: slug },
        featured: featuredNames.has(comp.name),
        displayOrder: i + 1,
        results: comp.results.map((r) => ({
          _type: "object" as const,
          _key: `result-${r.year}`,
          year: r.year,
          winner: r.winner,
          runnerUp: r.runnerUp,
          walkOnName: r.walkOnName,
          venue: r.venue,
        })),
      }));
      patchCount++;
    } else {
      needsUpload.push({ comp, index: i, _id });
    }
  }

  // Commit all patches in one transaction
  if (patchCount > 0) {
    await patchTx.commit();
    console.log(`  Patched ${patchCount} competitions in one transaction`);
  }

  // Upload images for new competitions, then batch their createOrReplace
  if (needsUpload.length > 0) {
    const uploadTx = client.transaction();
    for (const { comp, index, _id } of needsUpload) {
      console.log(`  Uploading image: ${comp.image}`);
      const imagePath = path.join(process.cwd(), "public", comp.image);
      const imageAsset = await client.assets.upload("image", createReadStream(imagePath), {
        filename: path.basename(comp.image),
      });
      const slug = toSlug(comp.name);
      uploadTx.createOrReplace({
        _id,
        _type: "competition" as const,
        name: comp.name,
        description: comp.description,
        image: {
          _type: "image" as const,
          asset: { _type: "reference" as const, _ref: imageAsset._id },
        },
        slug: { _type: "slug" as const, current: slug },
        featured: featuredNames.has(comp.name),
        displayOrder: index + 1,
        results: comp.results.map((r) => ({
          _type: "object" as const,
          _key: `result-${r.year}`,
          year: r.year,
          winner: r.winner,
          runnerUp: r.runnerUp,
          walkOnName: r.walkOnName,
          venue: r.venue,
        })),
      });
    }
    await uploadTx.commit();
    console.log(`  Uploaded and synced ${needsUpload.length} new competitions`);
  }

  console.log(`  Total: ${syncedIds.length} competitions synced`);

  // Clean up stale documents
  const allExisting = await client.fetch<string[]>(
    `*[_type == "competition"]._id`
  );
  const syncedSet = new Set(syncedIds);
  const stale = allExisting.filter((id) => !syncedSet.has(id));
  if (stale.length > 0) {
    const tx = client.transaction();
    for (const id of stale) {
      tx.delete(id);
    }
    await tx.commit();
    console.log(`  Deleted ${stale.length} stale competition(s)`);
  }

  return { synced: syncedIds.length, deleted: stale.length };
}

// Allow running standalone
if (require.main === module) {
  seedCompetitions()
    .then(({ synced, deleted }) => {
      console.log(`Done! Synced: ${synced}, Deleted: ${deleted}`);
    })
    .catch((err) => {
      console.error("Seed failed:", err);
      process.exit(1);
    });
}
