/**
 * @fileoverview Simple logging.
 */

import { Accordian } from './components/accordian'
import { Button } from './components/button'
import { ComboBox } from './components/combobox'
import { DebugConsole } from './components/console'
import { Counter } from './components/counter'
import {
  ToolBar,
  ToolBarAccordian,
  ToolBarButton,
  ToolBarComboBox,
  ToolBarCounter
} from './components/toolbar'
import './css/accordian.css'
import './css/combobox.css'
import './css/console.css'
import './css/counter.css'
import './css/toolbar.css'
import { Formatter } from './lib/formatter'
import { LogBuffer, LogLevel, LogRecord, LogRegistry, LogRegistryItem, Logger } from "./lib/logger"

export const logRegistry = new LogRegistry()
export const logBuffer = new LogBuffer()

/**
 * Returns an existing logger or creates one.
 * 
 * @param name - The name to use for the logger search or creation.
 * @param level - The log level to use for logger creation.
 * @returns The logger with the provided name and log level.
 */
const getLogger = (name: string, level?: LogLevel): LogRegistryItem => {
    return logRegistry.getLogger(name, level)
}

/**
 * Returns all loggers.
 * 
 * @returns The loggers created.
 */
const getLoggers = (): LogRegistryItem[] => {
    return logRegistry.getLoggers()
}

/**
 * Subscribe a handler to a logger, for logged messages.
 * 
 * @param logger - The logger to subscribe to.
 * @param fn - The handler to call when messages are logged.
 * @returns Boolean whether the handler was subscribe or not.
 */
const subscribe = (logger: Logger|string, fn: (l: LogRecord) => void): boolean => {
    if (logger) {
        logger = (logger as Logger).name || logger

        const loggerItem = getLogger(logger as string)
        loggerItem.subscribe(fn)
    }
    return false
}

/**
 * Unsubscribes a handler from a logger.
 * 
 * @param logger - The logger to subscribe to.
 * @param fn - The handler to call when messages are logged.
 * @returns Boolean whether the handler was unsubscribe or not.
 */
const unsubscribe = (logger: Logger|string, fn: any): boolean => {
    if (logger) {
        logger = (logger as Logger).name || logger

        const loggerItem = getLogger(logger as string)
        loggerItem.unsubscribe(fn)
    }
    return false
}

/**
 * Log a message using a logger.
 * 
 * @remarks
 * Debug is the default logging level.
 * 
 * @param logger - The logger to log to.
 * @param level - The log level to use for the message type.
 * @param msg - The message string to log.
 */
const log = (logger: Logger|string, level: LogLevel, msg: string): void => {
    if (logger) {
        logger = (logger as Logger).name || logger
        level = level || LogLevel.Debug

        const loggerItem = getLogger(logger as string)

        const logRecord = logBuffer.add(level, msg, logger as string)

        loggerItem.fire(logRecord)
    }
}

/**
 * Log an informational level message.
 * 
 * @param logger - The logger to log to.
 * @param msg - The message string to log.
 */
const info = (logger: string | Logger, msg: string): void => {
    if (logger) {
        log(logger, LogLevel.Info, msg)
    }
}

/**
 * Log an error level message
 * 
 * @param logger - The logger to log to.
 * @param msg - The message string to log.
 */
const error = (logger: string | Logger, msg: string): void => {
    if (logger) {
        log(logger, LogLevel.Error, msg)
    }
}

/**
 * Log a debugging level message.
 * 
 * @param logger - The logger to log to.
 * @param msg - The message string to log.
 */
const debug = (logger: string | Logger, msg: string): void => {
    if (logger) {
        log(logger, LogLevel.Debug, msg)
    }
}

/**
 * Log a warning level message.
 * 
 * @param logger - The logger to log to.
 * @param msg - The message string to log.
 */
const warning = (logger: string | Logger, msg: string): void => {
    if (logger) {
        log(logger, LogLevel.Warning, msg)
    }
}

export {
  getLogger,
  getLoggers,
  subscribe,
  unsubscribe,
  log,
  info,
  error,
  debug,
  warning,
  Accordian,
  Button,
  ComboBox,
  Counter,
  DebugConsole,
  Formatter,
  ToolBar,
  ToolBarAccordian,
  ToolBarButton,
  ToolBarComboBox,
  ToolBarCounter,
}
