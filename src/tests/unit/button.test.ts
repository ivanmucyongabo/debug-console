import { Button } from "../../../src/components/button"

const elId = 'test-body'
const elCont = `<div id="${elId}"></div>`.toString()
const DEFAULT_TAG_NAME = 'button'
let button1: Button
let button2: Button

describe('button', () => {
    beforeAll(() => {
        button1 = new Button({
            label: 'button'
        })
        button2 = new Button({
            id: 'test-id',
            classNames: ['testClass'],
            tagName: 'div',
            label: 'divButton'
        })
    })

    beforeEach(() => {
        document.body.innerHTML = elCont
    })

    test('constructor', () => {
        expect(button1).toBeInstanceOf(Button)
        expect(button2).toBeInstanceOf(Button)
        expect(button1.element).toBeNull()
        expect(button2.element).toBeNull()

        expect(button1.tagName).toBe(DEFAULT_TAG_NAME)
        expect(button1.classNames).toContain('debugUI')
        expect(button1.classNames.length).toBe(2)

        expect(button2.tagName).toBe('div')
        expect(button2.classNames).toContain('testClass')
        expect(button2.classNames).toContain('debugUI')
        expect(button2.classNames.length).toBe(3)
    })

    test('html', () => {
        const node1 =  document.createElement(button1.tagName)
        node1.setAttribute('id', button1.id)
        node1.classList.add(...button1.classNames)

        const node2 =  document.createElement(button2.tagName)
        node2.setAttribute('id', button2.id)
        node2.classList.add(...button2.classNames)

        expect(node1.isEqualNode(button1.html())).toBe(true)
        expect(node2.isEqualNode(button2.html())).toBe(true)
        expect(button1.element).not.toBeNull()
        expect(button2.element).not.toBeNull()
        expect(button1.element).toBeInstanceOf(HTMLElement)
        expect(button2.element).toBeInstanceOf(HTMLElement)
    })
})