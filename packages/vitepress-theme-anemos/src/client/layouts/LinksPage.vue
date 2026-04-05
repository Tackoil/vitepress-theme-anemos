<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import type { AnemosFrontmatter, AnemosLink } from "../../types/index.js";
import alterAvatarUrl from "../assets/img/alter_avatar.jpg";

const { frontmatter } = useData<unknown>();
const links = computed(
  () => ((frontmatter.value as AnemosFrontmatter).links ?? []) as AnemosLink[]
);

function fallback(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.src = alterAvatarUrl;
  img.onerror = null;
}
</script>

<template>
  <div class="links-container">
    <a
      v-for="link in links"
      :key="link.title"
      class="link-card"
      :href="link.link"
      target="_blank"
      rel="noreferrer"
    >
      <img
        class="link-card__img"
        :src="link.avatar || alterAvatarUrl"
        :alt="link.title"
        @error="fallback"
      />
      <div class="link-card__text">
        <div class="link-card__text__title">
          {{ link.title }}
        </div>
        <div class="link-card__text__intro">
          {{ link.intro }}
        </div>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.links-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.link-card {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 20px 12px;
  border-radius: 0.25rem;
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: var(--background-dim-color);
  }

  &__img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-right: 16px;
    object-fit: cover;
  }

  &__text {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    line-height: 1.5;

    &__title {
      font-weight: bold;
      text-overflow: ellipsis;
      color: var(--text-color);
      overflow: hidden;
    }

    &__intro {
      text-overflow: ellipsis;
      overflow: hidden;
      color: var(--text-dim-color);
      font-size: 0.85rem;
    }
  }
}

@media (max-width: 900px) {
  .links-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .links-container {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
