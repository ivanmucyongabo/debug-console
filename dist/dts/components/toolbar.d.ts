import { Accordian, IAccordian, IAccordianConfig } from './accordian';
import { Component, IComponent, IComponentConfig } from './base';
import { Button, IButton, IButtonConfig } from './button';
import { ComboBox, IComboBox, IComboBoxConfig } from './combobox';
import { Counter, ICounter, ICounterConfig } from './counter';
export interface IToolBarItemConfig {
    toolbar?: ToolBar;
}
export interface IToolBarComboBoxConfig extends IComboBoxConfig, IToolBarItemConfig {
}
export interface IToolBarAccordianConfig extends IAccordianConfig, IToolBarItemConfig {
}
export interface IToolBarCounterConfig extends ICounterConfig, IToolBarItemConfig {
}
export interface IToolBarButtonConfig extends IButtonConfig, IToolBarItemConfig {
}
export declare class ToolBarComboBox extends ComboBox implements IComboBox {
    #private;
    constructor(config: IToolBarComboBoxConfig);
    set parent(parent: ToolBar);
    renderAsHTML(): HTMLElement;
}
export declare class ToolBarAccordian extends Accordian implements IAccordian {
    #private;
    constructor(config: IToolBarAccordianConfig);
    set parent(parent: ToolBar);
    renderAsHTML(): HTMLElement;
}
export declare class ToolBarCounter extends Counter implements ICounter {
    #private;
    constructor(config: IToolBarCounterConfig);
    set parent(parent: ToolBar);
    renderAsHTML(): HTMLElement;
}
export declare class ToolBarButton extends Button implements IButton {
    #private;
    constructor(config: IToolBarButtonConfig);
    set parent(parent: ToolBar);
    renderAsHTML(): HTMLElement;
}
export declare type ToolBarItem = ToolBarComboBox | ToolBarAccordian | ToolBarCounter | ToolBarButton;
export interface IToolBarConfig extends IComponentConfig {
    itemClassNames?: string[];
    items?: {
        [key: string]: {
            [key: string]: ToolBarItem;
        };
    };
    groupClassNames?: string[];
}
export interface IToolBar extends IComponent {
}
export declare class ToolBar extends Component implements IToolBar {
    #private;
    name: string;
    constructor(config: IToolBarConfig);
    group(index: string): {
        [key: string]: ToolBarItem;
    } | undefined;
    insert(group: string, label: string, item: ToolBarItem): boolean;
    groupHTML(name: string): HTMLElement;
    render(): HTMLElement;
    html(): HTMLElement;
    attachListeners(): void;
}
