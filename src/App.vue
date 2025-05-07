<script setup lang="ts">
import { ui } from '@/store/ui'

import Timer from '@/views/timer/Timer.vue'
import Settings from '@/views/settings/Settings.vue'
</script>

<template>
  <div class="app">
    <Timer />
    <Settings v-if="ui.isModalOpen && ui.modal === 'settings'" />
  </div>
</template>

<style lang="scss" scoped>
.app {
  height: 100vh;
  width: 100%;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--clr-red-50);
  color: var(--clr-red-900);
}
</style>
