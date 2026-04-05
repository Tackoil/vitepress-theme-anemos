<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <div class="footer-content">
      Base VitePress by
      <a href="https://github.com/Tackoil/vitepress-theme-anemos">Anemos</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  z-index: 210;
  transition: background-color 0.7s;
}

.footer-content {
  filter: none;
  padding-top: 3rem;
  padding-bottom: 1rem;
  margin: 0 auto;
  max-width: 952px;
  text-align: center;
  color: var(--text-color);

  a {
    color: inherit;
  }
}
</style>
