/**
 * @fileoverview Simple base component.
 */

import camelCase from 'lodash.camelcase'
import union from 'lodash.union'
import uniqueId from 'lodash.uniqueid'

const DEFAULT_TAG_NAME = 'div'

export interface IComponentConfig {
    /** ID for the HTMLElement. */
    id?: string,
    /** Classnames for the HTMLElement. */
    classNames?: string[],
    /** Tagname for the HTMLElement. */
    tagName?: string
}

export interface IComponent {
    id: string
    classNames: string[]
    tagName: string
    element: HTMLElement | null
    render(): HTMLElement
    renderAsString(): string
    renderAsHTML(): HTMLElement
    html(): HTMLElement
    attachListeners(): void
}

/** Class representing UI component. */
export class Component implements IComponent {
    /**
     * Name for the component class type.
     * 
     * @remarks
     * Recommend not changing this until a better solution is found.
     */
    name = 'debugUI'
    /**
     * Unique ID for component.
     * 
     * @private
     */
    #uuid_: string
    /** 
     * ID for the HTMLElement.
     * 
     * @private
     */
    #id_: string
    /** 
     * Classnames for the root HTMLElement.
     *
     * @private
     */
    #classNames_: string[]
    /** 
     * Tagname for the root HTMLElement.
     * 
     * @private
     */
    #tagName_: string
    /** 
     * Root HTMLElement for the component.
     * 
     * @private
     */
    #element_: HTMLElement | null

    /**
     * Create a UI component.
     * 
     * @param config - COnfigurable options for the component.
     */
    constructor(config: IComponentConfig) {
        this.#uuid_ = uniqueId()
        this.#id_ = config.id || (camelCase(this.constructor.name) + this.#uuid_)
        this.#tagName_ = config.tagName || DEFAULT_TAG_NAME
        this.#element_ = null
        this.#classNames_ = union(config.classNames || [], [this.name])
    }

    get id() {
        return this.#id_
    }
    get classNames() {
        return this.#classNames_
    }
    set classNames(classes: string[]) {
        this.#classNames_ = classes
    }

    get tagName() {
        return this.#tagName_
    }
    get element() {
        return this.#element_
    }
    set element(el: HTMLElement | null) {
        this.#element_ = el
    }

    /**
     * Render the component and attach listeners.
     * 
     * @remarks
     * Can be used for additional rendering tasks.
     * 
     * @returns UI component HTML.
     */
    render(): HTMLElement {
        const html = this.renderAsHTML()
        this.attachListeners()

        return html
    }

    /**
     * Render component as an html string.
     * 
     * @returns UI component as an HTML string.
     */
    renderAsString(): string {
        const html = this.renderAsHTML()

        return html.outerHTML
    }

    /**
     * Hook for building complex HTML from root html.
     * 
     * @returns HTMLElement
     */
    renderAsHTML(): HTMLElement {
        return this.html()
    }

    /** 
     * Create or get root HTML element.
     * 
     * @returns Root HTML element.
     */
    html(): HTMLElement {
        if (this.element) {
            return this.element
        }
        else {
            const el =  document.createElement(this.#tagName_)
            el.setAttribute('id', this.#id_)
            el.classList.add(...this.#classNames_)

            return this.element = el
        }        
    }

    /**
     * Hook for attaching listeners and handlers.
     * 
     * @returns 
     */
    attachListeners() {
        return
    }
}