export declare enum LogLevel {
    Off = 0,
    Debug = 1,
    Info = 2,
    Warning = 3,
    Error = 4
}
export declare class LogRecord {
    #private;
    constructor(level: LogLevel, msg: string, name: string, time?: number);
    get level(): LogLevel;
    get message(): string;
    get name(): string;
    get timestamp(): number;
    set timestamp(time: number);
    reset(level: LogLevel, msg: string, name: string, timestamp?: number, time?: number): void;
}
export declare class Logger {
    #private;
    constructor(name: string);
    get name(): string;
}
export declare class LogRegistryItem {
    #private;
    constructor(name: string, level?: LogLevel);
    get logger(): Logger;
    get name(): string;
    get level(): LogLevel;
    set level(level: LogLevel);
    get subscriberCount(): number;
    subscribe(fn: (record: LogRecord) => void): void;
    unsubscribe(fn: (record: LogRecord) => void): void;
    fire(record: LogRecord): void;
}
export declare class LogRegistry {
    #private;
    constructor();
    get itemCount(): number;
    getLogger(name: string, level?: LogLevel): LogRegistryItem;
    getLoggers(): LogRegistryItem[];
}
export declare class LogBuffer {
    #private;
    constructor(capacity?: number);
    get capacity(): number;
    get buffer(): LogRecord[];
    get isFull(): boolean;
    get isBufferingEnabled(): boolean;
    get currIndex(): number;
    add(level: LogLevel, msg: string, name: string): LogRecord;
    forEach(fn: (record: LogRecord) => void): void;
    clear(): void;
}
