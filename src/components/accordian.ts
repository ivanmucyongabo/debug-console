/**
 * @fileoverview Simple accordian component.
 */

import { CssIds, CssClasses, CssConfig, Component, IComponent } from './base';

interface AccordianTriggerCssIds extends CssIds {
    [index: string]: string;

    title: string,
    icon: string,
}

interface AccordianTriggerCssClasses extends CssClasses {
    [index: string]: string[];

    title: string[],
    icon: string[],
}

interface AccordianPanelCssIds extends CssIds {
    [index: string]: string;

    panel: string,
}

interface AccordianPanelCssClasses extends CssClasses {
    [index: string]: string[];

    panel: string[],
}

export interface AccordianTriggerCssConfig extends CssConfig {
    ids : AccordianTriggerCssIds,
    classes : AccordianTriggerCssClasses
}

export interface AccordianPanelCssConfig extends CssConfig {
    ids : AccordianPanelCssIds,
    classes : AccordianPanelCssClasses
}

export const ACCORDIAN_TRIGGER_DEFAULT_CSS: AccordianTriggerCssConfig = {
    ids: {
        title: 'accordian-title',
        icon: 'accordian-icon',
    },
    classes: {
        title: ['accordian-title'],
        icon: ['accordian-title'],
    }
};

export const ACCORDIAN_PANEL_DEFAULT_CSS: AccordianPanelCssConfig = {
    ids: {
        panel: 'accordian-panel',
    },
    classes: {
        panel: ['accordian-panel'],
    }
};

export interface IAccordianTrigger extends IComponent {
    open(): void;
    close(): void;
    toggle(): void;
    setAriaExpanded(expanded: string): void;
    setAriaControls(controls: string): void;
}

export interface IAccordianPanel extends IComponent {
    open(): void;
    close(): void;
    toggle(): void;
    setAriaLabelledBy(label: string): void;
    setHidden(hide: boolean): void;
}

export class AccordianTrigger extends Component implements IAccordianTrigger {
    #isExpanded_: boolean;
    #panel_: string;

    constructor(css?: AccordianTriggerCssConfig | {}, root?: string) {
        css = css || {};
        super({ ...css, ...ACCORDIAN_TRIGGER_DEFAULT_CSS}, root)
        this.#isExpanded_ = false;
        this.#panel_= '';
    }

    get isExpanded() {
        return this.#isExpanded_;
    }
    set isExpanded(expand: boolean) {
        this.setAriaExpanded(expand.toString());
        this.#isExpanded_ = expand;
    }

    get panel() {
        return this.#panel_;
    }
    set panel(panel: string) {
        this.setAriaControls(panel);
        this.#panel_ = panel;
    }

    open() {
        this.isExpanded = true;
    }
    close() {
        this.isExpanded = false;
    }
    toggle() {
        this.isExpanded = !this.#isExpanded_;
    }

    attachListeners() {
        this.element?.addEventListener('click', (e: MouseEvent) => this.#handleClick(e));
    }

    html(): HTMLElement {
        let accordionTriggerTitle = document.createElement('span');
        accordionTriggerTitle.setAttribute('id', this.ids.title);
        accordionTriggerTitle.classList.add(...this.classes.title);

        let accordionTriggerIcon = document.createElement('span');
        accordionTriggerTitle.setAttribute('id', this.ids.icon);
        accordionTriggerTitle.classList.add(...this.classes.icon);

        this.element = super.html();
        this.element.setAttribute('aria-expanded', this.#isExpanded_.toString());
        this.element.setAttribute('aria-controls', this.#panel_);
        this.element.append(
            accordionTriggerTitle,
            accordionTriggerIcon
        );

        return this.element;
    }
    setAriaExpanded(expanded: string): void {
        this.element?.setAttribute('aria-expanded', expanded);
    }
    setAriaControls(controls: string): void {
        this.element?.setAttribute('aria-controls', controls);
    }

    #handleClick(e: MouseEvent) {
        this.isExpanded = !this.#isExpanded_
    }
}

export class AccordianPanel extends Component implements IAccordianPanel {
    #isHidden_: boolean;
    #trigger_: string;

    constructor(css?: AccordianPanelCssConfig | {}, root?: string) {
        css = css || {};
        super({ ...css, ...ACCORDIAN_PANEL_DEFAULT_CSS}, root)

        this.#isHidden_ = true;
        this.#trigger_ = '';
    }

    get trigger() {
        return this.#trigger_;
    }
    set trigger(trigger: string) {
        this.setAriaLabelledBy(trigger);
        this.#trigger_ = trigger;
    }

    get isHidden() {
        return this.#isHidden_;
    }
    set isHidden(hide: boolean) {
        this.setHidden(hide);
        this.#isHidden_ = hide;
    }

    open(): void {
        this.isHidden = false;
    }
    close(): void {
        this.isHidden = true;
    }
    toggle(): void {
        this.isHidden = !this.#isHidden_;
    }

    html(): HTMLElement {
        this.element = super.html();
        this.element.setAttribute('role', 'region');
        this.element.setAttribute('aria-labelledby', this.#trigger_);
        this.#isHidden_ ? this.element.setAttribute('hidden', 'hidden') : this.element.removeAttribute('hidden');

        return this.element;
    }
    setAriaLabelledBy(label: string): void {
        this.element?.setAttribute('aria-labelledby', label);
    }
    setHidden(hide: boolean): void {
        hide ? this.element?.setAttribute('hidden', 'hidden') : this.element?.removeAttribute('hidden');
    }
}
