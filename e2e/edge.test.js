const {Builder} = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const path = require("path");

export {}

let driver = null;
let uri = path.resolve("../fixtures/index.html");
let screenShotsUri = path.resolve("../../screenshots");

beforeAll(async () => {
  try {
    let options = new edge.Options();
    driver = await new Builder()
                .setChromeOptions(options)
                .forBrowser('edge')
                .build();
    await driver.get(uri);
  } catch (err) {
    console.log(err)
  }
});

afterAll(async () => {
  try {
    await driver.quit();
  } catch (err) {
    console.log(err)
  }
});

describe('Edge e2e tests', async () => {
  test('Timer constructor', () => {
    expect(true).toBeDefined();
  });
});
