import { getWriteClient } from "../src/sanity/client";
import { galleryItems } from "../src/data/gallery";
import { createReadStream, existsSync } from "fs";
import path from "path";

// Featured items are now controlled by the `featured` field on each gallery item
// (editable in Sanity Studio, pulled into TS via `npm run pull`)

function filenameToId(src: string): string {
  // "/gallery/2018-cover.jpg" → "gallery-2018-cover"
  const base = path.basename(src, path.extname(src));
  return `gallery-${base}`;
}

const IMAGE_UPLOAD_CONCURRENCY = 5;

async function uploadInBatches(
  client: ReturnType<typeof getWriteClient>,
  items: { src: string; _id: string }[],
  batchSize: number,
) {
  const results = new Map<string, string>(); // _id → asset._id
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const uploaded = await Promise.all(
      batch.map(async ({ src, _id }) => {
        const imagePath = path.join(process.cwd(), "public", src);
        const asset = await client.assets.upload("image", createReadStream(imagePath), {
          filename: path.basename(src),
        });
        console.log(`  Uploaded: ${src}`);
        return { _id, assetId: asset._id };
      }),
    );
    for (const { _id, assetId } of uploaded) {
      results.set(_id, assetId);
    }
  }
  return results;
}

export async function seedGallery({ force = false } = {}) {
  const client = getWriteClient();

  // --- Fetch existing gallery items ---
  const existing = await client.fetch<{ _id: string; hasImage: boolean }[]>(
    `*[_type == "galleryItem"]{ _id, "hasImage": defined(image.asset._ref) }`
  );
  const existingMap = new Map(existing.map((e) => [e._id, e]));
  const allExistingIds = new Set(existing.map((e) => e._id));

  // --- Seed Gallery Items ---
  console.log(`\nSyncing ${galleryItems.length} gallery items${force ? " (force)" : " (create-only)"}...`);

  let uploaded = 0;
  let skipped = 0;
  let videoOnly = 0;
  let created = 0;
  const galleryIds: string[] = [];

  // Separate items into categories
  const videoItems: typeof galleryItems = [];
  const patchItems: { item: typeof galleryItems[0]; _id: string }[] = [];
  const uploadItems: { item: typeof galleryItems[0]; _id: string; src: string }[] = [];

  for (const item of galleryItems) {
    if (!item.src) {
      if (item.youtubeId) {
        const _id = `gallery-video-${item.youtubeId}`;
        galleryIds.push(_id);
        if (force || !allExistingIds.has(_id)) {
          videoItems.push(item);
        }
      } else {
        console.log(`  SKIP (no src or youtubeId): ${item.alt}`);
        skipped++;
      }
      continue;
    }

    const _id = filenameToId(item.src);
    galleryIds.push(_id);

    const imagePath = path.join(process.cwd(), "public", item.src);
    if (!existsSync(imagePath)) {
      console.log(`  SKIP (not found): ${item.src}`);
      skipped++;
      continue;
    }

    // In create-only mode, skip items that already exist in Sanity
    if (!force && allExistingIds.has(_id)) {
      continue;
    }

    const existingDoc = existingMap.get(_id);
    if (existingDoc?.hasImage) {
      patchItems.push({ item, _id });
    } else {
      uploadItems.push({ item, _id, src: item.src });
    }
  }

  // Batch video-only items into one transaction
  if (videoItems.length > 0) {
    const videoTx = client.transaction();
    for (const item of videoItems) {
      const _id = `gallery-video-${item.youtubeId}`;
      if (force) {
        videoTx.createOrReplace({
          _id,
          _type: "galleryItem" as const,
          alt: item.alt,
          isWalkOn: item.isWalkOn ?? false,
          year: item.year,
          youtubeId: item.youtubeId,
          featured: false,
        });
      } else {
        videoTx.createIfNotExists({
          _id,
          _type: "galleryItem" as const,
          alt: item.alt,
          isWalkOn: item.isWalkOn ?? false,
          year: item.year,
          youtubeId: item.youtubeId,
          featured: false,
        });
      }
    }
    await videoTx.commit();
    videoOnly = videoItems.length;
    console.log(`  ${force ? "Synced" : "Created"} ${videoOnly} video items in one transaction`);
  }

  // Batch all metadata patches into transactions (chunks of 50) — force mode only
  if (force && patchItems.length > 0) {
    const CHUNK_SIZE = 50;
    for (let i = 0; i < patchItems.length; i += CHUNK_SIZE) {
      const chunk = patchItems.slice(i, i + CHUNK_SIZE);
      const patchTx = client.transaction();
      for (const { item, _id } of chunk) {
        patchTx.patch(_id, (p) => p.set({
          alt: item.alt,
          isWalkOn: item.isWalkOn ?? false,
          year: item.year,
          youtubeId: item.youtubeId,
          featured: item.featured ?? false,
        }));
      }
      await patchTx.commit();
      console.log(`  Patched ${chunk.length} gallery items (batch ${Math.floor(i / CHUNK_SIZE) + 1})`);
    }
  }

  // Upload new images in parallel batches, then create docs
  if (uploadItems.length > 0) {
    console.log(`  Uploading ${uploadItems.length} new images...`);
    const assetMap = await uploadInBatches(
      client,
      uploadItems.map(({ src, _id }) => ({ src, _id })),
      IMAGE_UPLOAD_CONCURRENCY,
    );

    const CHUNK_SIZE = 50;
    for (let i = 0; i < uploadItems.length; i += CHUNK_SIZE) {
      const chunk = uploadItems.slice(i, i + CHUNK_SIZE);
      const uploadTx = client.transaction();
      for (const { item, _id } of chunk) {
        const assetId = assetMap.get(_id);
        if (!assetId) continue;
        const doc = {
          _id,
          _type: "galleryItem" as const,
          image: {
            _type: "image" as const,
            asset: { _type: "reference" as const, _ref: assetId },
          },
          alt: item.alt,
          isWalkOn: item.isWalkOn ?? false,
          year: item.year,
          youtubeId: item.youtubeId,
          featured: item.featured ?? false,
        };
        if (force) {
          uploadTx.createOrReplace(doc);
        } else {
          uploadTx.createIfNotExists(doc);
        }
      }
      await uploadTx.commit();
    }
    uploaded = uploadItems.length;
    console.log(`  Uploaded and synced ${uploaded} new gallery items`);
  }

  // Clean up stale gallery items — force mode only
  let staleCount = 0;
  if (force) {
    const galleryIdSet = new Set(galleryIds);
    const staleGallery = [...allExistingIds].filter((id) => !galleryIdSet.has(id));
    if (staleGallery.length > 0) {
      const tx = client.transaction();
      for (const id of staleGallery) tx.delete(id);
      await tx.commit();
      console.log(`  Deleted ${staleGallery.length} stale gallery item(s)`);
    }
    staleCount = staleGallery.length;
  }

  return {
    gallery: { synced: galleryIds.length, uploaded, skipped, videoOnly, deleted: staleCount },
  };
}

// Allow running standalone
if (require.main === module) {
  seedGallery()
    .then((result) => {
      console.log(`\nDone!`);
      console.log(`  Gallery: ${result.gallery.synced} synced (${result.gallery.uploaded} uploaded, ${result.gallery.videoOnly} videos), ${result.gallery.skipped} skipped, ${result.gallery.deleted} deleted`);
    })
    .catch((err) => {
      console.error("Seed failed:", err);
      process.exit(1);
    });
}
