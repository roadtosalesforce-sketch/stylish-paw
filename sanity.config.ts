import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "furry-fairy-pets",
  title: "Furry Fairy Pets",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0w20qxza",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: {types: schemaTypes},
});
