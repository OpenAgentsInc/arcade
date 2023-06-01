const { defaults: tsjPreset } = require("ts-jest/presets")

/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  ...tsjPreset,
  preset: "jest-expo",
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)",
    "jest-runner",
  ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.maestro/", "@react-native", "<rootDir>/packages/"],
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/test/setup.ts", "@shopify/react-native-skia/jestSetup.js"],
  transformIgnorePatterns: [
    'xnode_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
    'node_modules/better-sqlite3|isomorphic-webcrypto/.*'
  ],
  globalSetup: "@shopify/react-native-skia/globalJestSetup.js",
}
