import { ViewStyle } from 'react-native'
import { KeyboardOffsets, ScreenPresets } from './screen.presets'

export interface ScreenProps {
  refreshControl?: any

  /**
   * Should it include a HUD-style back button
   */
  withBackButton?: boolean

  rounded?: boolean

  /**
   * An optional background color
   */
  backgroundColor?: string

  /**
   * Transparent background or no
   */
  transparent?: boolean

  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * One of the different types of presets.
   */
  preset: ScreenPresets

  /**
   * A component which will dodge the keyboard. It will remained
   * docked to the bottom right above the keyboard.  On iOS it
   * will animated smoothly, but on Android it pops instantly.
   */
  dock?: React.ReactNode

  /**
   * The height of the dock. You can use this when you have a
   * navigation header.  The default height is taken care of,
   * however if you have a custom height, you can override this.
   *
   * Spoiler: you probably won't.
   */
  dockHeight?: number

  /**
   * Use insets
   */
  safe?: boolean

  /**
   * Don't wrap contents in SafeAreaView.
   */
  unsafe?: boolean

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never'
}
