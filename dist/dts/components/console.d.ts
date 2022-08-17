import { Formatter } from '../lib/formatter';
import { LogRecord } from '../lib/logger';
import { Component, IComponent, IComponentConfig } from './base';
import { ToolBar, ToolBarButton, ToolBarItem } from './toolbar';
export declare class ToolBarClearButton extends ToolBarButton {
    attachListeners(): void;
    handleClick(e: MouseEvent): void;
}
export interface IDebugConsoleComponentConfig extends IComponentConfig {
    mountTo: HTMLElement | string | null;
    toolbar?: ToolBar;
    formatter?: Formatter;
    headerClassNames?: string[];
    logClassNames?: string[];
    footerClassNames?: string[];
    headerId?: string;
    logId?: string;
    footerId?: string;
}
export interface IDebugConsole extends IComponent {
    headerId: string;
    logId: string;
    footerId: string;
    headerClassNames: string[];
    logClassNames: string[];
    footerClassNames: string[];
}
export declare class DebugConsole extends Component implements IDebugConsole {
    #private;
    name: string;
    constructor(config: IDebugConsoleComponentConfig);
    get headerId(): string;
    get logId(): string;
    get footerId(): string;
    get headerClassNames(): string[];
    get logClassNames(): string[];
    get footerClassNames(): string[];
    get isLogging(): boolean;
    get outputBuffer(): string[];
    get savedMessages(): LogRecord[];
    get filteredLoggers(): {
        [key: string]: boolean;
    };
    log(logRecord: LogRecord): void;
    open(mountTo?: HTMLElement | string | null): void;
    clear(): void;
    exit(): void;
    render(): HTMLElement;
    renderAsHTML(): HTMLElement;
    attachListeners(): void;
    defaultToolbarListeners(items: {
        [key: string]: ToolBarItem;
    }): void;
    static defaultToolbar(): ToolBar;
}
