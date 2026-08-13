import type {StructureResolver} from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Furry Fairy Pets")
    .items([
      S.documentTypeListItem("product").title("Products"),
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
