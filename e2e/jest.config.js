/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "./lib/setup-tests.ts",
  testSequencer: "./testSequencer.js",
};
