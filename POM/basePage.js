export class BasePage {
  constructor(page, url) {
    this._page = page;
    this._url = url;
  }

  async open(url = "/") {
    await this._page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  }
}
