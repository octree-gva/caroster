/**
 * Helper type to unwrap Promise return types
 */
type UnwrapReturnType<T> = T extends (...args: any[]) => Promise<infer U>
  ? U
  : T;

declare module WebdriverIO {
  interface Config {
    maximizeWindow?: boolean;
    assetsDir?: string;
    appium?: any;
  }

  interface Browser {
    saveScreenshotByName: typeof import('wdio-screen-commands').saveScreenshotByName;
  }
}

declare module NodeJS {
  interface Global {
    uuidv4: typeof import('uuid/v4');
    SCENE: any;
    $: any;
    browser: WebdriverIO.Browser;
  }
}

declare const uuidv4: typeof import('uuid/v4');
