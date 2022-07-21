/**
 * @fileoverview Simple combobox component.
 */

import { CssIds, CssClasses, CssConfig, Component, IComponent } from './base';

interface ComboBoxCssIds extends CssIds {
    container: string,
    combobox: string,
    input: string,
    btn: string,
    listbox: string,
    listboxItem: string
}

interface ComboBoxCssClasses extends CssClasses {
    container: string[],
    combobox: string[],
    input: string[],
    btn: string[],
    listbox: string[],
    listboxItem: string[]
}

interface ComboBoxCssConfig extends CssConfig {
    ids : ComboBoxCssIds,
    classes : ComboBoxCssClasses
}

export const COMBOBOX_DEFAULT_CSS: ComboBoxCssConfig = {
    ids: {
        container: 'combobox',
        combobox: 'combobox-group',
        input: 'combobox-input',
        btn: 'combobox-button',
        listbox: 'combobox-listbox',
        listboxItem: 'combobox-listbox-item'
    },
    classes: {
        container: ['combobox', 'combobox-list'],
        combobox: ['combobox-group'],
        input: ['combobox-input'],
        btn: ['combobox-btn'],
        listbox: ['combobox-listbox'],
        listboxItem: ['combobox-listbox-item']
    }
};

export interface IComboBox extends IComponent {
    open(): void;
    close(): void;
    toggle(open: boolean): void;
    get options(): string[];
    set options(options: string[]);
    get filter(): string;
    set filter(filter: string);
    get input(): HTMLElement | null;
    get btn(): HTMLElement | null;
    get listbox(): HTMLElement | null;
    get option(): string;
    get firstOption(): string;
    get lastOption(): string;
}

export class ComboBox extends Component implements IComboBox{
    #input_: HTMLElement | null;
    #btn_: HTMLElement | null;
    #listbox_: HTMLElement | null;

    #allOptions_: string[];
    #option_: string;
    #firstOption_: string;
    #lastOption_: string;

    #filteredOptions_: string[];
    #filter_: string;

    constructor(options: string[] = [], css?: ComboBoxCssConfig | {}, root?: string) {
        css = css || {};
        super({ ...css, ...COMBOBOX_DEFAULT_CSS}, root);

        this.#input_ =  null;
        this.#btn_ = null;
        this.#listbox_ = null;

        this.#allOptions_ = options;
        this.#filteredOptions_ = [];
        this.#option_ = '';
        this.#firstOption_ = '';
        this.#lastOption_ = '';
        this.#filter_ = '';
    }

    get options() {
        return this.#allOptions_;
    }
    set options(options: string[]) {
        this.#allOptions_ = options;
    }

    get filter() {
        return this.#filter_;
    }
    set filter(filter: string) {
        this.#filter_ = filter;
    }

    get input() {
        return this.#input_;
    }

    get btn() {
        return this.#btn_;
    }

    get listbox() {
        return this.#listbox_;
    }

    get option() {
        return this.#option_;
    }

    get firstOption() {
        return this.#firstOption_;
    }

    get lastOption() {
        return this.#lastOption_;
    }

    attachListeners() {
        this.#input_ = document.getElementById(this.ids.input);
        this.#btn_ = document.getElementById(this.ids.btn);
        this.#listbox_ = document.getElementById(this.ids.listbox);

        this.#input_?.addEventListener('keydown', (e: KeyboardEvent) => this.#handleInputKeydown(e));
        this.#input_?.addEventListener('keyup', (e: KeyboardEvent) => this.#handleInputKeyup(e));
        this.#input_?.addEventListener('click', (e: MouseEvent) => this.#handleInputClick(e));
        this.#input_?.addEventListener('focus', (e: Event) => this.#handleInputFocus(e));
        this.#input_?.addEventListener('blur', (e: Event) => this.#handleInputBlur(e));

        this.#btn_?.addEventListener('click', (e: MouseEvent) => this.#handleBtnClick(e));

        this.#listbox_?.addEventListener('click', (e: MouseEvent) => this.#handleLListboxClick(e));

        super.attachListeners();
    }

    open() {
        this.toggle(true);
    }
    close() {
        this.toggle(false);
    }
    toggle(open: boolean) {
        if (this.#listbox_) {
            let dispaly = open ? 'block' : 'hidden'
            let expanded = open.toString();

            this.#listbox_.style.display = dispaly;
            this.#input_?.setAttribute('aria-expanded', expanded);
            this.#btn_?.setAttribute('aria-expanded', expanded);
        }
    }

    #handleInputKeydown(e: KeyboardEvent): void {
    }
    #handleInputKeyup(e: KeyboardEvent): void {
    }
    #handleInputClick(e: MouseEvent): void {}
    #handleInputFocus(e: Event): void {}
    #handleInputBlur(e: Event): void {}

    #handleBtnClick(e: MouseEvent): void {}

    #handleLListboxClick(e: MouseEvent): void {}

    html(): HTMLElement {
        let group = document.createElement('div');
        group.append(
            this.#inputHtml_(),
            this.#btnHtml_()
        );

        let combobox = document.createElement('div');
        combobox.setAttribute('id', this.ids.combobox);
        combobox.classList.add(...this.classes.combobox);
        combobox.append(
            group,
            this.#listboxHtml_()
        );

        this.element = super.html();
        this.element.append(combobox);

        return this.element;
    }
    #inputHtml_(): HTMLElement {
        let input = document.createElement('input');
        input.setAttribute('id', this.ids.input);
        input.classList.add(...this.classes.input);

        return this.#input_ = input;
    }
    #btnHtml_(): HTMLElement {
        let btn = document.createElement('button');
        btn.setAttribute('id', this.ids.btn);
        btn.classList.add(...this.classes.btn);

        return this.#btn_ = btn;
    }
    #listboxHtml_(): HTMLElement {
        let listbox = this.#listbox_ || document.createElement('ul');

        // Initial run to create listbox
        if (!this.#listbox_) {
            listbox.setAttribute('id', this.ids.listbox);
            listbox.classList.add(...this.classes.listbox);
        }

        if (listbox.childElementCount > 0) {
            listbox = this.clearHtml(listbox);
        }

        for (let i = 0, options: string[] = this.#allOptions_, option: string; option = options[i]; i++) {
            listbox.append(this.#listboxOptionHtml_(option, i));
        }

        return this.#listbox_ = listbox;
    }
    #listboxOptionHtml_(option: string, index: number): HTMLElement {
        let listboxOption = document.createElement('li');
        listboxOption.setAttribute('id', [this.ids.listboxItem, index].join('-'));
        listboxOption.classList.add(...this.classes.listboxItem);

        return listboxOption;
    }
}
