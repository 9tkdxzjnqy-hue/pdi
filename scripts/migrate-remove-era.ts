/**
 * One-time migration: remove `era` field from all galleryItem docs in Sanity,
 * and set `isWalkOn: true` on items that had `era == "walk-ons"`.
 *
 * Run with: npx tsx scripts/migrate-remove-era.ts
 * Delete this script after confirming the migration succeeded.
 */

import { getWriteClient } from "../src/sanity/client";

const BATCH_SIZE = 50;

async function migrate() {
  const client = getWriteClient();

  // Fetch all gallery items with their era field
  const items = await client.fetch<{ _id: string; era?: string }[]>(
    `*[_type == "galleryItem"]{ _id, era }`
  );

  console.log(`Found ${items.length} gallery items`);

  const walkOnItems = items.filter((item) => item.era === "walk-ons");
  const otherItems = items.filter((item) => item.era && item.era !== "walk-ons");
  const noEraItems = items.filter((item) => !item.era);

  console.log(`  ${walkOnItems.length} walk-on items (will set isWalkOn: true, unset era)`);
  console.log(`  ${otherItems.length} other items with era (will unset era)`);
  console.log(`  ${noEraItems.length} items without era (no changes needed)`);

  // Process walk-on items: set isWalkOn, unset era
  for (let i = 0; i < walkOnItems.length; i += BATCH_SIZE) {
    const batch = walkOnItems.slice(i, i + BATCH_SIZE);
    const tx = client.transaction();
    for (const item of batch) {
      tx.patch(item._id, (p) => p.set({ isWalkOn: true }).unset(["era"]));
    }
    await tx.commit();
    console.log(`  Migrated ${Math.min(i + BATCH_SIZE, walkOnItems.length)}/${walkOnItems.length} walk-on items`);
  }

  // Process other items: just unset era
  for (let i = 0; i < otherItems.length; i += BATCH_SIZE) {
    const batch = otherItems.slice(i, i + BATCH_SIZE);
    const tx = client.transaction();
    for (const item of batch) {
      tx.patch(item._id, (p) => p.set({ isWalkOn: false }).unset(["era"]));
    }
    await tx.commit();
    console.log(`  Migrated ${Math.min(i + BATCH_SIZE, otherItems.length)}/${otherItems.length} other items`);
  }

  console.log("\nMigration complete!");
  console.log("Verify in Sanity Studio, then delete this script.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
