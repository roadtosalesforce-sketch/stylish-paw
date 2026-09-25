import {defineArrayMember, defineField, defineType} from "sanity";

function heroSlidesField(name: "heroSlides" | "heroSlidesPl", title: string, group: "english" | "polish") {
  return defineField({
    name,
    title,
    description: "Upload your edited banners here, then drag to reorder them. Recommended: desktop 1920×850 px, mobile 900×1200 px.",
    type: "array",
    group,
    validation: (Rule) => Rule.max(6),
    of: [
      defineArrayMember({
        name: "heroSlide",
        title: "Hero slide",
        type: "object",
        initialValue: {active: true, showText: false, textPosition: "left"},
        fields: [
          defineField({name: "active", title: "Visible on the website", type: "boolean", initialValue: true}),
          defineField({name: "image", title: "Desktop banner (recommended 1920×850)", type: "image", options: {hotspot: true}, validation: (Rule) => Rule.required()}),
          defineField({name: "mobileImage", title: "Mobile banner — optional (recommended 900×1200)", description: "If empty, the desktop banner will also be used on phones.", type: "image", options: {hotspot: true}}),
          defineField({name: "imageAlt", title: "Image description (SEO & accessibility)", type: "string", validation: (Rule) => Rule.required()}),
          defineField({name: "showText", title: "Add website text and buttons over the image", type: "boolean", initialValue: false}),
          defineField({name: "eyebrow", title: "Small heading", type: "string", hidden: ({parent}) => parent?.showText !== true}),
          defineField({name: "title", title: "Headline", type: "string", validation: (Rule) => Rule.max(90), hidden: ({parent}) => parent?.showText !== true}),
          defineField({name: "text", title: "Introduction", type: "text", rows: 3, validation: (Rule) => Rule.max(220), hidden: ({parent}) => parent?.showText !== true}),
          defineField({name: "primaryLabel", title: "Primary button", type: "string", hidden: ({parent}) => parent?.showText !== true}),
          defineField({name: "primaryLink", title: "Primary link", type: "string", description: "Example: /shop?category=new", hidden: ({parent}) => parent?.showText !== true}),
          defineField({name: "secondaryLabel", title: "Secondary button", type: "string", hidden: ({parent}) => parent?.showText !== true}),
          defineField({name: "secondaryLink", title: "Secondary link", type: "string", description: "Example: /pages/size-guide", hidden: ({parent}) => parent?.showText !== true}),
          defineField({
            name: "textPosition",
            title: "Text position",
            type: "string",
            initialValue: "left",
            hidden: ({parent}) => parent?.showText !== true,
            options: {layout: "radio", list: [{title: "Left", value: "left"}, {title: "Right", value: "right"}]},
          }),
        ],
        preview: {
          select: {title: "title", subtitle: "imageAlt", media: "image", active: "active"},
          prepare: ({title: slideTitle, subtitle, media, active}) => ({
            title: `${active === false ? "Hidden · " : ""}${slideTitle || "Image-only slide"}`,
            subtitle,
            media,
          }),
        },
      }),
    ],
  });
}

function philosophyField(name: string, title: string, group: "english" | "polish") {
  return defineField({name, title, type: "object", group, fields: [
    defineField({name: "eyebrow", title: "Small heading", type: "string"}),
    defineField({name: "title", title: "Headline", type: "string", validation: (rule) => rule.max(100)}),
    defineField({name: "text", title: "One-sentence brand statement", type: "text", rows: 3, validation: (rule) => rule.max(260)}),
  ]});
}

function instagramField(name: string, title: string, group: "english" | "polish") {
  return defineField({name, title, type: "object", group, fields: [
    defineField({name: "eyebrow", title: "Small heading", type: "string"}),
    defineField({name: "title", title: "Headline", type: "string"}),
    defineField({name: "text", title: "Introduction", type: "text", rows: 3}),
    defineField({name: "profileUrl", title: "Instagram profile URL", type: "url"}),
    defineField({name: "profileLabel", title: "Profile button label", type: "string"}),
    defineField({name: "posts", title: "Featured Instagram posts", description: "Upload up to four approved images and link each one to its Instagram post.", type: "array", validation: (rule) => rule.max(4), of: [defineArrayMember({name: "instagramPost", title: "Instagram post", type: "object", fields: [
      defineField({name: "image", title: "Image", type: "image", options: {hotspot: true}, validation: (rule) => rule.required()}),
      defineField({name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required()}),
      defineField({name: "url", title: "Instagram post URL", type: "url"}),
    ], preview: {select: {title: "alt", media: "image"}}})]}),
  ]});
}

function rewardsField(name: string, title: string, group: "english" | "polish") {
  return defineField({name, title, type: "object", group, fields: [
    defineField({name: "eyebrow", title: "Small heading", type: "string"}),
    defineField({name: "title", title: "Headline", type: "string"}),
    defineField({name: "text", title: "Explanation", type: "text", rows: 4}),
    defineField({name: "buttonLabel", title: "Button label", type: "string"}),
  ]});
}

function promiseField(name: string, title: string, group: "english" | "polish") {
  return defineField({name, title, type: "object", group, fields: [
    defineField({name: "eyebrow", title: "Small heading", type: "string"}),
    defineField({name: "title", title: "Headline", type: "string", validation: (rule) => rule.max(130)}),
    defineField({name: "text", title: "Promise statement", type: "text", rows: 4, validation: (rule) => rule.max(420)}),
  ]});
}

export const homepageType = defineType({
  name:"homepage",title:"Homepage",type:"document",
  groups: [
    {name: "english", title: "English", default: true},
    {name: "polish", title: "Polish / Polski"},
  ],
  fields:[
    heroSlidesField("heroSlides", "Hero carousel", "english"),
    heroSlidesField("heroSlidesPl", "Hero carousel", "polish"),
    defineField({name:"hero",title:"Legacy hero fallback",type:"object",group:"english",hidden:({document})=>Array.isArray(document?.heroSlides) && document.heroSlides.length > 0,fields:[
      {name:"eyebrow",title:"Small heading",type:"string"},{name:"title",title:"Headline",type:"string"},{name:"text",title:"Introduction",type:"text"},{name:"image",title:"Main image",type:"image",options:{hotspot:true}},{name:"primaryLabel",title:"Primary button",type:"string"},{name:"primaryLink",title:"Primary link",type:"string"},{name:"secondaryLabel",title:"Secondary button",type:"string"},{name:"secondaryLink",title:"Secondary link",type:"string"},
    ]}),
    defineField({name:"heroPl",title:"Legacy hero fallback",type:"object",group:"polish",hidden:({document})=>Array.isArray(document?.heroSlidesPl) && document.heroSlidesPl.length > 0,fields:[
      {name:"eyebrow",title:"Small heading",type:"string"},{name:"title",title:"Headline",type:"string"},{name:"text",title:"Introduction",type:"text"},{name:"image",title:"Main image",type:"image",options:{hotspot:true}},{name:"primaryLabel",title:"Primary button",type:"string"},{name:"primaryLink",title:"Primary link",type:"string"},{name:"secondaryLabel",title:"Secondary button",type:"string"},{name:"secondaryLink",title:"Secondary link",type:"string"},
    ]}),
    philosophyField("philosophy", "One-sentence brand purpose", "english"),
    philosophyField("philosophyPl", "One-sentence brand purpose", "polish"),
    promiseField("promise", "Furry Fairy promise", "english"),
    promiseField("promisePl", "Furry Fairy promise", "polish"),
    instagramField("instagram", "Instagram feed", "english"),
    instagramField("instagramPl", "Instagram feed", "polish"),
    rewardsField("rewards", "Furry Fairy Points callout", "english"),
    rewardsField("rewardsPl", "Furry Fairy Points callout", "polish"),
    defineField({name:"sections",title:"Legacy homepage sections",type:"array",hidden:true,group:"english",of:[
      defineArrayMember({name:"productShelf",title:"Product shelf",type:"object",fields:[{name:"title",title:"Title",type:"string"},{name:"subtitle",title:"Subtitle",type:"string"},{name:"collection",title:"Collection",type:"reference",to:[{type:"collection"}]}]}),
      defineArrayMember({name:"collectionBanner",title:"Collection banner",type:"object",fields:[{name:"eyebrow",title:"Small heading",type:"string"},{name:"title",title:"Title",type:"string"},{name:"text",title:"Text",type:"text"},{name:"image",title:"Image",type:"image",options:{hotspot:true}},{name:"linkLabel",title:"Button label",type:"string"},{name:"collection",title:"Collection",type:"reference",to:[{type:"collection"}]}]}),
      defineArrayMember({name:"trustItemGroup",title:"Trust messages",type:"object",fields:[{name:"items",title:"Messages",type:"array",of:[{type:"object",fields:[{name:"title",type:"string",title:"Title"},{name:"text",type:"string",title:"Text"}]}]}]}),
      defineArrayMember({name:"storyBlock",title:"Brand story",type:"object",fields:[{name:"title",title:"Title",type:"string"},{name:"text",title:"Text",type:"text"},{name:"image",title:"Image",type:"image",options:{hotspot:true}},{name:"linkLabel",title:"Link label",type:"string"}]}),
      defineArrayMember({name:"newsletterBlock",title:"Newsletter",type:"object",fields:[{name:"title",title:"Title",type:"string"},{name:"text",title:"Text",type:"text"},{name:"offer",title:"Offer text",type:"string"}]}),
    ]}),
    defineField({name:"sectionsPl",title:"Legacy homepage sections",type:"array",hidden:true,group:"polish",of:[
      defineArrayMember({name:"productShelf",title:"Product shelf",type:"object",fields:[{name:"title",title:"Title",type:"string"},{name:"subtitle",title:"Subtitle",type:"string"},{name:"collection",title:"Collection",type:"reference",to:[{type:"collection"}]}]}),
      defineArrayMember({name:"collectionBanner",title:"Collection banner",type:"object",fields:[{name:"eyebrow",title:"Small heading",type:"string"},{name:"title",title:"Title",type:"string"},{name:"text",title:"Text",type:"text"},{name:"image",title:"Image",type:"image",options:{hotspot:true}},{name:"linkLabel",title:"Button label",type:"string"},{name:"collection",title:"Collection",type:"reference",to:[{type:"collection"}]}]}),
      defineArrayMember({name:"trustItemGroup",title:"Trust messages",type:"object",fields:[{name:"items",title:"Messages",type:"array",of:[{type:"object",fields:[{name:"title",type:"string",title:"Title"},{name:"text",type:"string",title:"Text"}]}]}]}),
      defineArrayMember({name:"storyBlock",title:"Brand story",type:"object",fields:[{name:"title",title:"Title",type:"string"},{name:"text",title:"Text",type:"text"},{name:"image",title:"Image",type:"image",options:{hotspot:true}},{name:"linkLabel",title:"Link label",type:"string"}]}),
      defineArrayMember({name:"newsletterBlock",title:"Newsletter",type:"object",fields:[{name:"title",title:"Title",type:"string"},{name:"text",title:"Text",type:"text"},{name:"offer",title:"Offer text",type:"string"}]}),
    ]}),
  ],preview:{prepare:()=>({title:"Furry Fairy Pets homepage"})}
});
