import puppeteer from "puppeteer";

export default class Scraper {
  #page;
  #browser;
  #url;
  #selector;

  constructor() {
    this.#page = undefined;
    this.#browser = undefined;
    this.#url = undefined;
    this.#selector = undefined;
  }

  async scrape(url, selector, options = {}, listener = "") {
    const data = await this.open(url, selector, listener);

    const result = await this.extract(options, data);

    await this.close();

    return result;
  }

  // Polymorphic method
  async extract(options) {
    throw new Error("extract() must be implemented");
  }

  async open(url, selector, listener = "") {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    this.#page = page;
    this.#browser = browser;

    this.#url = url;
    this.#selector = selector;

    const data = await this.navigate(url, selector, listener);

    return data;
  }

  async navigate(url, selector, listener = "") {
    let data = undefined;

    if (listener) {
      const responsePromise = this.#page.waitForResponse((res) => {
        return res.url().includes(listener) && res.status() === 200;
      });

      await this.#page.goto(url, { waitUntil: "domcontentloaded" });

      const response = await responsePromise;
      data = await response?.json();
    } else {
      await this.#page.goto(url, { waitUntil: "domcontentloaded" });
    }

    await this.#page.waitForSelector(selector);

    return data;
  }

  async evaluate(callback, ...args) {
    const data = await this.#page.evaluate(callback, ...args);

    return data;
  }

  async close() {
    await this.#browser.close();

    this.#page = undefined;
    this.#browser = undefined;
    this.#url = undefined;
    this.#selector = undefined;
  }

  getPage() {
    return this.#page;
  }

  getBrowser() {
    return this.#browser;
  }

  getUrl() {
    return this.#url;
  }

  getSelector() {
    return this.#selector;
  }
}
