const ROOT_LOG_NAME = ''
const BUFFER_CAPACITY = 0

/**
 * Enum for log levels.
 * @readonly
 * @enum {number}
 */
export enum LogLevel {
    /** The off option */
    Off,
    /** The debug level */
    Debug,
    /** The informational level */
    Info,
    /** The warning level */
    Warning,
    /** The error level */
    Error
}

/** Class representing log record. */
export class LogRecord {
    #level: LogLevel
    #msg: string
    #name: string
    #timer: number

    /**
     * Create a LogRecord.
     * 
     * @param level - LogLevel to use.
     * @param msg - Message string to log.
     * @param name - Name to use for log record.
     * @param time - Timestamp of log record.
     */
    constructor(level: LogLevel, msg: string, name: string, time?: number) {
        this.#level = level
        this.#msg = msg
        this.#name = name
        this.#timer = time || Date.now()
    }

    get level() {
        return this.#level
    }
    get message() {
        return this.#msg
    }
    get name() {
        return this.#name
    }
    get timestamp() {
        return this.#timer
    }
    set timestamp(time: number) {
        this.#timer = time
    }

    /**
     * Reset log record to new values.
     * 
     * @remarks
     * If no timestamp is provided, Date.now() is the default.
     * 
     * @param level - LogLevel to use.
     * @param msg - Message string to log.
     * @param name - Name to use for log record.
     * @param timestamp - Timestamp of log record.
     */
    reset(level: LogLevel, msg: string, name: string, timestamp?: number) {
        this.#level = level
        this.#msg = msg
        this.#name = name
        this.#timer = timestamp || Date.now()
    }
}

/** Class representing a logger. */
export class Logger {
    #name: string

    /**
     * Create a Logger.
     * 
     * @param name - Name to use the logger.
     */
    constructor(name: string) {
        this.#name = name
    }

    get name() {
        return this.#name
    }
}

/** Class representing a log registry item. */
export class LogRegistryItem {
    #logger: Logger
    #level: LogLevel
    #handlers: ((record: LogRecord) => void)[]

    /**
     * Create a log registry item.
     * 
     * @param name - Log registry item name.
     * @param level - Log level of log registry item.
     */
    constructor(name: string, level?: LogLevel) {
        this.#logger = new Logger(name)
        this.#level = level || LogLevel.Debug
        this.#handlers = []
    }

    get logger(): Logger {
        return this.#logger
    }
    get name(): string {
        return this.#logger.name
    }

    get level(): LogLevel {
        return this.#level
    }
    set level(level: LogLevel) {
        this.#level =  level
    }

    get subscriberCount(): number {
        return this.#handlers.length
    }

    /**
     * Subscribe handler to logger.
     * 
     * @param fn 
     */
    subscribe(fn: (record: LogRecord) => void) {
        this.#handlers.push(fn)
    }

    /**
     * Unsubscribe handler from logger.
     * 
     * @param fn 
     */
    unsubscribe(fn: (record: LogRecord) => void) {
        this.#handlers = this.#handlers.filter(
            (item) => {
                if (item !== fn) {
                    return item
                }
            }
        )
    }

    /**
     * Run all subscribed handlers.
     * 
     * @param record - Log record to publish.
     */
    fire(record: LogRecord) {
        this.#handlers.forEach(handler => {
            handler(record)
        })
    }
}

/** Class representing a registry of log items. */
export class LogRegistry {
    #items: {
        [key: string]: LogRegistryItem
    }

    constructor() {
        this.#items = {}
        this.#items[ROOT_LOG_NAME] = new LogRegistryItem(ROOT_LOG_NAME)
    }

    get itemCount() {
        return Object.values(this.#items).length
    }

    /**
     * Get or create LogRegistryItem by name.
     * 
     * @param name - Name to search for log.
     * @param level - Log level 
     * @returns LogRegistryItem
     */
    getLogger(name: string, level?: LogLevel): LogRegistryItem {
        const item = this.#items[name]
        if (item) {
          if (level !== undefined) {
            item.level = level
          }
          return item
        } else {
          // The logger and its associated registry entry needs to be created.
    
          // Now create the new entry, linking it with its parent.
          const logRegistryEntry = new LogRegistryItem(name)
          this.#items[name] = logRegistryEntry
    
          if (level !== undefined) {
            logRegistryEntry.level = level
          }
    
          return logRegistryEntry
        }
    }

    /**
     * Get all LogRegistryItems.
     * 
     * @returns All LogRegistryItems
     */
    getLoggers(): LogRegistryItem[] {
        return Object.keys(this.#items)
        .map(loggerName => this.#items[loggerName])
    }
}

/** Class representing log buffer. */
export class LogBuffer {
    #capacity: number
    #buffer: LogRecord[]
    #isFull: boolean
    #isBufferingEnabled: boolean
    #currIndex: number

    constructor(capacity?: number) {
        this.#capacity = capacity || BUFFER_CAPACITY
        this.#buffer = new Array(this.#capacity)
        this.#isBufferingEnabled =  this.#buffer.length > 0
        this.#currIndex = -1
        this.#isFull = false
    }

    get capacity() {
        return this.#capacity
    }
    get buffer() {
        return this.#buffer
    }
    get isFull() {
        return this.#isFull
    }
    get isBufferingEnabled() {
        return this.#isBufferingEnabled
    }
    get currIndex() {
        return this.#currIndex
    }

    add(level: LogLevel, msg: string, name: string): LogRecord {
        if (!this.#isBufferingEnabled) {
            return new LogRecord(level, msg, name)
        }

        const currIndex = (this.#currIndex + 1) % this.#capacity
        this.#currIndex = currIndex

        if (this.#isFull) {
            const ret = this.#buffer[currIndex]
            ret.reset(level, msg, name)
            return ret
        }

        this.#isFull = currIndex === (this.#capacity - 1)
        return this.#buffer[currIndex] = new LogRecord(level, msg, name)

    }

    forEach(fn: (record: LogRecord) => void) {
        const buffer = this.#buffer
        // Corner case: no records.
        if (!buffer[0]) {
          return
        }
        const currIndex = this.#currIndex
        let i = this.#isFull ? currIndex : -1
        do {
          i = (i + 1) % this.#capacity
          fn((buffer[i]))
        } while (i !== currIndex)
    }

    clear() {
        this.#buffer = new Array(this.#capacity)
        this.#currIndex = -1
        this.#isFull = false
    }
}