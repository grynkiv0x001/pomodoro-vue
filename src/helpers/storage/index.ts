import type { ISettings, ITimer, StorageItem } from '@/core/models'
import { STORAGE } from '@/core/models'

/* Helpers */
const load = <T>(item: StorageItem): T | null => {
  const data = localStorage.getItem(item)
  return data ? JSON.parse(data) : null
}

const save = <T>(name: StorageItem, item: T): void => {
  localStorage.setItem(name, JSON.stringify(item))
}

const remove = (name: StorageItem): void => {
  localStorage.removeItem(name)
}

/* ------------ */

/* Timer */
export const loadTimer = () => {
  return load<ITimer>(STORAGE.timer)
}

export const saveTimer = (timer: ITimer) => {
  save<ITimer>(STORAGE.timer, timer)
}

export const removeTimer = () => {
  remove(STORAGE.timer)
}

/* Settings */
export const loadSettings = () => {
  return load<ISettings>(STORAGE.settings)
}

export const saveSettings = (settings: ISettings) => {
  save<ISettings>(STORAGE.settings, settings)
}

export const removeSettings = () => {
  remove(STORAGE.settings)
}
