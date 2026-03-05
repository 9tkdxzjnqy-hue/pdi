import { defineField, defineType } from "sanity";

export default defineType({
  name: "era",
  title: "Gallery Era",
  type: "document",
  fields: [
    defineField({
      name: "eraId",
      title: "Era ID",
      type: "string",
      description: "Machine key (e.g. early-days, walk-ons)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
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
      name: "groupByYear",
      title: "Group by Year",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "allYears",
      title: "All Years",
      type: "array",
      of: [{ type: "number" }],
      description: "If groupByYear is true, list all years to show (including empty ones)",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "label",
      eraId: "eraId",
    },
    prepare({ title, eraId }) {
      return {
        title,
        subtitle: eraId,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
});
