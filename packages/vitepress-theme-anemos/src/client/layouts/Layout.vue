<script setup lang="ts">
import { computed } from "vue";
import { useData, useRoute } from "vitepress";
import Common from "../components/Common.vue";
import HomePage from "./HomePage.vue";
import LinksPage from "./LinksPage.vue";
import NotFound from "./NotFound.vue";
import PostPage from "./PostPage.vue";
import type { AnemosFrontmatter, AnemosPost } from "../../types/index.js";

defineProps<{
  posts?: AnemosPost[];
}>();

const { frontmatter, page } = useData();
const route = useRoute();

function normalizePath(path: string): string {
  if (path.endsWith(".html")) {
    return path.slice(0, -5) || "/";
  }

  if (path !== "/" && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path || "/";
}

const currentPath = computed(() => normalizePath(route.path));

const isHomePage = computed(
  () =>
    currentPath.value === "/" ||
    page.value.relativePath === "README.md" ||
    page.value.relativePath === "index.md"
);
const isLinksPage = computed(
  () =>
    currentPath.value === "/links" ||
    page.value.relativePath === "links.md" ||
    Array.isArray((frontmatter.value as AnemosFrontmatter).links)
);
</script>

<template>
  <NotFound v-if="page.isNotFound" />
  <Common v-else :compact-page-card="!isHomePage && !isLinksPage">
    <template #page>
      <HomePage v-if="isHomePage" :posts="posts ?? []" />
      <LinksPage v-else-if="isLinksPage" />
      <PostPage v-else />
    </template>
  </Common>
</template>

<style lang="scss"></style>
