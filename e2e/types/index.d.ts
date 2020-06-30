/**
 * Helper type to unwrap Promise return types
 */
type UnwrapReturnType<T> = T extends (...args: any[]) => Promise<infer U>
  ? U
  : T

type mailhog = import('mailhog').API

declare module WebdriverIO {
  interface Config {
    maximizeWindow?: boolean
    assetsDir?: string
    appium?: any
  }

  interface Browser {
    saveScreenshotByName: typeof import('wdio-screen-commands').saveScreenshotByName
    saveAndDiffScreenshot: typeof import('wdio-screen-commands').saveAndDiffScreenshot
  }
}

declare module NodeJS {
  interface Global {
    uuidv4: typeof import('uuid/v4')
  }
}

declare const uuidv4: typeof import('uuid/v4')
