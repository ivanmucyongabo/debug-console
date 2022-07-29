import { Timer } from "../../lib/timer";
import { LogRecord, LogLevel } from "../../lib/logger";
import { Formatter } from "../../lib/formatter";

describe('formatter', () => {
    test('constructor', () => {
        const formatter = new Formatter();

        expect(formatter).toBeDefined();
        expect(formatter).toBeInstanceOf(Formatter);
    });

    test('getters', () => {
        const formatter = new Formatter();

        expect(formatter.timer).toBeDefined();
        expect(formatter.showAbsoluteTime).toBeDefined();
        expect(formatter.showRelativeTime).toBeDefined();
        expect(formatter.showLoggerName).toBeDefined();
        expect(formatter.showSeverityLevel).toBeDefined();
        expect(formatter.css).toBeDefined();

        expect(formatter.timer).toBeInstanceOf(Timer);
        expect(typeof formatter.showAbsoluteTime).toEqual('boolean');
        expect(typeof formatter.showRelativeTime).toEqual('boolean');
        expect(typeof formatter.showLoggerName).toEqual('boolean');
        expect(typeof formatter.showSeverityLevel).toEqual('boolean');
    });

    test('setters', () => {
        const formatter = new Formatter();

        const newTimer = new Timer();
        const newShowAbsoluteTime = false;
        const newShowRelativeTime = false;
        const newShowLoggerName = false;
        const newShowSeverityLevel = true;

        formatter.timer = newTimer;
        formatter.showAbsoluteTime = newShowAbsoluteTime;
        formatter.showRelativeTime = newShowRelativeTime;
        formatter.showLoggerName = newShowLoggerName;
        formatter.showSeverityLevel = newShowSeverityLevel;

        expect(formatter.timer.timestamp).toEqual(newTimer.timestamp);
        expect(formatter.showAbsoluteTime).toEqual(newShowAbsoluteTime);
        expect(formatter.showRelativeTime).toEqual(newShowRelativeTime);
        expect(formatter.showLoggerName).toEqual(newShowLoggerName);
        expect(formatter.showSeverityLevel).toEqual(newShowSeverityLevel);

    });

    test('formatAsString', () => {
        const formatter = new Formatter();
        const logRecord = new LogRecord(LogLevel.Debug, 'test log message', 'testLogger');

        let str = formatter.format(logRecord);

        expect(typeof str).toEqual('string');
    });

    test('formatAsHTML', () => {
        const formatter = new Formatter();
        const logRecord = new LogRecord(LogLevel.Debug, 'test log message', 'testLogger');

        let html = formatter.formatAsHtml(logRecord);

        expect(html).toBeInstanceOf(HTMLElement);
    });
});
