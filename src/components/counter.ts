/**
 * @fileoverview Simple counter component.
 */

import union from 'lodash.union'

import { Component, IComponent, IComponentConfig } from './base'

const DEFAULT_SEPERATOR = '-'
const DEFAULT_TAGNAME = 'div'

/**
 * Configurable options for counter component.
 */
export interface ICounterConfig extends IComponentConfig {
  /** Label for HTML. */
  label: string
  /** Min value for counter. */
  min?: number
  /** Max value for counter. */
  max?: number
  /** Classnames for count HTML. */
  countClassNames?: string[]
  /** ID for count HTML. */
  countId?: string
}

export interface ICounter extends IComponent {}

/**
 * Class representing counter component.
 *
 * @extends Component
 */
export class Counter extends Component implements ICounter {
  name = 'counter'
  #countClassNames_: string[]
  #countId_: string
  #label_: string

  #count_: number

  constructor(config: ICounterConfig) {
    config.tagName = config.tagName || DEFAULT_TAGNAME
    super(config)
    this.#count_ = 0

    this.#label_ = config.label
    this.#countId_ = config.countId || `${this.name}${DEFAULT_SEPERATOR}${'count'.concat(this.id)}`
    this.#countClassNames_ = union(config.countClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}count`])
    this.classNames = union(this.classNames, [this.name])
  }

  get count() {
    return this.#count_
  }
  set count(count: number) {
    this.#count_ = count
    this.setCount(this.#count_)
  }

  setCount(count: number) {
    console.log('setCount')
    const el = this.element
    if (el) {
      const countEl = document.getElementById(`${this.#countId_}`)
      countEl!.innerText = count.toString()
    }
  }

  increment(delta: number) {
    const oldCount = this.#count_
    this.count = oldCount + delta
  }

  renderAsHTML(): HTMLElement {
    const html = super.renderAsHTML()

    const count = document.createElement('span')
    count.classList.add(...this.#countClassNames_)
    count.setAttribute('id', this.#countId_)
    count.innerText = this.#count_.toString()

    html.append(this.#label_, count)

    return html
  }
}
