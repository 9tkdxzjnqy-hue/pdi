import { pullCompetitions } from "./pull-competitions";
import { pullInductees } from "./pull-inductees";
import { pullGallery } from "./pull-gallery";

async function pull() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.log("Pull skipped: SANITY env vars not set");
    return;
  }

  console.log("=== PDI Pull: Sanity → Local TS ===\n");
  const start = Date.now();

  // 1. Competitions
  console.log("── Competitions ──");
  const compResult = await pullCompetitions();

  // 2. Inductees
  console.log("\n── Inductees ──");
  const inducteeResult = await pullInductees();

  // 3. Gallery
  console.log("\n── Gallery ──");
  const galleryResult = await pullGallery();

  // Summary
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log("\n=== Pull Complete ===");
  console.log(`  ${compResult.pulled} competitions`);
  console.log(`  ${inducteeResult.pulled} inductees`);
  console.log(`  ${galleryResult.items} gallery items`);
  console.log(`  Time: ${elapsed}s`);
}

pull().catch((err) => {
  console.error("\nPull failed:", err);
  process.exit(1);
});
