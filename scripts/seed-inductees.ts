import { getWriteClient } from "../src/sanity/client";
import { inductees } from "../src/data/hallOfFame";

function toSlug(nickname: string): string {
  return nickname
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function seed() {
  const client = getWriteClient();
  console.log(`Seeding ${inductees.length} inductees...`);

  for (const inductee of inductees) {
    const slug = toSlug(inductee.nickname);
    const doc = {
      _type: "inductee" as const,
      nickname: inductee.nickname,
      contribution: inductee.contribution,
      year: inductee.year,
      slug: { _type: "slug" as const, current: slug },
    };

    const result = await client.create(doc);
    console.log(`  Created: ${inductee.nickname} (${result._id})`);
  }

  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
