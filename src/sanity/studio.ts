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
                      .title("Homepage Showcase")
                      .child(
                        S.documentList()
                          .title("Homepage Showcase")
                          .filter('_type == "galleryItem" && featured == true')
                      ),
                    S.listItem()
                      .title("By Year")
                      .child(
                        S.list()
                          .title("By Year")
                          .items([
                            ...[2025, 2024, 2023, 2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013].map(
                              (year) =>
                                S.listItem()
                                  .title(String(year))
                                  .child(
                                    S.documentList()
                                      .title(String(year))
                                      .filter('_type == "galleryItem" && year == $year')
                                      .params({ year })
                                  )
                            ),
                            S.listItem()
                              .title("The Early Years")
                              .child(
                                S.documentList()
                                  .title("The Early Years")
                                  .filter(
                                    '_type == "galleryItem" && era == "early-days" && !defined(year)'
                                  )
                              ),
                            S.listItem()
                              .title("Undated")
                              .child(
                                S.documentList()
                                  .title("Undated")
                                  .filter(
                                    '_type == "galleryItem" && !defined(year) && era != "early-days" && era != "walk-ons"'
                                  )
                              ),
                          ])
                      ),
                    S.listItem()
                      .title("Walk-Ons")
                      .child(
                        S.list()
                          .title("Walk-Ons")
                          .items(
                            [2025, 2024, 2023, 2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013].map(
                              (year) =>
                                S.listItem()
                                  .title(String(year))
                                  .child(
                                    S.documentList()
                                      .title(`Walk-Ons ${year}`)
                                      .filter('_type == "galleryItem" && era == "walk-ons" && year == $year')
                                      .params({ year })
                                  )
                            )
                          )
                      ),
                    S.listItem()
                      .title("All Photos")
                      .child(
                        S.documentTypeList("galleryItem").title("All Photos")
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
