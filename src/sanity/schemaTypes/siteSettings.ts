import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "donationAmount",
      title: "Donation Amount",
      type: "string",
      description: 'e.g. "€92,500+" — appears in Hero + Charity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "donationLabel",
      title: "Donation Label",
      type: "string",
      description: 'e.g. "raised and counting"',
    }),
    defineField({
      name: "charityName",
      title: "Charity Name",
      type: "string",
      description: 'e.g. "Children\'s Health Foundation Crumlin"',
    }),
    defineField({
      name: "charityUrl",
      title: "Charity URL",
      type: "url",
      description: "e.g. https://childrenshealth.ie",
    }),
    defineField({
      name: "galleryUploadUrl",
      title: "Gallery Upload URL",
      type: "url",
      description: "Google Drive link for photo uploads",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
