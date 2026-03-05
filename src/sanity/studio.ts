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
              .title("Hall of Fame")
              .child(
                S.documentTypeList("inductee").title("Inductees")
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
