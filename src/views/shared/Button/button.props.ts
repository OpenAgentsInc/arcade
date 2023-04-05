import { TxKeyPath } from 'i18n'
import {
    StyleProp, TextStyle, TouchableOpacityProps, ViewStyle
} from 'react-native'
import { ButtonPresetNames } from './button.presets'

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Should the button have a checkmark - and what status
   */
  checked?: boolean

  /**
   * The icon to display if not using `tx`, `text`, or nested components.
   */
  icon?: string | boolean

  /**
   * The icon to display along with the text
   */
  hasIcon?: any

  /**
   * The icon to display along with the text
   */
  withIcon?: any

  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode
}
