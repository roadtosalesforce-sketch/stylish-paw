import {defineArrayMember, defineField, defineType} from "sanity";

export const homepageType = defineType({
  name:"homepage",title:"Homepage",type:"document",
  fields:[
    defineField({name:"hero",title:"Hero",type:"object",fields:[
      {name:"eyebrow",title:"Small heading",type:"string"},{name:"title",title:"Headline",type:"string"},{name:"text",title:"Introduction",type:"text"},{name:"image",title:"Main image",type:"image",options:{hotspot:true}},{name:"primaryLabel",title:"Primary button",type:"string"},{name:"primaryLink",title:"Primary link",type:"string"},{name:"secondaryLabel",title:"Secondary button",type:"string"},{name:"secondaryLink",title:"Secondary link",type:"string"},
    ]}),
    defineField({name:"sections",title:"Homepage sections",description:"Drag to change the order of homepage content.",type:"array",of:[
      defineArrayMember({name:"productShelf",title:"Product shelf",type:"object",fields:[{name:"title",title:"Title",type:"string"},{name:"subtitle",title:"Subtitle",type:"string"},{name:"collection",title:"Collection",type:"reference",to:[{type:"collection"}]}]}),
      defineArrayMember({name:"collectionBanner",title:"Collection banner",type:"object",fields:[{name:"eyebrow",title:"Small heading",type:"string"},{name:"title",title:"Title",type:"string"},{name:"text",title:"Text",type:"text"},{name:"image",title:"Image",type:"image",options:{hotspot:true}},{name:"linkLabel",title:"Button label",type:"string"},{name:"collection",title:"Collection",type:"reference",to:[{type:"collection"}]}]}),
      defineArrayMember({name:"trustItemGroup",title:"Trust messages",type:"object",fields:[{name:"items",title:"Messages",type:"array",of:[{type:"object",fields:[{name:"title",type:"string",title:"Title"},{name:"text",type:"string",title:"Text"}]}]}]}),
      defineArrayMember({name:"storyBlock",title:"Brand story",type:"object",fields:[{name:"title",title:"Title",type:"string"},{name:"text",title:"Text",type:"text"},{name:"image",title:"Image",type:"image",options:{hotspot:true}},{name:"linkLabel",title:"Link label",type:"string"}]}),
      defineArrayMember({name:"newsletterBlock",title:"Newsletter",type:"object",fields:[{name:"title",title:"Title",type:"string"},{name:"text",title:"Text",type:"text"},{name:"offer",title:"Offer text",type:"string"}]}),
    ]}),
  ],preview:{prepare:()=>({title:"Furry Fairy Pets homepage"})}
});
