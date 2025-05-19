import { reactive, watch } from 'vue'
import type { ITimer } from '@/core/models'
import { loadTimer, removeTimer, saveTimer } from '@/helpers/storage'
import { notify } from '@/helpers/notify'

const defaultTimer: ITimer = {
  status: 'init',
  timeLeft: 0,
  minutes: 0.1, // Recommended – 30
  breakMinutes: 0.1, // Recommended – 5
  longBreakMinutes: 0.1, // Recommended – 25
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
  clearInterval(countdownInterval)

  timer.startedAt = Math.floor(Date.now() / 1000)

  countdownInterval = setInterval(() => {
    if (timer.timeLeft > 0) {
      timer.timeLeft--
      timer.updatedAt = Math.floor(Date.now() / 1000)
    } else {
      clearInterval(countdownInterval)

      const isLast = timer.currentLoop === timer.loops && timer.timeLeft === 0

      notify(
        timer.currentLoop === timer.loops - 1
          ? 'Focus session complete! Time for a long break 🎉'
          : timer.currentLoop % 2 === 0
            ? 'Break is over! Time to focus 🧠'
            : 'Focus session complete! Take a short break ☕'
      )

      if (isLast) {
        timer.currentLoop = 1
        timer.startedAt = undefined
        timer.updatedAt = undefined
        timer.timeLeft = timer.minutes * 60
        toggleTimerStatus()
      } else {
        nextRound()
      }
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
    status: 'init'
  })

  removeTimer()
}

const nextRound = () => {
  clearInterval(countdownInterval)

  const isLastRound = timer.currentLoop === timer.loops

  if (isLastRound) {
    Object.assign(timer, {
      ...defaultTimer,
      timeLeft: defaultTimer.minutes * 60,
      status: timer.autoResume ? 'live' : 'paused'
    })

    if (timer.status === 'live') {
      startTimer()
    }

    return
  }

  timer.currentLoop++

  const isEven = timer.currentLoop % 2 === 0

  if (isEven) {
    timer.timeLeft = timer.breakMinutes * 60
  } else {
    timer.timeLeft = timer.minutes * 60
  }

  timer.status = timer.autoResume ? 'live' : 'paused'

  if (timer.status === 'live') {
    startTimer()
  }

  timer.startedAt = undefined
  timer.updatedAt = undefined
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
    resetTimer,
    nextRound
  }
}
