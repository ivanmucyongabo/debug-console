/**
 * @fileoverview Simple debug console.
 */

import { Component, IComponent, IComponentConfig } from "./base";
import { ToolBar, ToolBarButton, ToolBarComboBox, ToolBarAccordian, ToolBarCounter } from "./toolbar";
import { Formatter } from "../lib/formatter";
import { LogRecord } from "../lib/logger";
import union from 'lodash.union';

const DEFAULT_SEPERATOR = '-';

export interface IDebugConsoleComponentConfig extends IComponentConfig {
  mountTo: HTMLElement|string|null,
  toolbar?: ToolBar,
  formatter?: Formatter;
  headerClassNames?: string[];
  logClassNames?: string[];
  footerClassNames?: string[];
  headerId?: string;
  logId?: string;
  footerId?: string;
}

export interface IDebugConsole extends IComponent {
  headerId: string;
  logId: string;
  footerId: string;
  headerClassNames: string[];
  logClassNames: string[];
  footerClassNames: string[];
}


export class DebugConsole extends Component implements IDebugConsole {
  name:string = 'debug-console';
  #headerClassNames_: string[];
  #logClassNames_: string[];
  #footerClassNames_: string[];
  #headerId_: string;
  #logId_: string;
  #footerId_: string;

  #outputBuffer_: string[];
  #savedMessages_: LogRecord[];
  #filteredLoggers_: {
      [key: string]: boolean
  };
  #isLogging_: boolean;

  #mountTo: HTMLElement | string | null;
  #logEl_: HTMLElement | null;

  #toolbar_: ToolBar;
  #formatter_: Formatter;

  constructor(config: IDebugConsoleComponentConfig) {
    super(config)
    this.#outputBuffer_ = [];
    this.#savedMessages_ = [];
    this.#filteredLoggers_ = {};
    this.#isLogging_ = true;
    this.#logEl_ = null;
    this.#mountTo = config.mountTo;
    this.#headerClassNames_ = union(config.headerClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}header`]);
    this.#logClassNames_ = union(config.logClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}logger`]);
    this.#footerClassNames_ = union(config.footerClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}footer`]);
    this.#headerId_ = config.headerId || `${this.name.concat('-header')}${this.id}`;
    this.#logId_ = config.logId || `${this.name.concat('-logger')}${this.id}`;
    this.#footerId_ = config.footerId || `${this.name.concat('-footer')}${this.id}`;  

    this.#toolbar_ = config.toolbar || DebugConsole.defaultToolbar();
    this.#formatter_ = config.formatter || new Formatter();
  }

  get headerId(): string {
    return this.#headerId_;
  }

  get logId(): string {
    return this.#logId_;
  }

  get footerId(): string {
    return this.#footerId_;
  }

  get headerClassNames(): string[] {
    return this.#headerClassNames_;
  }

  get logClassNames(): string[] {
    return this.#logClassNames_;
  }

  get footerClassNames(): string[] {
    return this.#footerClassNames_;
  }

  log(logRecord: LogRecord) {
    if (!logRecord) {
        return;
    }

    this.#logEl_ = this.#logEl_ || document.createElement('div');

    let scroll = (this.#logEl_.scrollHeight - this.#logEl_.scrollTop - this.#logEl_.clientHeight) <= 100;

    this.#logEl_.appendChild(this.#formatter_.formatAsHtml(logRecord));

    if (scroll) {
        this.#logEl_.scrollTop = this.#logEl_.scrollHeight;
    }
  }

  open(mountTo?: HTMLElement | string | null) {
    if (mountTo) {
      this.#mountTo = mountTo;
    }
    this.render();
  }

  openFilters() {}

  closeFilters() {}

  clear() {
      this.#logEl_!.innerHTML = "";
      while (this.#logEl_?.firstChild) this.#logEl_.removeChild(this.#logEl_.firstChild);
  }

  exit() {
      this.#outputBuffer_ = [];
      this.#savedMessages_ = [];
      this.#filteredLoggers_ = {};
      this.clear();
  }

  render(): HTMLElement {
    let html = super.render();

    if (this.#mountTo && (typeof this.#mountTo === 'string')) {
      let target = document.getElementById(this.#mountTo);
      target?.append(html);
      this.#mountTo = target;
    }
    else if (this.#mountTo && (this.#mountTo instanceof HTMLElement)) {
      this.#mountTo?.append(html);
    }

    return html;
  }

  renderAsHTML(): HTMLElement {
      let el = super.renderAsHTML();

      let headerEl = document.createElement('header');
      headerEl.classList.add(...this.#headerClassNames_);
      headerEl.setAttribute('id', this.#headerId_);
      headerEl.append(this.#toolbar_.renderAsHTML());

      let logEl = document.createElement('div');
      logEl.classList.add(...this.#logClassNames_);
      logEl.setAttribute('id', this.#logId_);

      let footerEl = document.createElement('footer');
      footerEl.classList.add(...this.#footerClassNames_);
      footerEl.setAttribute('id', this.#footerId_);

      el.append(
        headerEl,
        logEl,
        footerEl
      );

      this.#logEl_ = logEl;

      return this.element = el;
  }

  static defaultToolbar() {
    let toolbar = new ToolBar({});

    toolbar.insert('default', new ToolBarButton({
      label: 'clear',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>'
    }));
    toolbar.insert('default', new ToolBarComboBox({
      options: ['debug', 'info', 'warning', 'error']
    }));
    toolbar.insert('default', new ToolBarCounter({label: 'info', classNames: ['counter--info']}));
    toolbar.insert('default', new ToolBarCounter({label: 'warning', classNames: ['counter--warning']}));
    toolbar.insert('default', new ToolBarCounter({label: 'error', classNames: ['counter--error']}));
    toolbar.insert('default', new ToolBarAccordian({
      label: 'settings',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></g></svg>',
      panel: 'settings accordian panel'
    }));
    
    return toolbar;
  }
}