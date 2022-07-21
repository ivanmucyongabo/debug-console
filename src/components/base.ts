/**
 * @fileoverview Simple base component.
 */

import uniqueId from 'lodash.uniqueid';
import camelCase from 'lodash.camelcase';

export interface CssIds {
    [index: string]: string;
}

export interface CssClasses {
    [index: string]: string[];
}

export interface CssConfig {
    classNames?: string[],
    ids : CssIds,
    classes : CssClasses
}

export interface IComponent  {
    render(root?: string): HTMLElement;
    renderAsString(root?: string): string;
    renderAsHtml(root?: string): HTMLElement;
    html(): HTMLElement;
    clearHtml(el: HTMLElement): HTMLElement;
    attachListeners(): void;
    customizeCss(prepend?: string, seperator?: string, append?: string): void;
    customizeCssIds(prepend?: string, seperator?: string): void;
    customizeCssClassNames(prepend?: string, seperator?: string): void;
    customizeCssChildrenClasses(prepend?: string, seperator?: string, append?: string): void;
    get uuid(): string;
    get id(): string;
    get className(): string;
    get classNames(): string[];
    get element(): HTMLElement | null;
    get ids(): {[index: string]: string;};
    get classes(): {[index: string]: string[];};
    set uuid(uuid: string);
    set id(id: string);
    set element(el: HTMLElement | null);
}

export class Component implements IComponent {
    #uuid_: string;
    #id_: string;
    #className_: string;
    #classNames_: string[];
    #ids_: {
        [index: string]: string;
    };
    #classes_: {
        [index: string]: string[];
    };
    #tagName_: string;
    #element_: HTMLElement | null;

    constructor(css: CssConfig, root?: string) {
        this.#uuid_ = uniqueId();
        this.#id_ = uniqueId(camelCase(this.constructor.name));
        this.#className_ = camelCase(this.constructor.name);
        this.#classNames_ = css.classNames || [this.#className_];
        this.#element_ = null;
        this.#ids_ = { ...css.ids };
        this.#classes_ = { ...css.classes };
        this.#tagName_ = 'div';
        this.customizeCss(root);
    }

    get uuid() {
        return this.#uuid_;
    }
    set uuid(uuid: string) {
        this.#uuid_ = uuid;
    }

    get id() {
        return this.#id_;
    }
    set id(id: string) {
        this.#id_ = id;
    }

    get className() {
        return this.#className_;
    }

    get classNames() {
        return this.#classNames_;
    }

    get tagName() {
        return this.#tagName_;
    }
    set tagName(tag: string) {
        this.#tagName_ = tag;
    }

    get element() {
        return this.#element_;
    }
    set element(el: HTMLElement | null) {
        this.#element_ = el;
    }

    get ids() {
        return this.#ids_;
    }

    get classes() {
        return this.#classes_;
    }

    customizeCss(prepend?: string, seperator?: string, append?: string): void {
        this.customizeCssIds(prepend, seperator);
        this.customizeCssClassNames(prepend, seperator);
        this.customizeCssChildrenClasses(prepend, seperator, append);
    }
    customizeCssIds(prepend?: string, seperator?: string): void {
        prepend = prepend || this.#id_;
        seperator = seperator || '-';
        let oldCss = this.#ids_;

        for (const prop in oldCss) {
            this.#ids_[prop] = [prepend, oldCss[prop]].join(seperator);
        }
    }
    customizeCssClassNames(prepend?: string, seperator?: string): void {
        prepend = prepend || '';
        seperator = seperator || '-';

        this.#classNames_.unshift([prepend, this.#className_].join(seperator));
    }
    customizeCssChildrenClasses(prepend?: string, seperator?: string, append?: string): void {
        prepend = prepend || this.#className_;
        seperator = seperator || '-';
        append = append || '';
        let oldCss = this.#classes_;

        for (const prop in oldCss) {
            oldCss[prop].unshift([prepend, prop, append].join(seperator));
            this.#classes_[prop] = oldCss[prop];
        }
    }

    render(root?: string): HTMLElement {
        let html = this.renderAsHtml(root);
        this.attachListeners();

        return html;
    }
    renderAsString(root?: string): string {
        let html = this.renderAsHtml(root);

        return html.outerHTML;
    }
    renderAsHtml(root?: string): HTMLElement {
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

            return el;
        }
    }
    clearHtml(el: HTMLElement): HTMLElement {
        // el.innerHTML = "";
        while (el.firstChild) el.removeChild(el.firstChild);

        return el;
    }

    attachListeners() {}
}
