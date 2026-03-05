import { defineField, defineType } from "sanity";

export default defineType({
  name: "competition",
  title: "Competition",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "winner",
              title: "Winner",
              type: "string",
            }),
            defineField({
              name: "runnerUp",
              title: "Runner-up",
              type: "string",
            }),
            defineField({
              name: "walkOnName",
              title: "Walk-on Name",
              type: "string",
            }),
            defineField({
              name: "venue",
              title: "Venue",
              type: "string",
            }),
          ],
          preview: {
            select: {
              year: "year",
              winner: "winner",
            },
            prepare({ year, winner }) {
              return {
                title: `${year}`,
                subtitle: winner || "—",
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      results: "results",
    },
    prepare({ title, results }) {
      return {
        title,
        subtitle: results ? `${results.length} results` : "No results",
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
    {
      title: "Name (A-Z)",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
