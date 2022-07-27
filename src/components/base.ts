/**
 * @fileoverview Simple base component.
 */

import uniqueId from 'lodash.uniqueid';
import camelCase from 'lodash.camelcase';
import union from 'lodash.union';

const DEFAULT_TAG_NAME = 'div';

export interface IComponentConfig {
    id?: string,
    classNames?: string[],
    tagName?: string
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

export class Component implements IComponent {
    name:string = 'debugUI';
    #uuid_: string;
    #id_: string;
    #classNames_: string[];
    #tagName_: string;
    #element_: HTMLElement | null;

    constructor(config: IComponentConfig) {
        this.#uuid_ = uniqueId();
        this.#id_ = config.id || (camelCase(this.constructor.name) + this.#uuid_);
        this.#tagName_ = config.tagName || DEFAULT_TAG_NAME;
        this.#element_ = null;
        this.#classNames_ = union(config.classNames || [], [this.name]);
    }

    get id() {
        return this.#id_;
    }
    get classNames() {
        return this.#classNames_;
    }
    set classNames(classes: string[]) {
        this.#classNames_ = classes;
    }

    get tagName() {
        return this.#tagName_;
    }
    get element() {
        return this.#element_;
    }
    set element(el: HTMLElement | null) {
        this.#element_ = el;
    }

    render(): HTMLElement {
        let html = this.renderAsHTML();
        this.attachListeners();

        return html;
    }
    renderAsString(): string {
        let html = this.renderAsHTML();

        return html.outerHTML;
    }
    renderAsHTML(): HTMLElement {
        return this.html();
    }

    html(): HTMLElement {
        if (this.element) {
            return this.element;
        }
        else {
            let el =  document.createElement(this.#tagName_);
            el.setAttribute('id', this.#id_);
            el.classList.add(...this.#classNames_);

            return this.element = el;
        }        
    }
    attachListeners() {}
}