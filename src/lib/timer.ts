/**
 * @fileoverview Simple timer.
 */

/** Class representing timer. */
export class Timer {
    /**
     * @private
     */
    #timestamp: number

    /**
     * Create a timer.
     * 
     * @remarks
     * Default sets the timestamp to Date.now().
     * 
     * @param timestamp - The new timestamp number.
     */
    constructor(timestamp?: number) {
        this.#timestamp = timestamp || Date.now()
    }

    /**
     * @returns The timestamp.
     */
    get timestamp() {
        return this.#timestamp
    }

    /**
     * Update the timestamp.
     * 
     * @param timestamp - The new timestamp number.
     */
    set timestamp(timestamp: number) {
        this.#timestamp = timestamp
    }

    /**
     * Reset the timestamp.
     * 
     * @remarks
     * Sets the timestamp to Date.now().
     */
    reset() {
        this.#timestamp = Date.now()
    }
}