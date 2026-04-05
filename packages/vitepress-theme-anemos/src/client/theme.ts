import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./layouts/Layout.vue";
import type { AnemosPost } from "../types/index.js";

export function createAnemosTheme({
  posts,
}: {
  posts?: AnemosPost[];
} = {}): Theme {
  return {
    ...DefaultTheme,
    Layout: () => h(Layout, { posts: posts ?? [] }),
  };
}

export default createAnemosTheme;
