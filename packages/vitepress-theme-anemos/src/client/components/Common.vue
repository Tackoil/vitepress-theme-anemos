<script setup lang="ts">
import { useData, useRoute, useRouter } from "vitepress";
import { computed, onMounted, provide, reactive, watch } from "vue";
import type { AnemosConfig, AnemosFrontmatter } from "../../types/index.js";
import { onScroll } from "../utils/events.js";
import Header from "./Header.vue";
import HeadPic from "./HeadPic.vue";
import { globalStateKey } from "./Keys.js";
import PageCard from "./PageCard.vue";
import Tail from "./Tail.vue";

defineProps<{
  compactPageCard?: boolean;
}>();

const route = useRoute();
const router = useRouter();
const { frontmatter, page, theme } = useData<AnemosConfig>();

const globalState = reactive({
  scrollTop: 0,
  onBottom: false,
  pageOffset: 0,
});

provide(globalStateKey, globalState);

function isTop(): void {
  globalState.scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
}

onMounted(() => {
  onScroll(isTop);
  isTop();
  setPageOffset();
  router.onAfterRouteChange = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
});

const headpic = computed(() => {
  const pageFrontmatter = frontmatter.value as AnemosFrontmatter;

  if (pageFrontmatter.headpic) {
    return pageFrontmatter.headpic;
  } else if (theme.value.headpic) {
    return theme.value.headpic;
  } else {
    return "https://wonder-egg-priority.com/assets/img/top/main/visual.jpg";
  }
});

const pageTitle = computed(() => {
  if (page.value.title && normalizePath(route.path) !== "/") {
    return page.value.title;
  } else if (theme.value.subtitle) {
    return theme.value.subtitle;
  } else {
    return "";
  }
});

function normalizePath(path: string): string {
  if (path.endsWith(".html")) {
    return path.slice(0, -5) || "/";
  }

  if (path !== "/" && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path || "/";
}

function setPageOffset(): void {
  const currentPath = normalizePath(route.path);

  if (currentPath === "/") {
    globalState.pageOffset = 0;
  } else if (currentPath === "/about") {
    globalState.pageOffset = 40;
  } else {
    globalState.pageOffset = 20;
  }
}

watch(() => route.path, setPageOffset);

// async function setThemeColor() {
//   const color = await colorfulImg(headpic.value);
//   console.log(color);
//   document.body.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
// }
// watch(() => headpic.value, setThemeColor);
</script>

<template>
  <Header />
  <HeadPic ref="headpicRef" :src="headpic" :title="pageTitle" />
  <PageCard :compact="compactPageCard">
    <template #page>
      <slot name="page"> </slot>
    </template>
  </PageCard>
  <Tail />
</template>

<style src="../assets/css/iconfont.css"></style>

<style lang="scss">
@use "../assets/css/global.scss";
@use "../assets/css/variable.scss";

body {
  transition: background-color 0.7s;
  background-color: var(--background-color);
}

:root {
  color-scheme: light;
}
</style>
