import {defineArrayMember, defineField, defineType} from "sanity";

export const pageType = defineType({
  name: "page", title: "Pages", type: "document",
  groups: [{name:"content",title:"Content",default:true},{name:"seo",title:"SEO"}],
  fields: [
    defineField({name:"title",title:"Page title",type:"string",group:"content",validation:r=>r.required()}),
    defineField({name:"slug",title:"URL slug",type:"slug",group:"content",options:{source:"title"},validation:r=>r.required()}),
    defineField({name:"eyebrow",title:"Small heading",type:"string",group:"content"}),
    defineField({name:"intro",title:"Introduction",type:"text",rows:3,group:"content"}),
    defineField({name:"heroImage",title:"Hero image",type:"image",options:{hotspot:true},group:"content"}),
    defineField({name:"body",title:"Page content",type:"array",group:"content",of:[
      defineArrayMember({type:"block",styles:[{title:"Normal",value:"normal"},{title:"Heading 2",value:"h2"},{title:"Heading 3",value:"h3"}],lists:[{title:"Bullets",value:"bullet"},{title:"Numbered",value:"number"}],marks:{annotations:[{name:"link",type:"object",title:"Link",fields:[{name:"href",type:"url",title:"URL"}]}]}}),
      defineArrayMember({type:"image",options:{hotspot:true},fields:[{name:"alt",title:"Alternative text",type:"string"}]}),
      defineArrayMember({name:"infoBox",title:"Information box",type:"object",fields:[{name:"title",title:"Title",type:"string"},{name:"text",title:"Text",type:"text"},{name:"tone",title:"Tone",type:"string",options:{list:["Helpful","Important","Tip"]}}]}),
    ]}),
    defineField({name:"seoTitle",title:"SEO title",type:"string",group:"seo",validation:r=>r.max(60)}),
    defineField({name:"seoDescription",title:"SEO description",type:"text",rows:3,group:"seo",validation:r=>r.max(160)}),
  ],
  preview:{select:{title:"title",subtitle:"slug.current",media:"heroImage"}},
});
