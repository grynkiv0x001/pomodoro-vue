import { reactive, watch, onMounted } from 'vue'
import type { ITimer } from '@/core/models'
import { loadTimer, saveTimer } from '@/helpers/storage'

const defaultTimer: ITimer = {
  status: 'init',
  timeLeft: 0,
  minutes: 1,
  breakMinutes: 5,
  longBreakMinutes: 30,
  currentLoop: 1,
  loops: 4,
  autoResume: false,
  startedAt: undefined
}

const saved = loadTimer()

if (saved?.status === 'live' && saved.startedAt) {
  const now = Math.floor(Date.now() / 1000)
  const elapsed = now - saved.startedAt
  saved.timeLeft = Math.max(saved.timeLeft - elapsed, 0)
  if (saved.timeLeft === 0) {
    saved.status = 'paused'
    saved.startedAt = undefined
  }
}

const timer = reactive<ITimer>(saved ?? {
  ...defaultTimer,
  timeLeft: defaultTimer.minutes * 60
})

let countdownInterval: NodeJS.Timeout

const startTimer = () => {
  countdownInterval = setInterval(() => {
    if (timer.timeLeft > 0) {
      timer.timeLeft--
    } else {
      clearInterval(countdownInterval)
      timer.status = 'paused'
      timer.startedAt = undefined
    }
  }, 1000)
}

const toggleTimerStatus = () => {
  if (timer.status === 'live') {
    clearInterval(countdownInterval)
    timer.status = 'paused'
  } else {
    if (timer.timeLeft === 0) {
      timer.timeLeft = timer.minutes * 60
    }
    timer.status = 'live'
    startTimer()
  }
}

watch(timer, () => {
  saveTimer({ ...timer })
}, { deep: true })

onMounted(() => {
  if (timer.status === 'live') startTimer()
})

export function useLocalTimer() {
  return {
    timer,
    toggleTimerStatus
  }
}
