<script setup lang="ts">
import { computed } from "vue";
import { Content, useData } from "vitepress";

const { page, frontmatter } = useData();
const postTitle = computed(
  () =>
    (typeof frontmatter.value.title === "string" && frontmatter.value.title) ||
    page.value.title
);
</script>

<template>
  <div class="post-title">{{ postTitle }}</div>
  <Content class="markdown-body markdown-body--indent vp-doc"></Content>
</template>

<style src="../assets/css/github_markdown.css"></style>

<style lang="scss">
@use "../assets/css/markdown.scss";
@use "../assets/css/code.scss";

.post-title {
  font-size: 12px;
  text-align: center;
  color: var(--line-dim-color);
  border-bottom: 1px solid var(--line-dim-color);
  margin-top: -36px;
}
</style>
