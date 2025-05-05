<script setup lang="ts">
import Timer from '@/views/timer/Timer.vue'
import { useLocalTimer } from '@/store/local-timer'

const { timer, toggleTimerStatus } = useLocalTimer()
</script>

<template>
  <div class="app">
    <Timer :timer="timer" :toggleTimerStatus="toggleTimerStatus" />
  </div>
</template>

<style lang="scss" scoped>
.app {
  height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--clr-red-50);
  color: var(--clr-red-900);
}
</style>
