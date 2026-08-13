import {defineField, defineType} from "sanity";

export const categoryType = defineType({
  name: "category", title: "Categories", type: "document",
  fields: [
    defineField({name: "title", title: "Name", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "title"}, validation: (rule) => rule.required()}),
    defineField({name: "description", title: "Description", type: "text", rows: 3}),
    defineField({name: "image", title: "Category image", type: "image", options: {hotspot: true}}),
    defineField({name: "sortOrder", title: "Display order", type: "number", initialValue: 100}),
  ],
  preview: {select: {title: "title", media: "image"}},
});
