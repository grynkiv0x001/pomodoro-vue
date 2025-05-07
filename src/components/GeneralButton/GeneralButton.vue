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

.variant {
  &--primary {
    &.color {
      &--red {
        background-color: var(--clr-red-alpha-700);

        &:hover {
          background-color: var(--clr-red-alpha-800);
        }

        :deep(svg) {
          path {
            fill: var(--clr-red-950);
          }
        }
      }

      &--green {
        background-color: var(--clr-green-alpha-600);

        &:hover {
          background-color: var(--clr-green-alpha-700);
        }

        :deep(svg) {
          path {
            fill: var(--clr-red-950);
          }
        }
      }

      &--blue {
        background-color: var(--clr-blue-alpha-600);

        &:hover {
          background-color: var(--clr-blue-alpha-700);
        }

        :deep(svg) {
          path {
            fill: var(--clr-red-950);
          }
        }
      }
    }
  }

  &--secondary {
    &.color {
      &--red {
        background-color: var(--clr-red-alpha-100);

        &:hover {
          background-color: var(--clr-red-alpha-200);
        }

        :deep(svg) {
          path {
            fill: var(--clr-red-900);
          }
        }
      }

      &--green {
        background-color: var(--clr-green-alpha-100);

        &:hover {
          background-color: var(--clr-green-alpha-200);
        }

        :deep(svg) {
          path {
            fill: var(--clr-green-900);
          }
        }
      }

      &--blue {
        background-color: var(--clr-blue-alpha-100);

        &:hover {
          background-color: var(--clr-blue-alpha-200);
        }

        :deep(svg) {
          path {
            fill: var(--clr-blue-900);
          }
        }
      }
    }
  }
}
</style>
