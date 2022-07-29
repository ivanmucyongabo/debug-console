/**
 * @fileoverview Simple logging.
 */

import './css/accordian.css';
import './css/combobox.css';
import './css/console.css';
import './css/counter.css';
import './css/toolbar.css';

import { Formatter } from './lib/formatter';
import { LogBuffer, Logger, LogLevel, LogRecord, LogRegistry, LogRegistryItem } from "./lib/logger";
import { Accordian } from './components/accordian';
import { Button } from './components/button';
import { ComboBox } from './components/combobox';
import { Counter } from './components/counter';
import { DebugConsole } from './components/console';
import {
  ToolBar,
  ToolBarButton,
  ToolBarCounter,
  ToolBarAccordian,
  ToolBarComboBox
} from './components/toolbar';

export const logRegistry = new LogRegistry();
export const logBuffer = new LogBuffer();

const getLogger = (name: string, level?: LogLevel): LogRegistryItem => {
    return logRegistry.getLogger(name, level);
}

const getLoggers = (): LogRegistryItem[] => {
    return logRegistry.getLoggers();
}

const subscribe = (logger: Logger|string, fn: (l: LogRecord) => void): boolean => {
    if (logger) {
        logger = (logger as Logger).name || logger;

        let loggerItem = getLogger(logger as string);
        loggerItem.subscribe(fn);
    }
    return false;
}

const unsubscribe = (logger: Logger|string, fn: any): boolean => {
    if (logger) {
        logger = (logger as Logger).name || logger;

        let loggerItem = getLogger(logger as string);
        loggerItem.unsubscribe(fn);
    }
    return false;
}

const log = (logger: Logger|string, level: LogLevel, msg: string): void => {
    if (logger) {
        logger = (logger as Logger).name || logger;
        level = level || LogLevel.Debug;

        let loggerItem = getLogger(logger as string);

        let logRecord = logBuffer.add(level, msg, logger as string);

        loggerItem.fire(logRecord);
    }
}

const info = (logger: string | Logger, msg: string): void => {
    if (logger) {
        log(logger, LogLevel.Info, msg);
    }
}

const error = (logger: string | Logger, msg: string): void => {
    if (logger) {
        log(logger, LogLevel.Error, msg);
    }
}

const debug = (logger: string | Logger, msg: string): void => {
    if (logger) {
        log(logger, LogLevel.Debug, msg);
    }
}

const warning = (logger: string | Logger, msg: string): void => {
    if (logger) {
        log(logger, LogLevel.Warning, msg);
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
};
