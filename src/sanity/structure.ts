import type {StructureResolver} from "sanity/structure";

const readyToSell = 'status == "active" && defined(slug.current) && defined(name) && defined(price) && price > 0 && defined(image.asset) && defined(category) && count(sizes) > 0 && count(colors) > 0 && length(pt::text(description)) > 0';

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Furry Fairy Pets")
    .items([
      S.listItem().title("Homepage").id("homepage").child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("Shop settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Products & stock")
        .child(
          S.list()
            .title("Products & stock")
            .items([
              S.listItem()
                .title("Ready to sell")
                .child(
                  S.documentList()
                    .title("Ready to sell")
                    .schemaType("product")
                    .apiVersion("2026-08-13")
                    .filter(`_type == "product" && ${readyToSell}`),
                ),
              S.listItem()
                .title("Needs finishing")
                .child(
                  S.documentList()
                    .title("Needs finishing")
                    .schemaType("product")
                    .apiVersion("2026-08-13")
                    .filter(`_type == "product" && !(${readyToSell})`),
                ),
              S.listItem()
                .title("Featured on homepage")
                .child(
                  S.documentList()
                    .title("Featured on homepage")
                    .schemaType("product")
                    .apiVersion("2026-08-13")
                    .filter(`_type == "product" && ${readyToSell} && featured == true`),
                ),
              S.documentTypeListItem("product").title("All products"),
            ]),
        ),
      S.listItem()
        .title("Shop categories")
        .child(
          S.list()
            .title("Shop categories")
            .items([
              S.listItem().title("Clothing").child(S.document().schemaType("category").documentId("category-clothing")),
              S.listItem().title("Collars & Leashes").child(S.document().schemaType("category").documentId("category-collars-leashes")),
              S.listItem().title("Essentials").child(S.document().schemaType("category").documentId("category-essentials")),
            ]),
        ),
      S.documentTypeListItem("collection").title("Collections"),
      S.documentTypeListItem("sizeGuide").title("Size guides"),
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("post").title("Blog posts"),
    ]);
