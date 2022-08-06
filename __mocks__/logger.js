'use strict';

export const mockReset = jest.fn();
export const MockLogRecord = jest.fn().mockImplementation(() => {
    return {
        reset: mockReset
    };
});

export const MockLogger = jest.fn().mockImplementation(() => {
    return {};
});

export const mockSubscribe = jest.fn();
export const mockUnsubscribe = jest.fn()
export const mockFire = jest.fn()
export const MockLogRegistryItem = jest.fn().mockImplementation(() => {
    return {
        subscribe: mockSubscribe,
        unsubscribe: mockUnsubscribe,
        fire: mockFire
    };
});

export const mockGetLogger = jest.fn();
export const mockGetLoggers = jest.fn();
export const MockLogRegistry = jest.fn().mockImplementation(() => {
    return {
        getLogger: mockGetLogger,
        getLoggers: mockGetLoggers
    };
});

export const mockAdd = jest.fn();
export const mockForEach = jest.fn();
export const mockClear = jest.fn();
export const MockLogBuffer = jest.fn().mockImplementation(() => {
    return {
        add: mockAdd,
        forEach: mockForEach,
        clear: mockClear
    };
});