'use strict';

/* global browser */

const cmds = require('wdio-screen-commands');
const slugify = require('slugify');

const {Scene} = require('../test/pages/utils/Scene');
/* eslint-disable jsdoc/valid-types */
/** @type WebdriverIO.HookFunctions */
const config = {
  before: async () => {
    global.uuidv4 = require('uuid').v4;
    global.SCENE = Scene;
    browser.addCommand('saveScreenshotByName', async screenshotName => {
      console.log('New screen shots');
      if (Scene.feature) {
        Scene.screenShotCount++;
        screenshotName =
          slugify(Scene.feature.document.feature.name) +
          '_' +
          (Scene.screenShotCount < 10
            ? '0' + Scene.screenShotCount
            : Scene.screenShotCount) +
          ' ' +
          screenshotName;
      }
      await cmds.saveScreenshotByName(screenshotName);
      console.log('screenshot ', screenshotName);
    });
    if (browser.config.appium)
      await browser.updateSettings(browser.config.appium);
    if (browser.config.maximizeWindow) await browser.maximizeWindow();
    console.log('Ready to spec');
  },
  beforeFeature: async function (uri, feature, scenarios) {
    Scene.feature = feature;
    Scene.screenShotCount = 0;
    const name = slugify(feature.document.feature.name);
    const test = {
      parent: 'Feat',
      uid: name,
      title: name,
      state: 'passed',
      type: 'test',
    };
    console.log('start recording');
    await cmds.startScreenRecording(test);

    const oldBaseURL = browser.options.baseUrl;
    browser.options.baseUrl = 'https://caroster-page.dev.octr.ee';
    await browser.url(`/${feature.uri}.txt`);
    console.log('browse ', browser.options.baseUrl, `/${feature.uri}`);
    browser.options.baseUrl = oldBaseURL;
    await new Promise(resolve => setTimeout(resolve, 5000));
  },
  afterFeature: async function (uri, feature, scenarios) {
    const name = slugify(feature.document.feature.name);
    const test = {
      parent: 'Feat',
      uid: name,
      title: name,
      state: 'passed',
      type: 'test',
    };
    console.log('stop recording');

    await cmds.stopScreenRecording(test, {
      error: undefined,
      result: 0,
      duration: undefined,
      passed: scenarios.length,
      retries: 0,
    });
    Scene.feature = undefined;
  },
};

module.exports = config;
