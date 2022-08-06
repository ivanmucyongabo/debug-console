'use strict';

export const getDateTimeStamp = jest.fn();
export const getRelativeTimestamp = jest.fn();
export const format = jest.fn();
export const formatAsHtml = jest.fn();
export const MockFormatter = jest.fn().mockImplementation(() => {
    return {
        getDateTimeStamp: getDateTimeStamp,
        getRelativeTimestamp: getRelativeTimestamp,
        format: format,
        formatAsHtml: formatAsHtml
    };
});