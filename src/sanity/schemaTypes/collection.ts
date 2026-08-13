import {defineField, defineType} from "sanity";

export const collectionType = defineType({
  name: "collection", title: "Collections", type: "document",
  fields: [
    defineField({name: "title", title: "Name", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "title"}, validation: (rule) => rule.required()}),
    defineField({name: "description", title: "Story", type: "text", rows: 4}),
    defineField({name: "heroImage", title: "Cover image", type: "image", options: {hotspot: true}}),
    defineField({name: "active", title: "Active", type: "boolean", initialValue: true}),
  ],
  preview: {select: {title: "title", media: "heroImage", active: "active"}, prepare: ({title, media, active}) => ({title, subtitle: active ? "Active" : "Hidden", media})},
});
