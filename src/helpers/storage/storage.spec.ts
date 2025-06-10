import { describe, test, expect, beforeEach } from 'vitest'
import { saveTimer, loadTimer, removeTimer } from './index'

import { type ITimer, STORAGE } from '@/core/models'

const mockTimer: ITimer = {
  status: 'init',
  timeLeft: 0,
  minutes: 30,
  breakMinutes: 5,
  longBreakMinutes: 25,
  currentLoop: 1,
  loops: 4,
  autoResume: false
}

describe('timer storage helpers', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('saves & loads timer', () => {
    saveTimer(mockTimer)

    const saved = loadTimer()

    expect(saved).toEqual(mockTimer)
  })

  test('removes timer', () => {
    saveTimer(mockTimer)
    removeTimer()

    expect(localStorage.getItem(STORAGE.timer)).toBeNull()
  })
})
