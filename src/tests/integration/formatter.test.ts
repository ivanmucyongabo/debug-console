import { Formatter } from '../../lib/formatter'
import { LogLevel, LogRecord } from '../../lib/logger'
import { Timer } from '../../lib/timer'

describe('formatter', () => {
  test('setters', () => {
    const formatter = new Formatter()
    const newTimer = new Timer()

    formatter.timer = newTimer

    expect(formatter.timer.timestamp).toEqual(newTimer.timestamp)
  })

  test('formatAsString', () => {
    const formatter = new Formatter()
    const logRecord = new LogRecord(LogLevel.Debug, 'test log message', 'testLogger')

    const str = formatter.format(logRecord)

    expect(typeof str).toEqual('string')
  })

  test('formatAsHTML', () => {
    const formatter = new Formatter()
    const logRecord = new LogRecord(LogLevel.Debug, 'test log message', 'testLogger')

    const html = formatter.formatAsHtml(logRecord)

    expect(html).toBeInstanceOf(HTMLElement)
  })
})
