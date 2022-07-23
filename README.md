#Debug UI

Simple UI components for debugging and logging.

### Installation

```
npm install debug-ui
```

If you want to use the default styles, you need to import styles explicitly.

### Usage

The components leverage a very simple logging API:

```ts
import { debug, subscribe, unsubscribe, Console } from 'debug-ui';

let debugConsole = Console(document.getElementById('app-main'));

debugConsole.open();
Console.log();

suscribe('example', Console.log);
```