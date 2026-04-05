<script setup lang="ts">
import PostCard from "../components/PostCard.vue";
import type { AnemosPost } from "../../types/index.js";

defineProps<{
  posts: AnemosPost[];
}>();
</script>

<template>
  <div class="home-page">
    <PostCard v-for="post in posts" :key="post.path" :data="post"></PostCard>
  </div>
</template>

<style lang="scss" scoped></style>
