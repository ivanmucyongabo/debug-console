/*!
  * Debug UI v1.0.0 (undefined)
  * Copyright 2021-2022 Ivan Mucyo Ngabo
  * Licensed under MIT (https://github.com/ivanmucyongabo/debug-ui/blob/main/LICENSE)
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash.union'), require('lodash.camelcase'), require('lodash.uniqueid')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash.union', 'lodash.camelcase', 'lodash.uniqueid'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DebugUI = {}, global.union, global.camelCase, global.uniqueId));
})(this, (function (exports, union, camelCase, uniqueId) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var union__default = /*#__PURE__*/_interopDefaultLegacy(union);
    var camelCase__default = /*#__PURE__*/_interopDefaultLegacy(camelCase);
    var uniqueId__default = /*#__PURE__*/_interopDefaultLegacy(uniqueId);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var _Component_uuid_, _Component_id_, _Component_classNames_, _Component_tagName_, _Component_element_;
    const DEFAULT_TAG_NAME = 'div';
    class Component {
        constructor(config) {
            this.name = 'debugUI';
            _Component_uuid_.set(this, void 0);
            _Component_id_.set(this, void 0);
            _Component_classNames_.set(this, void 0);
            _Component_tagName_.set(this, void 0);
            _Component_element_.set(this, void 0);
            __classPrivateFieldSet(this, _Component_uuid_, uniqueId__default["default"](), "f");
            __classPrivateFieldSet(this, _Component_id_, config.id || (camelCase__default["default"](this.constructor.name) + __classPrivateFieldGet(this, _Component_uuid_, "f")), "f");
            __classPrivateFieldSet(this, _Component_tagName_, config.tagName || DEFAULT_TAG_NAME, "f");
            __classPrivateFieldSet(this, _Component_element_, null, "f");
            __classPrivateFieldSet(this, _Component_classNames_, union__default["default"](config.classNames || [], [this.name]), "f");
        }
        get id() {
            return __classPrivateFieldGet(this, _Component_id_, "f");
        }
        get classNames() {
            return __classPrivateFieldGet(this, _Component_classNames_, "f");
        }
        set classNames(classes) {
            __classPrivateFieldSet(this, _Component_classNames_, classes, "f");
        }
        get tagName() {
            return __classPrivateFieldGet(this, _Component_tagName_, "f");
        }
        get element() {
            return __classPrivateFieldGet(this, _Component_element_, "f");
        }
        set element(el) {
            __classPrivateFieldSet(this, _Component_element_, el, "f");
        }
        render() {
            const html = this.renderAsHTML();
            this.attachListeners();
            return html;
        }
        renderAsString() {
            const html = this.renderAsHTML();
            return html.outerHTML;
        }
        renderAsHTML() {
            return this.html();
        }
        html() {
            if (this.element) {
                return this.element;
            }
            else {
                const el = document.createElement(__classPrivateFieldGet(this, _Component_tagName_, "f"));
                el.setAttribute('id', __classPrivateFieldGet(this, _Component_id_, "f"));
                el.classList.add(...__classPrivateFieldGet(this, _Component_classNames_, "f"));
                return this.element = el;
            }
        }
        attachListeners() {
            return;
        }
    }
    _Component_uuid_ = new WeakMap(), _Component_id_ = new WeakMap(), _Component_classNames_ = new WeakMap(), _Component_tagName_ = new WeakMap(), _Component_element_ = new WeakMap();

    var _Button_label_, _Button_icon_, _Button_labelClassNames_, _Button_iconClassNames_, _Button_labelId_, _Button_iconId_, _Button_isPressed_, _Button_isDisabled_, _Button_tabIndex_;
    const DEFAULT_SEPERATOR$4 = '-';
    class Button extends Component {
        constructor(config) {
            config.tagName = config.tagName || 'button';
            super(config);
            this.name = 'button';
            _Button_label_.set(this, void 0);
            _Button_icon_.set(this, void 0);
            _Button_labelClassNames_.set(this, void 0);
            _Button_iconClassNames_.set(this, void 0);
            _Button_labelId_.set(this, void 0);
            _Button_iconId_.set(this, void 0);
            _Button_isPressed_.set(this, void 0);
            _Button_isDisabled_.set(this, void 0);
            _Button_tabIndex_.set(this, void 0);
            __classPrivateFieldSet(this, _Button_label_, config.label, "f");
            __classPrivateFieldSet(this, _Button_icon_, config.icon, "f");
            __classPrivateFieldSet(this, _Button_labelClassNames_, config.labelClassNames || [], "f");
            __classPrivateFieldSet(this, _Button_iconClassNames_, config.iconclassNames || [], "f");
            __classPrivateFieldSet(this, _Button_isPressed_, config.isPressed || false, "f");
            __classPrivateFieldSet(this, _Button_isDisabled_, config.isDisabled || false, "f");
            __classPrivateFieldSet(this, _Button_tabIndex_, config.tabIndex || -1, "f");
            __classPrivateFieldSet(this, _Button_labelId_, config.labelId || `label${DEFAULT_SEPERATOR$4}${this.id}`, "f");
            __classPrivateFieldSet(this, _Button_iconId_, config.iconId || `icon${DEFAULT_SEPERATOR$4}${this.id}`, "f");
            this.classNames = union__default["default"](this.classNames, [this.name]);
            __classPrivateFieldSet(this, _Button_labelClassNames_, union__default["default"](config.labelClassNames || [], [`${this.name}${DEFAULT_SEPERATOR$4}label`]), "f");
            __classPrivateFieldSet(this, _Button_iconClassNames_, union__default["default"](config.iconclassNames || [], [`${this.name}${DEFAULT_SEPERATOR$4}icon`]), "f");
        }
        get label() {
            return __classPrivateFieldGet(this, _Button_label_, "f");
        }
        get isPressed() {
            return __classPrivateFieldGet(this, _Button_isPressed_, "f");
        }
        get isDisabled() {
            return __classPrivateFieldGet(this, _Button_isDisabled_, "f");
        }
        get tabIndex() {
            return __classPrivateFieldGet(this, _Button_tabIndex_, "f");
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            html.append(__classPrivateFieldGet(this, _Button_label_, "f"), this.iconHTML(__classPrivateFieldGet(this, _Button_icon_, "f")));
            return html;
        }
        labelHTML(label) {
            const html = document.createElement('span');
            html.setAttribute('id', __classPrivateFieldGet(this, _Button_labelId_, "f"));
            html.classList.add(...__classPrivateFieldGet(this, _Button_labelClassNames_, "f"));
            html.innerText = label;
            return html;
        }
        iconHTML(icon) {
            const html = document.createElement('span');
            html.setAttribute('id', __classPrivateFieldGet(this, _Button_iconId_, "f"));
            html.classList.add(...__classPrivateFieldGet(this, _Button_iconClassNames_, "f"));
            html.innerHTML = icon || '';
            return html;
        }
    }
    _Button_label_ = new WeakMap(), _Button_icon_ = new WeakMap(), _Button_labelClassNames_ = new WeakMap(), _Button_iconClassNames_ = new WeakMap(), _Button_labelId_ = new WeakMap(), _Button_iconId_ = new WeakMap(), _Button_isPressed_ = new WeakMap(), _Button_isDisabled_ = new WeakMap(), _Button_tabIndex_ = new WeakMap();

    var _Accordian_panelClassNames_, _Accordian_panelId_;
    class Accordian extends Button {
        constructor(config) {
            super(config);
            this.name = 'accordian';
            _Accordian_panelClassNames_.set(this, void 0);
            _Accordian_panelId_.set(this, void 0);
            __classPrivateFieldSet(this, _Accordian_panelId_, config.panelId || '', "f");
            __classPrivateFieldSet(this, _Accordian_panelClassNames_, union__default["default"](config.panelClassNames || [], []), "f");
        }
        render() {
            const html = super.render();
            const panel = document.createElement('div');
            panel.setAttribute('id', __classPrivateFieldGet(this, _Accordian_panelId_, "f"));
            panel.classList.add(...__classPrivateFieldGet(this, _Accordian_panelClassNames_, "f"));
            return html;
        }
    }
    _Accordian_panelClassNames_ = new WeakMap(), _Accordian_panelId_ = new WeakMap();

    var _ComboBox_inputId_, _ComboBox_inputClassNames_, _ComboBox_btnId_, _ComboBox_btnClassNames_, _ComboBox_listBoxId_, _ComboBox_listBoxClassNames_, _ComboBox_listBoxItemClassNames_, _ComboBox_containerClassNames_, _ComboBox_options_, _ComboBox_option_, _ComboBox_firstOption_, _ComboBox_lastOption_, _ComboBox_filteredOptions_, _ComboBox_filter_;
    const DEFAULT_SEPERATOR$3 = '-';
    class ComboBox extends Component {
        constructor(config) {
            super(config);
            this.name = 'combobox';
            _ComboBox_inputId_.set(this, void 0);
            _ComboBox_inputClassNames_.set(this, void 0);
            _ComboBox_btnId_.set(this, void 0);
            _ComboBox_btnClassNames_.set(this, void 0);
            _ComboBox_listBoxId_.set(this, void 0);
            _ComboBox_listBoxClassNames_.set(this, void 0);
            _ComboBox_listBoxItemClassNames_.set(this, void 0);
            _ComboBox_containerClassNames_.set(this, void 0);
            _ComboBox_options_.set(this, void 0);
            _ComboBox_option_.set(this, void 0);
            _ComboBox_firstOption_.set(this, void 0);
            _ComboBox_lastOption_.set(this, void 0);
            _ComboBox_filteredOptions_.set(this, void 0);
            _ComboBox_filter_.set(this, void 0);
            __classPrivateFieldSet(this, _ComboBox_options_, config.options, "f");
            __classPrivateFieldSet(this, _ComboBox_option_, '', "f");
            __classPrivateFieldSet(this, _ComboBox_firstOption_, '', "f");
            __classPrivateFieldSet(this, _ComboBox_lastOption_, '', "f");
            __classPrivateFieldSet(this, _ComboBox_filteredOptions_, [], "f");
            __classPrivateFieldSet(this, _ComboBox_filter_, '', "f");
            __classPrivateFieldSet(this, _ComboBox_inputId_, config.inputId || `${this.name}${DEFAULT_SEPERATOR$3}${'input'.concat(this.id)}`, "f");
            __classPrivateFieldSet(this, _ComboBox_btnId_, config.btnId || `${this.name}${DEFAULT_SEPERATOR$3}${'btn'.concat(this.id)}`, "f");
            __classPrivateFieldSet(this, _ComboBox_listBoxId_, config.listBoxId || `${this.name}${DEFAULT_SEPERATOR$3}${'listbox'.concat(this.id)}`, "f");
            __classPrivateFieldSet(this, _ComboBox_inputClassNames_, union__default["default"](config.inputClasses || [], [`${this.name}${DEFAULT_SEPERATOR$3}input`]), "f");
            __classPrivateFieldSet(this, _ComboBox_btnClassNames_, union__default["default"](config.btnClasses || [], [`${this.name}${DEFAULT_SEPERATOR$3}button`]), "f");
            __classPrivateFieldSet(this, _ComboBox_listBoxClassNames_, union__default["default"](config.listBoxClasses || [], [`${this.name}${DEFAULT_SEPERATOR$3}listbox`]), "f");
            __classPrivateFieldSet(this, _ComboBox_listBoxItemClassNames_, union__default["default"](config.listBoxItemClassNames || [], [`${this.name}${DEFAULT_SEPERATOR$3}listbox${DEFAULT_SEPERATOR$3}item`]), "f");
            __classPrivateFieldSet(this, _ComboBox_containerClassNames_, union__default["default"](config.containerClassNames || [], [`${this.name}${DEFAULT_SEPERATOR$3}group`]), "f");
            this.classNames = union__default["default"](config.wrapperClassNames || [], this.classNames, [this.name, `${this.name}${DEFAULT_SEPERATOR$3}list`]);
        }
        get filter() {
            return __classPrivateFieldGet(this, _ComboBox_filter_, "f");
        }
        get filteredOptions() {
            return __classPrivateFieldGet(this, _ComboBox_filteredOptions_, "f");
        }
        get lastOption() {
            return __classPrivateFieldGet(this, _ComboBox_lastOption_, "f");
        }
        get option() {
            return __classPrivateFieldGet(this, _ComboBox_option_, "f");
        }
        get firstOption() {
            return __classPrivateFieldGet(this, _ComboBox_firstOption_, "f");
        }
        open() {
            this.toggle(true);
        }
        close() {
            this.toggle(false);
        }
        toggle(open) {
            return open;
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            const cont = document.createElement('div');
            cont.classList.add(...__classPrivateFieldGet(this, _ComboBox_containerClassNames_, "f"));
            cont.append(this.inputHTML(), this.btnHTML(), this.listboxHTML());
            html.append(cont);
            return html;
        }
        btnHTML() {
            const btn = document.createElement('button');
            btn.setAttribute('id', __classPrivateFieldGet(this, _ComboBox_btnId_, "f"));
            btn.classList.add(...__classPrivateFieldGet(this, _ComboBox_btnClassNames_, "f"));
            btn.setAttribute('value', 'level');
            btn.innerText = 'levels';
            return btn;
        }
        inputHTML() {
            const input = document.createElement('input');
            input.setAttribute('id', __classPrivateFieldGet(this, _ComboBox_inputId_, "f"));
            input.setAttribute('type', 'text');
            input.classList.add(...__classPrivateFieldGet(this, _ComboBox_inputClassNames_, "f"));
            return input;
        }
        listboxHTML() {
            const listbox = document.createElement('ul');
            listbox.setAttribute('id', __classPrivateFieldGet(this, _ComboBox_listBoxId_, "f"));
            listbox.setAttribute('type', 'text');
            listbox.setAttribute('role', 'listbox');
            listbox.classList.add(...__classPrivateFieldGet(this, _ComboBox_listBoxClassNames_, "f"));
            for (let i = 0, options = __classPrivateFieldGet(this, _ComboBox_options_, "f"), option; option = options[i]; i++) {
                listbox.append(this.optHTML(option));
            }
            return listbox;
        }
        optHTML(opt) {
            const option = document.createElement('li');
            option.classList.add(...__classPrivateFieldGet(this, _ComboBox_listBoxItemClassNames_, "f"));
            option.innerText = opt;
            return option;
        }
    }
    _ComboBox_inputId_ = new WeakMap(), _ComboBox_inputClassNames_ = new WeakMap(), _ComboBox_btnId_ = new WeakMap(), _ComboBox_btnClassNames_ = new WeakMap(), _ComboBox_listBoxId_ = new WeakMap(), _ComboBox_listBoxClassNames_ = new WeakMap(), _ComboBox_listBoxItemClassNames_ = new WeakMap(), _ComboBox_containerClassNames_ = new WeakMap(), _ComboBox_options_ = new WeakMap(), _ComboBox_option_ = new WeakMap(), _ComboBox_firstOption_ = new WeakMap(), _ComboBox_lastOption_ = new WeakMap(), _ComboBox_filteredOptions_ = new WeakMap(), _ComboBox_filter_ = new WeakMap();

    var _LogRecord_level, _LogRecord_msg, _LogRecord_name, _LogRecord_timer, _Logger_name, _LogRegistryItem_logger, _LogRegistryItem_level, _LogRegistryItem_handlers, _LogRegistry_items, _LogBuffer_capacity, _LogBuffer_buffer, _LogBuffer_isFull, _LogBuffer_isBufferingEnabled, _LogBuffer_currIndex;
    const ROOT_LOG_NAME = '';
    const BUFFER_CAPACITY = 0;
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["Off"] = 0] = "Off";
        LogLevel[LogLevel["Debug"] = 1] = "Debug";
        LogLevel[LogLevel["Info"] = 2] = "Info";
        LogLevel[LogLevel["Warning"] = 3] = "Warning";
        LogLevel[LogLevel["Error"] = 4] = "Error";
    })(LogLevel || (LogLevel = {}));
    class LogRecord {
        constructor(level, msg, name, time) {
            _LogRecord_level.set(this, void 0);
            _LogRecord_msg.set(this, void 0);
            _LogRecord_name.set(this, void 0);
            _LogRecord_timer.set(this, void 0);
            __classPrivateFieldSet(this, _LogRecord_level, level, "f");
            __classPrivateFieldSet(this, _LogRecord_msg, msg, "f");
            __classPrivateFieldSet(this, _LogRecord_name, name, "f");
            __classPrivateFieldSet(this, _LogRecord_timer, time || Date.now(), "f");
        }
        get level() {
            return __classPrivateFieldGet(this, _LogRecord_level, "f");
        }
        get message() {
            return __classPrivateFieldGet(this, _LogRecord_msg, "f");
        }
        get name() {
            return __classPrivateFieldGet(this, _LogRecord_name, "f");
        }
        get timestamp() {
            return __classPrivateFieldGet(this, _LogRecord_timer, "f");
        }
        set timestamp(time) {
            __classPrivateFieldSet(this, _LogRecord_timer, time, "f");
        }
        reset(level, msg, name, timestamp, time) {
            __classPrivateFieldSet(this, _LogRecord_level, level, "f");
            __classPrivateFieldSet(this, _LogRecord_msg, msg, "f");
            __classPrivateFieldSet(this, _LogRecord_name, name, "f");
            __classPrivateFieldSet(this, _LogRecord_timer, timestamp || Date.now(), "f");
        }
    }
    _LogRecord_level = new WeakMap(), _LogRecord_msg = new WeakMap(), _LogRecord_name = new WeakMap(), _LogRecord_timer = new WeakMap();
    class Logger {
        constructor(name) {
            _Logger_name.set(this, void 0);
            __classPrivateFieldSet(this, _Logger_name, name, "f");
        }
        get name() {
            return __classPrivateFieldGet(this, _Logger_name, "f");
        }
    }
    _Logger_name = new WeakMap();
    class LogRegistryItem {
        constructor(name, level) {
            _LogRegistryItem_logger.set(this, void 0);
            _LogRegistryItem_level.set(this, void 0);
            _LogRegistryItem_handlers.set(this, void 0);
            __classPrivateFieldSet(this, _LogRegistryItem_logger, new Logger(name), "f");
            __classPrivateFieldSet(this, _LogRegistryItem_level, level || LogLevel.Debug, "f");
            __classPrivateFieldSet(this, _LogRegistryItem_handlers, [], "f");
        }
        get logger() {
            return __classPrivateFieldGet(this, _LogRegistryItem_logger, "f");
        }
        get name() {
            return __classPrivateFieldGet(this, _LogRegistryItem_logger, "f").name;
        }
        get level() {
            return __classPrivateFieldGet(this, _LogRegistryItem_level, "f");
        }
        set level(level) {
            __classPrivateFieldSet(this, _LogRegistryItem_level, level, "f");
        }
        get subscriberCount() {
            return __classPrivateFieldGet(this, _LogRegistryItem_handlers, "f").length;
        }
        subscribe(fn) {
            __classPrivateFieldGet(this, _LogRegistryItem_handlers, "f").push(fn);
        }
        unsubscribe(fn) {
            __classPrivateFieldSet(this, _LogRegistryItem_handlers, __classPrivateFieldGet(this, _LogRegistryItem_handlers, "f").filter((item) => {
                if (item !== fn) {
                    return item;
                }
            }), "f");
        }
        fire(record) {
            __classPrivateFieldGet(this, _LogRegistryItem_handlers, "f").forEach(handler => {
                handler(record);
            });
        }
    }
    _LogRegistryItem_logger = new WeakMap(), _LogRegistryItem_level = new WeakMap(), _LogRegistryItem_handlers = new WeakMap();
    class LogRegistry {
        constructor() {
            _LogRegistry_items.set(this, void 0);
            __classPrivateFieldSet(this, _LogRegistry_items, {}, "f");
            __classPrivateFieldGet(this, _LogRegistry_items, "f")[ROOT_LOG_NAME] = new LogRegistryItem(ROOT_LOG_NAME);
        }
        get itemCount() {
            return Object.values(__classPrivateFieldGet(this, _LogRegistry_items, "f")).length;
        }
        getLogger(name, level) {
            const item = __classPrivateFieldGet(this, _LogRegistry_items, "f")[name];
            if (item) {
                if (level !== undefined) {
                    item.level = level;
                }
                return item;
            }
            else {
                const logRegistryEntry = new LogRegistryItem(name);
                __classPrivateFieldGet(this, _LogRegistry_items, "f")[name] = logRegistryEntry;
                if (level !== undefined) {
                    logRegistryEntry.level = level;
                }
                return logRegistryEntry;
            }
        }
        getLoggers() {
            return Object.keys(__classPrivateFieldGet(this, _LogRegistry_items, "f"))
                .map(loggerName => __classPrivateFieldGet(this, _LogRegistry_items, "f")[loggerName]);
        }
    }
    _LogRegistry_items = new WeakMap();
    class LogBuffer {
        constructor(capacity) {
            _LogBuffer_capacity.set(this, void 0);
            _LogBuffer_buffer.set(this, void 0);
            _LogBuffer_isFull.set(this, void 0);
            _LogBuffer_isBufferingEnabled.set(this, void 0);
            _LogBuffer_currIndex.set(this, void 0);
            __classPrivateFieldSet(this, _LogBuffer_capacity, capacity || BUFFER_CAPACITY, "f");
            __classPrivateFieldSet(this, _LogBuffer_buffer, new Array(__classPrivateFieldGet(this, _LogBuffer_capacity, "f")), "f");
            __classPrivateFieldSet(this, _LogBuffer_isBufferingEnabled, __classPrivateFieldGet(this, _LogBuffer_buffer, "f").length > 0, "f");
            __classPrivateFieldSet(this, _LogBuffer_currIndex, -1, "f");
            __classPrivateFieldSet(this, _LogBuffer_isFull, false, "f");
        }
        get capacity() {
            return __classPrivateFieldGet(this, _LogBuffer_capacity, "f");
        }
        get buffer() {
            return __classPrivateFieldGet(this, _LogBuffer_buffer, "f");
        }
        get isFull() {
            return __classPrivateFieldGet(this, _LogBuffer_isFull, "f");
        }
        get isBufferingEnabled() {
            return __classPrivateFieldGet(this, _LogBuffer_isBufferingEnabled, "f");
        }
        get currIndex() {
            return __classPrivateFieldGet(this, _LogBuffer_currIndex, "f");
        }
        add(level, msg, name) {
            if (!__classPrivateFieldGet(this, _LogBuffer_isBufferingEnabled, "f")) {
                return new LogRecord(level, msg, name);
            }
            const currIndex = (__classPrivateFieldGet(this, _LogBuffer_currIndex, "f") + 1) % __classPrivateFieldGet(this, _LogBuffer_capacity, "f");
            __classPrivateFieldSet(this, _LogBuffer_currIndex, currIndex, "f");
            if (__classPrivateFieldGet(this, _LogBuffer_isFull, "f")) {
                const ret = __classPrivateFieldGet(this, _LogBuffer_buffer, "f")[currIndex];
                ret.reset(level, msg, name);
                return ret;
            }
            __classPrivateFieldSet(this, _LogBuffer_isFull, currIndex === (__classPrivateFieldGet(this, _LogBuffer_capacity, "f") - 1), "f");
            return __classPrivateFieldGet(this, _LogBuffer_buffer, "f")[currIndex] = new LogRecord(level, msg, name);
        }
        forEach(fn) {
            const buffer = __classPrivateFieldGet(this, _LogBuffer_buffer, "f");
            if (!buffer[0]) {
                return;
            }
            const currIndex = __classPrivateFieldGet(this, _LogBuffer_currIndex, "f");
            let i = __classPrivateFieldGet(this, _LogBuffer_isFull, "f") ? currIndex : -1;
            do {
                i = (i + 1) % __classPrivateFieldGet(this, _LogBuffer_capacity, "f");
                fn((buffer[i]));
            } while (i !== currIndex);
        }
        clear() {
            __classPrivateFieldSet(this, _LogBuffer_buffer, new Array(__classPrivateFieldGet(this, _LogBuffer_capacity, "f")), "f");
            __classPrivateFieldSet(this, _LogBuffer_currIndex, -1, "f");
            __classPrivateFieldSet(this, _LogBuffer_isFull, false, "f");
        }
    }
    _LogBuffer_capacity = new WeakMap(), _LogBuffer_buffer = new WeakMap(), _LogBuffer_isFull = new WeakMap(), _LogBuffer_isBufferingEnabled = new WeakMap(), _LogBuffer_currIndex = new WeakMap();

    var _Timer_timestamp;
    class Timer {
        constructor() {
            _Timer_timestamp.set(this, void 0);
            __classPrivateFieldSet(this, _Timer_timestamp, Date.now(), "f");
        }
        get timestamp() {
            return __classPrivateFieldGet(this, _Timer_timestamp, "f");
        }
        set timestamp(timestamp) {
            __classPrivateFieldSet(this, _Timer_timestamp, timestamp, "f");
        }
        reset() {
            __classPrivateFieldSet(this, _Timer_timestamp, Date.now(), "f");
        }
    }
    _Timer_timestamp = new WeakMap();

    var _Formatter_timer, _Formatter_showAbsoluteTime, _Formatter_showRelativeTime, _Formatter_showLoggerName, _Formatter_showSeverityLevel, _Formatter_info, _Formatter_error, _Formatter_warning, _Formatter_debug, _Formatter_logRecordContainer, _Formatter_logRecordTimestamp, _Formatter_logRecordName, _Formatter_logRecordLevel, _Formatter_logRecordMessage, _Formatter_prefix;
    const htmlEscape = (str) => {
        return str;
    };
    class Formatter {
        constructor(config) {
            _Formatter_timer.set(this, void 0);
            _Formatter_showAbsoluteTime.set(this, void 0);
            _Formatter_showRelativeTime.set(this, void 0);
            _Formatter_showLoggerName.set(this, void 0);
            _Formatter_showSeverityLevel.set(this, void 0);
            _Formatter_info.set(this, void 0);
            _Formatter_error.set(this, void 0);
            _Formatter_warning.set(this, void 0);
            _Formatter_debug.set(this, void 0);
            _Formatter_logRecordContainer.set(this, void 0);
            _Formatter_logRecordTimestamp.set(this, void 0);
            _Formatter_logRecordName.set(this, void 0);
            _Formatter_logRecordLevel.set(this, void 0);
            _Formatter_logRecordMessage.set(this, void 0);
            _Formatter_prefix.set(this, void 0);
            __classPrivateFieldSet(this, _Formatter_timer, new Timer(), "f");
            __classPrivateFieldSet(this, _Formatter_showAbsoluteTime, (config === null || config === void 0 ? void 0 : config.showAbsoluteTime) || true, "f");
            __classPrivateFieldSet(this, _Formatter_showRelativeTime, (config === null || config === void 0 ? void 0 : config.showRelativeTime) || true, "f");
            __classPrivateFieldSet(this, _Formatter_showLoggerName, (config === null || config === void 0 ? void 0 : config.showLoggerName) || true, "f");
            __classPrivateFieldSet(this, _Formatter_showSeverityLevel, (config === null || config === void 0 ? void 0 : config.showSeverityLevel) || false, "f");
            __classPrivateFieldSet(this, _Formatter_info, (config === null || config === void 0 ? void 0 : config.info) || 'debug-console-log-record--info', "f");
            __classPrivateFieldSet(this, _Formatter_error, (config === null || config === void 0 ? void 0 : config.error) || 'debug-console-log-record--error', "f");
            __classPrivateFieldSet(this, _Formatter_warning, (config === null || config === void 0 ? void 0 : config.warning) || 'debug-console-log-record--warning', "f");
            __classPrivateFieldSet(this, _Formatter_debug, (config === null || config === void 0 ? void 0 : config.debug) || 'debug-console-log-record--debug', "f");
            __classPrivateFieldSet(this, _Formatter_logRecordContainer, (config === null || config === void 0 ? void 0 : config.logRecordContainer) || 'debug-console-log-record', "f");
            __classPrivateFieldSet(this, _Formatter_logRecordTimestamp, (config === null || config === void 0 ? void 0 : config.logRecordTimestamp) || 'debug-console-log-record-timestamp', "f");
            __classPrivateFieldSet(this, _Formatter_logRecordName, (config === null || config === void 0 ? void 0 : config.logRecordName) || 'debug-console-log-record-name', "f");
            __classPrivateFieldSet(this, _Formatter_logRecordLevel, (config === null || config === void 0 ? void 0 : config.logRecordLevel) || 'debug-console-log-record-level', "f");
            __classPrivateFieldSet(this, _Formatter_logRecordMessage, (config === null || config === void 0 ? void 0 : config.logRecordMessage) || 'debug-console-log-record-message', "f");
            __classPrivateFieldSet(this, _Formatter_prefix, (config === null || config === void 0 ? void 0 : config.prefix) || '', "f");
        }
        get timer() {
            return __classPrivateFieldGet(this, _Formatter_timer, "f");
        }
        set timer(timer) {
            __classPrivateFieldSet(this, _Formatter_timer, timer, "f");
        }
        get showAbsoluteTime() {
            return __classPrivateFieldGet(this, _Formatter_showAbsoluteTime, "f");
        }
        set showAbsoluteTime(show) {
            __classPrivateFieldSet(this, _Formatter_showAbsoluteTime, show, "f");
        }
        get showRelativeTime() {
            return __classPrivateFieldGet(this, _Formatter_showRelativeTime, "f");
        }
        set showRelativeTime(show) {
            __classPrivateFieldSet(this, _Formatter_showRelativeTime, show, "f");
        }
        get showLoggerName() {
            return __classPrivateFieldGet(this, _Formatter_showLoggerName, "f");
        }
        set showLoggerName(show) {
            __classPrivateFieldSet(this, _Formatter_showLoggerName, show, "f");
        }
        get showSeverityLevel() {
            return __classPrivateFieldGet(this, _Formatter_showSeverityLevel, "f");
        }
        set showSeverityLevel(show) {
            __classPrivateFieldSet(this, _Formatter_showSeverityLevel, show, "f");
        }
        get css() {
            return {
                info: __classPrivateFieldGet(this, _Formatter_info, "f"),
                error: __classPrivateFieldGet(this, _Formatter_error, "f"),
                warning: __classPrivateFieldGet(this, _Formatter_warning, "f"),
                debug: __classPrivateFieldGet(this, _Formatter_debug, "f"),
                logRecordContainer: __classPrivateFieldGet(this, _Formatter_logRecordContainer, "f"),
                logRecordTimestamp: __classPrivateFieldGet(this, _Formatter_logRecordTimestamp, "f"),
                logRecordName: __classPrivateFieldGet(this, _Formatter_logRecordName, "f"),
                logRecordLevel: __classPrivateFieldGet(this, _Formatter_logRecordLevel, "f"),
                prefix: __classPrivateFieldGet(this, _Formatter_prefix, "f")
            };
        }
        getDateTimeStamp(logRecord) {
            const time = new Date(logRecord.timestamp);
            const date = `${(time.getMonth() + 1)}/${time.getDate()}/${(time.getFullYear() - 2000)}`;
            return `${date} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${Math.floor(time.getMilliseconds() / 10)}`;
        }
        getRelativeTimestamp(logRecord, timestamp) {
            const ms = logRecord.timestamp - timestamp;
            let sec = ms / 1000;
            const str = sec.toFixed(3);
            let spacesToPrepend = 0;
            if (sec < 1) {
                spacesToPrepend = 2;
            }
            else {
                while (sec < 100) {
                    spacesToPrepend++;
                    sec *= 10;
                }
            }
            while (spacesToPrepend-- > 0) {
                str.padStart(str.length + 1, ' ');
            }
            return `${str} s`;
        }
        format(logRecord) {
            return this.formatAsHtml(logRecord).outerHTML;
        }
        formatAsHtml(logRecord) {
            if (!logRecord) {
                return document.createElement('div');
            }
            const classNames = this.css;
            let className;
            switch (logRecord.level) {
                case LogLevel.Error:
                    className = classNames.error;
                    break;
                case LogLevel.Warning:
                    className = classNames.warning;
                    break;
                case LogLevel.Info:
                    className = classNames.info;
                    break;
                case LogLevel.Debug:
                    className = classNames.debug;
                default:
                    className = classNames.debug;
                    break;
            }
            const html = document.createElement('div');
            if (this.showAbsoluteTime) {
                const timestamp = document.createElement('span');
                timestamp.classList.add(__classPrivateFieldGet(this, _Formatter_logRecordTimestamp, "f"));
                timestamp.innerText = this.getDateTimeStamp(logRecord);
                html.append(timestamp);
            }
            if (this.showRelativeTime) {
                const relativeTime = document.createElement('span');
                relativeTime.classList.add(__classPrivateFieldGet(this, _Formatter_logRecordTimestamp, "f"));
                relativeTime.innerText = this.getRelativeTimestamp(logRecord, __classPrivateFieldGet(this, _Formatter_timer, "f").timestamp);
                html.append(relativeTime);
            }
            if (this.showLoggerName) {
                const loggerName = document.createElement('span');
                loggerName.classList.add(__classPrivateFieldGet(this, _Formatter_logRecordName, "f"));
                loggerName.innerText = logRecord.name;
                html.append(loggerName);
            }
            if (this.showSeverityLevel) {
                const loggerLevel = document.createElement('span');
                loggerLevel.classList.add(__classPrivateFieldGet(this, _Formatter_logRecordLevel, "f"));
                loggerLevel.innerText = LogLevel[logRecord.level];
                html.append(loggerLevel);
            }
            const logRecordHtml = htmlEscape(logRecord.message);
            const recordHTML = document.createElement('span');
            recordHTML.classList.add(__classPrivateFieldGet(this, _Formatter_logRecordMessage, "f"));
            recordHTML.append(logRecordHtml);
            html.append(recordHTML, document.createElement('br'));
            html.classList.add(this.css.logRecordContainer, className);
            return html;
        }
    }
    _Formatter_timer = new WeakMap(), _Formatter_showAbsoluteTime = new WeakMap(), _Formatter_showRelativeTime = new WeakMap(), _Formatter_showLoggerName = new WeakMap(), _Formatter_showSeverityLevel = new WeakMap(), _Formatter_info = new WeakMap(), _Formatter_error = new WeakMap(), _Formatter_warning = new WeakMap(), _Formatter_debug = new WeakMap(), _Formatter_logRecordContainer = new WeakMap(), _Formatter_logRecordTimestamp = new WeakMap(), _Formatter_logRecordName = new WeakMap(), _Formatter_logRecordLevel = new WeakMap(), _Formatter_logRecordMessage = new WeakMap(), _Formatter_prefix = new WeakMap();

    var _Counter_countClassNames_, _Counter_countId_, _Counter_label_, _Counter_count_;
    const DEFAULT_SEPERATOR$2 = '-';
    const DEFAULT_TAGNAME = 'div';
    class Counter extends Component {
        constructor(config) {
            config.tagName = config.tagName || DEFAULT_TAGNAME;
            super(config);
            this.name = 'counter';
            _Counter_countClassNames_.set(this, void 0);
            _Counter_countId_.set(this, void 0);
            _Counter_label_.set(this, void 0);
            _Counter_count_.set(this, void 0);
            __classPrivateFieldSet(this, _Counter_count_, 0, "f");
            __classPrivateFieldSet(this, _Counter_label_, config.label, "f");
            __classPrivateFieldSet(this, _Counter_countId_, config.countId || `${this.name}${DEFAULT_SEPERATOR$2}${'count'.concat(this.id)}`, "f");
            __classPrivateFieldSet(this, _Counter_countClassNames_, union__default["default"](config.countClassNames || [], [`${this.name}${DEFAULT_SEPERATOR$2}count`]), "f");
            this.classNames = union__default["default"](this.classNames, [this.name]);
        }
        get count() {
            return __classPrivateFieldGet(this, _Counter_count_, "f");
        }
        set count(count) {
            __classPrivateFieldSet(this, _Counter_count_, count, "f");
            this.setCount(__classPrivateFieldGet(this, _Counter_count_, "f"));
        }
        setCount(count) {
            const el = this.element;
            if (el) {
                const countEl = document.getElementById(`${__classPrivateFieldGet(this, _Counter_countId_, "f")}`);
                countEl.innerText = count.toString();
            }
        }
        increment(delta) {
            const oldCount = __classPrivateFieldGet(this, _Counter_count_, "f");
            this.count = oldCount + delta;
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            const count = document.createElement('span');
            count.classList.add(...__classPrivateFieldGet(this, _Counter_countClassNames_, "f"));
            count.setAttribute('id', __classPrivateFieldGet(this, _Counter_countId_, "f"));
            count.innerText = __classPrivateFieldGet(this, _Counter_count_, "f").toString();
            html.append(__classPrivateFieldGet(this, _Counter_label_, "f"), count);
            return html;
        }
    }
    _Counter_countClassNames_ = new WeakMap(), _Counter_countId_ = new WeakMap(), _Counter_label_ = new WeakMap(), _Counter_count_ = new WeakMap();

    var _ToolBarComboBox_parent_, _ToolBarAccordian_parent_, _ToolBarCounter_parent_, _ToolBarButton_parent_, _ToolBar_itemClassNames_, _ToolBar_groupClassNames_, _ToolBar_items_;
    const DEFAULT_SEPERATOR$1 = '-';
    class ToolBarComboBox extends ComboBox {
        constructor(config) {
            super(config);
            _ToolBarComboBox_parent_.set(this, void 0);
            __classPrivateFieldSet(this, _ToolBarComboBox_parent_, config.toolbar, "f");
        }
        set parent(parent) {
            __classPrivateFieldSet(this, _ToolBarComboBox_parent_, parent, "f");
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            if (__classPrivateFieldGet(this, _ToolBarComboBox_parent_, "f")) {
                html.classList.add(...[`${__classPrivateFieldGet(this, _ToolBarComboBox_parent_, "f").name}-item`, `${__classPrivateFieldGet(this, _ToolBarComboBox_parent_, "f").name}-${this.name}`]);
            }
            return html;
        }
    }
    _ToolBarComboBox_parent_ = new WeakMap();
    class ToolBarAccordian extends Accordian {
        constructor(config) {
            config.classNames = union__default["default"](config.classNames || [], []);
            super(config);
            _ToolBarAccordian_parent_.set(this, void 0);
            __classPrivateFieldSet(this, _ToolBarAccordian_parent_, config.toolbar, "f");
        }
        set parent(parent) {
            __classPrivateFieldSet(this, _ToolBarAccordian_parent_, parent, "f");
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            if (__classPrivateFieldGet(this, _ToolBarAccordian_parent_, "f")) {
                html.classList.add(...[`${__classPrivateFieldGet(this, _ToolBarAccordian_parent_, "f").name}-item`, `${__classPrivateFieldGet(this, _ToolBarAccordian_parent_, "f").name}-${this.name}`]);
            }
            return html;
        }
    }
    _ToolBarAccordian_parent_ = new WeakMap();
    class ToolBarCounter extends Counter {
        constructor(config) {
            config.classNames = union__default["default"](config.classNames || [], []);
            super(config);
            _ToolBarCounter_parent_.set(this, void 0);
            __classPrivateFieldSet(this, _ToolBarCounter_parent_, config.toolbar, "f");
        }
        set parent(parent) {
            __classPrivateFieldSet(this, _ToolBarCounter_parent_, parent, "f");
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            if (__classPrivateFieldGet(this, _ToolBarCounter_parent_, "f")) {
                html.classList.add(...[`${__classPrivateFieldGet(this, _ToolBarCounter_parent_, "f").name}-item`, `${__classPrivateFieldGet(this, _ToolBarCounter_parent_, "f").name}-${this.name}`]);
            }
            return html;
        }
    }
    _ToolBarCounter_parent_ = new WeakMap();
    class ToolBarButton extends Button {
        constructor(config) {
            config.classNames = union__default["default"](config.classNames || [], []);
            super(config);
            _ToolBarButton_parent_.set(this, void 0);
            __classPrivateFieldSet(this, _ToolBarButton_parent_, config.toolbar, "f");
        }
        set parent(parent) {
            __classPrivateFieldSet(this, _ToolBarButton_parent_, parent, "f");
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            if (__classPrivateFieldGet(this, _ToolBarButton_parent_, "f")) {
                html.classList.add(...[`${__classPrivateFieldGet(this, _ToolBarButton_parent_, "f").name}-item`, `${__classPrivateFieldGet(this, _ToolBarButton_parent_, "f").name}-${this.name}`]);
            }
            return html;
        }
    }
    _ToolBarButton_parent_ = new WeakMap();
    class ToolBar extends Component {
        constructor(config) {
            super(config);
            this.name = 'toolbar';
            _ToolBar_itemClassNames_.set(this, void 0);
            _ToolBar_groupClassNames_.set(this, void 0);
            _ToolBar_items_.set(this, void 0);
            __classPrivateFieldSet(this, _ToolBar_items_, config.items || {}, "f");
            __classPrivateFieldSet(this, _ToolBar_itemClassNames_, union__default["default"](config.itemClassNames || [], [`${this.name}${DEFAULT_SEPERATOR$1}item`]), "f");
            __classPrivateFieldSet(this, _ToolBar_groupClassNames_, union__default["default"](config.groupClassNames || [], [`${this.name}-group`, 'group']), "f");
            this.classNames = union__default["default"](this.classNames, [this.name]);
            for (let i = 0, groups = Object.values(__classPrivateFieldGet(this, _ToolBar_items_, "f")), group; group = groups[i]; i++) {
                for (let j = 0, items = group, item; item = items[j]; j++) {
                    item.parent = this;
                }
            }
        }
        group(index) {
            return __classPrivateFieldGet(this, _ToolBar_items_, "f")[index];
        }
        insert(group, item) {
            let initialInsert = false;
            if (!__classPrivateFieldGet(this, _ToolBar_items_, "f")[group]) {
                initialInsert = true;
                __classPrivateFieldGet(this, _ToolBar_items_, "f")[group] = [];
            }
            if (!item.parent || item.parent !== this) {
                item.parent = this;
            }
            __classPrivateFieldGet(this, _ToolBar_items_, "f")[group].push(item);
            return initialInsert;
        }
        groupHTML(name) {
            const groupEl = document.createElement('div');
            groupEl.classList.add(...__classPrivateFieldGet(this, _ToolBar_groupClassNames_, "f"));
            return groupEl;
        }
        render() {
            const html = super.render();
            const itemsCopy = __classPrivateFieldGet(this, _ToolBar_items_, "f");
            for (let i = 0, groups = Object.keys(itemsCopy), group; group = groups[i]; i++) {
                const groupHTML = this.groupHTML(group);
                for (let j = 0, items = itemsCopy[group], item; item = items[j]; j++) {
                    const itemEl = item.render();
                    itemEl.classList.add(...__classPrivateFieldGet(this, _ToolBar_itemClassNames_, "f"));
                    groupHTML.append(itemEl);
                }
                html.append(groupHTML);
            }
            return html;
        }
        html() {
            const html = super.html();
            html.setAttribute('role', 'toolbar');
            return html;
        }
        attachListeners() {
            super.attachListeners();
        }
    }
    _ToolBar_itemClassNames_ = new WeakMap(), _ToolBar_groupClassNames_ = new WeakMap(), _ToolBar_items_ = new WeakMap();

    var _DebugConsole_headerClassNames_, _DebugConsole_logClassNames_, _DebugConsole_footerClassNames_, _DebugConsole_headerId_, _DebugConsole_logId_, _DebugConsole_footerId_, _DebugConsole_outputBuffer_, _DebugConsole_savedMessages_, _DebugConsole_filteredLoggers_, _DebugConsole_isLogging_, _DebugConsole_mountTo, _DebugConsole_logEl_, _DebugConsole_toolbar_, _DebugConsole_formatter_;
    const DEFAULT_SEPERATOR = '-';
    class ToolBarClearButton extends ToolBarButton {
        attachListeners() {
            super.attachListeners();
            const el = this.element;
            el === null || el === void 0 ? void 0 : el.addEventListener('click', (e) => this.handleClick(e));
        }
        handleClick(e) {
            var _a;
            (_a = e.target) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent('clear', {
                bubbles: true,
                detail: {}
            }));
        }
    }
    class DebugConsole extends Component {
        constructor(config) {
            super(config);
            this.name = 'debug-console';
            _DebugConsole_headerClassNames_.set(this, void 0);
            _DebugConsole_logClassNames_.set(this, void 0);
            _DebugConsole_footerClassNames_.set(this, void 0);
            _DebugConsole_headerId_.set(this, void 0);
            _DebugConsole_logId_.set(this, void 0);
            _DebugConsole_footerId_.set(this, void 0);
            _DebugConsole_outputBuffer_.set(this, void 0);
            _DebugConsole_savedMessages_.set(this, void 0);
            _DebugConsole_filteredLoggers_.set(this, void 0);
            _DebugConsole_isLogging_.set(this, void 0);
            _DebugConsole_mountTo.set(this, void 0);
            _DebugConsole_logEl_.set(this, void 0);
            _DebugConsole_toolbar_.set(this, void 0);
            _DebugConsole_formatter_.set(this, void 0);
            __classPrivateFieldSet(this, _DebugConsole_outputBuffer_, [], "f");
            __classPrivateFieldSet(this, _DebugConsole_savedMessages_, [], "f");
            __classPrivateFieldSet(this, _DebugConsole_filteredLoggers_, {}, "f");
            __classPrivateFieldSet(this, _DebugConsole_isLogging_, true, "f");
            __classPrivateFieldSet(this, _DebugConsole_logEl_, null, "f");
            __classPrivateFieldSet(this, _DebugConsole_mountTo, config.mountTo, "f");
            __classPrivateFieldSet(this, _DebugConsole_headerClassNames_, union__default["default"](config.headerClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}header`]), "f");
            __classPrivateFieldSet(this, _DebugConsole_logClassNames_, union__default["default"](config.logClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}logger`]), "f");
            __classPrivateFieldSet(this, _DebugConsole_footerClassNames_, union__default["default"](config.footerClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}footer`]), "f");
            __classPrivateFieldSet(this, _DebugConsole_headerId_, config.headerId || `${this.name.concat('-header')}${this.id}`, "f");
            __classPrivateFieldSet(this, _DebugConsole_logId_, config.logId || `${this.name.concat('-logger')}${this.id}`, "f");
            __classPrivateFieldSet(this, _DebugConsole_footerId_, config.footerId || `${this.name.concat('-footer')}${this.id}`, "f");
            __classPrivateFieldSet(this, _DebugConsole_toolbar_, config.toolbar || DebugConsole.defaultToolbar(), "f");
            __classPrivateFieldSet(this, _DebugConsole_formatter_, config.formatter || new Formatter(), "f");
        }
        get headerId() {
            return __classPrivateFieldGet(this, _DebugConsole_headerId_, "f");
        }
        get logId() {
            return __classPrivateFieldGet(this, _DebugConsole_logId_, "f");
        }
        get footerId() {
            return __classPrivateFieldGet(this, _DebugConsole_footerId_, "f");
        }
        get headerClassNames() {
            return __classPrivateFieldGet(this, _DebugConsole_headerClassNames_, "f");
        }
        get logClassNames() {
            return __classPrivateFieldGet(this, _DebugConsole_logClassNames_, "f");
        }
        get footerClassNames() {
            return __classPrivateFieldGet(this, _DebugConsole_footerClassNames_, "f");
        }
        get isLogging() {
            return __classPrivateFieldGet(this, _DebugConsole_isLogging_, "f");
        }
        get outputBuffer() {
            return __classPrivateFieldGet(this, _DebugConsole_outputBuffer_, "f");
        }
        get savedMessages() {
            return __classPrivateFieldGet(this, _DebugConsole_savedMessages_, "f");
        }
        get filteredLoggers() {
            return __classPrivateFieldGet(this, _DebugConsole_filteredLoggers_, "f");
        }
        log(logRecord) {
            if (!logRecord) {
                return;
            }
            __classPrivateFieldSet(this, _DebugConsole_logEl_, __classPrivateFieldGet(this, _DebugConsole_logEl_, "f") || document.createElement('div'), "f");
            const scroll = (__classPrivateFieldGet(this, _DebugConsole_logEl_, "f").scrollHeight - __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").scrollTop - __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").clientHeight) <= 100;
            __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").appendChild(__classPrivateFieldGet(this, _DebugConsole_formatter_, "f").formatAsHtml(logRecord));
            if (scroll) {
                __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").scrollTop = __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").scrollHeight;
            }
        }
        open(mountTo) {
            if (mountTo) {
                __classPrivateFieldSet(this, _DebugConsole_mountTo, mountTo, "f");
            }
            this.render();
        }
        clear() {
            var _a;
            while ((_a = __classPrivateFieldGet(this, _DebugConsole_logEl_, "f")) === null || _a === void 0 ? void 0 : _a.firstChild)
                __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").removeChild(__classPrivateFieldGet(this, _DebugConsole_logEl_, "f").firstChild);
        }
        exit() {
            __classPrivateFieldSet(this, _DebugConsole_outputBuffer_, [], "f");
            __classPrivateFieldSet(this, _DebugConsole_savedMessages_, [], "f");
            __classPrivateFieldSet(this, _DebugConsole_filteredLoggers_, {}, "f");
            this.clear();
        }
        render() {
            var _a;
            const html = super.render();
            if (__classPrivateFieldGet(this, _DebugConsole_mountTo, "f") && (typeof __classPrivateFieldGet(this, _DebugConsole_mountTo, "f") === 'string')) {
                const target = document.getElementById(__classPrivateFieldGet(this, _DebugConsole_mountTo, "f"));
                target === null || target === void 0 ? void 0 : target.append(html);
                __classPrivateFieldSet(this, _DebugConsole_mountTo, target, "f");
            }
            else if (__classPrivateFieldGet(this, _DebugConsole_mountTo, "f") && (__classPrivateFieldGet(this, _DebugConsole_mountTo, "f") instanceof HTMLElement)) {
                (_a = __classPrivateFieldGet(this, _DebugConsole_mountTo, "f")) === null || _a === void 0 ? void 0 : _a.append(html);
            }
            return html;
        }
        renderAsHTML() {
            const el = super.renderAsHTML();
            const headerEl = document.createElement('header');
            headerEl.classList.add(...__classPrivateFieldGet(this, _DebugConsole_headerClassNames_, "f"));
            headerEl.setAttribute('id', __classPrivateFieldGet(this, _DebugConsole_headerId_, "f"));
            headerEl.append(__classPrivateFieldGet(this, _DebugConsole_toolbar_, "f").render());
            const logEl = document.createElement('div');
            logEl.classList.add(...__classPrivateFieldGet(this, _DebugConsole_logClassNames_, "f"));
            logEl.setAttribute('id', __classPrivateFieldGet(this, _DebugConsole_logId_, "f"));
            const footerEl = document.createElement('footer');
            footerEl.classList.add(...__classPrivateFieldGet(this, _DebugConsole_footerClassNames_, "f"));
            footerEl.setAttribute('id', __classPrivateFieldGet(this, _DebugConsole_footerId_, "f"));
            el.append(headerEl, logEl, footerEl);
            __classPrivateFieldSet(this, _DebugConsole_logEl_, logEl, "f");
            return this.element = el;
        }
        attachListeners() {
            super.attachListeners();
            const defaultGroup = __classPrivateFieldGet(this, _DebugConsole_toolbar_, "f").group('default');
            if (defaultGroup) {
                this.defaultToolbarListeners(defaultGroup);
            }
        }
        defaultToolbarListeners(items) {
            const el = this.element;
            el === null || el === void 0 ? void 0 : el.addEventListener('clear', (e) => this.clear());
        }
        static defaultToolbar() {
            const toolbar = new ToolBar({});
            toolbar.insert('default', new ToolBarClearButton({
                label: 'clear',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>'
            }));
            toolbar.insert('default', new ToolBarComboBox({
                options: ['debug', 'info', 'warning', 'error']
            }));
            toolbar.insert('default', new ToolBarCounter({ label: 'info', classNames: ['counter--info'] }));
            toolbar.insert('default', new ToolBarCounter({ label: 'warning', classNames: ['counter--warning'] }));
            toolbar.insert('default', new ToolBarCounter({ label: 'error', classNames: ['counter--error'] }));
            toolbar.insert('default', new ToolBarAccordian({
                label: 'settings',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></g></svg>',
                panel: 'settings accordian panel'
            }));
            return toolbar;
        }
    }
    _DebugConsole_headerClassNames_ = new WeakMap(), _DebugConsole_logClassNames_ = new WeakMap(), _DebugConsole_footerClassNames_ = new WeakMap(), _DebugConsole_headerId_ = new WeakMap(), _DebugConsole_logId_ = new WeakMap(), _DebugConsole_footerId_ = new WeakMap(), _DebugConsole_outputBuffer_ = new WeakMap(), _DebugConsole_savedMessages_ = new WeakMap(), _DebugConsole_filteredLoggers_ = new WeakMap(), _DebugConsole_isLogging_ = new WeakMap(), _DebugConsole_mountTo = new WeakMap(), _DebugConsole_logEl_ = new WeakMap(), _DebugConsole_toolbar_ = new WeakMap(), _DebugConsole_formatter_ = new WeakMap();

    const logRegistry = new LogRegistry();
    const logBuffer = new LogBuffer();
    const getLogger = (name, level) => {
        return logRegistry.getLogger(name, level);
    };
    const getLoggers = () => {
        return logRegistry.getLoggers();
    };
    const subscribe = (logger, fn) => {
        if (logger) {
            logger = logger.name || logger;
            const loggerItem = getLogger(logger);
            loggerItem.subscribe(fn);
        }
        return false;
    };
    const unsubscribe = (logger, fn) => {
        if (logger) {
            logger = logger.name || logger;
            const loggerItem = getLogger(logger);
            loggerItem.unsubscribe(fn);
        }
        return false;
    };
    const log = (logger, level, msg) => {
        if (logger) {
            logger = logger.name || logger;
            level = level || LogLevel.Debug;
            const loggerItem = getLogger(logger);
            const logRecord = logBuffer.add(level, msg, logger);
            loggerItem.fire(logRecord);
        }
    };
    const info = (logger, msg) => {
        if (logger) {
            log(logger, LogLevel.Info, msg);
        }
    };
    const error = (logger, msg) => {
        if (logger) {
            log(logger, LogLevel.Error, msg);
        }
    };
    const debug = (logger, msg) => {
        if (logger) {
            log(logger, LogLevel.Debug, msg);
        }
    };
    const warning = (logger, msg) => {
        if (logger) {
            log(logger, LogLevel.Warning, msg);
        }
    };

    exports.Accordian = Accordian;
    exports.Button = Button;
    exports.ComboBox = ComboBox;
    exports.Counter = Counter;
    exports.DebugConsole = DebugConsole;
    exports.Formatter = Formatter;
    exports.ToolBar = ToolBar;
    exports.ToolBarAccordian = ToolBarAccordian;
    exports.ToolBarButton = ToolBarButton;
    exports.ToolBarComboBox = ToolBarComboBox;
    exports.ToolBarCounter = ToolBarCounter;
    exports.debug = debug;
    exports.error = error;
    exports.getLogger = getLogger;
    exports.getLoggers = getLoggers;
    exports.info = info;
    exports.log = log;
    exports.logBuffer = logBuffer;
    exports.logRegistry = logRegistry;
    exports.subscribe = subscribe;
    exports.unsubscribe = unsubscribe;
    exports.warning = warning;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
