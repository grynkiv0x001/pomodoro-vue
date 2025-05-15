<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'

import Dots from '@/assets/icons/dots-three-outline-fill.svg'
import Play from '@/assets/icons/play-fill.svg'
import Pause from '@/assets/icons/pause-fill.svg'
import FastForward from '@/assets/icons/fast-forward-fill.svg'
import Brain from '@/assets/icons/brain-fill.svg'
import Coffee from '@/assets/icons/coffee.svg'

import { formatTime } from '@/helpers'
import { useLocalTimer } from '@/store/local-timer'
import { ui } from '@/store/ui'

import { GeneralButton } from '@/components/shared'

const STATE = {
  work: 'Focus',
  short: 'Short Break',
  long: 'Long Break'
}

const { timer, toggleTimerStatus, resetTimer, nextRound } = useLocalTimer()

const timerState = computed(() => {
  return timer.currentLoop === timer.loops ? 'long' : timer.currentLoop % 2 === 0 ? 'short' : 'work'
})

const statusIcon = computed(() => {
  return timer.status === 'live' ? Pause : Play
})

const stateIcon = computed(() => {
  return timerState.value === 'work' ? Brain : Coffee
})

const minutes = computed(() => Math.floor(timer.timeLeft / 60))
const seconds = computed(() => timer.timeLeft % 60)

const handleKeyDown = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement

  const isInteractive =
    ['INPUT', 'TEXTAREA', 'BUTTON'].includes(target.tagName) ||
    target.getAttribute('contenteditable') === 'true'

  if (e.code === 'Space' && !isInteractive) {
    toggleTimerStatus()
  }

  if (e.ctrlKey && e.key === 'l') {
    resetTimer()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="timer">
    <div class="timer__name">
      <component :is="stateIcon" />
      {{ STATE[timerState] }}
    </div>

    <div :class="['timer__time', { 'timer__time--bold': timer.status === 'live' }]">
      <div class="timer__time__minutes">
        {{ formatTime(minutes) }}
      </div>
      <div class="timer__time__seconds">
        {{ formatTime(seconds) }}
      </div>
    </div>

    <div class="timer__controls">
      <GeneralButton variant="secondary" @click="(e) => ui.openModal(e.currentTarget, 'settings')">
        <Dots />
      </GeneralButton>
      <GeneralButton size="lg" @click="toggleTimerStatus">
        <component :is="statusIcon" />
      </GeneralButton>
      <GeneralButton variant="secondary" @click="nextRound">
        <FastForward />
      </GeneralButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__name {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 12px;
    background-color: var(--clr-red-100);
    border: 2px solid var(--clr-red-800);
    border-radius: 32px;

    font-size: 18px;
    font-weight: bold;
  }

  &__time {
    font-size: 256px;
    transition: font-weight 0.3s ease;

    &--bold {
      font-weight: bold;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
