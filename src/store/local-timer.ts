import { reactive, watch } from 'vue'
import type { ITimer } from '@/core/models'
import { loadTimer, removeTimer, saveTimer } from '@/helpers/storage'
import { notify } from '@/helpers/notify'

const defaultTimer: ITimer = {
  status: 'init',
  timeLeft: 0,
  minutes: 30, // Recommended – 30
  breakMinutes: 5, // Recommended – 5
  longBreakMinutes: 25, // Recommended – 25
  currentLoop: 1,
  loops: 4,
  autoResume: false
}

const saved = loadTimer()

const now = Date.now()

if (saved?.status === 'live' && saved.startedAt && saved.duration) {
  const elapsed = Math.floor((now - saved.startedAt) / 1000)
  const timeLeft = saved.duration - elapsed

  saved.timeLeft = Math.max(timeLeft, 0)

  if (saved.timeLeft === 0) {
    saved.status = 'paused'
    saved.startedAt = undefined
  }
}

const timer = reactive<ITimer>(
  saved ?? {
    ...defaultTimer
  }
)

let countdownInterval: NodeJS.Timeout

const computeTimeLeft = () => {
  if (!timer.startedAt || !timer.duration) {
    return 0
  }

  const elapsed = Math.floor((Date.now() - timer.startedAt) / 1000)

  return Math.max(timer.duration - elapsed, 0)
}

const startTimer = () => {
  clearInterval(countdownInterval)

  if (timer.timeLeft === 0) {
    timer.timeLeft = timer.minutes * 60
  }

  timer.duration = timer.timeLeft
  timer.startedAt = Date.now()
  timer.status = 'live'

  countdownInterval = setInterval(() => {
    const timeLeft = computeTimeLeft()

    timer.timeLeft = timeLeft

    if (timeLeft <= 0) {
      clearInterval(countdownInterval)

      setTimeout(() => {
        const isLast = timer.currentLoop === timer.loops

        notify(
          timer.currentLoop === timer.loops - 1
            ? 'Focus session complete! Time for a long break 🎉'
            : timer.currentLoop % 2 === 0
              ? 'Break is over! Time to focus 🧠'
              : 'Focus session complete! Take a short break ☕'
        )

        if (isLast) {
          timer.currentLoop = 1
          timer.status = 'paused'
          timer.startedAt = undefined
          timer.timeLeft = timer.minutes * 60
        } else {
          nextRound()
        }
      }, 1000)
    }
  }, 1000)
}

const toggleTimerStatus = () => {
  if (timer.status === 'live') {
    clearInterval(countdownInterval)
    timer.timeLeft = computeTimeLeft()
    timer.status = 'paused'
    timer.startedAt = undefined
  } else {
    startTimer()
  }
}

const resetTimer = () => {
  clearInterval(countdownInterval)

  Object.assign(timer, {
    ...defaultTimer,
    timeLeft: defaultTimer.minutes * 60
  })

  removeTimer()
}

const nextRound = () => {
  clearInterval(countdownInterval)

  const isLastRound = timer.currentLoop === timer.loops

  if (isLastRound) {
    Object.assign(timer, {
      ...defaultTimer,
      timeLeft: timer.minutes * 60,
      minutes: timer.minutes,
      breakMinutes: timer.breakMinutes,
      longBreakMinutes: timer.longBreakMinutes,
      autoResume: timer.autoResume,
      status: timer.autoResume ? 'live' : 'paused'
    })

    if (timer.status === 'live') {
      startTimer()
    }

    return
  }

  timer.currentLoop++

  const isEven = timer.currentLoop % 2 === 0
  const isLongBreak = timer.currentLoop === timer.loops

  if (isEven) {
    timer.timeLeft = isLongBreak ? timer.longBreakMinutes * 60 : timer.breakMinutes * 60
  } else {
    timer.timeLeft = timer.minutes * 60
  }

  timer.status = timer.autoResume ? 'live' : 'paused'
  timer.startedAt = undefined
  timer.duration = undefined

  if (timer.status === 'live') {
    startTimer()
  }
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
