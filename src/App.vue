<script setup lang="ts">
import { GeneralButton } from '@/components/shared'
</script>

<template>
  Hello
  <GeneralButton class="app__button">test</GeneralButton>
  <button>try</button>
</template>

<style lang="scss" scoped>
.app {
  &__button {
    color: white;
    background-color: black;
  }
}
</style>
