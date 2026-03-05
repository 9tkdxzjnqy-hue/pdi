import { createImageUrlBuilder } from "@sanity/image-url";
import { getClient } from "./client";

const builder = createImageUrlBuilder(getClient()!);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
