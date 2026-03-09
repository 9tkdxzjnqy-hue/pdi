import { getWriteClient } from "../src/sanity/client";
import { inductees } from "../src/data/hallOfFame";

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

  const tx = client.transaction();
  for (const inductee of inductees) {
    const slug = toSlug(inductee.nickname);
    const _id = `inductee-${slug}`;
    syncedIds.push(_id);

    tx.createOrReplace({
      _id,
      _type: "inductee" as const,
      nickname: inductee.nickname,
      contribution: inductee.contribution,
      year: inductee.year,
      slug: { _type: "slug" as const, current: slug },
    });
  }
  await tx.commit();
  console.log(`  Synced ${syncedIds.length} inductees in one transaction`);

  // Clean up stale documents
  const existing = await client.fetch<string[]>(
    `*[_type == "inductee"]._id`
  );
  const syncedSet = new Set(syncedIds);
  const stale = existing.filter((id) => !syncedSet.has(id));
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
