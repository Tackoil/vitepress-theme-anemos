import { createContentLoader } from "vitepress";
import type { ContentData } from "vitepress";
import type { AnemosPost } from "../types/index.js";

const EXCLUDED_PATHS = new Set(["/", "/about", "/links", "/404"]);

function normalizeUrl(url: string): string {
  if (url.endsWith(".html")) {
    return url.slice(0, -5) || "/";
  }

  if (url !== "/" && url.endsWith("/")) {
    return url.slice(0, -1);
  }

  return url || "/";
}

function toTimestamp(value: unknown): number {
  if (!value) {
    return 0;
  }

  const timestamp = new Date(String(value)).valueOf();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function toPost(item: ContentData): AnemosPost | null {
  const path = normalizeUrl(item.url);
  const title = String(item.frontmatter.title ?? "").trim();
  const description = String(item.frontmatter.description ?? "").trim();

  if (
    EXCLUDED_PATHS.has(path) ||
    item.frontmatter.hide ||
    !title ||
    !description
  ) {
    return null;
  }

  return {
    path,
    title,
    frontmatter: item.frontmatter,
  };
}

export function createAnemosPostLoader(pattern = ["**/*.md", "!README.md"]): {
  watch: string | string[];
  load: () => Promise<AnemosPost[]>;
} {
  return createContentLoader(pattern, {
    excerpt: false,
    transform(rawPosts) {
      return rawPosts
        .map(toPost)
        .filter((item): item is AnemosPost => item !== null)
        .sort(
          (a, b) =>
            toTimestamp(b.frontmatter.date) - toTimestamp(a.frontmatter.date)
        );
    },
  });
}
