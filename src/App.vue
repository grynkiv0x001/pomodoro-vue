<script setup lang="ts">
import { reactive, ref } from 'vue'

import type { ITimer } from '@/core/models'

import Timer from '@/views/timer/Timer.vue'

const timer = reactive<ITimer>({
  status: 'init',
  timeLeft: 0,
  minutes: 1,
  breakMinutes: 5,
  longBreakMinutes: 30,
  currentLoop: 1,
  loops: 4,
  autoResume: false
})

let countdownInterval: number | undefined

if (timer.status === 'init') {
  timer.timeLeft = timer.minutes * 60
}

const startTimer = () => {
  countdownInterval = setInterval(() => {
    if (timer.timeLeft > 0) {
      timer.timeLeft--
    } else {
      clearInterval(countdownInterval)
      timer.status = 'paused'
    }
  }, 1000)
}

const toggleTimerStatus = () => {
  if (timer.status === 'live') {
    clearInterval(countdownInterval)
    timer.status = 'paused'
  } else {
    if (timer.timeLeft === 0) {
      timer.timeLeft = timer.minutes * 60
    }
    timer.status = 'live'
    startTimer()
  }
}
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
}
</style>
