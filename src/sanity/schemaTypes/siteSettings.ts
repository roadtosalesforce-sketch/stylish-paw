import {defineField, defineType} from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Shop settings",
  type: "document",
  groups: [
    {name: "general", title: "General", default: true},
    {name: "commerce", title: "Prices & delivery"},
    {name: "loyalty", title: "Furry Fairy Points"},
    {name: "contact", title: "Contact & social"},
    {name: "seo", title: "Google & SEO"},
    {name: "footer", title: "Footer links"},
  ],
  fields: [
    defineField({name: "shopName", title: "Shop name", type: "string", group: "general", initialValue: "Furry Fairy Pets", validation: (rule) => rule.required()}),
    defineField({name: "announcement", title: "Announcement bar (English)", type: "string", group: "general", description: "The slim message shown at the very top of every page."}),
    defineField({name: "announcementPl", title: "Announcement bar (Polish)", type: "string", group: "general"}),

    defineField({name: "eurRate", title: "EUR exchange rate", type: "number", group: "commerce", initialValue: 0.23, description: "How many EUR equal 1 PLN. Used both on the website and in Stripe checkout.", validation: (rule) => rule.required().positive().max(1)}),
    defineField({name: "shippingNote", title: "Shipping note (English)", type: "text", rows: 3, group: "commerce"}),
    defineField({name: "shippingNotePl", title: "Shipping note (Polish)", type: "text", rows: 3, group: "commerce"}),
    defineField({name: "returnsNote", title: "Returns note (English)", type: "text", rows: 3, group: "commerce"}),
    defineField({name: "returnsNotePl", title: "Returns note (Polish)", type: "text", rows: 3, group: "commerce"}),

    defineField({name: "loyaltyEnabled", title: "Enable Furry Fairy Points", type: "boolean", group: "loyalty", initialValue: true, description: "Paid orders from signed-in customers earn points automatically."}),
    defineField({name: "pointsPerPln", title: "Points earned per 1 PLN", type: "number", group: "loyalty", initialValue: 1, validation: (rule) => rule.required().positive()}),
    defineField({name: "welcomePoints", title: "Points for creating an account", type: "number", group: "loyalty", initialValue: 50, description: "Awarded once after a successful registration. Set to 0 to disable the welcome bonus.", validation: (rule) => rule.required().integer().min(0)}),
    defineField({name: "rewardThreshold", title: "First reward threshold", type: "number", group: "loyalty", initialValue: 500, validation: (rule) => rule.required().integer().positive()}),
    defineField({name: "rewardLabel", title: "Reward description (English)", type: "string", group: "loyalty", description: "Describe the approved benefit. Do not promise a discount amount until the commercial rule is confirmed."}),
    defineField({name: "rewardLabelPl", title: "Reward description (Polish)", type: "string", group: "loyalty"}),

    defineField({name: "contactEmail", title: "Contact email", type: "string", group: "contact"}),
    defineField({name: "supportEmail", title: "Customer support email", type: "string", group: "contact"}),
    defineField({name: "instagram", title: "Instagram URL", type: "url", group: "contact"}),
    defineField({name: "socialLinks", title: "Other social links", type: "array", group: "contact", of: [{type: "object", fields: [{name: "platform", title: "Platform", type: "string", options: {list: ["Instagram", "TikTok", "Facebook", "Pinterest"]}}, {name: "url", title: "URL", type: "url"}]}]}),

    defineField({name: "defaultSeoTitle", title: "Default Google title (English)", type: "string", group: "seo", validation: (rule) => rule.max(60)}),
    defineField({name: "defaultSeoDescription", title: "Default Google description (English)", type: "text", rows: 3, group: "seo", validation: (rule) => rule.max(160)}),
    defineField({name: "defaultSeoTitlePl", title: "Default Google title (Polish)", type: "string", group: "seo", validation: (rule) => rule.max(60)}),
    defineField({name: "defaultSeoDescriptionPl", title: "Default Google description (Polish)", type: "text", rows: 3, group: "seo", validation: (rule) => rule.max(160)}),

    defineField({name: "footerColumns", title: "Footer columns (English)", type: "array", group: "footer", of: [{type: "object", fields: [{name: "title", title: "Column title", type: "string"}, {name: "links", title: "Links", type: "array", of: [{type: "object", fields: [{name: "label", title: "Label", type: "string"}, {name: "href", title: "Link", type: "string"}]}]}]}]}),
    defineField({name: "footerColumnsPl", title: "Footer columns (Polish)", type: "array", group: "footer", of: [{type: "object", fields: [{name: "title", title: "Column title", type: "string"}, {name: "links", title: "Links", type: "array", of: [{type: "object", fields: [{name: "label", title: "Label", type: "string"}, {name: "href", title: "Link", type: "string"}]}]}]}]}),

    // Old fields stay readable, but no longer clutter the editor; Homepage is the single source of truth.
    defineField({name: "heroTitle", title: "Legacy homepage headline", type: "string", hidden: true}),
    defineField({name: "heroText", title: "Legacy homepage introduction", type: "text", hidden: true}),
    defineField({name: "heroImage", title: "Legacy homepage image", type: "image", hidden: true}),
  ],
  preview: {prepare: () => ({title: "Furry Fairy Pets shop settings"})},
});
