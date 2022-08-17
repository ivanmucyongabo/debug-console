export class Timer {
    #timestamp: number

    constructor() {
        this.#timestamp = Date.now()
    }

    get timestamp() {
        return this.#timestamp
    }
    set timestamp(timestamp: number) {
        this.#timestamp = timestamp
    }

    reset() {
        this.#timestamp = Date.now()
    }
}