/**
 * @fileoverview Simple debug console.
 */

import { Component, CssClasses, CssConfig, CssIds } from "./base";
import { ToolBar, ToolBarAccordian, ToolBarButton, ToolBarComboButton, ToolBarCounter } from "./toolbar";
import { Formatter } from "../lib/formatter";
import { LogRecord } from "../lib/logger";

interface ConsoleCssIds extends CssIds {
  container: string,
  header: string,
  body: string,
  footer: string,
}

interface ConsoleCssClasses extends CssClasses {
  container: string[],
  header: string[],
  body: string[],
  footer: string[],
}

interface ConsoleStylesConfig extends CssConfig{
  ids : ConsoleCssIds,
  classes : ConsoleCssClasses
}

export const CONSOLE_DEFAULT_STYLES: ConsoleStylesConfig = {
  ids: {
      container: "debug-console",
      header: "debug-header",
      body: "debug-log",
      footer: "debug-footer"
  },
  classes: {
      container: ["debug-console"],
      header: ["debug-header"],
      body: ["debug-log"],
      footer: ["debug-footer"]
  }
};

export class Console extends Component {
  #outputBuffer_: string[];
  #savedMessages_: LogRecord[];
  #filteredLoggers_: {
      [key: string]: boolean
  };

  #toolbar_: ToolBar;
  #attachTo_: HTMLElement|string|null;
  #logEl_: HTMLElement | null;

  #isLogging_: boolean;
  #formatter_: Formatter;

  constructor(element: HTMLElement|string|null, formatter?: Formatter, css?: ConsoleStylesConfig|{}) {
      css = css || {};
      super({ ...css, ...CONSOLE_DEFAULT_STYLES})

      this.#attachTo_ = element;
      this.tagName = 'section';
      this.#isLogging_ = true;
      this.#formatter_ = formatter || new Formatter();
      this.#logEl_ = null;
      this.#outputBuffer_ = [];
      this.#savedMessages_ = [];
      this.#filteredLoggers_ = {};
      this.#isLogging_ = false;

      this.#toolbar_ = new ToolBar();
      this.#toolbar_.insert('default', new ToolBarButton());
      this.#toolbar_.insert('default', new ToolBarComboButton());
      this.#toolbar_.insert('default', new ToolBarCounter());
      this.#toolbar_.insert('default', new ToolBarCounter());
      this.#toolbar_.insert('default', new ToolBarCounter());
      this.#toolbar_.insert('default', new ToolBarAccordian());
  }

  set formatter(formatter: Formatter) {
      this.#formatter_ = formatter;
  }

  get formatter() {
      return this.#formatter_;
  }

  log(logRecord: LogRecord) {
      if (!logRecord) {
          return;
      }

      // let scroll = (this.#logEl_.scrollHeight - this.#logEl_.scrollTop - this.#logEl_.clientHeight) <= 100;

      let div = document.createElement('div');
      // div.classList.add(this.#formatter_.styles.logRecordContainer)
      div.append(...this.#formatter_.formatAsHtml(logRecord));

      // this.#logEl_.appendChild(div);

      // if (scroll) {
          // this.#logEl_.scrollTop = this.#logEl_.scrollHeight;
      // }
  }

  open() {
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
      // this.#element_.removeChild(this.element.firstChild)
  }

  render(): HTMLElement {
    let html = super.render();

    if (this.#attachTo_ && (typeof this.#attachTo_ === 'string')) {
      let target = document.getElementById(this.#attachTo_);
      target?.append(html);
      this.#attachTo_ = target;
    }
    else if (this.#attachTo_ && (this.#attachTo_ instanceof HTMLElement)) {
      this.#attachTo_?.append(html);
    }

    return html;
  }

  html(): HTMLElement {
      let el = super.html();

      let headerEl = document.createElement('header');
      headerEl.classList.add(...CONSOLE_DEFAULT_STYLES.classes.header);
      headerEl.setAttribute('id', CONSOLE_DEFAULT_STYLES.ids.header);

      let logEl = document.createElement('div');
      let footerEl = document.createElement('footer');

      el.append();
      this.element = el;

      return this.element;
  }
}
