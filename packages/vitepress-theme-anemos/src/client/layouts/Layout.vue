<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { computed } from "vue";
import type { AnemosPost } from "../../types/index.js";
import Common from "../components/Common.vue";
import { normalizeInternalPath } from "../utils/path.js";
import HomePage from "./HomePage.vue";
import LinksPage from "./LinksPage.vue";
import NotFound from "./NotFound.vue";
import PostPage from "./PostPage.vue";

const LINKS_PAGE_PATHS = new Set(["/links", "/link"]);
const LINKS_PAGE_FILES = new Set(["links.md", "link.md"]);

defineProps<{
  posts?: AnemosPost[];
}>();

const { page, site } = useData();
const route = useRoute();
const currentPath = computed(() =>
  normalizeInternalPath(route.path, site.value.base)
);

const isHomePage = computed(
  () =>
    currentPath.value === "/" ||
    page.value.relativePath === "README.md" ||
    page.value.relativePath === "index.md"
);
const isLinksPage = computed(
  () =>
    LINKS_PAGE_PATHS.has(currentPath.value) ||
    LINKS_PAGE_FILES.has(page.value.relativePath)
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
