import { Logger, LogLevel, LogRecord, LogRegistryItem, LogRegistry, LogBuffer } from '../../lib/logger';

const recordDebug = {
    level: LogLevel.Debug,
    name: "debugLogger",
    message: "debug test message",
    timestamp: undefined
};
const recordInfo = {
    level: LogLevel.Info,
    name: "infoLogger",
    message: "info test message",
    timestamp: undefined
};
const recordWarning = {
    level: LogLevel.Warning,
    name: "warningLogger",
    message: "warning test message",
    timestamp: undefined
};
const recordError = {
    level: LogLevel.Error,
    name: "errorLogger",
    message: "error test message",
    timestamp: undefined
};

describe('LogRecord tests', () => {
    test('LogRecord constructor', () => {
        const logRecord = new LogRecord(
            recordDebug.level,
            recordDebug.message,
            recordDebug.name
        );

        expect(logRecord).toBeDefined();
        expect(logRecord).toBeInstanceOf(LogRecord);
    });

    test('LogRecord getters', () => {
        const logRecord = new LogRecord(
            recordDebug.level,
            recordDebug.message,
            recordDebug.name
        );

        expect(logRecord.level).toEqual(LogLevel.Debug);
        expect(typeof logRecord.name).toEqual('string');
        expect(typeof logRecord.message).toEqual('string');
        expect(typeof logRecord.timestamp).toEqual('number');
    });

    test('LogRecord reset method', () => {
        const logRecord = new LogRecord(
            recordDebug.level,
            recordDebug.message,
            recordDebug.name
        );
        const timestamp = Date.now();

        logRecord.reset(
            recordInfo.level,
            recordInfo.message,
            recordInfo.name,
            timestamp
        );

        expect(logRecord.level).toEqual(recordInfo.level);
        expect(logRecord.name).toEqual(recordInfo.name);
        expect(logRecord.message).toEqual(recordInfo.message);
        expect(logRecord.timestamp).toEqual(timestamp);
    });
});

describe('Logger tests', () => {
    test('Logger constructor', () => {
        const logger = new Logger('testLogger');

        expect(logger).toBeDefined();
        expect(logger).toBeInstanceOf(Logger);
    });

    test('Logger getters', () => {
        const logger = new Logger('testLogger');

        expect(typeof logger.name).toEqual('string');
    });
});

describe('LogRegistryItem tests', () => {
    test('LogRegistryItem constructor', () => {
        const logItem = new LogRegistryItem('test');

        expect(logItem).toBeDefined();
        expect(logItem).toBeInstanceOf(LogRegistryItem);
    });

    test('LogRegistryItem getters', () => {
        const logItem = new LogRegistryItem('test');

        expect(logItem.logger).toBeInstanceOf(Logger);
        expect(typeof logItem.name).toEqual('string');
        expect(logItem.level).toEqual(LogLevel.Debug);
    });

    test('LogRegistryItem setters', () => {
        const logItem = new LogRegistryItem('test');
        logItem.level = recordError.level;

        expect(logItem.level).toEqual(recordError.level);
    });

    test('LogRegistryItem observer pattern methods', () => {
        const logItem = new LogRegistryItem('test');
        const logRecord = new LogRecord(
            recordDebug.level,
            recordDebug.message,
            recordDebug.name
        );
        let firedCounter = 0;
        const test_fn = (record: LogRecord) => {
            firedCounter++;
        };

        expect(logItem.subscriberCount).toEqual(0);

        // Subcribe tests
        logItem.subscribe(test_fn);
        expect(logItem.subscriberCount).toEqual(1);
        expect(firedCounter).toEqual(0);

        // Fire tests
        logItem.fire(logRecord);
        expect(logItem.subscriberCount).toEqual(1);
        expect(firedCounter).toEqual(1);

        // Unsubscribe test
        logItem.unsubscribe(test_fn);
        expect(logItem.subscriberCount).toEqual(0);
        expect(firedCounter).toEqual(1);
    });
});

describe('LogRegistry tests', () => {
    test('LogRegistry constructor', () => {
        const logRegistry = new LogRegistry();

        expect(logRegistry).toBeDefined();
        expect(logRegistry).toBeInstanceOf(LogRegistry);
    });

    test('LogRegistry getters', () => {
        const logRegistry = new LogRegistry();

        expect(logRegistry.itemCount).toEqual(0);
    });

    test('LogRegistry getLogger method', () => {
        const logRegistry = new LogRegistry();
        const logItem = logRegistry.getLogger('testLogger');

        expect(logRegistry.itemCount).toEqual(1);
        expect(logItem).toBeInstanceOf(LogRegistryItem);
    });

    test('LogRegistry getLoggers method', () => {
        const logRegistry = new LogRegistry();
        const logItem = logRegistry.getLogger('testLogger');
        const logItems = logRegistry.getLoggers();

        expect(logItems).toBeInstanceOf(Array);
        expect(logItems.length).toEqual(logRegistry.itemCount);
        expect(logItems[0]).toBeInstanceOf(LogRegistryItem);
    });
});

describe('LogBuffer tests', () => {
    test('LogBuffer constructor w/o capacity', () => {
        const logBuffer = new LogBuffer();

        expect(logBuffer).toBeDefined();
        expect(logBuffer).toBeInstanceOf(LogBuffer);
    });

    test('LogBuffer constructor w/ capacity', () => {
        const BUFFER_TEST_CAPACITY = 1;
        const logBuffer = new LogBuffer(BUFFER_TEST_CAPACITY);

        expect(logBuffer).toBeDefined();
        expect(logBuffer).toBeInstanceOf(LogBuffer);
    });

    test('LogBuffer getters w/o capacity', () => {
        const logBuffer = new LogBuffer();

        expect(logBuffer.buffer).toBeInstanceOf(Array);
        expect(typeof logBuffer.capacity).toEqual('number');
        expect(typeof logBuffer.currIndex).toEqual('number');
        expect(typeof logBuffer.isFull).toEqual('boolean');

        expect(logBuffer.buffer.length).toEqual(0);
        expect(logBuffer.capacity).toEqual(0);
        expect(logBuffer.currIndex).toEqual(-1);
        expect(logBuffer.isFull).toEqual(false);
    });

    test('LogBuffer getters w/ capacity', () => {
        const BUFFER_TEST_CAPACITY = 1;
        const logBuffer = new LogBuffer(BUFFER_TEST_CAPACITY);

        expect(logBuffer.buffer).toBeInstanceOf(Array);
        expect(typeof logBuffer.capacity).toEqual('number');
        expect(typeof logBuffer.currIndex).toEqual('number');
        expect(typeof logBuffer.isFull).toEqual('boolean');
        expect(typeof logBuffer.isBufferingEnabled).toEqual('boolean');

        expect(logBuffer.buffer.length).toEqual(BUFFER_TEST_CAPACITY);
        expect(logBuffer.capacity).toEqual(BUFFER_TEST_CAPACITY);
        expect(logBuffer.currIndex).toEqual(-1);
        expect(logBuffer.isFull).toEqual(false);
        expect(logBuffer.isBufferingEnabled).toEqual(true);
    });

    test('LogBuffer add method w/o capacity', () => {
        const logBuffer = new LogBuffer();
        const logRecord = logBuffer.add(recordDebug.level, recordDebug.message, recordDebug.name);

        expect(logRecord).toBeInstanceOf(LogRecord);
        expect(logBuffer.capacity).toEqual(0);
        expect(logBuffer.buffer.length).toEqual(0);
        expect(logBuffer.currIndex).toEqual(-1);
        expect(logBuffer.isFull).toEqual(false);
        expect(logBuffer.isBufferingEnabled).toEqual(false);
    });

    test('LogBuffer add method w/ capacity', () => {
        const BUFFER_TEST_CAPACITY = 1;
        const logBuffer = new LogBuffer(BUFFER_TEST_CAPACITY);

        const logRecord = logBuffer.add(recordDebug.level, recordDebug.message, recordDebug.name);

        expect(logRecord).toBeInstanceOf(LogRecord);
        expect(logBuffer.capacity).toEqual(BUFFER_TEST_CAPACITY);
        expect(logBuffer.buffer.length).toEqual(BUFFER_TEST_CAPACITY);
        expect(logBuffer.currIndex).toEqual(0);
        expect(logBuffer.isFull).toEqual(true);
        expect(logBuffer.isBufferingEnabled).toEqual(true);
    });

    test('LogBuffer forEach method w/o capacity', () => {
        const logBuffer = new LogBuffer();
        let counter = 0;
        const test_fn = (record: LogRecord) => {
            counter++;
        };

        logBuffer.forEach(test_fn);

        expect(counter).toEqual(0);
    });

    test('LogBuffer forEach method w/ capacity', () => {
        const BUFFER_TEST_CAPACITY = 1;
        const logBuffer = new LogBuffer(BUFFER_TEST_CAPACITY);
        const logRecord = logBuffer.add(recordDebug.level, recordDebug.message, recordDebug.name);
        let counter = 0;
        const test_fn = (record: LogRecord) => {
            counter++;
        };

        logBuffer.forEach(test_fn);

        expect(counter).toEqual(1);
    });

    test('LogBuffer clear method', () => {
        const BUFFER_TEST_CAPACITY = 1;
        const logBuffer = new LogBuffer(BUFFER_TEST_CAPACITY);
        const logRecord = logBuffer.add(recordDebug.level, recordDebug.message, recordDebug.name);
        const clear = jest.fn(logBuffer.clear);

        logBuffer.clear();

        expect(logBuffer.buffer).toBeInstanceOf(Array);
        expect(typeof logBuffer.capacity).toEqual('number');
        expect(typeof logBuffer.currIndex).toEqual('number');
        expect(typeof logBuffer.isFull).toEqual('boolean');
        expect(typeof logBuffer.isBufferingEnabled).toEqual('boolean');

        expect(logBuffer.currIndex).toEqual(-1);
        expect(logBuffer.isFull).toEqual(false);
        expect(logBuffer.isBufferingEnabled).toEqual(true);
    });
});
