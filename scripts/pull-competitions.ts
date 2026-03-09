import { getWriteClient } from "../src/sanity/client";
import {
  competitions as localCompetitions,
  walkOnCompetition as localWalkOnCompetition,
  type Competition,
} from "../src/data/competitions";
import { writeFileSync } from "fs";
import path from "path";

interface SanityResult {
  _key: string;
  _type: string;
  year: number;
  winner?: string;
  runnerUp?: string;
  walkOnName?: string;
  venue?: string;
}

interface SanityCompetition {
  _id: string;
  name: string;
  description: string;
  displayOrder: number;
  results: SanityResult[];
}

export async function pullCompetitions() {
  const client = getWriteClient();

  const sanityComps = await client.fetch<SanityCompetition[]>(
    `*[_type == "competition"] | order(displayOrder asc) {
      _id,
      name,
      description,
      displayOrder,
      results
    }`
  );

  console.log(`  Fetched ${sanityComps.length} competitions from Sanity`);

  // Build lookup of local competitions for preserving image/alt/photo
  const allLocal = [...localCompetitions, localWalkOnCompetition];
  const localByName = new Map<string, Competition>(allLocal.map((c) => [c.name, c]));

  // Separate walk-on competition from the rest
  let walkOnComp: SanityCompetition | undefined;
  const regularComps: SanityCompetition[] = [];

  for (const comp of sanityComps) {
    if (comp.name === "Walk-on of the Year") {
      walkOnComp = comp;
    } else {
      regularComps.push(comp);
    }
  }

  // --- Generate TS file ---
  let out = "";

  // Type exports
  out += `export interface CompetitionResult {\n`;
  out += `  year: number;\n`;
  out += `  winner?: string;\n`;
  out += `  runnerUp?: string;\n`;
  out += `  walkOnName?: string;\n`;
  out += `  venue?: string;\n`;
  out += `  photo?: string;\n`;
  out += `}\n\n`;

  out += `export interface Competition {\n`;
  out += `  name: string;\n`;
  out += `  description: string;\n`;
  out += `  image: string;\n`;
  out += `  alt: string;\n`;
  out += `  results: CompetitionResult[];\n`;
  out += `}\n\n`;

  // walkOnCompetition export
  if (walkOnComp) {
    const local = localByName.get("Walk-on of the Year");
    out += genCompExport("walkOnCompetition", walkOnComp, local, "");
    out += "\n";
  }

  // competitions array
  out += `export const competitions: Competition[] = [\n`;
  for (const comp of regularComps) {
    const local = localByName.get(comp.name);
    out += genCompObject(comp, local);
  }
  out += `];\n`;

  const filePath = path.join(process.cwd(), "src/data/competitions.ts");
  writeFileSync(filePath, out);
  console.log(`  Wrote ${filePath}`);

  return { pulled: sanityComps.length };
}

function genCompExport(
  varName: string,
  sanity: SanityCompetition,
  local: Competition | undefined,
  _prefix: string,
) {
  const image = local?.image ?? "/images/hero-walkon-blue.jpeg";
  const alt = local?.alt ?? sanity.name;
  const localPhotos = buildPhotoMap(local);

  let s = `export const ${varName}: Competition = {\n`;
  s += `  name: ${JSON.stringify(sanity.name)},\n`;
  s += `  description:\n    ${JSON.stringify(sanity.description)},\n`;
  s += `  image: ${JSON.stringify(image)},\n`;
  s += `  alt: ${JSON.stringify(alt)},\n`;
  s += `  results: [\n`;
  for (const r of sanity.results) {
    s += genResultLine(r, localPhotos.get(r.year), "    ");
  }
  s += `  ],\n`;
  s += `};\n`;
  return s;
}

function genCompObject(sanity: SanityCompetition, local: Competition | undefined) {
  const image = local?.image ?? "/images/hero-walkon-blue.jpeg";
  const alt = local?.alt ?? sanity.name;
  const localPhotos = buildPhotoMap(local);

  let s = `  {\n`;
  s += `    name: ${JSON.stringify(sanity.name)},\n`;
  s += `    description:\n      ${JSON.stringify(sanity.description)},\n`;
  s += `    image: ${JSON.stringify(image)},\n`;
  s += `    alt: ${JSON.stringify(alt)},\n`;
  s += `    results: [\n`;
  for (const r of sanity.results) {
    s += genResultLine(r, localPhotos.get(r.year), "      ");
  }
  s += `    ],\n`;
  s += `  },\n`;
  return s;
}

function genResultLine(r: SanityResult, photo: string | undefined, indent: string) {
  const parts: string[] = [`year: ${r.year}`];
  if (r.winner) parts.push(`winner: ${JSON.stringify(r.winner)}`);
  if (r.runnerUp) parts.push(`runnerUp: ${JSON.stringify(r.runnerUp)}`);
  if (r.walkOnName) parts.push(`walkOnName: ${JSON.stringify(r.walkOnName)}`);
  if (r.venue) parts.push(`venue: ${JSON.stringify(r.venue)}`);
  if (photo) parts.push(`photo: ${JSON.stringify(photo)}`);
  return `${indent}{ ${parts.join(", ")} },\n`;
}

function buildPhotoMap(local: Competition | undefined) {
  const map = new Map<number, string>();
  if (local) {
    for (const r of local.results) {
      if (r.photo) map.set(r.year, r.photo);
    }
  }
  return map;
}

// Allow running standalone
if (require.main === module) {
  pullCompetitions()
    .then(({ pulled }) => console.log(`Done! Pulled ${pulled} competitions`))
    .catch((err) => {
      console.error("Pull failed:", err);
      process.exit(1);
    });
}
