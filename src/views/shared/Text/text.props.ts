import { StyleProp, TextProps as TextProperties, TextStyle } from 'react-native'
import i18n from 'i18n-js'
import { TextPresetNames } from './text.presets'
// import { TxKeyPath } from '../../i18n'

export interface TextProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * Text which is looked up via i18n.
   */
  tx?: any // TxKeyPath

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string | null

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresetNames

  /**
   * Should we capitalize?
   */
  capitalize?: boolean
}
