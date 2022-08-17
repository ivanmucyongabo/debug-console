import { Component, IComponent, IComponentConfig } from './base';
export interface ICounterConfig extends IComponentConfig {
    label: string;
    min?: number;
    max?: number;
    countClassNames?: string[];
    countId?: string;
}
export interface ICounter extends IComponent {
}
export declare class Counter extends Component implements ICounter {
    #private;
    name: string;
    constructor(config: ICounterConfig);
    get count(): number;
    set count(count: number);
    setCount(count: number): void;
    increment(delta: number): void;
    renderAsHTML(): HTMLElement;
}
