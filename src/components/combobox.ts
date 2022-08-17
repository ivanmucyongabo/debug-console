/**
 * @fileoverview Simple combobox component.
 */

import union from 'lodash.union'

import { Component, IComponent, IComponentConfig } from './base'

const DEFAULT_SEPERATOR = '-'

export interface IComboBoxConfig extends IComponentConfig {
    inputId?: string
    inputClasses?: string[]
    btnId?: string
    btnClasses?: string[]
    listBoxId?: string
    listBoxClasses?: string[]
    listBoxItemClassNames?: string[]
    wrapperClassNames?: string[],
    containerClassNames?: string[],
    options: string[]
}

export interface IComboBox extends IComponent {}

/**
 * Class representing a combobox component.
 * 
 * @extends Component
 */
export class ComboBox extends Component implements IComboBox {
    name = 'combobox'
    #inputId_: string
    #inputClassNames_: string[]
    #btnId_: string
    #btnClassNames_: string[]
    #listBoxId_: string
    #listBoxClassNames_: string[]
    #listBoxItemClassNames_: string[]
    #containerClassNames_: string[]

    #options_: string[]
    #option_: string
    #firstOption_: string
    #lastOption_: string

    #filteredOptions_: string[]
    #filter_: string
    
    constructor(config: IComboBoxConfig) {
        super(config)

        this.#options_ = config.options
        this.#option_ = ''
        this.#firstOption_ = ''
        this.#lastOption_ = ''
    
        this.#filteredOptions_ = []
        this.#filter_ = ''

        this.#inputId_ =  config.inputId || `${this.name}${DEFAULT_SEPERATOR}${'input'.concat(this.id)}`
        this.#btnId_ =  config.btnId || `${this.name}${DEFAULT_SEPERATOR}${'btn'.concat(this.id)}`
        this.#listBoxId_ =  config.listBoxId || `${this.name}${DEFAULT_SEPERATOR}${'listbox'.concat(this.id)}`

        this.#inputClassNames_ = union(config.inputClasses || [], [`${this.name}${DEFAULT_SEPERATOR}input`])
        this.#btnClassNames_ = union(config.btnClasses || [], [`${this.name}${DEFAULT_SEPERATOR}button`])
        this.#listBoxClassNames_ = union(config.listBoxClasses || [], [`${this.name}${DEFAULT_SEPERATOR}listbox`])
        this.#listBoxItemClassNames_ = union(config.listBoxItemClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}listbox${DEFAULT_SEPERATOR}item`])
        this.#containerClassNames_ = union(config.containerClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}group`])
        this.classNames = union(config.wrapperClassNames || [], this.classNames, [this.name, `${this.name}${DEFAULT_SEPERATOR}list`])
    }

    get filter() {
        return this.#filter_
    }

    get filteredOptions() {
        return this.#filteredOptions_
    }

    get lastOption() {
        return this.#lastOption_
    }

    get option() {
        return this.#option_
    }

    get firstOption() {
        return this.#firstOption_
    }

    open() {
        this.toggle(true)
    }
    close() {
        this.toggle(false)
    }
    toggle(open: boolean) {
        return open
    }

    renderAsHTML(): HTMLElement {
        const html = super.renderAsHTML()

        const cont = document.createElement('div')
        cont.classList.add(...this.#containerClassNames_)
        cont.append(this.inputHTML(), this.btnHTML(), this.listboxHTML())

        html.append(cont)

        return html
    }
    btnHTML(): HTMLElement {
        const btn = document.createElement('button')
        btn.setAttribute('id', this.#btnId_)
        btn.classList.add(...this.#btnClassNames_)
        btn.setAttribute('value', 'level')
        btn.innerText = 'levels'

        return btn
    }
    inputHTML() {
        const input = document.createElement('input')
        input.setAttribute('id', this.#inputId_)
        input.setAttribute('type', 'text')
        input.classList.add(...this.#inputClassNames_)

        return input
    }
    listboxHTML() {
        const listbox = document.createElement('ul')
        listbox.setAttribute('id', this.#listBoxId_)
        listbox.setAttribute('type', 'text')
        listbox.setAttribute('role', 'listbox')
        listbox.classList.add(...this.#listBoxClassNames_)

        for(let i=0, options=this.#options_, option; option=options[i]; i++) {
            listbox.append(this.optHTML(option))
        }

        return listbox
    }
    optHTML(opt: string): HTMLElement {
        const option = document.createElement('li')
        option.classList.add(...this.#listBoxItemClassNames_)
        option.innerText = opt

        return option
    }
}
