import { getWriteClient } from "../src/sanity/client";
import { inductees } from "../src/data/hallOfFame";
import { createReadStream, existsSync } from "fs";
import path from "path";

function toSlug(nickname: string): string {
  return nickname
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function seedInductees() {
  const client = getWriteClient();
  console.log(`Syncing ${inductees.length} inductees...`);

  const syncedIds: string[] = [];

  // Check which inductees already have photos in Sanity
  const existing = await client.fetch<{ _id: string; hasPhoto: boolean }[]>(
    `*[_type == "inductee"]{ _id, "hasPhoto": defined(photo.asset._ref) }`
  );
  const existingMap = new Map(existing.map((e) => [e._id, e]));

  // Upload photos for inductees that have a local photo but no Sanity photo
  const photoAssets = new Map<string, string>(); // _id → asset._id
  for (const inductee of inductees) {
    if (!inductee.photo) continue;
    const slug = toSlug(inductee.nickname);
    const _id = `inductee-${slug}`;
    const existingDoc = existingMap.get(_id);

    if (existingDoc?.hasPhoto) {
      console.log(`  Skip photo upload (exists): ${inductee.nickname}`);
      continue;
    }

    const imagePath = path.join(process.cwd(), "public", inductee.photo);
    if (!existsSync(imagePath)) {
      console.log(`  SKIP photo (not found): ${inductee.photo}`);
      continue;
    }

    const asset = await client.assets.upload("image", createReadStream(imagePath), {
      filename: path.basename(inductee.photo),
    });
    photoAssets.set(_id, asset._id);
    console.log(`  Uploaded photo: ${inductee.nickname}`);
  }

  // Batch all inductees into one transaction
  const tx = client.transaction();
  for (const inductee of inductees) {
    const slug = toSlug(inductee.nickname);
    const _id = `inductee-${slug}`;
    syncedIds.push(_id);

    const assetId = photoAssets.get(_id);
    const existingDoc = existingMap.get(_id);

    if (assetId) {
      // New photo uploaded — createOrReplace with photo
      tx.createOrReplace({
        _id,
        _type: "inductee" as const,
        nickname: inductee.nickname,
        contribution: inductee.contribution,
        year: inductee.year,
        photo: {
          _type: "image" as const,
          asset: { _type: "reference" as const, _ref: assetId },
        },
        slug: { _type: "slug" as const, current: slug },
      });
    } else if (existingDoc?.hasPhoto) {
      // Existing photo — patch metadata only, preserve photo
      tx.patch(_id, (p) => p.set({
        nickname: inductee.nickname,
        contribution: inductee.contribution,
        year: inductee.year,
        slug: { _type: "slug" as const, current: slug },
      }));
    } else {
      // No photo — createOrReplace without photo
      tx.createOrReplace({
        _id,
        _type: "inductee" as const,
        nickname: inductee.nickname,
        contribution: inductee.contribution,
        year: inductee.year,
        slug: { _type: "slug" as const, current: slug },
      });
    }
  }
  await tx.commit();
  console.log(`  Synced ${syncedIds.length} inductees in one transaction`);

  // Clean up stale documents
  const allExistingIds = existing.map((e) => e._id);
  const syncedSet = new Set(syncedIds);
  const stale = allExistingIds.filter((id) => !syncedSet.has(id));
  if (stale.length > 0) {
    const tx = client.transaction();
    for (const id of stale) {
      tx.delete(id);
    }
    await tx.commit();
    console.log(`  Deleted ${stale.length} stale inductee(s)`);
  }

  return { synced: syncedIds.length, deleted: stale.length };
}

// Allow running standalone
if (require.main === module) {
  seedInductees()
    .then(({ synced, deleted }) => {
      console.log(`Done! Synced: ${synced}, Deleted: ${deleted}`);
    })
    .catch((err) => {
      console.error("Seed failed:", err);
      process.exit(1);
    });
}
