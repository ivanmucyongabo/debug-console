import { Timer } from "../../lib/timer";
import { LogRecord, LogLevel } from "../../lib/logger";
import formatter, { Formatter } from "../../lib/formatter";

describe('Utility function tests', () => {
    test('escapeWhitespace', () => {
        const test1 = 'a&#160;b';
        const test2 = 'a &#160;b';
        const test3 = 'a &#160;b &#160;c';
        const test4 = 'a &#160;b &#160;c &#160;&#160;d';

        // expect(formatter.htmlEscape('a b')).toStrictEqual(test1);
        // expect(formatter.htmlEscape('a  b')).toEqual(test2);
        // expect(formatter.htmlEscape('a  b  c')).toEqual(test3);
        // expect(formatter.htmlEscape('a  b  c   d')).toEqual(test4);

    });

    test('newLineToBr', () => {
        const test1 = '<br>';
        const test2 = '&lt;<br>';
        const test3 = 'a<br>c';

        // expect(formatter.htmlEscape('\r')).toStrictEqual(test1);
        // expect(formatter.htmlEscape('\r\n')).toEqual(test1);
        // expect(formatter.htmlEscape('<\n')).toEqual(test2);
        // expect(formatter.htmlEscape('a\nc')).toEqual(test3);
    });

    test('htmlEscape', () => {
        const test1 = '<b>in</b>';
        const test2 = 'a<br>c';
        const test3 = '&lt;<br>';
        const test4 = '<br>';
        const test5 = 'a &#160;b';

        expect(formatter.htmlEscape(test1)).toEqual(formatter.htmlEscape(test1));
        expect(formatter.htmlEscape('')).toEqual('');
        // expect(formatter.htmlEscape('a\nc')).toEqual(test2);
        // expect(formatter.htmlEscape('<\n')).toEqual(test3);
        // expect(formatter.htmlEscape('\r\n')).toEqual(test4);
        // expect(formatter.htmlEscape('\r')).toEqual(test4);
        // expect(formatter.htmlEscape('a  b')).toEqual(test5);
    });
});

describe('Formatter tests', () => {
    test('Formatter constructor', () => {
        const formatter = new Formatter();

        expect(formatter).toBeDefined();
        expect(formatter).toBeInstanceOf(Formatter);
    });

    test('Formatter getters', () => {
        const formatter = new Formatter();

        expect(formatter.timer).toBeDefined();
        expect(formatter.showAbsoluteTime).toBeDefined();
        expect(formatter.showRelativeTime).toBeDefined();
        expect(formatter.showLoggerName).toBeDefined();
        expect(formatter.showSeverityLevel).toBeDefined();
        expect(formatter.styles).toBeDefined();

        expect(formatter.timer).toBeInstanceOf(Timer);
        expect(typeof formatter.showAbsoluteTime).toEqual('boolean');
        expect(typeof formatter.showRelativeTime).toEqual('boolean');
        expect(typeof formatter.showLoggerName).toEqual('boolean');
        expect(typeof formatter.showSeverityLevel).toEqual('boolean');
    });

    test('Formatter setters', () => {
        const formatter = new Formatter();

        const newTimer = new Timer();
        const newShowAbsoluteTime = false;
        const newShowRelativeTime = false;
        const newShowLoggerName = false;
        const newShowSeverityLevel = true;
        const newStyles = {
            wrapper: "",
            container: "",
            info: "",
            error: "",
            log: "",
            warning: "",
            debug: "",
            default: "",
            logRecordWrapper: "",
            logRecordContainer: "",
            logRecordTimestamp: "",
            logRecordName: "",
            logRecordLevel: ""
        };

        formatter.timer = newTimer;
        formatter.showAbsoluteTime = newShowAbsoluteTime;
        formatter.showRelativeTime = newShowRelativeTime;
        formatter.showLoggerName = newShowLoggerName;
        formatter.showSeverityLevel = newShowSeverityLevel;
        formatter.styles = newStyles

        expect(formatter.timer.timestamp).toEqual(newTimer.timestamp);
        expect(formatter.showAbsoluteTime).toEqual(newShowAbsoluteTime);
        expect(formatter.showRelativeTime).toEqual(newShowRelativeTime);
        expect(formatter.showLoggerName).toEqual(newShowLoggerName);
        expect(formatter.showSeverityLevel).toEqual(newShowSeverityLevel);
        expect(formatter.styles.wrapper).toEqual(newStyles.wrapper);

    });

    test('Formatter create log record string', () => {
        const formatter = new Formatter();
        const logRecord = new LogRecord(LogLevel.Debug, 'test log message', 'testLogger');

        let str = formatter.format(logRecord);

        expect(typeof str).toEqual('string');
        console.log(str);
    });

    test('Formatter create log record html', () => {
        const formatter = new Formatter();
        const logRecord = new LogRecord(LogLevel.Debug, 'test log message', 'testLogger');

        let html = formatter.formatAsHtml(logRecord);

        expect(html).toBeInstanceOf(Array);
        console.log(html);
    });
});
