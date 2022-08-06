'use strict';

export const mockReset = jest.fn();
export const MockTimer = jest.fn().mockImplementation(() => {
    return {
        reset: mockReset
    };
});