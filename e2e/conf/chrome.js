'use strict'

/* eslint-disable jsdoc/valid-types */
const config = {
  hostname: 'chromedriver',
  path: '/',
  capabilities: [
    {
      // Set maxInstances to 1 if screen recordings are enabled:
      // maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        // Disable headless mode if screen recordings are enabled:
        args: ['--headless', '--window-size=1440,900']
      }
    }
  ],
  framework: 'cucumber',
  baseUrl: process.env.BASE_URL,
  logLevel: 'warn',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: '/opt/reports/allure/',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true
      }
    ]
  ],
  cucumberOpts: {
    requireModule: ['@babel/register'],
    require: ['./test/steps/**/*.steps.js'],
    backtrace: false,
    compiler: [],
    dryRun: false,
    failFast: false,
    format: ['pretty'],
    colors: true,
    snippets: true,
    source: true,
    profile: [],
    strict: false,
    tags: [],
    timeout: 100000,
    ignoreUndefinedDefinitions: false,
    tagExpression: 'not @skip'
  },
  specs: ['test/features/**/*.feature'],
  maximizeWindow: true,
  screenshots: {
    saveOnFail: true
  },
  videos: {
    enabled: true,
    resolution: '1440x900',
    startDelay: 500,
    stopDelay: 500
  },
  assetsDir: '/home/webdriver/assets/'
}

exports.config = Object.assign({}, require('../hooks'), config)
