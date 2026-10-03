import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes";
import {structure} from "./src/sanity/structure";

export default defineConfig({
  name: "furry-fairy-pets",
  title: "Furry Fairy Pets",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0w20qxza",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool({structure}), ...(process.env.NODE_ENV === "development" ? [visionTool()] : [])],
  schema: {types: schemaTypes},
});
