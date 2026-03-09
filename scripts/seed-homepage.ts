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

  // Check if homepage doc already has images (skip re-uploads if so)
  const existing = await client.fetch<{ hasStoryImage: boolean; hasCharityImage: boolean } | null>(
    `*[_id == "homePage"][0]{ "hasStoryImage": defined(storyImage.asset._ref), "hasCharityImage": defined(charityImage.asset._ref) }`
  );

  let storyImage;
  let charityImage;

  if (existing?.hasStoryImage && existing?.hasCharityImage) {
    console.log("Skip image uploads (both exist)");
    // Patch metadata only, preserving existing images
    await client.patch("homePage").set({
      heroTitle: "Twenty Years of Arrows, Walk-ons and Heart",
      heroSubtitle:
        "Templeogue's legendary charity darts tournament — all proceeds to Children's Health Foundation Crumlin.",
      storyTitle: "Where It All Started",
      storyBody: [
        "What began as a few mates throwing darts on St Patrick's Day has grown into one of Dublin's most beloved charity events. The Paddy's Day Invitational — the PDI — brings together players, performers, and punters for a night that's equal parts sport, spectacle, and craic.",
        "Over twenty years, the walk-ons have gotten bigger, the fancy dress more outrageous, and the cause more important. Every cent raised goes to Children's Health Foundation Crumlin.",
        "It's never been about the darts — it's about what the darts make possible.",
      ].join("\n\n"),
      storyImageAlt: "Early PDI group photo",
      charityLabel: "All Proceeds To",
      charityHeading: "Children's Health Foundation Crumlin",
      charityLinkText: "Visit childrenshealth.ie →",
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
    }).commit();
    console.log("  Patched: homePage (preserved images)");
  } else {
    // Upload images
    console.log("Uploading story image...");
    storyImage = await uploadImage(client, "public/gallery/early-event-03.jpg");

    console.log("Uploading charity image...");
    charityImage = await uploadImage(client, "public/images/cheque-2015.jpg");

    // Seed homepage with images
    console.log("Syncing homepage...");
    await client.createOrReplace({
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
    console.log("  Synced: homePage");
  }

  // Seed site settings (small doc, always createOrReplace)
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
