import { Timer } from '../../lib/timer'

describe('Timer', () => {
  test('constructor', () => {
    const timer = new Timer()

    expect(timer).toBeDefined()
    expect(timer).toBeInstanceOf(Timer)
  })

  test('getters', () => {
    const timer = new Timer()

    expect(timer.timestamp).toBeDefined()
    expect(typeof timer.timestamp).toEqual('number')
  })

  test('setters', () => {
    const timer = new Timer()
    const tempDate = Date.now()
    timer.timestamp = tempDate

    expect(timer.timestamp).toBe(tempDate)
    expect(timer.timestamp).toEqual(tempDate)
  })

  test('reset', () => {
    const timer = new Timer()
    const oldTimestamp = timer.timestamp

    timer.reset()

    expect(timer.timestamp).toBeGreaterThanOrEqual(oldTimestamp)
  })
})
