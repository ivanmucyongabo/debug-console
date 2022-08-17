export interface IComponentConfig {
    id?: string;
    classNames?: string[];
    tagName?: string;
}
export interface IComponent {
    id: string;
    classNames: string[];
    tagName: string;
    element: HTMLElement | null;
    render(): HTMLElement;
    renderAsString(): string;
    renderAsHTML(): HTMLElement;
    html(): HTMLElement;
    attachListeners(): void;
}
export declare class Component implements IComponent {
    #private;
    name: string;
    constructor(config: IComponentConfig);
    get id(): string;
    get classNames(): string[];
    set classNames(classes: string[]);
    get tagName(): string;
    get element(): HTMLElement | null;
    set element(el: HTMLElement | null);
    render(): HTMLElement;
    renderAsString(): string;
    renderAsHTML(): HTMLElement;
    html(): HTMLElement;
    attachListeners(): void;
}
