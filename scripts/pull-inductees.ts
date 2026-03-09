import { getWriteClient } from "../src/sanity/client";
import { inductees as localInductees } from "../src/data/hallOfFame";
import { writeFileSync } from "fs";
import path from "path";

interface SanityInductee {
  _id: string;
  nickname: string;
  contribution: string;
  year?: number;
  photoFilename?: string;
}

export async function pullInductees() {
  const client = getWriteClient();

  const sanityInductees = await client.fetch<SanityInductee[]>(
    `*[_type == "inductee"] | order(year desc, nickname asc) {
      _id,
      nickname,
      contribution,
      year,
      "photoFilename": photo.asset->originalFilename
    }`
  );

  console.log(`  Fetched ${sanityInductees.length} inductees from Sanity`);

  // Build lookup of local inductees for preserving photo paths
  const localByNickname = new Map(localInductees.map((i) => [i.nickname, i]));

  // Sort: inductees with year desc first, then those without year at end
  const withYear = sanityInductees.filter((i) => i.year != null).sort((a, b) => b.year! - a.year!);
  const withoutYear = sanityInductees.filter((i) => i.year == null);
  const sorted = [...withYear, ...withoutYear];

  // --- Generate TS file ---
  let out = "";

  out += `export interface Inductee {\n`;
  out += `  nickname: string;\n`;
  out += `  contribution: string;\n`;
  out += `  year?: number;\n`;
  out += `  photo?: string;\n`;
  out += `}\n\n`;

  out += `export const inductees: Inductee[] = [\n`;

  for (const inductee of sorted) {
    out += genInductee(inductee, localByNickname.get(inductee.nickname));
  }

  out += `];\n`;

  const filePath = path.join(process.cwd(), "src/data/hallOfFame.ts");
  writeFileSync(filePath, out);
  console.log(`  Wrote ${filePath}`);

  return { pulled: sanityInductees.length };
}

function resolvePhoto(sanity: SanityInductee, localPhoto?: string): string | undefined {
  // Prefer local photo path (already correct for the project)
  if (localPhoto) return localPhoto;
  // For new inductees with photos in Sanity, derive from originalFilename
  if (sanity.photoFilename) return `/gallery/${sanity.photoFilename}`;
  return undefined;
}

function genInductee(sanity: SanityInductee, local?: (typeof localInductees)[0]) {
  const photo = resolvePhoto(sanity, local?.photo);
  const contribution = sanity.contribution ?? "";

  let s = `  {\n`;
  s += `    nickname: ${JSON.stringify(sanity.nickname)},\n`;

  if (photo) {
    s += `    photo: ${JSON.stringify(photo)},\n`;
  }

  // Inline short contributions, wrap long ones
  const inlineLength = `    contribution: ${JSON.stringify(contribution)},`.length;
  if (inlineLength <= 100) {
    s += `    contribution: ${JSON.stringify(contribution)},\n`;
  } else {
    s += `    contribution:\n      ${JSON.stringify(contribution)},\n`;
  }

  if (sanity.year != null) {
    s += `    year: ${sanity.year},\n`;
  }

  s += `  },\n`;
  return s;
}

// Allow running standalone
if (require.main === module) {
  pullInductees()
    .then(({ pulled }) => console.log(`Done! Pulled ${pulled} inductees`))
    .catch((err) => {
      console.error("Pull failed:", err);
      process.exit(1);
    });
}
