import { createTamagui, createTokens } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens as baseTokens } from '@tamagui/theme-base'
import { createMedia } from '@tamagui/react-native-media-driver'

import { animations } from './animations'

const tokens = createTokens({
  ...baseTokens,
  color: {
    bg: 'rgb(0, 2, 18)',

    // From Adobe Color palette generated from nostrich img, "Colorful"
    indigo: '#3F04BF',
    indigodark: '#21038C',
    night: '#1A1726',
    twilight: '#453A8C',
    dusk: '#272559',

    // Arcade City colors
    haiti: '#120B29',
    purple: '#1C133A',
    portGore: '#2D2252',
    blueBell: '#9D98CB',
    blueBellFaded: 'rgba(157, 152, 203, 0.6)',
    minsk: '#46367C',
    moonRaker: '#EEECFB',
    radicalRed: '#FC3A57',
    pinkFlamingo: '#F459F4',
    electricViolet: '#AE30FF',
    electricIndigo: '#5B20F2',
  },
})

const headingFont = createInterFont({
  size: {
    6: 15,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  face: {
    700: { normal: 'InterBold' },
  },
})

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: 'InterBold' },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
  }
)

export const config = createTamagui({
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
})
