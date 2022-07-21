/**
 * @fileoverview Simple toolbar component.
 */

import { AccordianPanel, AccordianPanelCssConfig, AccordianTrigger, AccordianTriggerCssConfig } from './accordian';
import { CssIds, CssClasses, CssConfig, Component, IComponent } from './base';
import { Button } from './button';
import { ComboBox } from './combobox';
import { Counter } from './counter';

interface ToolBarCssIds extends CssIds {
    [index: string]: string;

    container: string,
    combobox: string,
    select: string,
    btn: string,
}

interface ToolBarCssClasses extends CssClasses {
    [index: string]: string[];

    container: string[],
    combobox: string[],
    select: string[],
    btn: string[],
}

interface ToolBarCssConfig extends CssConfig {
    ids : ToolBarCssIds,
    classes : ToolBarCssClasses
}

export const TOOLBAR_DEFAULT_CSS: ToolBarCssConfig = {
    ids: {
        container: 'toolbar',
        combobox: 'toolbar-combobox',
        select: 'toolbar-select',
        btn: 'toolbar-btn',
    },
    classes: {
        container: ['toolbar'],
        combobox: ['toolbar-combobox'],
        select: ['toolbar-select'],
        btn: ['toolbar-btn'],
    }
};

export class ToolBarComboButton extends ComboBox {
    constructor() {
        super(...arguments)
    }

    html(): HTMLElement {
        let inner = super.html();
        let wrapper = document.createElement('div');
        wrapper.append(inner);

        return this.element = inner;
    }
}
export class ToolBarAccordianTrigger extends AccordianTrigger {
    constructor(...args: (string | AccordianTriggerCssConfig | undefined)[]) {
        super(...args)
    }

    html(): HTMLElement {
        let inner = super.html();
        let wrapper = document.createElement('div');
        wrapper.append(inner);

        return this.element = inner;
    }
}
export class ToolBarAccordian {
    trigger: ToolBarAccordianTrigger;
    panel: AccordianPanel;

    constructor(root?: string, css?: {trigger?: AccordianTriggerCssConfig, panel?: AccordianPanelCssConfig}) {
        this.trigger = new ToolBarAccordianTrigger(css?.trigger, root);
        this.panel = new AccordianPanel(css?.panel, root);
    }
}
export class ToolBarCounter extends Counter {
    constructor() {
        super(...arguments)
    }

    html(): HTMLElement {
        let inner = super.html();
        let wrapper = document.createElement('div');
        wrapper.append(inner);

        return this.element = inner;
    }
}
export class ToolBarButton extends Button {
    constructor() {
        super(...arguments)
    }

    html(): HTMLElement {
        let inner = super.html();
        let wrapper = document.createElement('div');
        wrapper.append(inner);

        return this.element = inner;
    }
}

export class ToolBarGroup {
    #items_: (ToolBarButton|ToolBarCounter|ToolBarComboButton|ToolBarAccordian)[];

    constructor() {
        this.#items_ = [];
    }

    get items() {
        return this.#items_;
    }

    insert(item: ToolBarButton|ToolBarCounter|ToolBarComboButton|ToolBarAccordian) {
        this.#items_.push(item);
    }
    remove() {}
}

export interface IToolBar extends IComponent {
    get groups(): {[index: string]: ToolBarGroup};
    insert(key: string, item: ToolBarButton|ToolBarCounter|ToolBarComboButton|ToolBarAccordian): boolean;
    remove(key: string): boolean;
}

export class ToolBar extends Component implements IToolBar {
    #wrapperEl_: HTMLElement | null;
    #groups_: {
        [index: string]: ToolBarGroup
    };

    constructor(css?: ToolBarCssConfig | {}, root?: string) {
        css = css || {};
        super({ ...css, ...TOOLBAR_DEFAULT_CSS}, root)
        this.#wrapperEl_ = null;
        this.#groups_ = {};
    }

    get groups() {
        return this.#groups_;
    }

    insert(key: string, item: ToolBarButton|ToolBarCounter|ToolBarComboButton|ToolBarAccordian) {
        let initialInsert = false;

        if (!this.#groups_[key]) {
            initialInsert = true;
            this.#groups_[key] = new ToolBarGroup();
        }

        this.#groups_[key].insert(item);

        return initialInsert;
    }

    remove(key: string): boolean {
        let existsAndRemoved = false;

        if (this.#groups_[key]) {
            this.#groups_[key].remove();
            existsAndRemoved = true;
        }

        return existsAndRemoved;
    }

    html(): HTMLElement {
        let groups = this.#groups_;
        let toolbarEl = super.html();
        let toolbarWrapperEl = document.createElement('div');
        let toolbarAccordiansGroupEl = document.createElement('div');

        for (const prop in groups) {
            let group = groups[prop];
            let groupEl = this.#groupHtml_(prop);
            for (let i=0, items=group.items, item; item=items[i]; i++) {
                if (item instanceof ToolBarAccordian) {
                    groupEl.append(item.trigger.renderAsHtml());
                    toolbarAccordiansGroupEl.append(item.panel.renderAsHtml())
                }
                else {
                    groupEl.append(item.renderAsHtml());
                }
            }
            toolbarEl.append(groupEl);
        }

        toolbarWrapperEl.append(
            toolbarEl,
            toolbarAccordiansGroupEl
        );

        this.#wrapperEl_ = toolbarWrapperEl;
        this.element = toolbarEl;

        return this.element;
    }

    setAriaLabel(label: string) {
        this.element?.setAttribute('aria-label', label);
    }
    setAriaControls(controls: string) {
        this.element?.setAttribute('aria-controls', controls);
    }
    setRole(role: string) {
        this.element?.setAttribute('role', role);
    }

    #groupHtml_(group: string): HTMLElement {
        let groupEl = document.createElement('div');
        groupEl.classList.add('group', group);

        return groupEl;
    }
}
