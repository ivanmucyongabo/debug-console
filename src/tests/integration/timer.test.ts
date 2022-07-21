import { Timer } from "../../lib/timer";

test('Timer constructor', () => {
    const timer = new Timer();

    expect(timer).toBeDefined();
    expect(timer).toBeInstanceOf(Timer);
});

test('Timer timestamp getter', () => {
    const timer = new Timer();

    expect(timer.timestamp).toBeDefined();
    expect(typeof timer.timestamp).toEqual('number');
});

test('Timer timestamp setter', () => {
    const timer = new Timer();
    const tempDate = Date.now();
    timer.timestamp = tempDate;

    expect(timer.timestamp).toBe(tempDate);
    expect(timer.timestamp).toEqual(tempDate);
});

test('Timer reset method', () => {
    const timer = new Timer();
    const oldTimestamp = timer.timestamp;

    timer.reset();

    expect(timer.timestamp).toBeGreaterThanOrEqual(oldTimestamp)
});
