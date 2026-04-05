<script setup lang="ts">
import { inject } from "vue";
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

function jumpTo(url: string): void {
  router.go(url);
}
</script>

<template>
  <header
    class="nav-bar"
    :class="globalState.scrollTop !== 0 ? 'nav-bar--scroll' : ''"
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
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
  display: flex;
  align-items: center;
  transition: all 0.7s;

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

.nav-bar--scroll {
  height: 40px;
  background: var(--main-color);
  opacity: 0.9;
  backdrop-filter: blur(2px);
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  -webkit-box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%),
    0 2px 10px 0 rgb(0 0 0 / 12%);
}
</style>
