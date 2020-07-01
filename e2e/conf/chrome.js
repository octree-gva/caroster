'use strict';

/* eslint-disable jsdoc/valid-types */
const config = {
  waitforTimeout: 6000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  runner: 'local',
  deprecationWarnings: true,
  bail: 0,
  hostname: 'chromedriver',
  path: '/',
  capabilities: [
    {
      // Set maxInstances to 1 if screen recordings are enabled:
      // maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        // Disable headless mode if screen recordings are enabled:
        args: ['--headless', '--window-size=1440,900'],
      },
    },
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
        useCucumberStepReporter: true,
        labels: {
          feature: [/GIT.(\d*)/],
        },
      },
    ],
  ],
  cucumberOpts: {
    requireModule: ['@babel/register'],
    backtrace: true,
    compiler: [],
    dryRun: false,
    failFast: false,
    format: ['pretty'],
    colors: true,
    snippets: true,
    source: true,
    profile: [],
    strict: true,
    tags: [],
    timeout: 100000,
    ignoreUndefinedDefinitions: false,
    tagExpression: 'not @skip',
  },
  specs: ['test/features/**/*.feature'],
  maximizeWindow: true,
  screenshots: {
    saveOnFail: false,
  },
  videos: {
    enabled: false,
    resolution: '1440x900',
    startDelay: 120,
    stopDelay: 1500,
  },
  assetsDir: '/home/webdriver/assets/',
};
config.cucumberOpts.require = ['./test/steps/**/*.steps.js'];
exports.config = Object.assign({}, require('../hooks'), config);
