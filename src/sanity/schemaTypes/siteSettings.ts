import {defineField, defineType} from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings", title: "Shop Settings", type: "document",
  fields: [
    defineField({name: "shopName", title: "Shop name", type: "string", initialValue: "Furry Fairy Pets", validation: (rule) => rule.required()}),
    defineField({name: "announcement", title: "Announcement bar", type: "string", description: "Example: Free delivery over 200 PLN"}),
    defineField({name: "announcementPl", title: "Announcement bar (Polish)", type: "string"}),
    defineField({name: "heroTitle", title: "Homepage headline", type: "string"}),
    defineField({name: "heroText", title: "Homepage introduction", type: "text", rows: 3}),
    defineField({name: "heroImage", title: "Homepage image", type: "image", options: {hotspot: true}}),
    defineField({name: "contactEmail", title: "Contact email", type: "string"}),
    defineField({name: "instagram", title: "Instagram URL", type: "url"}),
    defineField({name: "shippingNote", title: "Shipping note", type: "text", rows: 3}),
    defineField({name: "shippingNotePl", title: "Shipping note (Polish)", type: "text", rows: 3}),
    defineField({name: "returnsNote", title: "Returns note", type: "text", rows: 3}),
    defineField({name: "returnsNotePl", title: "Returns note (Polish)", type: "text", rows: 3}),
    defineField({name:"supportEmail",title:"Customer support email",type:"string"}),
    defineField({name:"defaultSeoTitle",title:"Default SEO title",type:"string",validation:r=>r.max(60)}),
    defineField({name:"defaultSeoDescription",title:"Default SEO description",type:"text",rows:3,validation:r=>r.max(160)}),
    defineField({name:"defaultSeoTitlePl",title:"Default SEO title (Polish)",type:"string",validation:r=>r.max(60)}),
    defineField({name:"defaultSeoDescriptionPl",title:"Default SEO description (Polish)",type:"text",rows:3,validation:r=>r.max(160)}),
    defineField({name:"socialLinks",title:"Social links",type:"array",of:[{type:"object",fields:[{name:"platform",title:"Platform",type:"string",options:{list:["Instagram","TikTok","Facebook","Pinterest"]}},{name:"url",title:"URL",type:"url"}]}]}),
    defineField({name:"footerColumns",title:"Footer columns",type:"array",of:[{type:"object",fields:[{name:"title",title:"Column title",type:"string"},{name:"links",title:"Links",type:"array",of:[{type:"object",fields:[{name:"label",title:"Label",type:"string"},{name:"href",title:"Link",type:"string"}]}]}]}]}),
    defineField({name:"footerColumnsPl",title:"Footer columns (Polish)",type:"array",of:[{type:"object",fields:[{name:"title",title:"Column title",type:"string"},{name:"links",title:"Links",type:"array",of:[{type:"object",fields:[{name:"label",title:"Label",type:"string"},{name:"href",title:"Link",type:"string"}]}]}]}]}),
  ],
  preview: {prepare: () => ({title: "Furry Fairy Pets shop settings"})},
});
