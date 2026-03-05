"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { projectId, dataset } from "./config";

export default defineConfig({
  name: "pdi-studio",
  title: "PDI CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings")
              ),
            S.listItem()
              .title("Homepage")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
                  .title("Homepage")
              ),
            S.divider(),
            S.listItem()
              .title("Hall of Fame")
              .child(
                S.documentTypeList("inductee").title("Inductees")
              ),
            S.listItem()
              .title("Competitions")
              .child(
                S.documentTypeList("competition").title("Competitions")
              ),
            S.divider(),
            S.listItem()
              .title("Gallery")
              .child(
                S.list()
                  .title("Gallery")
                  .items([
                    S.listItem()
                      .title("Photos")
                      .child(
                        S.documentTypeList("galleryItem").title("Photos")
                      ),
                    S.listItem()
                      .title("Eras")
                      .child(
                        S.documentTypeList("era").title("Eras")
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title("Stories")
              .child(
                S.list()
                  .title("Stories")
                  .items([
                    S.listItem()
                      .title("Threads")
                      .child(
                        S.documentTypeList("storyThread").title("Threads")
                      ),
                    S.listItem()
                      .title("Stories")
                      .child(
                        S.documentTypeList("story").title("Stories")
                      ),
                  ])
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
