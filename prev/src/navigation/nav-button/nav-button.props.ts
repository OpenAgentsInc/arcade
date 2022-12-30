import { TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native'
import { NavigationProp } from '@react-navigation/native'

export interface NavButtonProps extends TouchableOpacityProps {
  navigation?: NavigationProp<any>

  /**
   * The nav button preset.
   */
  preset?: 'back' | 'close' | 'forward'

  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override for the button's TouchableOpacity
   */
  style?: ViewStyle

  /**
   * An optional style override for nested button text.
   */
  textStyle?: TextStyle
}
