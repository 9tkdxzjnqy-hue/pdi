import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryItem",
  title: "Gallery Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube Video ID",
      type: "string",
      description:
        "The video ID from a YouTube URL (e.g. 'zTcOhsZMr1U' from youtube.com/watch?v=zTcOhsZMr1U). Leave blank for photo items.",
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "isWalkOn",
      title: "Walk-On",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
      isWalkOn: "isWalkOn",
      year: "year",
    },
    prepare({ title, media, isWalkOn, year }) {
      return {
        title,
        subtitle:
          [year, isWalkOn ? "Walk-On" : null].filter(Boolean).join(" — ") ||
          "No year",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Year (Newest First)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
});
