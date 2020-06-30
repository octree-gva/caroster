'use strict'

/* global browser, $ */
/* eslint-disable class-methods-use-this */

class Login {
  get email() {
    return $('#email')
  }
  get password() {
    return $('#password')
  }
  get submit() {
    return $('#submit')
  }
  get recipient() {
    return $('#recipient')
  }
  /**
   * Opens the login form.
   *
   * @param {number} [timeout] Wait timeout
   * @returns {Login} Login object
   */
  async open(timeout = 1200) {
    await browser.url('/login.html')
    await browser.saveAndDiffScreenshot('Login-test')
    const password = await $('#password')
    await password.waitForExist({ timeout })
    return this
  }
  /**
   * Authenticates user.
   *
   * @param {string} email User email
   * @param {string} password User password
   * @param {number} [timeout] Wait timeout
   * @returns {Login} Login object
   */
  async authenticate(email, password, timeout) {
    const emailField = await this.email
    emailField.setValue(email)
    const passwordField = await this.password
    passwordField.setValue(password)
    const submitButton = await this.submit
    await submitButton.click()
    const recipient = await this.recipient
    await recipient.waitForExist({ timeout })
    return this
  }
}

module.exports = new Login()
