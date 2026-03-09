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

  // Only seed homepage if it doesn't exist yet — once created, Sanity is the source of truth
  const homePageExists = await client.fetch<boolean>(
    `defined(*[_id == "homePage"][0]._id)`
  );

  if (!homePageExists) {
    console.log("Seeding homepage (first time)...");
    console.log("Uploading story image...");
    const storyImage = await uploadImage(client, "public/gallery/early-event-03.jpg");

    console.log("Uploading charity image...");
    const charityImage = await uploadImage(client, "public/images/cheque-2015.jpg");

    await client.create({
      _id: "homePage",
      _type: "homePage",
      heroTitle: "Twenty Years of Arrows, Walk-ons and Heart",
      heroSubtitle:
        "Templeogue's legendary charity darts tournament — all proceeds to Children's Health Foundation Crumlin.",
      storyTitle: "Where It All Started",
      storyBody: [
        "What began as a few mates throwing darts on St Patrick's Day has grown into one of Dublin's most beloved charity events. The Paddy's Day Invitational — the PDI — brings together players, performers, and punters for a night that's equal parts sport, spectacle, and craic.",
        "Over twenty years, the walk-ons have gotten bigger, the fancy dress more outrageous, and the cause more important. Every cent raised goes to Children's Health Foundation Crumlin.",
        "It's never been about the darts — it's about what the darts make possible.",
      ].join("\n\n"),
      storyImage,
      storyImageAlt: "Early PDI group photo",
      charityLabel: "All Proceeds To",
      charityHeading: "Children's Health Foundation Crumlin",
      charityLinkText: "Visit childrenshealth.ie →",
      charityImage,
      charityImageAlt:
        "PDI committee presenting cheque to Children's Health Foundation Crumlin, 2015",
      competitionsTitle: "Roll of Honour",
      competitionsDescription:
        "Four ways to compete, one mission — raise as much as possible for Crumlin.",
      competitionsLinkText: "Explore Roll of Honour →",
      galleryTitle: "Gallery",
      galleryDescription: "Scenes from twenty years of the PDI.",
      galleryLinkText: "View full gallery →",
      galleryUploadText: "Got photos? Upload them here →",
    });
    console.log("  Created: homePage");
  } else {
    console.log("  Skip: homePage (already exists, editable in Sanity)");
  }

  // Only seed site settings if it doesn't exist yet — once created, Sanity is the source of truth
  const settingsExist = await client.fetch<boolean>(
    `defined(*[_id == "siteSettings"][0]._id)`
  );
  if (!settingsExist) {
    console.log("Seeding site settings (first time)...");
    await client.create({
      _id: "siteSettings",
      _type: "siteSettings",
      donationAmount: "€XX,XXX",
      donationLabel: "raised and counting",
      charityName: "Children's Health Foundation Crumlin",
      charityUrl: "https://childrenshealth.ie",
      galleryUploadUrl:
        "https://drive.google.com/drive/folders/1-kvii3GsJKUeMsDYhd8q2ZqTzYvJU_M7?usp=sharing",
    });
    console.log("  Created: siteSettings");
  } else {
    console.log("  Skip: siteSettings (already exists, editable in Sanity)");
  }
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
