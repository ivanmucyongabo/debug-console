import { Button, IButton, IButtonConfig } from './button';
export interface IAccordianConfig extends IButtonConfig {
    panelClassNames?: string[];
    panelId?: string;
    panel: string;
}
export interface IAccordian extends IButton {
}
export declare class Accordian extends Button implements IAccordian {
    #private;
    name: string;
    constructor(config: IAccordianConfig);
    render(): HTMLElement;
}
