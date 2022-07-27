import { DebugConsole, subscribe, debug } from "../..";
import { LogRecord } from '../../lib/logger';

const elId = 'test-body';
const elCont = `<div id="${elId}"></div>`.toString();

describe('debug-console', () => {
    beforeEach(() => {
        document.body.innerHTML = elCont;
    });

    test('constructor', () => {
        const el = document.getElementById(elId);
        const console = new DebugConsole({mountTo: el});

        expect(console).toBeDefined();
        expect(console).toBeInstanceOf(DebugConsole);
    });

    test('open method', () => {
        const el = document.getElementById(elId);
        const debug_console = new DebugConsole({mountTo: el});

        debug_console.open();

        const logHeader = document.getElementById(debug_console.headerId);
        const logBody = document.getElementById(debug_console.logId);
        const logFooter = document.getElementById(debug_console.footerId);

        expect(logHeader).not.toBeNull();
        expect(logBody).not.toBeNull();
        expect(logFooter).not.toBeNull();
    });

    test('observer-pattern', () => {
        const el = document.getElementById(elId);
        const debug_console = new DebugConsole({mountTo: el});

        debug_console.open();

        const logBody = document.getElementById(debug_console.logId);

        subscribe('testLogger', (record: LogRecord) => debug_console.log(record));
        debug('testLogger', 'test debug message');

        expect(logBody?.hasChildNodes()).toEqual(true);
        expect(logBody?.children.length).toEqual(1);
        expect(logBody?.childNodes.length).toEqual(1);
    });
});

describe('api', () => {
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
