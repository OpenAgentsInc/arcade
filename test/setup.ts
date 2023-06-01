// we always make sure 'react-native' gets included first
import * as ReactNative from "react-native"
import mockFile from "./mockFile"
import 'react-native-gesture-handler/jestSetup';

import { TextEncoder, TextDecoder } from 'util';

global.navigator = {
  userAgent: 'node.js',
  geolocation: {
      getCurrentPosition: () => {
      return position
    }
  }
}
Object.assign(global, { TextDecoder, TextEncoder });


// libraries to mock
jest.doMock("react-native", () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source) => mockFile), // eslint-disable-line @typescript-eslint/no-unused-vars
        getSize: jest.fn(
          (
            uri: string, // eslint-disable-line @typescript-eslint/no-unused-vars
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void, // eslint-disable-line @typescript-eslint/no-unused-vars
          ) => success(100, 100),
        ),
      },
    },
    ReactNative,
  )
})

jest.mock(
  '@nozbe/watermelondb/adapters/sqlite/makeDispatcher/index.native.js',
  () => {
    return jest.requireActual(
      '@nozbe/watermelondb/adapters/sqlite/makeDispatcher/index.js',
    );
  },
);


jest.mock('expo-linking', () => {
    const module: typeof import('expo-linking') = {
        ...jest.requireActual('expo-linking'),
        createURL: jest.fn(),
    };

    return module;
});

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

jest.mock("i18n-js", () => ({
  currentLocale: () => "en",
  t: (key: string, params: Record<string, string>) => {
    return `${key} ${JSON.stringify(params)}`
  },
}))

global.setImmediate = jest.useRealTimers;

declare const tron // eslint-disable-line @typescript-eslint/no-unused-vars

jest.useFakeTimers()
declare global {
  let __TEST__
}
