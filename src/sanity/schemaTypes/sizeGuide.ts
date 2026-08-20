import {defineArrayMember, defineField, defineType} from "sanity";

export const sizeGuideType = defineType({
  name: "sizeGuide", title: "Size Guides", type: "document",
  fields: [
    defineField({name: "title", title: "Guide name", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "titlePl", title: "Guide name (Polish)", type: "string"}),
    defineField({name: "instructions", title: "How to measure", type: "text", rows: 4}),
    defineField({name: "instructionsPl", title: "How to measure (Polish)", type: "text", rows: 4}),
    defineField({name: "rows", title: "Measurements", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "size", title: "Size", type: "string", validation: (rule) => rule.required()}), defineField({name: "neck", title: "Neck (cm)", type: "string"}), defineField({name: "chest", title: "Chest (cm)", type: "string"}), defineField({name: "back", title: "Back length (cm)", type: "string"}), defineField({name: "weight", title: "Suggested weight (kg)", type: "string"})], preview: {select: {title: "size", neck: "neck", chest: "chest"}, prepare: ({title, neck, chest}) => ({title, subtitle: `Neck ${neck || "—"} · Chest ${chest || "—"}`})}})]}),
  ],
});
