import { Counter } from "../../../src/components/counter"

const elId = 'test-body'
const elCont = `<div id="${elId}"></div>`.toString()
const DEFAULT_TAG_NAME = 'div'
let counter1: Counter
let counter2: Counter

describe('counter', () => {
    beforeAll(() => {
        counter1 = new Counter({
            label: 'counter'
        })
        counter2 = new Counter({
            id: 'test-id',
            classNames: ['testClass'],
            tagName: 'div',
            label: 'divCounter'
        })
    })

    beforeEach(() => {
        document.body.innerHTML = elCont
    })

    test('constructor', () => {
        expect(counter1).toBeInstanceOf(Counter)
        expect(counter2).toBeInstanceOf(Counter)
        expect(counter1.element).toBeNull()
        expect(counter2.element).toBeNull()

        expect(counter1.tagName).toBe(DEFAULT_TAG_NAME)
        expect(counter1.classNames).toContain('debugUI')
        expect(counter1.classNames.length).toBe(2)

        expect(counter2.tagName).toBe('div')
        expect(counter2.classNames).toContain('testClass')
        expect(counter2.classNames).toContain('debugUI')
        expect(counter2.classNames.length).toBe(3)
    })

    test('html', () => {
        const node1 =  document.createElement(counter1.tagName)
        node1.setAttribute('id', counter1.id)
        node1.classList.add(...counter1.classNames)

        const node2 =  document.createElement(counter2.tagName)
        node2.setAttribute('id', counter2.id)
        node2.classList.add(...counter2.classNames)

        expect(node1.isEqualNode(counter1.html())).toBe(true)
        expect(node2.isEqualNode(counter2.html())).toBe(true)
        expect(counter1.element).not.toBeNull()
        expect(counter2.element).not.toBeNull()
        expect(counter1.element).toBeInstanceOf(HTMLElement)
        expect(counter2.element).toBeInstanceOf(HTMLElement)
    })
})