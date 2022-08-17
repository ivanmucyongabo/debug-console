/**
 * @fileoverview Simple toolbar component.
 */

import union from 'lodash.union'

import { Accordian, IAccordian, IAccordianConfig } from './accordian'
import { Component, IComponent, IComponentConfig } from './base'
import { Button, IButton, IButtonConfig } from './button'
import { ComboBox, IComboBox, IComboBoxConfig } from './combobox'
import { Counter, ICounter, ICounterConfig } from './counter'

const DEFAULT_SEPERATOR = '-'

export interface IToolBarItemConfig {
    toolbar?: ToolBar
}
export interface IToolBarComboBoxConfig extends IComboBoxConfig, IToolBarItemConfig {}
export interface IToolBarAccordianConfig extends IAccordianConfig, IToolBarItemConfig {}
export interface IToolBarCounterConfig extends ICounterConfig, IToolBarItemConfig {}
export interface IToolBarButtonConfig extends IButtonConfig, IToolBarItemConfig {}

/**
 * Class representing toolbar combobox component.
 * 
 * @extends ComboBox
 */
export class ToolBarComboBox extends ComboBox implements IComboBox {
    #parent_?: ToolBar
    constructor(config: IToolBarComboBoxConfig) {
        super(config)
        this.#parent_ = config.toolbar
    }
    set parent(parent: ToolBar) {
        this.#parent_ = parent
    }
    renderAsHTML(): HTMLElement {
        const html = super.renderAsHTML()

        if (this.#parent_) {
            html.classList.add(...[`${this.#parent_.name}-item`, `${this.#parent_.name}-${this.name}`])
        }
        return html
    }
}

/**
 * Class representing toolbar accordian component.
 * 
 * @extends Accordian
 */
export class ToolBarAccordian extends Accordian implements IAccordian {
    #parent_?: ToolBar
    constructor(config: IToolBarAccordianConfig) {
        config.classNames = union(config.classNames || [], [])
        super(config)
        this.#parent_ = config.toolbar
    }
    set parent(parent: ToolBar) {
        this.#parent_ = parent
    }
    renderAsHTML(): HTMLElement {
        const html = super.renderAsHTML()

        if (this.#parent_) {
            html.classList.add(...[`${this.#parent_.name}-item`, `${this.#parent_.name}-${this.name}`])
        }
        return html
    }
}

/**
 * Class representing toolbar counter component.
 * 
 * @extends Counter
 */
export class ToolBarCounter extends Counter implements ICounter {
    #parent_?: ToolBar
    constructor(config: IToolBarCounterConfig) {
        config.classNames = union(config.classNames || [], [])
        super(config)
        this.#parent_ = config.toolbar
    }
    set parent(parent: ToolBar) {
        this.#parent_ = parent
    }
    renderAsHTML(): HTMLElement {
        const html = super.renderAsHTML()

        if (this.#parent_) {
            html.classList.add(...[`${this.#parent_.name}-item`, `${this.#parent_.name}-${this.name}`])
        }
        return html
    }
}

/**
 * Class representing toolbar button component.
 * 
 * @extends Button
 */
export class ToolBarButton extends Button implements IButton {
    #parent_?: ToolBar

    constructor(config: IToolBarButtonConfig) {
        config.classNames = union(config.classNames || [], [])
        super(config)
        this.#parent_ = config.toolbar
    }

    set parent(parent: ToolBar) {
        this.#parent_ = parent
    }

    renderAsHTML(): HTMLElement {
        const html = super.renderAsHTML()

        if (this.#parent_) {
            html.classList.add(...[`${this.#parent_.name}-item`, `${this.#parent_.name}-${this.name}`])
        }
        return html
    }
}

export type ToolBarItem = ToolBarComboBox|ToolBarAccordian|ToolBarCounter|ToolBarButton

/**
 * Configurable options for toolbar.
 */
export interface IToolBarConfig extends IComponentConfig {
    /** Classnames for toolbar items. */
    itemClassNames?: string[],
    /** Toolbar items. */
    items?: {
        [key: string]: ToolBarItem[]
    },
    /** Classnames for toolbar groups. */
    groupClassNames?: string[]
}

export interface IToolBar extends IComponent {}

/**
 * Class representing toolbar component.
 * 
 * @extends Component
 */
export class ToolBar extends Component implements IToolBar {
    name = 'toolbar'
    #itemClassNames_: string[]
    #groupClassNames_: string[]
    #items_: {
        [key: string]: ToolBarItem[]
    }

    constructor(config: IToolBarConfig) {
        super(config)
        this.#items_ = config.items || {}
        this.#itemClassNames_ = union(config.itemClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}item`])
        this.#groupClassNames_ = union(config.groupClassNames || [], [`${this.name}-group`, 'group'])
        this.classNames = union(this.classNames, [this.name])

        for(let i=0, groups=Object.values(this.#items_), group; group=groups[i]; i++) {
            for(let j=0, items=group, item; item=items[j]; j++) {
                item.parent = this
            }
        }
    }

    group(index: string): ToolBarItem[]|undefined {
        return this.#items_[index]
    }

    insert(group: string, item: ToolBarItem): boolean {
        let initialInsert = false

        if (!this.#items_[group]) {
            initialInsert = true
            this.#items_[group] = []
        }

        if (!item.parent || item.parent !== this) {
            item.parent = this
        }

        this.#items_[group].push(item)

        return initialInsert
    }

    groupHTML(name: string): HTMLElement {
        const groupEl = document.createElement('div')
        groupEl.classList.add(...this.#groupClassNames_)

        return groupEl
    }

    render(): HTMLElement {
        const html = super.render()

        const itemsCopy = this.#items_

        for(let i=0, groups=Object.keys(itemsCopy), group; group=groups[i]; i++) {
            const groupHTML = this.groupHTML(group)

            for(let j=0, items=itemsCopy[group], item; item=items[j]; j++) {
                const itemEl = item.render()
                itemEl.classList.add(...this.#itemClassNames_)
                groupHTML.append(itemEl)
            }
            
            html.append(groupHTML)
        }

        return html
    }

    html(): HTMLElement {
        const html = super.html()
        html.setAttribute('role', 'toolbar')

        return html
    }

    attachListeners() {
        super.attachListeners()
    }
}