import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "story", title: "Story" },
    { name: "charity", title: "Charity" },
    { name: "competitions", title: "Competitions" },
    { name: "gallery", title: "Gallery" },
  ],
  fields: [
    // --- Hero ---
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      group: "hero",
    }),

    // --- Story ---
    defineField({
      name: "storyTitle",
      title: "Story Title",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "storyBody",
      title: "Story Body",
      type: "text",
      rows: 8,
      description: "Use blank lines (double Enter) to separate paragraphs",
      group: "story",
    }),
    defineField({
      name: "storyImage",
      title: "Story Image",
      type: "image",
      group: "story",
    }),
    defineField({
      name: "storyImageAlt",
      title: "Story Image Alt Text",
      type: "string",
      group: "story",
    }),

    // --- Charity ---
    defineField({
      name: "charityLabel",
      title: "Charity Label",
      type: "string",
      description: 'e.g. "All Proceeds To"',
      group: "charity",
    }),
    defineField({
      name: "charityHeading",
      title: "Charity Heading",
      type: "string",
      description: "Heading text for the charity section",
      group: "charity",
    }),
    defineField({
      name: "charityLinkText",
      title: "Charity Link Text",
      type: "string",
      description: 'e.g. "Visit childrenshealth.ie →"',
      group: "charity",
    }),
    defineField({
      name: "charityImage",
      title: "Charity Image",
      type: "image",
      group: "charity",
    }),
    defineField({
      name: "charityImageAlt",
      title: "Charity Image Alt Text",
      type: "string",
      group: "charity",
    }),

    // --- Competitions ---
    defineField({
      name: "competitionsTitle",
      title: "Competitions Title",
      type: "string",
      group: "competitions",
    }),
    defineField({
      name: "competitionsDescription",
      title: "Competitions Description",
      type: "text",
      rows: 3,
      group: "competitions",
    }),
    defineField({
      name: "competitionsLinkText",
      title: "Competitions Link Text",
      type: "string",
      group: "competitions",
    }),

    // --- Gallery ---
    defineField({
      name: "galleryTitle",
      title: "Gallery Title",
      type: "string",
      group: "gallery",
    }),
    defineField({
      name: "galleryDescription",
      title: "Gallery Description",
      type: "text",
      rows: 3,
      group: "gallery",
    }),
    defineField({
      name: "galleryLinkText",
      title: "Gallery Link Text",
      type: "string",
      group: "gallery",
    }),
    defineField({
      name: "galleryUploadText",
      title: "Gallery Upload Text",
      type: "string",
      description: 'e.g. "Got photos? Upload them here →"',
      group: "gallery",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
