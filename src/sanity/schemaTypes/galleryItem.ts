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
      name: "era",
      title: "Era",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "The Walk-Ons", value: "walk-ons" },
          { title: "The Players", value: "male-players" },
          { title: "The Hazards", value: "the-hazards" },
          { title: "Recent Years", value: "recent" },
          { title: "The Middle Years", value: "middle-years" },
          { title: "The Early Days", value: "early-days" },
          { title: "The Sponsors", value: "ads" },
        ],
      },
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
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
      era: "era",
      year: "year",
    },
    prepare({ title, media, era, year }) {
      return {
        title,
        subtitle: year ? `${year} — ${era}` : era,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Era",
      name: "eraAsc",
      by: [{ field: "era", direction: "asc" }],
    },
    {
      title: "Year (Newest First)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
});
