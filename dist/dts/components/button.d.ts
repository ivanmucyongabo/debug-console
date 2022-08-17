import { Component, IComponent, IComponentConfig } from './base';
export interface IButtonConfig extends IComponentConfig {
    label: string;
    icon?: string;
    labelClassNames?: string[];
    iconclassNames?: string[];
    labelId?: string;
    iconId?: string;
    isPressed?: boolean;
    isDisabled?: boolean;
    tabIndex?: number;
}
export interface IButton extends IComponent {
}
export declare class Button extends Component implements IButton {
    #private;
    name: string;
    constructor(config: IButtonConfig);
    get label(): string;
    get isPressed(): boolean;
    get isDisabled(): boolean;
    get tabIndex(): number;
    renderAsHTML(): HTMLElement;
    labelHTML(label: string): HTMLSpanElement;
    iconHTML(icon?: string): HTMLSpanElement;
}
