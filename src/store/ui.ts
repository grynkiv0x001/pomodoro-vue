import { reactive } from 'vue'

interface IUi {
  isModalOpen: boolean
  modal?: ModalVariant
  position: { top: number; left: number }
  openModal: (ref: HTMLElement | null, variant: ModalVariant) => void
  closeModal: () => void
}

type ModalVariant = 'settings' | 'menu'

export const ui: IUi = reactive({
  // Fields
  isModalOpen: false as boolean,
  modal: undefined as ModalVariant | undefined,
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
    this.isModalOpen = true
  },

  closeModal() {
    this.isModalOpen = false
  }
})
