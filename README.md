# Debug UI

Simple UI components for debugging and logging.

## Installation

```
npm install debug-ui
```

If you want to use the default styles, you need to import styles explicitly.

## What's included

With the download you'll find the following directoryies and files, with both compiled and minified versions.

<details>
    <summary>Download contents</summary>

    ```text
    debug-ui/
    ├── index.css
    ├── index.bundle.js
    ├── index.bundle.js.map
    ├── index.bundle.min.js
    ├── index.bundle.min.js.map
    ├── index.esm.js
    ├── index.esm.js.map
    ├── index.esm.min.js
    ├── index.esm.min.js.map
    ├── index.js
    ├── index.js.map
    ├── index.min.js
    └──  index.min.js.map
    ```

</details>

## Usage

The components use a simple logging API:

Optional CSS file
**css**
```css
@import "debug-ui/css/index.css
```

**node**
app.js/app.ts
```js
import { debug, subscribe, unsubscribe, DebugConsole } from 'debug-ui';

let debugConsole = new DebugConsole(document.getElementById('someElementInTheDOM'));

debugConsole.open();
// OR
debugConsole.open(document.getElementById('someElementInTheDOM'));

suscribe('loggerA', (record) => debugConsole.log(record));
suscribe('loggerB', (record) => debugConsole.log(record));

debug('loggerA', 'example log A');
debug('loggerB', 'example log B');
```

**browser**
indext.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <script src="debug-ui/index.bundle.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script>
      var debug = DebugUI.debug;
      var subscribe = DebugUI.subscribe;
      var debugConsole = new DebugUI.DebugConsole({
        mountTo: document.getElementById('example')
      });

      debugConsole.open()

      subscribe('example', (record) => debugConsole.log(record));

      debug('example', 'example log');
    </script>
  </body>
</html>
```

## Configurable Properties

### Debug Console

The Debug Console component supports the following properties:

Property              | Purpose
--------------------- | -------------
`headerClassNames`    | CSS class name(s) to append to header element.
`logClassNames`       | CSS class name(s) to append to logger div.
`footerClassNames`    | CSS class name(s) to append to footer element.
`headerId`            | ID for header element.
`logId`               | ID for logger div.
`footerId`            | ID for footer element. 
`mountTo`             | HTMLElement or string to mount component to.
`toolbar`             | ToolBar: toolbar to use for component.
`formatter`           | Formatter: formatter to use for structuring/styling log record.

#### Formatter

Property              | Purpose
--------------------- | -------------
info                  | CSS class name(s) to append to info log element.
error                 | CSS class name(s) to append to error log element.
warning               | CSS class name(s) to append to warning log element.
debug                 | CSS class name(s) to append to debug log element.
logRecordContainer    | CSS class name(s) to append to log element.
logRecordTimestamp    | CSS class name(s) to append to log element.
logRecordName         | CSS class name(s) to append to log element.
logRecordLevel        | CSS class name(s) to append to log element.
prefix                | CSS class name(s) to append to log element.
showAbsoluteTime      | A boolean to display the current time.
showRelativeTime      | A boolean to display the relative time, since the log was created.
showLoggerName        | A boolean to display the name of the logger.
showSeverityLevel     | A boolean to display the log level of the record.

#### Toolbar

Property              | Purpose
--------------------- | -------------
`itemClassNames`      | CSS class name(s) to append to ToolBarItems.
`groupClassNames`     | CSS class name(s) to append to toolbar groups.
`items`               | ToolBarItems to appended to the toolbar component.

## Copyright and license

Code copyright 2021–2022. Code released under the [MIT License](https://github.com/ivanmucyongabo/debug-ui/blob/main/LICENSE).
