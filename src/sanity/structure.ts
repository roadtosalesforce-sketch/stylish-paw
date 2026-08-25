import type {StructureResolver} from "sanity/structure";

const readyToSell = 'status == "active" && defined(slug.current) && defined(name) && defined(price) && price > 0 && defined(image.asset) && defined(category) && count(sizes) > 0 && count(colors) > 0 && length(pt::text(description)) > 0';

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Furry Fairy Pets")
    .items([
      S.listItem()
        .title("Products")
        .child(
          S.list()
            .title("Products")
            .items([
              S.listItem()
                .title("Ready to sell")
                .child(
                  S.documentList()
                    .title("Ready to sell")
                    .schemaType("product")
                    .filter(`_type == "product" && ${readyToSell}`),
                ),
              S.listItem()
                .title("Needs finishing")
                .child(
                  S.documentList()
                    .title("Needs finishing")
                    .schemaType("product")
                    .filter(`_type == "product" && !(${readyToSell})`),
                ),
              S.listItem()
                .title("Featured on homepage")
                .child(
                  S.documentList()
                    .title("Featured on homepage")
                    .schemaType("product")
                    .filter(`_type == "product" && ${readyToSell} && featured == true`),
                ),
              S.documentTypeListItem("product").title("All products"),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("collection").title("Collections"),
      S.documentTypeListItem("sizeGuide").title("Size guides"),
      S.documentTypeListItem("page").title("Pages"),
      S.divider(),
      S.listItem().title("Homepage").id("homepage").child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("Shop settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
