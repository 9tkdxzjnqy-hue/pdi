import { createClient, type SanityClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./config";

let _client: SanityClient | null = null;
let _writeClient: SanityClient | null = null;

export function getClient(): SanityClient | null {
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({ projectId, dataset, apiVersion, useCdn: false });
  }
  return _client;
}

export function getWriteClient(): SanityClient {
  if (!_writeClient) {
    _writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });
  }
  return _writeClient;
}
