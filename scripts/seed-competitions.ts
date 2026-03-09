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

  for (let i = 0; i < allCompetitions.length; i++) {
    const comp = allCompetitions[i];
    const slug = toSlug(comp.name);
    const _id = `competition-${slug}`;
    syncedIds.push(_id);

    // Only upload image if document doesn't already have one
    let imageRef;
    const existingDoc = existingMap.get(_id);
    if (existingDoc?.hasImage) {
      console.log(`  Skip image upload (exists): ${comp.image}`);
      // Document exists with image — update metadata only, preserve image
      await client.patch(_id).set({
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
      }).commit();
    } else {
      console.log(`  Uploading image: ${comp.image}`);
      const imagePath = path.join(process.cwd(), "public", comp.image);
      const imageAsset = await client.assets.upload("image", createReadStream(imagePath), {
        filename: path.basename(comp.image),
      });
      imageRef = {
        _type: "image" as const,
        asset: {
          _type: "reference" as const,
          _ref: imageAsset._id,
        },
      };

      await client.createOrReplace({
        _id,
        _type: "competition" as const,
        name: comp.name,
        description: comp.description,
        image: imageRef,
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
      });
    }

    console.log(`  Synced: ${comp.name} (${_id}) — ${comp.results.length} results`);
  }

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
