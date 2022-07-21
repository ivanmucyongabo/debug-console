const {Builder, By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require("path");

import logger, { DebugConsole, ConsoleStyleDefaults } from "../src";

export {}

let driver = null;
let uri = path.resolve("../fixtures/index.html");
let screenShotsUri = path.resolve("../../screenshots");

beforeAll(async () => {
  try {
    let options = new chrome.Options();
    driver = await new Builder()
                .setChromeOptions(options)
                .forBrowser('chrome')
                .build();
    await driver.get(uri);
    await driver.manage().setTimeouts({implicit: 1000});
  } catch (err) {
    // console.log(err);
    throw err;
  }
}, 5000);

afterAll(async () => {
  try {
    await driver.quit();
  } catch (err) {
    // console.log(err);
    throw err;
  }
});

beforeEach(async () => {
  const el = await driver.findElement(By.id("app-main"));
  // el.innerHTML = '';
  while (el.firstChild) el.removeChild(el.firstChild);
});

describe('Chrome e2e tests', () => {
  test('DebugConsole constructor', async () => {
    const el = await driver.findElement(By.id('app-main'));
    const console = new DebugConsole(el);
    const consoleEl = await driver.findElement(By.id('debug-console'));

    const logHeaderEl = await consoleEl.findElement(By.id(ConsoleStyleDefaults.ids.header));
    const logBodyEl = await consoleEl.findElement(By.id(ConsoleStyleDefaults.ids.body));
    const logFooterEl = await consoleEl.findElement(By.id(ConsoleStyleDefaults.ids.footer));

    expect(console).toBeDefined();
    expect(console).toBeInstanceOf(DebugConsole);

    expect(consoleEl).toBeDefined();
    expect(await consoleEl.isDisplayed()).toEqual(true);

    expect(logHeaderEl).toBeDefined();
    expect(await logHeaderEl.isDisplayed()).toEqual(true);

    expect(logBodyEl).toBeDefined();
    expect(await logBodyEl.isDisplayed()).toEqual(true);

    expect(logFooterEl).toBeDefined();
    expect(await logFooterEl.isDisplayed()).toEqual(true);
  });

  test('DebugConsole open method', async () => {
      const el = await driver.findElement(By.id('app-main'));
      const console = new DebugConsole(el);
      const consoleEl = await driver.findElement(By.id('debug-console'));

      console.open();

      const logHeaderEl = await consoleEl.findElement(By.id(ConsoleStyleDefaults.ids.header));
      const logBodyEl = await consoleEl.findElement(By.id(ConsoleStyleDefaults.ids.body));
      const logFooterEl = await consoleEl.findElement(By.id(ConsoleStyleDefaults.ids.footer));


  });
});
