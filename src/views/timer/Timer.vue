<script setup lang="ts">
import { computed } from 'vue'

import Dots from '@/assets/icons/dots-three-outline-fill.svg'
import Play from '@/assets/icons/play-fill.svg'
import Pause from '@/assets/icons/pause-fill.svg'
import FastForward from '@/assets/icons/fast-forward-fill.svg'

import type { ITimer } from '@/core/models'
import { formatTime } from '@/helpers'
import { GeneralButton } from '@/components/shared'

const props = defineProps<{
  timer: ITimer
  toggleTimerStatus: () => void
}>()

const { timer } = props

const statusIcon = computed(() => {
  if (timer.status === 'init') {
    return Play
  }

  return timer.status === 'paused' ? Play : Pause
})

const minutes = computed(() => Math.floor(timer.timeLeft / 60))
const seconds = computed(() => timer.timeLeft % 60)
</script>

<template>
  <div class="timer">
    <div class="timer__name"></div>

    <div class="timer__time">
      <div class="timer__time__minutes">
        {{ formatTime(minutes) }}
      </div>
      <div class="timer__time__seconds">
        {{ formatTime(seconds) }}
      </div>
    </div>

    <div class="timer__controls">
      <GeneralButton variant="secondary"><Dots /></GeneralButton>
      <GeneralButton size="lg" @click="toggleTimerStatus">
        <component :is="statusIcon" />
      </GeneralButton>
      <GeneralButton variant="secondary"><FastForward /></GeneralButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__time {
    font-size: 256px;

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
