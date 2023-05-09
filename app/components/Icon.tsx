import * as React from "react"
import { ComponentType } from "react"
import { StyleProp, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native"
import * as LucideIcons from "lucide-react-native"
import { LucideIcon } from "lucide-react-native"

export type IconTypes = keyof typeof LucideIcons

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const { icon, color, size, containerStyle: $containerStyleOverride, ...WrapperProps } = props

  const IconComponent: LucideIcon = LucideIcons[icon] as LucideIcon

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <IconComponent stroke={color || "#000"} width={size || 24} height={size || 24} />
    </Wrapper>
  )
}
