// process.env.TAMAGUI_TARGET = "native";

module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './src/tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      [
        'transform-inline-environment-variables',
        {
          include: 'TAMAGUI_TARGET',
        },
      ],
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
          ],
          alias: {
            app: './src',
            assets: './src/assets',
            components: './src/components',
            features: './src/features',
            i18n: './src/i18n',
            lib: './src/lib',
            navigation: './src/navigation',
            provider: './src/provider',
            services: './src/services',
            stores: './src/stores',
            views: './src/views',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
