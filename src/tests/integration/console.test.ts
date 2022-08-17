import { DebugConsole, debug, subscribe } from '../..'
import { LogRecord } from '../../lib/logger'

const elId = 'test-body'
const elCont = `<div id="${elId}"></div>`.toString()

describe('debug-console', () => {
  beforeEach(() => {
    document.body.innerHTML = elCont
  })

  test('constructor', () => {
    const el = document.getElementById(elId)
    const console = new DebugConsole({ mountTo: el })

    expect(console).toBeDefined()
    expect(console).toBeInstanceOf(DebugConsole)
  })

  test('open method', () => {
    const el = document.getElementById(elId)
    const debugConsole = new DebugConsole({ mountTo: el })

    debugConsole.open()

    const logHeader = document.getElementById(debugConsole.headerId)
    const logBody = document.getElementById(debugConsole.logId)
    const logFooter = document.getElementById(debugConsole.footerId)

    expect(logHeader).not.toBeNull()
    expect(logBody).not.toBeNull()
    expect(logFooter).not.toBeNull()
  })

  test('observer-pattern', () => {
    const el = document.getElementById(elId)
    const debugConsole = new DebugConsole({ mountTo: el })

    debugConsole.open()

    const logBody = document.getElementById(debugConsole.logId)

    subscribe('testLogger', (record: LogRecord) => debugConsole.log(record))
    debug('testLogger', 'test debug message')

    expect(logBody?.hasChildNodes()).toEqual(true)
    expect(logBody?.children.length).toEqual(1)
    expect(logBody?.childNodes.length).toEqual(1)
  })
})
