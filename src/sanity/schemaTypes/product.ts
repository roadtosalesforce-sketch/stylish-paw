import {defineField, defineType} from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({name: "name", title: "Name", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "name"}, validation: (rule) => rule.required()}),
    defineField({name: "description", title: "Description", type: "text", rows: 5, validation: (rule) => rule.required()}),
    defineField({name: "price", title: "Price (USD)", type: "number", validation: (rule) => rule.required().positive()}),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {list: ["sweaters", "raincoats", "costumes", "accessories", "outerwear"]},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "petType",
      title: "Pet type",
      type: "string",
      options: {list: [{title: "Dog", value: "dog"}, {title: "Cat", value: "cat"}, {title: "Dogs & cats", value: "both"}]},
      validation: (rule) => rule.required(),
    }),
    defineField({name: "sizes", title: "Sizes", type: "array", of: [{type: "string"}], validation: (rule) => rule.required().min(1)}),
    defineField({name: "colors", title: "Colors", type: "array", of: [{type: "string"}], validation: (rule) => rule.required().min(1)}),
    defineField({name: "image", title: "Main image", type: "image", options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: "featured", title: "Featured", type: "boolean", initialValue: false}),
    defineField({name: "badge", title: "Badge", type: "string", description: "Optional label, e.g. Bestseller"}),
    defineField({name: "sortOrder", title: "Sort order", type: "number", initialValue: 100}),
  ],
  preview: {select: {title: "name", subtitle: "category", media: "image"}},
});
