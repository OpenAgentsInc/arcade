/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [
  [
    /** Enables baseUrl: "./" option in tsconfig.json to work @see https://github.com/entwicklerstube/babel-plugin-root-import */
    "babel-plugin-root-import",
    {
      paths: [
        {
          rootPathPrefix: "app/",
          rootPathSuffix: "app",
        },
        {
          rootPathPrefix: "assets/",
          rootPathSuffix: "assets",
        },
      ],
    },
  ],
  [
    "module-resolver",
    {
      root: ["./src"],
      extensions: [
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        ".android.js",
        ".android.tsx",
        ".ios.js",
        ".ios.tsx",
      ],
      alias: {
        "@types": "./src/@types",
        app: "./src",
        arca: "./src/arca",
        assets: "./src/assets",
        components: "./src/components",
        features: "./src/features",
        i18n: "./src/i18n",
        lib: "./src/lib",
        navigation: "./src/navigation",
        provider: "./src/provider",
        services: "./src/services",
        stores: "./src/stores",
        views: "./src/views",
      },
    },
  ],
  ["@babel/plugin-transform-flow-strip-types"],
  ["@babel/plugin-proposal-decorators", { legacy: true, loose: true }],
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web */
  "@babel/plugin-proposal-export-namespace-from",
  ["@babel/plugin-proposal-private-methods", { loose: true }],
  /** NOTE: This must be last in the plugins @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#babel-plugin */
  "react-native-reanimated/plugin",
]

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: ["babel-preset-expo"],
  env: {
    production: {},
    test: { plugins: ["@babel/plugin-transform-modules-commonjs"] },
  },
  plugins,
}
