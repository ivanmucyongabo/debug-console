/**
 * @fileoverview Simple counter component.
 */

import { IComponentConfig, Component, IComponent } from './base';
import union from 'lodash.union';

const DEFAULT_SEPERATOR = '-';
const DEFAULT_TAGNAME = 'div';

export interface ICounterConfig extends IComponentConfig {
    label: string;
    min?: number;
    max?: number;
    countClassNames?: string[];
    countId?: string;
}

export interface ICounter extends IComponent {}

export class Counter extends Component implements ICounter {
    name:string = 'counter';
    #countClassNames_: string[];
    #countId_: string;
    #label_: string;

    #count_: number;

    constructor(config: ICounterConfig) {
        config.tagName = config.tagName || DEFAULT_TAGNAME;
        super(config);
        this.#count_ = 0;

        this.#label_ = config.label;
        this.#countId_ = config.countId || `${this.name}${DEFAULT_SEPERATOR}${'count'.concat(this.id)}`;
        this.#countClassNames_ = union(config.countClassNames||[], [`${this.name}${DEFAULT_SEPERATOR}count`]);
        this.classNames = union(this.classNames, [this.name]);
    }

    get count() {
        return this.#count_;
    }
    set count(count: number) {
        this.#count_ = count;
        this.setCount(this.#count_);
    }

    setCount(count: number) {
        let el = this.element;
        if (el) {
            let countEl = document.getElementById(`${this.#countId_}`);
            countEl!.innerText = count.toString();
        }
    }
    

    increment(delta: number) {
        let oldCount = this.#count_;
        this.count = oldCount + delta;
    }

    renderAsHTML(): HTMLElement {
        let html = super.renderAsHTML();

        let count = document.createElement('span');
        count.classList.add(...this.#countClassNames_);
        count.setAttribute('id', this.#countId_)
        count.innerText = this.#count_.toString();

        html.append(this.#label_, count);

        return html;
    }
}