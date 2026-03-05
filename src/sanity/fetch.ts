import { getClient } from "./client";
import { inducteesQuery } from "./queries";
import { inductees as fallbackInductees } from "@/data/hallOfFame";
import type { Inductee } from "./types";

export async function getInductees(): Promise<Inductee[]> {
  const client = getClient();
  if (!client) return fallbackInductees;

  try {
    const result = await client.fetch<Inductee[]>(inducteesQuery, {}, {
      next: { tags: ["inductees"] },
    });

    if (!result || result.length === 0) {
      return fallbackInductees;
    }

    return result;
  } catch {
    console.error("Failed to fetch inductees from Sanity, using fallback data");
    return fallbackInductees;
  }
}
