import { reactive } from 'vue'

export const theme = reactive({
  isDark: false,

  setDarkTheme() {
    this.isDark = true
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  },

  setLightTheme() {
    this.isDark = false
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  },

  toggleTheme() {
    this.isDark ? this.setLightTheme() : this.setDarkTheme()
  },

  initializeTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    this.isDark = prefersDarkScheme
    this.isDark ? this.setDarkTheme() : this.setLightTheme()
  }
})

theme.initializeTheme()
