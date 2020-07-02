/* eslint-disable class-methods-use-this */
'use strict';
import {cast} from './utils/cast';
export class Page {
  constructor(path) {
    this._path = path;
  }

  get name() {
    return 'undefined';
  }

  /**
   * @return {string}
   */
  get path() {
    return this._path;
  }

  /**
   * @param {string} path
   */
  set path(path) {
    this._path = path;
  }

  async open() {
    console.log('browse url', this.path);
    await browser.url(this.path);
    await this.waitForDisplayed();
  }

  /**
   *
   * @param {string} selector
   */
  field(selector) {
    throw new Error('Not implemented for ' + selector);
  }

  async submit() {
    const field = this.field('submit');
    const element = await $(field);
    await browser.saveScreenshotByName(`${this.name}--filled`);
    await element.click();
  }

  /**
   *
   * @param {string} selector
   * @param {string} value
   * @return {Promise<void>}
   */
  async type(selector, value = undefined) {
    const field = this.field(selector);
    if (typeof value === 'undefined') value = selector;
    const element = await $(field);
    await element.addValue(cast(value));
  }

  /**
   *
   * @param {string} selector
   * @param {string} value
   * @return {Promise<void>}
   */
  async pick(selector, value = undefined) {
    const field = this.field(selector);
    if (typeof value === 'undefined') value = selector;
    const range = cast(value);
    const container = await $(field);
    const element = await container.$(
      `.MuiSlider-markLabel[aria-hidden='true'][data-index='${range}']`
    );
    await element.click();
  }

  /**
   *
   * @param {string} selector
   * @return {Promise<void>}
   */
  async click(selector) {
    const field = this.field(selector);
    const element = await $(field);
    await element.click();
  }

  async waitForDisplayed(timeout = 1200) {
    await new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
    await browser.saveScreenshotByName(this.name);
  }
}
