import {defineArrayMember, defineField, defineType} from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog posts",
  type: "document",
  groups: [
    {name: "content", title: "Content", default: true},
    {name: "polish", title: "Polish / Polski"},
    {name: "seo", title: "SEO"},
  ],
  fields: [
    defineField({name: "title", title: "Title", type: "string", group: "content", validation: (rule) => rule.required().max(100)}),
    defineField({name: "titlePl", title: "Title (Polish)", type: "string", group: "polish", validation: (rule) => rule.max(100)}),
    defineField({name: "slug", title: "URL slug", type: "slug", group: "content", options: {source: "title", maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: "publishedAt", title: "Published at", type: "datetime", group: "content", initialValue: () => new Date().toISOString(), validation: (rule) => rule.required()}),
    defineField({name: "excerpt", title: "Excerpt", type: "text", rows: 3, group: "content", validation: (rule) => rule.max(220)}),
    defineField({name: "excerptPl", title: "Excerpt (Polish)", type: "text", rows: 3, group: "polish", validation: (rule) => rule.max(220)}),
    defineField({name: "coverImage", title: "Cover image", type: "image", group: "content", options: {hotspot: true}, fields: [{name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required()}], validation: (rule) => rule.required()}),
    defineField({name: "body", title: "Article", type: "array", group: "content", of: [defineArrayMember({type: "block", styles: [{title: "Normal", value: "normal"}, {title: "Heading 2", value: "h2"}, {title: "Heading 3", value: "h3"}], lists: [{title: "Bullets", value: "bullet"}, {title: "Numbered", value: "number"}]}), defineArrayMember({type: "image", options: {hotspot: true}, fields: [{name: "alt", title: "Alternative text", type: "string"}]})], validation: (rule) => rule.required()}),
    defineField({name: "bodyPl", title: "Article (Polish)", type: "array", group: "polish", of: [defineArrayMember({type: "block", styles: [{title: "Normal", value: "normal"}, {title: "Heading 2", value: "h2"}, {title: "Heading 3", value: "h3"}], lists: [{title: "Bullets", value: "bullet"}, {title: "Numbered", value: "number"}]}), defineArrayMember({type: "image", options: {hotspot: true}, fields: [{name: "alt", title: "Alternative text", type: "string"}]})]}),
    defineField({name: "seoTitle", title: "SEO title", type: "string", group: "seo", validation: (rule) => rule.max(60)}),
    defineField({name: "seoDescription", title: "SEO description", type: "text", rows: 3, group: "seo", validation: (rule) => rule.max(160)}),
    defineField({name: "seoTitlePl", title: "SEO title (Polish)", type: "string", group: "seo", validation: (rule) => rule.max(60)}),
    defineField({name: "seoDescriptionPl", title: "SEO description (Polish)", type: "text", rows: 3, group: "seo", validation: (rule) => rule.max(160)}),
  ],
  orderings: [{title: "Newest", name: "publishedAtDesc", by: [{field: "publishedAt", direction: "desc"}]}],
  preview: {select: {title: "title", subtitle: "publishedAt", media: "coverImage"}},
});
