<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <button class="button" v-bind="props">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  background-color: var(--clr-red-alpha-700);
}
</style>
