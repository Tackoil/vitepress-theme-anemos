<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from "vue";
import { globalStateKey } from "./Keys.js";

type Props = {
  src: string;
  title: string;
};
defineProps<Props>();

const globalState = inject(globalStateKey, {
  scrollTop: 0,
  onBottom: false,
  pageOffset: 0,
});

const windowHeight = ref(0);

function updateHeight(): void {
  windowHeight.value = window.innerHeight;
}

onMounted(() => {
  updateHeight();
  window.addEventListener("resize", updateHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateHeight);
});

const blurCount = computed(() => {
  const scrollTop = globalState.scrollTop ?? 0;
  const start = 30;
  const end = windowHeight.value;
  const maxCount = 20;
  if (end <= start || scrollTop < start) {
    return 0;
  } else if (scrollTop > end) {
    return maxCount;
  } else {
    return ((scrollTop - start) / (end - start)) * maxCount;
  }
});

</script>

<template>
  <div ref="headpicContainer" class="head-pic">
    <div class="head-pic__background">
      <div class="head-pic__mask"></div>
      <Transition name="slide">
        <div
          :key="src"
          class="head-pic__pic"
          :style="{
            filter: `blur(${blurCount}px)`,
            backgroundImage: `url(${src})`,
          }"
        />
      </Transition>
    </div>
    <div
      class="head-pic__title"
      :style="{
        transform: `translateX(-50%) translateY(-${globalState.pageOffset / 2}vh)`,
      }"
    >
      {{ title }}
    </div>
  </div>
</template>

<style lang="scss">
.head-pic {
  position: relative;
  z-index: 0;
  isolation: isolate;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  transition: height 0.7s;
}

.head-pic__background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -2;
  pointer-events: none;
}

.head-pic__title {
  position: fixed;
  top: 0;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  max-width: calc(960px - 6rem);
  width: 80%;
  height: 100vh;
  overflow-wrap: break-word;
  transform: translateX(-50%);
  text-align: center;
  color: var(--text-white);
  z-index: 20;
  pointer-events: none;
  transition: transform 0.7s;
}

.head-pic__mask {
  position: absolute;
  inset: 0;
  background-color: var(--pic-mask);
  z-index: 1;
}

.head-pic__pic {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  z-index: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.7s;
}

.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateY(50%);
  opacity: 0;
}

.slide-enter-from {
  transform: translateY(-50%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}
</style>
