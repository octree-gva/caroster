const { Given } = require('cucumber')
Given(/^I am (.+)$/, async role => {
  console.log({ role })
})
