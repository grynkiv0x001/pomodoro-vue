import { reactive, watch } from 'vue'
import type { ISettings } from '@/core/models'
import { loadSettings, removeSettings, saveSettings } from '@/helpers/storage'

const defaultSettings: ISettings = {
  notifications: true // Just for comfort. Permission is still asked by browser.
}

const saved = loadSettings()

const settings = reactive<ISettings>(
  saved ?? {
    ...defaultSettings
  }
)

const resetSettings = () => {
  Object.assign(settings, {
    ...defaultSettings
  })

  removeSettings()
}

watch(
  settings,
  () => {
    saveSettings({ ...settings })
  },
  { deep: true }
)

export function useSettings() {
  return {
    settings,
    resetSettings
  }
}
