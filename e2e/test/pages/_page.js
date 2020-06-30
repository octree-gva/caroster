exports.Page = class {
  constructor(path) {
    this._path = path
  }

  /**
   * @return {string}
   */
  get path() {
    return this._path
  }

  /**
   * @param {string} path
   */
  set path(path) {
    this._path = path
  }

  async open() {
    return await browser.url(this.path)
  }

  /**
   *
   * @param {string} selector
   * @return {Promise<void>}
   */
  async click(selector) {
    const element = await $(selector)
    await element.click()
  }
  /**
   *
   * @param {string} selector
   * @return {Promise<void>}
   */
  async type(selector, value) {
    const element = await $(selector)
    await element.click()
    element.addValue(value)
  }
}
