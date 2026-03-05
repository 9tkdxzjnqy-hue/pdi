import { defineField, defineType } from "sanity";

export default defineType({
  name: "inductee",
  title: "Hall of Fame Inductee",
  type: "document",
  fields: [
    defineField({
      name: "nickname",
      title: "Nickname",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contribution",
      title: "Contribution",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year Inducted",
      type: "number",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "nickname",
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: "nickname",
      year: "year",
    },
    prepare({ title, year }) {
      return {
        title,
        subtitle: year ? `Inducted ${year}` : "No year",
      };
    },
  },
  orderings: [
    {
      title: "Year (Newest First)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
    {
      title: "Year (Oldest First)",
      name: "yearAsc",
      by: [{ field: "year", direction: "asc" }],
    },
    {
      title: "Nickname (A-Z)",
      name: "nicknameAsc",
      by: [{ field: "nickname", direction: "asc" }],
    },
  ],
});
