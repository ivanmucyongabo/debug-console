import { Console, ConsoleStyleDefaults, subscribe, debug } from "../..";
import { LogRecord } from '../../lib/logger';

const elId = 'test-body';
const elCont = `<div id="${elId}"></div>`.toString();

describe('Console tests', () => {
    beforeEach(() => {
        document.body.innerHTML = elCont;
    });

    test('Console constructor', () => {
        const el = document.getElementById(elId);
        const console = new Console(el);

        expect(console).toBeDefined();
        expect(console).toBeInstanceOf(Console);
    });

    test('Console open method', () => {
        const el = document.getElementById(elId);
        const debug_console = new Console(el);

        debug_console.open();

        const logHeader = document.getElementById(debug_console.ids.header);
        const logBody = document.getElementById(debug_console.ids.body);
        const logFooter = document.getElementById(debug_console.ids.footer);

        expect(logHeader).not.toBeNull();
        expect(logBody).not.toBeNull();
        expect(logFooter).not.toBeNull();
    });

    test('Console subscribed to logger', () => {
        const el = document.getElementById(elId);
        const debug_console = new Console(el);

        debug_console.open();

        const logBody = document.getElementById(debug_console.ids.body);

        subscribe('testLogger', (record: LogRecord) => debug_console.log(record));
        debug('testLogger', 'test debug message');

        expect(logBody?.hasChildNodes()).toEqual(true);
        expect(logBody?.children.length).toEqual(1);
        expect(logBody?.childNodes.length).toEqual(1);
    });
});

describe('Global tests', () => {
    beforeEach(() => {
        document.body.innerHTML = elCont;
    });

    test('getLogger', () => {

    });

    test('getLoggers', () => {

    });

    test('subscribe', () => {

    });

    test('unsubscribe', () => {

    });

    test('log', () => {

    });

    test('info', () => {

    });

    test('warning', () => {

    });

    test('error', () => {

    });
});
