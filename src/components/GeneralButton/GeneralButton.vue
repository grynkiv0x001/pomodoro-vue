<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    color?: 'red' | 'green' | 'blue'
    size?: 'lg' | 'md' | 'sm'
    theme?: 'light' | 'dark'
  }>(),
  {
    variant: 'primary',
    color: 'red',
    size: 'md',
    theme: 'light'
  }
)
</script>

<template>
  <button
    class="button"
    :class="[
      `variant--${props.variant}`,
      `color--${props.color}`,
      `size--${props.size}`,
      `theme--${props.theme}`
    ]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.size {
  &--lg {
    padding: 32px 48px;
    border-radius: 32px;
  }

  &--md {
    padding: 24px;
    width: 80px;
    height: 80px;
    border-radius: 24px;
  }

  &--sm {
    padding: 8px;
    border-radius: 8px;
  }
}

.color {
  &--red {
    background-color: var(--clr-red-alpha-700);

    &:hover {
      background-color: var(--clr-red-alpha-800);
    }
  }

  &--green {
    background-color: var(--clr-green-alpha-600);

    &:hover {
      background-color: var(--clr-green-alpha-700);
    }
  }

  &--blue {
    background-color: var(--clr-blue-alpha-600);

    &:hover {
      background-color: var(--clr-blue-alpha-700);
    }
  }
}

.theme {
  &--light {
    ::v-deep svg {
      opacity: 0.8;

      path {
        fill: var(--clr-black);
      }
    }
  }

  &--dark {
    ::v-deep svg {
      opacity: 0.8;

      path {
        fill: var(--clr-white);
      }
    }
  }
}
</style>
