const { When } = require('cucumber')
const Login = require('../pages/login')

When(/^I go to my dashboard$/, async () => {
  await Login.open()
  await browser.saveAndDiffScreenshot('Login')
})
When(/^I do login$/, async () => {
  await Login.authenticate('user@example', 'password')
})
