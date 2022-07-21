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
        const console = new Console(el);

        console.open();

        const logHeader = document.getElementById(ConsoleStyleDefaults.ids.header);
        const logBody = document.getElementById(ConsoleStyleDefaults.ids.body);
        const logFooter = document.getElementById(ConsoleStyleDefaults.ids.footer);

        expect(logHeader).not.toBeNull();
        expect(logBody).not.toBeNull();
        expect(logFooter).not.toBeNull();
    });

    test('Console subscribed to logger', () => {
        const el = document.getElementById(elId);
        const console = new Console(el);

        console.open();

        const logHeader = document.getElementById(ConsoleStyleDefaults.ids.header);
        const logBody = document.getElementById(ConsoleStyleDefaults.ids.body);
        const logFooter = document.getElementById(ConsoleStyleDefaults.ids.footer);

        subscribe('testLogger', (record: LogRecord) => console.log(record));
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
