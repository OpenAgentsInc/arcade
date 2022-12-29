import { DarkTheme } from '@react-navigation/native'
import { color } from './color'

export const navTheme = {
  colors: {
    ...DarkTheme.colors,
    background: color.background,
  },
  dark: true,
}
