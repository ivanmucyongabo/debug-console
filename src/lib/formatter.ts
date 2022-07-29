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

export interface IFormatterConfig {
    info?: string,
    error?: string,
    warning?: string,
    debug?: string,
    logRecordContainer?: string,
    logRecordTimestamp?: string,
    logRecordName?: string,
    logRecordLevel?: string,
    logRecordMessage: string,
    prefix?: string,
    showAbsoluteTime?: boolean,
    showRelativeTime?: boolean,
    showLoggerName?: boolean,
    showSeverityLevel?: boolean  
};

export interface IFormatter {
    getDateTimeStamp(logRecord: LogRecord): string;
    getRelativeTimestamp(logRecord: LogRecord, timestamp: number): string;
    format(logRecord: LogRecord): string;
    formatAsHtml(logRecord: LogRecord): HTMLElement;
}

export class Formatter {
    #timer: Timer;
    #showAbsoluteTime: boolean;
    #showRelativeTime: boolean;
    #showLoggerName: boolean;
    #showSeverityLevel: boolean;
    #info: string;
    #error: string;
    #warning: string;
    #debug: string;
    #logRecordContainer: string;
    #logRecordTimestamp: string;
    #logRecordName: string;
    #logRecordLevel: string;
    #logRecordMessage: string;
    #prefix: string;

    constructor(config?: IFormatterConfig) {
        this.#timer = new Timer();
        this.#showAbsoluteTime = config?.showAbsoluteTime || true;
        this.#showRelativeTime = config?.showRelativeTime || true;
        this.#showLoggerName = config?.showLoggerName || true;
        this.#showSeverityLevel = config?.showSeverityLevel || false;
        this.#info = config?.info || 'debug-console-log-record--info';
        this.#error = config?.error || 'debug-console-log-record--error';
        this.#warning = config?.warning || 'debug-console-log-record--warning';
        this.#debug = config?.debug || 'debug-console-log-record--debug';
        this.#logRecordContainer = config?.logRecordContainer || 'debug-console-log-record';
        this.#logRecordTimestamp = config?.logRecordTimestamp || 'debug-console-log-record-timestamp';
        this.#logRecordName = config?.logRecordName || 'debug-console-log-record-name';
        this.#logRecordLevel = config?.logRecordLevel || 'debug-console-log-record-level';
        this.#logRecordMessage = config?.logRecordMessage || 'debug-console-log-record-message';
        this.#prefix = config?.prefix || '';
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
        };
    }

    getDateTimeStamp(logRecord: LogRecord): string {
        var time = new Date(logRecord.timestamp);
        let date = `${(time.getMonth() + 1)}/${time.getDate()}/${(time.getFullYear() - 2000)}`;

        return date + ' ' +
            `${time.getHours()}` + ':' +
            `${time.getMinutes()}` +
            ':' +
            `${time.getSeconds()}` +
            '.' +
            `${Math.floor(time.getMilliseconds() / 10)}`;
    }

    getRelativeTimestamp(logRecord: LogRecord, timestamp: number): string {
        let ms = logRecord.timestamp - timestamp;
        let sec = ms / 1000;
        let str = sec.toFixed(3);
      
        let spacesToPrepend = 0;

        if (sec < 1) {
          spacesToPrepend = 2;
        } else {
          while (sec < 100) {
            spacesToPrepend++;
            sec *= 10;
          }
        }

        while (spacesToPrepend-- > 0) {
          str = ' ' + str;
        }

        return str + 's';
    }

    format(logRecord: LogRecord): string {
        return this.formatAsHtml(logRecord).outerHTML
    }

    formatAsHtml(logRecord: LogRecord): HTMLElement {
        if (!logRecord) {
            return document.createElement('div');
        }
        let classNames = this.css;

        var className;
        switch (logRecord.level) {
            case LogLevel.Error:
                className = classNames.error;
                break;
            case LogLevel.Warning:
                className = classNames.warning;
                break;
            case LogLevel.Info:
                className = classNames.info;
                break;
            case LogLevel.Debug:
                className = classNames.debug;
            default:
                className = classNames.debug;
                break;
        }
    
        // HTML for user defined prefix, time, logger name, and severity.
        let html = document.createElement('div');
        if (this.showAbsoluteTime) {
            let timestamp = document.createElement('span');
            timestamp.classList.add(this.#logRecordTimestamp);
            timestamp.innerText = this.getDateTimeStamp(logRecord);
            html.append(timestamp);
        }

        if (this.showRelativeTime) {
            let relativeTime = document.createElement('span');
            relativeTime.classList.add(this.#logRecordTimestamp);
            relativeTime.innerText = this.getRelativeTimestamp(logRecord, this.#timer.timestamp);
            html.append(relativeTime);
        }

        if (this.showLoggerName) {
            let loggerName = document.createElement('span');
            loggerName.classList.add(this.#logRecordName);
            loggerName.innerText = logRecord.name;
            html.append(loggerName);
        }

        if (this.showSeverityLevel) {
            let loggerLevel = document.createElement('span');
            loggerLevel.classList.add(this.#logRecordLevel);
            loggerLevel.innerText = LogLevel[logRecord.level];
            html.append(loggerLevel);
        }

        let logRecordHtml = htmlEscape(logRecord.message);
        let recordHTML = document.createElement('span');
        recordHTML.classList.add(this.#logRecordMessage);
        recordHTML.append(logRecordHtml);
    
        // Combine both pieces of HTML and, if needed, append a final newline.
        html.append(recordHTML, document.createElement('br'));
        html.classList.add(this.css.logRecordContainer, className);

        return html;
    }
}

export default {
    escapeWhitespace,
    newLineToBr,
    htmlEscape
}