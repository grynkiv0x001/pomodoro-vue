import { describe, test, expect } from 'vitest'

import { formatTime } from './formatTime'

describe('format time', () => {
  test('zero (0) should return "00"', () => {
    expect(formatTime(0)).toBe('00')
  })

  test('single digit should start with zero (0)', () => {
    expect(formatTime(9)).toBe('09')
  })

  test('should only affect numbers that are less than 10', () => {
    expect(formatTime(10)).toBe('10')
  })

  test('should return negative numbers as is (but string)', () => {
    expect(formatTime(-1)).toBe('-1')
  })
})
