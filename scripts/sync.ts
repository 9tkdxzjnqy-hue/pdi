import { seedHomepage } from "./seed-homepage";
import { seedInductees } from "./seed-inductees";
import { seedCompetitions } from "./seed-competitions";
import { seedStories } from "./seed-stories";
import { seedGallery } from "./seed-gallery";

const force = process.argv.includes("--force");

async function sync() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.log("Sync skipped: SANITY env vars not set");
    return;
  }

  console.log(`=== PDI ${force ? "Push" : "Sync"}: Local → Sanity${force ? " (force)" : ""} ===\n`);
  const start = Date.now();

  // 1. Homepage (site settings + homepage — always create-only)
  console.log("── Homepage & Site Settings ──");
  await seedHomepage();

  // 2. Inductees (no dependencies)
  console.log("\n── Inductees ──");
  const inducteeResult = await seedInductees({ force });

  // 3. Competitions (no dependencies)
  console.log("\n── Competitions ──");
  const compResult = await seedCompetitions({ force });

  // 4. Stories (threads first, then stories that reference them — always create-only)
  console.log("\n── Stories ──");
  const storyResult = await seedStories();

  // 5. Gallery
  console.log("\n── Gallery ──");
  const galleryResult = await seedGallery({ force });

  // Summary
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const totalSynced =
    inducteeResult.synced +
    compResult.synced +
    storyResult.threads.synced +
    storyResult.stories.synced +
    galleryResult.gallery.synced;
  const totalDeleted =
    inducteeResult.deleted +
    compResult.deleted +
    storyResult.threads.deleted +
    storyResult.stories.deleted +
    galleryResult.gallery.deleted;

  console.log("\n=== Sync Complete ===");
  console.log(`  ${inducteeResult.synced} inductees`);
  console.log(`  ${compResult.synced} competitions`);
  console.log(`  ${storyResult.threads.synced} threads, ${storyResult.stories.synced} stories`);
  console.log(`  ${galleryResult.gallery.synced} gallery items (${galleryResult.gallery.uploaded} uploaded)`);
  console.log(`  Total: ${totalSynced} synced, ${totalDeleted} stale deleted`);
  console.log(`  Time: ${elapsed}s`);
}

sync().catch((err) => {
  console.error("\nSync failed:", err);
  // Don't block the build — site will use existing Sanity data
  if (process.env.SYNC_REQUIRED === "true") {
    process.exit(1);
  }
});
