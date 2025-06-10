import { reactive } from 'vue'
import type { IUi, ModalVariant } from '@/core/models'

export const ui: IUi = reactive({
  // Fields
  isModalOpen: false as boolean,
  modal: undefined as ModalVariant | undefined,
  modalRef: null as HTMLElement | null,
  position: {
    top: 0,
    left: 0
  },

  // Methods
  openModal(ref, variant) {
    if (!ref) {
      return
    }

    const rect = ref.getBoundingClientRect()

    this.position = {
      top: rect.bottom,
      left: rect.left
    }
    this.modal = variant
    this.modalRef = ref
    this.isModalOpen = true
  },

  closeModal() {
    this.isModalOpen = false
  }
})
