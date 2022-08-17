import { LogLevel, LogRecord } from "./logger"
import { Timer } from "./timer"

/**
 * Escape whitespace from HTML string.
 * 
 * @todo Implement this function.
 * 
 * @param str - HTML string to escape.
 * @returns Whitespace safe HTML string.
 */
const escapeWhitespace = (str: string): string => {
    return str
}

/**
 * Convert newline to br element.
 * 
 * @todo Implement this function.
 * 
 * @param str - HTML string to format.
 * @returns Formated safe HTML string.
 */
const newLineToBr = (str: string): string => {
    return str
}

/**
 * Escape HTML string and make it safer.
 * 
 * @todo Implement this function.
 * 
 * @param str - HTML string to format.
 * @returns Safe HTML string.
 */
const htmlEscape = (str: string): string => {
    return str
}

export interface IFormatterConfig {
    /** Classname for infomational log level message. */
    info?: string,
    /** Classname for error log level message. */
    error?: string,
    /** Classname for warning log level message. */
    warning?: string,
    /** Classname for debug log level message. */
    debug?: string,
    /** Classname for the message container. */
    logRecordContainer?: string,
    /** Classname for the message timestamp. */
    logRecordTimestamp?: string,
    /** Classname for the message name. */
    logRecordName?: string,
    /** Classname for the message log level. */
    logRecordLevel?: string,
    /** Classname for the message string. */
    logRecordMessage: string,
    /** Custom label to prefix to message classnames. */
    prefix?: string,
    /** Whether to show the timestamp of when the message logged. */
    showAbsoluteTime?: boolean,
    /** Whether to show the timestamp relative to the logger. */
    showRelativeTime?: boolean,
    /** Whether to show the logger name. */
    showLoggerName?: boolean,
    /** Whether to show the message log level. */
    showSeverityLevel?: boolean  
}

export interface IFormatter {
    getDateTimeStamp(logRecord: LogRecord): string
    getRelativeTimestamp(logRecord: LogRecord, timestamp: number): string
    format(logRecord: LogRecord): string
    formatAsHtml(logRecord: LogRecord): HTMLElement
}

/** Class representing formatter. */
export class Formatter {
    /**
     * @private
     */
    #timer: Timer
    /**
     * Whether to show the timestamp of when the message logged.
     * 
     * @private
     */
    #showAbsoluteTime: boolean
    /**
     * Whether to show the timestamp relative to the logger.
     * 
     * @private
     */
    #showRelativeTime: boolean
    /**
     * Whether to show the logger name.
     * 
     * @private
     */
    #showLoggerName: boolean
    /**
     * Whether to show the message log level.
     * 
     * @private
     */
    #showSeverityLevel: boolean
    /**
     * Classname for infomational log level message.
     * 
     * @private
     */
    #info: string
    /**
     * Classname for error log level message.
     * 
     * @private
     */
    #error: string
    /**
     * Classname for warning log level message.
     * 
     * @private
     */
    #warning: string
    /**
     * Classname for debug log level message.
     * 
     * @private
     */
    #debug: string
    /**
     * Classname for the message container.
     * 
     * @private
     */
    #logRecordContainer: string
    /**
     * Classname for the message timestamp.
     * @private
     */
    #logRecordTimestamp: string
    /**
     * Classname for the message name.
     * 
     * @private
     */
    #logRecordName: string
    /**
     * Classname for the message log level.
     * 
     * @private
     */
    #logRecordLevel: string
    /**
     * Classname for the message string.
     * 
     * @private
     */
    #logRecordMessage: string
    /**
     * Custom label to prefix to message classnames.
     * 
     * @private
     */
    #prefix: string

    /**
     * Creates a formatter for loggers.
     * Creates and styles the HTML for the logged messages.
     * 
     * @param config - Configurable options for the formatter.
     */
    constructor(config?: IFormatterConfig) {
        this.#timer = new Timer()
        this.#showAbsoluteTime = config?.showAbsoluteTime || true
        this.#showRelativeTime = config?.showRelativeTime || true
        this.#showLoggerName = config?.showLoggerName || true
        this.#showSeverityLevel = config?.showSeverityLevel || false
        this.#info = config?.info || 'debug-console-log-record--info'
        this.#error = config?.error || 'debug-console-log-record--error'
        this.#warning = config?.warning || 'debug-console-log-record--warning'
        this.#debug = config?.debug || 'debug-console-log-record--debug'
        this.#logRecordContainer = config?.logRecordContainer || 'debug-console-log-record'
        this.#logRecordTimestamp = config?.logRecordTimestamp || 'debug-console-log-record-timestamp'
        this.#logRecordName = config?.logRecordName || 'debug-console-log-record-name'
        this.#logRecordLevel = config?.logRecordLevel || 'debug-console-log-record-level'
        this.#logRecordMessage = config?.logRecordMessage || 'debug-console-log-record-message'
        this.#prefix = config?.prefix || ''
    }

    get timer() {
        return this.#timer
    }
    set timer(timer: Timer) {
        this.#timer = timer
    }

    get showAbsoluteTime() {
        return this.#showAbsoluteTime
    }
    set showAbsoluteTime(show: boolean) {
        this.#showAbsoluteTime = show
    }

    get showRelativeTime() {
        return this.#showRelativeTime
    }
    set showRelativeTime(show: boolean) {
        this.#showRelativeTime = show
    }

    get showLoggerName() {
        return this.#showLoggerName
    }
    set showLoggerName(show: boolean) {
        this.#showLoggerName = show
    }

    get showSeverityLevel() {
        return this.#showSeverityLevel
    }
    set showSeverityLevel(show: boolean) {
        this.#showSeverityLevel = show
    }

    /**
     * Returns all classnames for the formatter.
     * 
     * @returns A dictionary of all classnames.
     */
    get css() {
        return {
            info: this.#info,
            error: this.#error,
            warning: this.#warning,
            debug: this.#debug,
            logRecordContainer: this.#logRecordContainer,
            logRecordTimestamp: this.#logRecordTimestamp,
            logRecordName: this.#logRecordName,
            logRecordLevel: this.#logRecordLevel,
            prefix: this.#prefix
        }
    }

    /**
     * Formats log record timestamp.
     * 
     * @param logRecord - Log record to use for timestamp format. 
     * @returns Log record formatted timestamp.
     */
    getDateTimeStamp(logRecord: LogRecord): string {
        const time = new Date(logRecord.timestamp)
        const date = `${(time.getMonth() + 1)}/${time.getDate()}/${(time.getFullYear() - 2000)}`

        return `${date} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${Math.floor(time.getMilliseconds() / 10)}`
    }

    /**
     * Formats log record relative timestamp.
     * 
     * @param logRecord - Log record to use for timestamp format.
     * @param timestamp - Initial timestamp to reference.
     * @returns Log record formatted relative timestamp.
     */
    getRelativeTimestamp(logRecord: LogRecord, timestamp: number): string {
        const ms = logRecord.timestamp - timestamp
        let sec = ms / 1000
        const str = sec.toFixed(3)
      
        let spacesToPrepend = 0

        if (sec < 1) {
          spacesToPrepend = 2
        } else {
          while (sec < 100) {
            spacesToPrepend++
            sec *= 10
          }
        }

        while (spacesToPrepend-- > 0) {
          str.padStart(str.length+1, ' ')
        }

        return `${str} s`
    }

    /**
     * Returns formatted log record HTML string.
     * 
     * @param logRecord - Log record to use for HTML data.
     * @returns Formatted log record HTML string
     */
    format(logRecord: LogRecord): string {
        return this.formatAsHtml(logRecord).outerHTML
    }

    /**
     * Create HTML for log record.
     * 
     * @param logRecord - Log record to use for HTML data.
     * @returns Formatted log record HTMLElement
     */
    formatAsHtml(logRecord: LogRecord): HTMLElement {
        if (!logRecord) {
            return document.createElement('div')
        }
        const classNames = this.css

        let className
        switch (logRecord.level) {
            case LogLevel.Error:
                className = classNames.error
                break
            case LogLevel.Warning:
                className = classNames.warning
                break
            case LogLevel.Info:
                className = classNames.info
                break
            case LogLevel.Debug:
                className = classNames.debug
            default:
                className = classNames.debug
                break
        }
    
        // HTML for user defined prefix, time, logger name, and severity.
        const html = document.createElement('div')
        if (this.showAbsoluteTime) {
            const timestamp = document.createElement('span')
            timestamp.classList.add(this.#logRecordTimestamp)
            timestamp.innerText = this.getDateTimeStamp(logRecord)
            html.append(timestamp)
        }

        if (this.showRelativeTime) {
            const relativeTime = document.createElement('span')
            relativeTime.classList.add(this.#logRecordTimestamp)
            relativeTime.innerText = this.getRelativeTimestamp(logRecord, this.#timer.timestamp)
            html.append(relativeTime)
        }

        if (this.showLoggerName) {
            const loggerName = document.createElement('span')
            loggerName.classList.add(this.#logRecordName)
            loggerName.innerText = logRecord.name
            html.append(loggerName)
        }

        if (this.showSeverityLevel) {
            const loggerLevel = document.createElement('span')
            loggerLevel.classList.add(this.#logRecordLevel)
            loggerLevel.innerText = LogLevel[logRecord.level]
            html.append(loggerLevel)
        }

        const logRecordHtml = htmlEscape(logRecord.message)
        const recordHTML = document.createElement('span')
        recordHTML.classList.add(this.#logRecordMessage)
        recordHTML.append(logRecordHtml)
    
        // Combine both pieces of HTML and, if needed, append a final newline.
        html.append(recordHTML, document.createElement('br'))
        html.classList.add(this.css.logRecordContainer, className)

        return html
    }
}

export default {
    escapeWhitespace,
    newLineToBr,
    htmlEscape
}