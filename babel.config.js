module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
            '.stories.tsx',
          ],
          alias: {
            i18n: './src/i18n',
            lib: './src/lib',
            navigation: './src/navigation',
            services: './src/services',
            stores: './src/stores',
            views: './src/views',
          },
        },
      ],
      'react-native-reanimated/plugin', // Must be listed last
    ],
  }
}
