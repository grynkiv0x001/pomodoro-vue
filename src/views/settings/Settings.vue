<script setup lang="ts">
import { computed } from 'vue'

import { useLocalTimer } from '@/store/local-timer'

import AppModal from '@/components/modal/AppModal.vue'

const { timer } = useLocalTimer()

const focusMinutes = computed({
  get: () => timer.minutes,
  set: (val: number) => {
    if (timer.status !== 'live') {
      timer.timeLeft = val * 60
    }
  }
})

const rounds = computed({
  get: () => timer.loops,
  set: (val: number) => {
    timer.loops = val
  }
})

const short = computed({
  get: () => timer.breakMinutes,
  set: (val: number) => {
    timer.breakMinutes = val
  }
})

const long = computed({
  get: () => timer.longBreakMinutes,
  set: (val: number) => {
    timer.longBreakMinutes = val
  }
})
</script>

<template>
  <AppModal>
    <template #title>
      <h1 class="title">Settings</h1>
    </template>
    <template #body>
      <ul class="list">
        <li class="item">
          <label for="focus">Minutes:</label>
          <input id="focus" type="number" name="focus" v-model="focusMinutes" min="1" />
        </li>
        <li class="item">
          <label for="rounds">Rounds:</label>
          <input id="rounds" type="number" name="rounds" v-model="rounds" min="1" />
        </li>
        <li class="item">
          <label for="short">Short pause:</label>
          <input id="short" type="number" name="short" v-model="short" min="1" />
        </li>
        <li class="item">
          <label for="long">Long pause:</label>
          <input id="long" type="number" name="long" v-model="long" min="1" />
        </li>
      </ul>
    </template>
  </AppModal>
</template>

<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: bold;
}

.list {
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    background: transparent;
    border: 1px solid var(--clr-black-alpha-100);
  }

  input[type='number'] {
    max-width: 96px;
    border-radius: 8px;
    color: var(--clr-black);
    font-size: 16px;
    text-align: center;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      opacity: 1;
    }
  }
}
</style>
