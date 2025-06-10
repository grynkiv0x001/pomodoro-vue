import { useSettings } from '@/store/settings'

export const notify = (title: string) => {
  const { settings } = useSettings()

  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
  } else if (Notification.permission === 'granted' && settings.notifications) {
    new Notification(title, {})
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted' && settings.notifications) {
        new Notification(title, {})
      }
    })
  }
}
