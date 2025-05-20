export const STORAGE = {
  timer: 'pomodoro-timer',
  settings: 'pomodoro-settings'
} as const

export type StorageItem = (typeof STORAGE)[keyof typeof STORAGE]

export interface ITimer {
  status: 'init' | 'paused' | 'live'
  name?: string
  timeLeft: number
  minutes: number
  currentLoop: number
  loops: number
  breakMinutes: number
  longBreakMinutes: number
  autoResume: boolean
  startedAt?: number
  updatedAt?: number
}

export type ModalVariant = 'settings' | 'menu'

export interface IUi {
  isModalOpen: boolean
  modal?: ModalVariant
  modalRef: HTMLElement | null
  position: { top: number; left: number }
  openModal: (ref: HTMLElement | null, variant: ModalVariant) => void
  closeModal: () => void
}

export interface ISettings {
  notifications: boolean
}
