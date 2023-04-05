import { flatten } from 'ramda'
import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { palette } from 'views/theme'
import { FontAwesome as Icon, MaterialCommunityIcons } from '@expo/vector-icons'
import { Text } from '../Text/text'
import { disabledViewPresets, textPresets, viewPresets } from './button.presets'
import { ButtonProps } from './button.props'

const DEFAULT_ACTIVE_OPACITY: number = 0.8

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    checked,
    preset = 'primary',
    tx,
    text,
    withIcon,
    hasIcon,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props

  const viewStyle = viewPresets[preset] || viewPresets.primary
  const disabledViewStyle =
    props.disabled &&
    (disabledViewPresets[preset] || disabledViewPresets.primary)
  const iconStyle = props.icon && (viewPresets['icon'] || viewPresets.icon)
  const viewStyles = flatten([
    viewStyle,
    disabledViewStyle,
    iconStyle,
    styleOverride,
  ])

  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = flatten([textStyle, textStyleOverride])

  const content = children || <Text tx={tx} text={text} style={textStyles} />

  if (hasIcon) {
    return (
      <TouchableOpacity
        activeOpacity={DEFAULT_ACTIVE_OPACITY}
        style={viewStyles}
        {...rest}
      >
        <View style={{ flexDirection: 'row' }}>
          {hasIcon}
          <Text
            preset="label"
            tx={tx}
            text={text}
            style={{
              // ...textStyles,
              marginLeft: 0,
              paddingLeft: 10,
              fontSize: 18,
              lineHeight: 24,
              letterSpacing: 1,
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  if (withIcon) {
    return (
      <TouchableOpacity
        activeOpacity={DEFAULT_ACTIVE_OPACITY}
        style={viewStyles}
        {...rest}
      >
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name={withIcon}
            style={{
              ...textStyles,
              marginRight: 0,
              paddingRight: 8,
              fontSize: 18,
              marginTop: 2,
              color: palette.white,
            }}
          />
          <Text
            preset="label"
            tx={tx}
            text={text}
            style={{
              ...textStyles,
              marginLeft: 0,
              paddingLeft: 10,
              fontSize: 18,
              lineHeight: 24,
              letterSpacing: 1,
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      activeOpacity={DEFAULT_ACTIVE_OPACITY}
      style={viewStyles}
      {...rest}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 10,
          bottom: 0,
          // backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          width: 30,
        }}
      >
        {checked === false && (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={24}
            color={palette.moonRaker}
          />
        )}
        {checked === true && (
          <MaterialCommunityIcons
            name="checkbox-marked-outline"
            size={26}
            color={palette.moonRaker}
          />
        )}
      </View>
      {content}
    </TouchableOpacity>
  )
}
