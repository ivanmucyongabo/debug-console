import { Component, IComponent, IComponentConfig } from './base';
export interface IComboBoxConfig extends IComponentConfig {
    inputId?: string;
    inputClasses?: string[];
    btnId?: string;
    btnClasses?: string[];
    listBoxId?: string;
    listBoxClasses?: string[];
    listBoxItemClassNames?: string[];
    wrapperClassNames?: string[];
    containerClassNames?: string[];
    options: string[];
}
export interface IComboBox extends IComponent {
}
export declare class ComboBox extends Component implements IComboBox {
    #private;
    name: string;
    constructor(config: IComboBoxConfig);
    get filter(): string;
    get filteredOptions(): string[];
    get lastOption(): string;
    get option(): string;
    get firstOption(): string;
    open(): void;
    close(): void;
    toggle(open: boolean): boolean;
    renderAsHTML(): HTMLElement;
    btnHTML(): HTMLElement;
    inputHTML(): HTMLInputElement;
    listboxHTML(): HTMLUListElement;
    optHTML(opt: string): HTMLElement;
}
