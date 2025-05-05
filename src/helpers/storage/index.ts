import type { ITimer } from '@/core/models'

export const loadTimer = (): ITimer | null => {
  const timer = localStorage.getItem('pomodoro-timer')
  return timer ? JSON.parse(timer) : null
}

export const saveTimer = (timer: ITimer) => {
  localStorage.setItem('pomodoro-timer', JSON.stringify(timer))
}
