import { LogLevel, LogRecord } from "./logger";
import { Timer } from "./timer";

const escapeWhitespace = (str: string): string => {
    return str;
};
const newLineToBr = (str: string): string => {
    return str;
}
const htmlEscape = (str: string): string => {
    return str;
};

export interface FormatterCss {
    wrapper: string,
    container: string,
    info: string,
    error: string,
    warning: string,
    debug: string,
    logRecordWrapper: string,
    logRecordContainer: string,
    logRecordTimestamp: string,
    logRecordName: string,
    logRecordLevel: string
};

export const DEFAULT_CSS: FormatterCss = {
    wrapper: "wrapper",
    container: "cont",
    info: "dbg-i",
    error: "dbg-e",
    warning: "dbg-w",
    debug: "dbg-d",
    logRecordWrapper: "record",
    logRecordContainer: "record-cont",
    logRecordTimestamp: "record-timestamp",
    logRecordName: "record-name",
    logRecordLevel: "record-level"
}; 

export class Formatter {
    #timer: Timer;
    #showAbsoluteTime: boolean;
    #showRelativeTime: boolean;
    #showLoggerName: boolean;
    #showSeverityLevel: boolean;
    #css: FormatterCss;
    #prefix: string;

    constructor(css?: FormatterCss, opt_prefix?: string) {
        this.#timer = new Timer();
        this.#showAbsoluteTime = true;
        this.#showRelativeTime = true;
        this.#showLoggerName = true;
        this.#showSeverityLevel = false;
        this.#css = css || Object.create(DEFAULT_CSS);
        this.#prefix = opt_prefix || '';
    }

    get timer() {
        return this.#timer;
    }
    set timer(timer: Timer) {
        this.#timer = timer;
    }

    get showAbsoluteTime() {
        return this.#showAbsoluteTime;
    }
    set showAbsoluteTime(show: boolean) {
        this.#showAbsoluteTime = show;
    }

    get showRelativeTime() {
        return this.#showRelativeTime;
    }
    set showRelativeTime(show: boolean) {
        this.#showRelativeTime = show;
    }

    get showLoggerName() {
        return this.#showLoggerName;
    }
    set showLoggerName(show: boolean) {
        this.#showLoggerName = show;
    }

    get showSeverityLevel() {
        return this.#showSeverityLevel;
    }
    set showSeverityLevel(show: boolean) {
        this.#showSeverityLevel = show;
    }

    get css() {
        return this.#css;
    }
    set css(css: FormatterCss) {
        this.#css = css;
    }

    static getDateTimeStamp(logRecord: LogRecord) {

    }
    static getRelativeTime(logRecord: LogRecord, timestamp: number) {

    }

    format(logRecord: LogRecord): string {
        return this.formatAsHtml(logRecord).outerHTML
    }
    formatAsHtml(logRecord: LogRecord): HTMLElement {
        if (!logRecord) {
            return document.createElement('div');
        }
    
        var className;
        switch (logRecord.level) {
            case LogLevel.Error:
                className = DEFAULT_CSS.error;
                break;
            case LogLevel.Warning:
                className = DEFAULT_CSS.warning;
                break;
            case LogLevel.Info:
                className = DEFAULT_CSS.info;
                break;
            case LogLevel.Debug:
                className = DEFAULT_CSS.debug;
            default:
                className = DEFAULT_CSS.debug;
                break;
        }
    
        // HTML for user defined prefix, time, logger name, and severity.
        var sb = [];
        sb.push(this.#prefix, ' ');
        if (this.showAbsoluteTime) {
        sb.push(
            '[', Formatter.getDateTimeStamp(logRecord), '] ');
        }
        if (this.showRelativeTime) {
            sb.push(
                '[',
                Formatter.getRelativeTime(logRecord, this.#timer.timestamp),
                's] '
            );
        }
        if (this.showLoggerName) {
            sb.push('[', logRecord.name, '] ');
        }
        if (this.showSeverityLevel) {
            sb.push('[', logRecord.level, '] ');
        }
        var fullPrefixHtml = htmlEscape(sb.join(''));

        let logRecordHtml = htmlEscape(logRecord.message);
        let recordHtml = document.createElement('span')
        recordHtml.classList.add(className);
        recordHtml.append(logRecordHtml);
    
        // Combine both pieces of HTML and, if needed, append a final newline.
        var html;
        html = document.createElement('span')
        html.append(fullPrefixHtml, recordHtml, document.createElement('br'));

        return html;
    }
}

export default {
    escapeWhitespace,
    newLineToBr,
    htmlEscape
}