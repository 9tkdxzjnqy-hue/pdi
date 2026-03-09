import { createReadStream } from "fs";
import path from "path";
import { getWriteClient } from "../src/sanity/client";

async function uploadImage(client: ReturnType<typeof getWriteClient>, filePath: string) {
  const absPath = path.resolve(filePath);
  const stream = createReadStream(absPath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(filePath),
  });
  return {
    _type: "image" as const,
    asset: {
      _type: "reference" as const,
      _ref: asset._id,
    },
  };
}

export async function seedHomepage() {
  const client = getWriteClient();

  // Upload images
  console.log("Uploading story image...");
  const storyImage = await uploadImage(client, "public/gallery/early-event-03.jpg");

  console.log("Uploading charity image...");
  const charityImage = await uploadImage(client, "public/images/cheque-2015.jpg");

  // Seed site settings
  console.log("Syncing site settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    donationAmount: "€XX,XXX",
    donationLabel: "raised and counting",
    charityName: "Children's Health Foundation Crumlin",
    charityUrl: "https://childrenshealth.ie",
    galleryUploadUrl:
      "https://drive.google.com/drive/folders/1-kvii3GsJKUeMsDYhd8q2ZqTzYvJU_M7?usp=sharing",
  });
  console.log("  Synced: siteSettings");

  // Seed homepage
  console.log("Syncing homepage...");
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",

    // Hero
    heroTitle: "Twenty Years of Arrows, Walk-ons and Heart",
    heroSubtitle:
      "Templeogue's legendary charity darts tournament — all proceeds to Children's Health Foundation Crumlin.",

    // Story
    storyTitle: "Where It All Started",
    storyBody: [
      "What began as a few mates throwing darts on St Patrick's Day has grown into one of Dublin's most beloved charity events. The Paddy's Day Invitational — the PDI — brings together players, performers, and punters for a night that's equal parts sport, spectacle, and craic.",
      "Over twenty years, the walk-ons have gotten bigger, the fancy dress more outrageous, and the cause more important. Every cent raised goes to Children's Health Foundation Crumlin.",
      "It's never been about the darts — it's about what the darts make possible.",
    ].join("\n\n"),
    storyImage,
    storyImageAlt: "Early PDI group photo",

    // Charity
    charityLabel: "All Proceeds To",
    charityHeading: "Children's Health Foundation Crumlin",
    charityLinkText: "Visit childrenshealth.ie →",
    charityImage,
    charityImageAlt:
      "PDI committee presenting cheque to Children's Health Foundation Crumlin, 2015",

    // Competitions
    competitionsTitle: "The Competitions",
    competitionsDescription:
      "Four ways to compete, one mission — raise as much as possible for Crumlin.",
    competitionsLinkText: "Explore Competitions →",

    // Gallery
    galleryTitle: "Gallery",
    galleryDescription: "Scenes from twenty years of the PDI.",
    galleryLinkText: "View full gallery →",
    galleryUploadText: "Got photos? Upload them here →",
  });
  console.log("  Synced: homePage");
}

// Allow running standalone
if (require.main === module) {
  seedHomepage()
    .then(() => console.log("Done!"))
    .catch((err) => {
      console.error("Seed failed:", err);
      process.exit(1);
    });
}
