const { Then } = require('cucumber')

Then(/^I can see my profile$/, async () => {
  console.log('Go to dashboard')
  expect(browser).toHaveTitle('Send mail')
})
