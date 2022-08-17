import { Component } from "../../../src/components/base"

const elId = 'test-body'
const elCont = `<div id="${elId}"></div>`.toString()
const DEFAULT_TAG_NAME = 'div'
let component1: Component
let component2: Component

describe('component', () => {
    beforeAll(() => {
        component1 = new Component({})
        component2 = new Component({
            id: 'test-id',
            classNames: ['testClass'],
            tagName: 'button'
        })
    })

    beforeEach(() => {
        document.body.innerHTML = elCont
    })

    test('constructor', () => {
        expect(component1).toBeInstanceOf(Component)
        expect(component2).toBeInstanceOf(Component)
        expect(component1.element).toBeNull()
        expect(component2.element).toBeNull()

        expect(component1.tagName).toBe(DEFAULT_TAG_NAME)
        expect(component1.classNames).toContain('debugUI')
        expect(component1.classNames.length).toBe(1)

        expect(component2.tagName).toBe('button')
        expect(component2.classNames).toContain('testClass')
        expect(component2.classNames).toContain('debugUI')
        expect(component2.classNames.length).toBe(2)
    })

    test('html', () => {
        const node1 =  document.createElement(component1.tagName)
        node1.setAttribute('id', component1.id)
        node1.classList.add(...component1.classNames)

        const node2 =  document.createElement(component2.tagName)
        node2.setAttribute('id', component2.id)
        node2.classList.add(...component2.classNames)

        expect(node1.isEqualNode(component1.html())).toBe(true)
        expect(node2.isEqualNode(component2.html())).toBe(true)
        expect(component1.element).not.toBeNull()
        expect(component2.element).not.toBeNull()
        expect(component1.element).toBeInstanceOf(HTMLElement)
        expect(component2.element).toBeInstanceOf(HTMLElement)
    })
})