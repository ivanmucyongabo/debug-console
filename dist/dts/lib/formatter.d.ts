import { LogRecord } from "./logger";
import { Timer } from "./timer";
export interface IFormatterConfig {
    info?: string;
    error?: string;
    warning?: string;
    debug?: string;
    logRecordContainer?: string;
    logRecordTimestamp?: string;
    logRecordName?: string;
    logRecordLevel?: string;
    logRecordMessage: string;
    prefix?: string;
    showAbsoluteTime?: boolean;
    showRelativeTime?: boolean;
    showLoggerName?: boolean;
    showSeverityLevel?: boolean;
}
export interface IFormatter {
    getDateTimeStamp(logRecord: LogRecord): string;
    getRelativeTimestamp(logRecord: LogRecord, timestamp: number): string;
    format(logRecord: LogRecord): string;
    formatAsHtml(logRecord: LogRecord): HTMLElement;
}
export declare class Formatter {
    #private;
    constructor(config?: IFormatterConfig);
    get timer(): Timer;
    set timer(timer: Timer);
    get showAbsoluteTime(): boolean;
    set showAbsoluteTime(show: boolean);
    get showRelativeTime(): boolean;
    set showRelativeTime(show: boolean);
    get showLoggerName(): boolean;
    set showLoggerName(show: boolean);
    get showSeverityLevel(): boolean;
    set showSeverityLevel(show: boolean);
    get css(): {
        info: string;
        error: string;
        warning: string;
        debug: string;
        logRecordContainer: string;
        logRecordTimestamp: string;
        logRecordName: string;
        logRecordLevel: string;
        prefix: string;
    };
    getDateTimeStamp(logRecord: LogRecord): string;
    getRelativeTimestamp(logRecord: LogRecord, timestamp: number): string;
    format(logRecord: LogRecord): string;
    formatAsHtml(logRecord: LogRecord): HTMLElement;
}
declare const _default: {
    escapeWhitespace: (str: string) => string;
    newLineToBr: (str: string) => string;
    htmlEscape: (str: string) => string;
};
export default _default;
