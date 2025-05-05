<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import CloseIcon from '@/assets/icons/x.svg'

import { ui } from '@/store/ui'

const modalStyle = computed(() => ({
  top: `${ui.position.top}px`,
  left: `${ui.position.left}px`
}))

const modalRef = ref<HTMLElement | null>(null)

const handleMouseDown = (e: MouseEvent) => {
  if (modalRef.value && !modalRef.value.contains(e.target as Node)) {
    ui.closeModal()
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.code === 'Escape') {
    ui.closeModal()
    e.stopPropagation()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('mousedown', handleMouseDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('mousedown', handleMouseDown)
})
</script>

<template>
  <Teleport to="body">
    <div class="modal" :style="modalStyle" ref="modalRef">
      <div class="modal__content">
        <header class="modal__header">
          <slot name="title" />
          <button class="modal__close" @click="ui.closeModal">
            <CloseIcon />
          </button>
        </header>
        <main class="modal__main main">
          <slot name="body" />
        </main>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;

  max-width: 700px;
  min-width: 300px;

  display: flex;

  z-index: 10;

  background-color: var(--clr-red-50);
  border-radius: 24px;
  box-shadow:
    0 1px 6px rgba(0, 0, 0, 0.039),
    0 5.5px 16px rgba(0, 0, 0, 0.19);
  color: var(--clr-red-900);

  &__header {
    padding: 24px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__close {
    padding: 0;
    background: transparent;
    border: none;

    &:hover {
      cursor: pointer;
    }
  }

  &__content {
    position: relative;
    width: 100%;
  }
}
</style>
