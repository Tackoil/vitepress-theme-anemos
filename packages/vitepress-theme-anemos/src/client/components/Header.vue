<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from "vue";
import { useData, useRoute, useRouter } from "vitepress";
import type { AnemosConfig } from "../../types/index.js";
import { useBreakpoints } from "../utils/hooks/media.js";
import { globalStateKey } from "./Keys.js";
import ShrinkTransition from "./Transitions/ShrinkTransition.vue";

const router = useRouter();
const route = useRoute();
const { site, theme } = useData<AnemosConfig>();

const globalState = inject(globalStateKey, {
  scrollTop: 0,
  onBottom: false,
  pageOffset: 0,
});

const { type } = useBreakpoints();
const windowHeight = ref(0);

function updateWindowHeight(): void {
  windowHeight.value = window.innerHeight;
}

onMounted(() => {
  updateWindowHeight();
  window.addEventListener("resize", updateWindowHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowHeight);
});

const shrinkProgress = computed(() => {
  const maxScroll = 120;
  const progress = (globalState.scrollTop ?? 0) / maxScroll;
  return Math.min(Math.max(progress, 0), 1);
});

const showSolidBackground = computed(() => {
  const heroBoundary =
    windowHeight.value * (1 - (globalState.pageOffset ?? 0) / 100) - 40;
  return (globalState.scrollTop ?? 0) >= Math.max(heroBoundary, 0);
});

const navBarStyle = computed(() => {
  const easedProgress = 1 - (1 - shrinkProgress.value) ** 3;
  const height = 55 - easedProgress * 15;

  return {
    height: `${height}px`,
    paddingTop: `${5 - easedProgress * 2}px`,
    paddingBottom: `${5 - easedProgress * 2}px`,
  };
});

function jumpTo(url: string): void {
  router.go(url);
}
</script>

<template>
  <header
    class="nav-bar"
    :class="{ 'nav-bar--solid': showSolidBackground }"
    :style="navBarStyle"
  >
    <div class="nav-bar-container">
      <span class="nav-bar__title">{{ site.title }}</span>
      <div class="button-group">
        <button
          v-for="item in theme.navs"
          :key="item.path"
          class="button-group__button"
          :class="
            route.path === item.path || route.path === `${item.path}.html`
              ? 'button-group__button--active'
              : ''
          "
          @click="jumpTo(item.path)"
        >
          <i :class="`iconfont ${item.icon}`" />
          <ShrinkTransition :width="40" :vif="type !== 'xs'">
            <span>{{ item.name }}</span>
          </ShrinkTransition>
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.nav-bar {
  position: fixed;
  z-index: 300;
  height: 55px;
  width: 100%;
  padding: 5px 10px;
  color: var(--text-white);
  background-color: transparent;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  transition:
    height 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    padding 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.3s ease,
    backdrop-filter 0.3s ease,
    box-shadow 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0)
    );
    transition: opacity 0.3s ease;
  }

  .nav-bar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1140px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    .nav-bar__title {
      line-height: 40px;
      font-size: 20px;
      font-weight: bold;
    }
  }
}

.button-group {
  display: flex;

  .button-group__button {
    position: relative;
    height: 40px;
    color: inherit;
    display: flex;
    align-items: center;
    margin-right: 8px;
    padding: 0 4px;

    &::after {
      content: "";
      position: absolute;
      right: 4px;
      bottom: 0;
      left: 4px;
      height: 2px;
      background-color: currentColor;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .iconfont {
      font-size: 20px;
      margin: 0 4px;
    }
  }

  .button-group__button--active {
    &::after {
      opacity: 1;
    }
  }
}

.nav-bar--solid {
  background-color: var(--main-color);
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  -webkit-box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%),
    0 2px 10px 0 rgb(0 0 0 / 12%);

  &::before {
    opacity: 0;
  }
}
</style>
