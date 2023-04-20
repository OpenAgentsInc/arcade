import * as React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { spacing } from '../../theme'
import { Text } from '../Text'
import { NavButtonProps } from './nav-button.props'

function NavButtonImage({ preset }: { preset: string }) {
  if (preset === 'close') {
    return <Image source={require('./close.png')} />
  }
  if (preset === 'forward') {
    return <Image source={require('./forward.png')} />
  }
  // return <Image source={require('./back.png')} />
  return (
    <Ionicons
      name="chevron-back"
      size={26}
      color="white"
      style={{ marginTop: -4, marginLeft: -8, opacity: 0.6 }}
    />
  )
}

/**
 * It's the nav button. It helps you navigate.
 */
const NavButtonFC = (props: NavButtonProps) => {
  // TODO:
  // grab the props
  const {
    preset = 'back',
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    ...rest
  }: NavButtonProps = props

  // do we have any text
  const hasText = tx || text

  // assemble the base TouchableOpacity style
  const setViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4] - 2,
    ...styleOverride,
  }

  // assemble the base text style
  const setTextStyle = {
    marginLeft: spacing[2],
    ...textStyleOverride,
  }

  return (
    <TouchableOpacity {...rest} style={setViewStyle}>
      <NavButtonImage preset={preset} />
      {hasText && (
        <Text preset="label" tx={tx} text={text} style={setTextStyle} />
      )}
    </TouchableOpacity>
  )
}

export const NavButton = React.memo((props: NavButtonProps) => (
  <NavButtonFC {...props} />
))
