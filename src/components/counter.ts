/**
 * @fileoverview Simple counter component.
 */

import { CssIds, CssClasses, CssConfig, Component, IComponent } from './base';

interface CounterCssIds extends CssIds {
    [index: string]: string;

    label: string,
    count: string,
}

interface CounterCssClasses extends CssClasses {
    [index: string]: string[];

    label: string[],
    count: string[],
}

interface CounterCssConfig extends CssConfig {
    ids : CounterCssIds,
    classes : CounterCssClasses
}

export const COUNTER_DEFAULT_CSS: CounterCssConfig = {
    ids: {
        label: 'counter-label',
        count: 'counter-count',
    },
    classes: {
        label: ['counter-label'],
        count: ['counter-count'],
    }
};

export interface ICounter extends IComponent {}

export class Counter extends Component implements ICounter {
    #count_: number;

    constructor(css?: CounterCssConfig | {}) {
        css = css || {};
        super({ ...css, ...COUNTER_DEFAULT_CSS})

        this.#count_ = 0;
        this.tagName = 'span';
    }

    get count() {
        return this.#count_;
    }
    set count(increment: number) {
        let oldCount = this.#count_;
        this.#count_ = oldCount + increment;
        this.setCount(this.#count_);
    }

    setCount(count: number) {
        if (this.element) {
            this.element.innerText = count.toString();
        }
    }
}
