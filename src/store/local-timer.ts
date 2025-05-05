import { reactive, watch, onMounted } from 'vue'
import type { ITimer } from '@/core/models'
import { loadTimer, removeTimer, saveTimer } from '@/helpers/storage'

const defaultTimer: ITimer = {
  status: 'init',
  timeLeft: 0,
  minutes: 1,
  breakMinutes: 5,
  longBreakMinutes: 30,
  currentLoop: 1,
  loops: 4,
  autoResume: false
}

const saved = loadTimer()

if (saved?.status === 'live' && saved.updatedAt) {
  const now = Math.floor(Date.now() / 1000)
  const elapsed = now - saved.updatedAt

  saved.timeLeft = Math.max(saved.timeLeft - elapsed, 0)

  if (saved.timeLeft === 0) {
    saved.status = 'paused'
    saved.startedAt = undefined
  }
}

const timer = reactive<ITimer>(
  saved ?? {
    ...defaultTimer,
    timeLeft: defaultTimer.minutes * 60
  }
)

let countdownInterval: NodeJS.Timeout

const startTimer = () => {
  timer.startedAt = Math.floor(Date.now() / 1000)

  countdownInterval = setInterval(() => {
    if (timer.timeLeft > 0) {
      timer.timeLeft--
      timer.updatedAt = Math.floor(Date.now() / 1000)
    } else {
      clearInterval(countdownInterval)
      timer.status = 'paused'
      timer.startedAt = undefined
      timer.updatedAt = undefined
    }
  }, 1000)
}

const toggleTimerStatus = () => {
  if (timer.status === 'live') {
    clearInterval(countdownInterval)
    timer.status = 'paused'
    timer.startedAt = undefined
  } else {
    if (timer.timeLeft === 0) {
      timer.timeLeft = timer.minutes * 60
    }
    timer.status = 'live'
    startTimer()
  }
}

const resetTimer = () => {
  Object.assign(timer, {
    ...defaultTimer,
    timeLeft: defaultTimer.minutes * 60,
    minutes: 1,
    status: 'init'
  })

  removeTimer()
}

if (timer.status === 'live' && timer.timeLeft > 0) {
  startTimer()
}

watch(
  timer,
  () => {
    saveTimer({ ...timer })
  },
  { deep: true }
)

export function useLocalTimer() {
  return {
    timer,
    toggleTimerStatus,
    resetTimer
  }
}
