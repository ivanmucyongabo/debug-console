import { Timer } from "../../lib/timer";
import { LogRecord, LogLevel } from "../../lib/logger";
import { Formatter } from "../../lib/formatter";

describe('formatter', () => {
    test('setters', () => {
        const formatter = new Formatter();
        const newTimer = new Timer();

        formatter.timer = newTimer;

        expect(formatter.timer.timestamp).toEqual(newTimer.timestamp);
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
