import { getWriteClient } from "../src/sanity/client";
import { competitions } from "../src/data/competitions";
import { createReadStream } from "fs";
import path from "path";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function seed() {
  const client = getWriteClient();
  console.log(`Seeding ${competitions.length} competitions...`);

  // First 4 are featured on homepage (PDI, WPDI, Walk-on, Shield)
  const featuredNames = new Set(["The PDI", "WPDI", "Walk-on of the Year", "The Shield"]);

  for (let i = 0; i < competitions.length; i++) {
    const comp = competitions[i];
    const slug = toSlug(comp.name);

    // Upload image
    const imagePath = path.join(process.cwd(), "public", comp.image);
    console.log(`  Uploading image: ${comp.image}`);
    const imageAsset = await client.assets.upload("image", createReadStream(imagePath), {
      filename: path.basename(comp.image),
    });

    const doc = {
      _type: "competition" as const,
      name: comp.name,
      description: comp.description,
      image: {
        _type: "image" as const,
        asset: {
          _type: "reference" as const,
          _ref: imageAsset._id,
        },
      },
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
    };

    const result = await client.create(doc);
    console.log(`  Created: ${comp.name} (${result._id}) — ${comp.results.length} results`);
  }

  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
