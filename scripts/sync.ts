import { seedHomepage } from "./seed-homepage";
import { seedInductees } from "./seed-inductees";
import { seedCompetitions } from "./seed-competitions";
import { seedStories } from "./seed-stories";
import { seedGallery } from "./seed-gallery";

async function sync() {
  console.log("=== PDI Sync: Local → Sanity ===\n");
  const start = Date.now();

  // 1. Homepage (site settings + homepage — no dependencies)
  console.log("── Homepage & Site Settings ──");
  await seedHomepage();

  // 2. Inductees (no dependencies)
  console.log("\n── Inductees ──");
  const inducteeResult = await seedInductees();

  // 3. Competitions (no dependencies)
  console.log("\n── Competitions ──");
  const compResult = await seedCompetitions();

  // 4. Stories (threads first, then stories that reference them)
  console.log("\n── Stories ──");
  const storyResult = await seedStories();

  // 5. Gallery (eras first, then gallery items)
  console.log("\n── Gallery ──");
  const galleryResult = await seedGallery();

  // Summary
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const totalSynced =
    inducteeResult.synced +
    compResult.synced +
    storyResult.threads.synced +
    storyResult.stories.synced +
    galleryResult.eras.synced +
    galleryResult.gallery.synced;
  const totalDeleted =
    inducteeResult.deleted +
    compResult.deleted +
    storyResult.threads.deleted +
    storyResult.stories.deleted +
    galleryResult.eras.deleted +
    galleryResult.gallery.deleted;

  console.log("\n=== Sync Complete ===");
  console.log(`  ${inducteeResult.synced} inductees`);
  console.log(`  ${compResult.synced} competitions`);
  console.log(`  ${storyResult.threads.synced} threads, ${storyResult.stories.synced} stories`);
  console.log(`  ${galleryResult.eras.synced} eras, ${galleryResult.gallery.synced} gallery items (${galleryResult.gallery.uploaded} uploaded)`);
  console.log(`  Total: ${totalSynced} synced, ${totalDeleted} stale deleted`);
  console.log(`  Time: ${elapsed}s`);
}

sync().catch((err) => {
  console.error("\nSync failed:", err);
  process.exit(1);
});
