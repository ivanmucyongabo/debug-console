/**
 * @fileoverview Simple accordian component.
 */

import union from 'lodash.union'

import { Button, IButton, IButtonConfig } from './button'

export interface IAccordianConfig extends IButtonConfig {
    panelClassNames?: string[]
    panelId?: string
    panel: string    
}

export interface IAccordian extends IButton {}

export class Accordian extends Button implements IAccordian {
    name = 'accordian'
    #panelClassNames_: string[]
    #panelId_: string
    constructor(config: IAccordianConfig) {
        super(config)

        this.#panelId_ = config.panelId || ''
        this.#panelClassNames_ = union(config.panelClassNames||[], [])
    }

    render() {
        const html = super.render()

        const panel = document.createElement('div')
        panel.setAttribute('id', this.#panelId_)
        panel.classList.add(...this.#panelClassNames_)

        return html
    }
}
