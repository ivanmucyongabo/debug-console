/**
 * @fileoverview Simple button component.
 */

import { Component, IComponent, IComponentConfig } from './base';
import union from 'lodash.union';

const DEFAULT_SEPERATOR = '-';

export interface IButtonConfig extends IComponentConfig{
    label: string,
    icon?: string,
    labelClassNames?: string[],
    iconclassNames?: string[]
    labelId?: string,
    iconId?: string,
    isPressed?: boolean,
    isDisabled?: boolean,
    tabIndex?: number
}

export interface IButton extends IComponent {}

export class Button extends Component implements IButton {
    name:string = 'button';
    #label_: string;
    #icon_?: string;
    #labelClassNames_: string[];
    #iconClassNames_: string[];
    #labelId_: string;
    #iconId_: string;
    #isPressed_: boolean;
    #isDisabled_: boolean;
    #tabIndex_: number;

    constructor(config: IButtonConfig) {
        config.tagName = config.tagName || 'button';

        super(config)

        this.#label_ = config.label;
        this.#icon_ = config.icon;
        this.#labelClassNames_ = config.labelClassNames || [];
        this.#iconClassNames_ = config.iconclassNames || [];
        this.#isPressed_ = config.isPressed || false;
        this.#isDisabled_ = config.isDisabled || false;
        this.#tabIndex_ = config.tabIndex || -1;

        this.#labelId_ = config.labelId || `label${DEFAULT_SEPERATOR}${this.id}`;
        this.#iconId_ = config.iconId || `icon${DEFAULT_SEPERATOR}${this.id}`;

        this.classNames = union(this.classNames, [this.name]);
        this.#labelClassNames_ = union(config.labelClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}label`]);
        this.#iconClassNames_ = union(config.iconclassNames || [], [`${this.name}${DEFAULT_SEPERATOR}icon`]);
    }

    get label(): string {
        return this.#label_;
    }

    renderAsHTML(): HTMLElement {
        let html = super.renderAsHTML();

        html.append(
            this.#label_,
            this.iconHTML(this.#icon_)
        );

        return html;
    }

    labelHTML(label: string) {
        let html = document.createElement('span')
        html.setAttribute('id', this.#labelId_)
        html.classList.add(...this.#labelClassNames_)
        html.innerText = label;

        return html;
    }

    iconHTML(icon?: string) {
        let html = document.createElement('span')
        html.setAttribute('id', this.#iconId_)
        html.classList.add(...this.#iconClassNames_)
        html.innerHTML = icon || '';

        return html;
    }
}