/**
 * @fileoverview Simple button component.
 */

import { CssIds, CssClasses, CssConfig, Component, IComponent } from './base';

interface ButtonCssIds extends CssIds {
    title: string,
    icon: string
}

interface ButtonCssClasses extends CssClasses {
    title: string[],
    icon: string[]
}

interface ButtonCssConfig extends CssConfig {
    ids : ButtonCssIds,
    classes : ButtonCssClasses
}

export const BUTTON_DEFAULT_CSS: ButtonCssConfig = {
    ids: {
        title: 'btn-icon',
        icon: 'btn-icon'
    },
    classes: {
        title: ['btn-title'],
        icon: ['btn-icon']
    }
};

export class Button extends Component {
    #label_: string;
    #isPressed_: boolean;
    #isDisabled_: boolean;
    #tabIndex_: string;

    constructor(label?: string,  root?: string, css?: ButtonCssConfig | {}) {
        css = css || {};
        super({ ...css, ...BUTTON_DEFAULT_CSS}, root)
        this.tagName = 'button';
        this.#isPressed_ = false;
        this.#isDisabled_ = false;
        this.#label_ = label || '';
        this.#tabIndex_ = '-1';
    }
    setAriaPressed() {}
    setTabIndex() {}
    setValue() {}
    setLabel() {}
    setAriaControls() {}
    setAriaDisabled() {}
    setAriaHasPopup() {}
}
