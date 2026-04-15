import footnote from "markdown-it-footnote";
import mark from "markdown-it-mark";
import { fileURLToPath } from "node:url";
import { defineAnemosVitePressConfig } from "vitepress-theme-anemos";
import type { AnemosConfig } from "vitepress-theme-anemos";
import type { UserConfigFn } from "vitepress";

const repoRoot = fileURLToPath(new URL("../../", import.meta.url));
const packageRoot = fileURLToPath(
  new URL("../../packages/vitepress-theme-anemos/", import.meta.url)
);
const packageEntry = fileURLToPath(
  new URL("../../packages/vitepress-theme-anemos/src/index.ts", import.meta.url)
);
const packageClientEntry = fileURLToPath(
  new URL(
    "../../packages/vitepress-theme-anemos/src/client/theme.ts",
    import.meta.url
  )
);

export default (({ command }) =>
  defineAnemosVitePressConfig<AnemosConfig>({
    title: "vitepress-theme-anemos",
    description: "A smooth blog theme for VitePress",
    base: "/",
    vite:
      command === "serve"
        ? {
            resolve: {
              alias: [
                {
                  find: /^vitepress-theme-anemos\/client$/,
                  replacement: packageClientEntry,
                },
                {
                  find: /^vitepress-theme-anemos$/,
                  replacement: packageEntry,
                },
              ],
            },
            server: {
              fs: {
                allow: [repoRoot, packageRoot],
              },
            },
          }
        : undefined,
    themeConfig: {
      navs: [
        { name: "Home", path: "/", icon: "icon-home" },
        { name: "About", path: "/about", icon: "icon-user" },
        { name: "Links", path: "/links", icon: "icon-link" },
      ],
      subtitle: "風のように",
    },
    markdown: {
      lineNumbers: true,
      math: true,
      config(md) {
        md.use(mark);
        md.use(footnote);
      },
    },
    appearance: false,
    cleanUrls: false,
    scrollOffset: 64,
  })) satisfies UserConfigFn<AnemosConfig>;
