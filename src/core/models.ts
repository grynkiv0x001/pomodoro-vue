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
}
