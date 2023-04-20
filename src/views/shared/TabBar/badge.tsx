import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import { color, spacing } from 'views/theme'
import { Text } from '../Text'

const CONTAINER: ViewStyle = {
  borderRadius: 3,
  backgroundColor: color.highlight,
  shadowOffset: {
    height: 0,
    width: 0,
  },
  shadowRadius: 5,
  shadowOpacity: 0.42,
  shadowColor: color.highlight,
  alignItems: 'center',
  justifyContent: 'center',
  height: spacing[3],
  marginTop: -1,
  marginLeft: 4,
  paddingHorizontal: 2,
  minWidth: spacing[4],
}

interface BadgeProps {
  count?: number
  style?: ViewStyle
}

export class Badge extends React.Component<BadgeProps> {
  render() {
    const { count, style } = this.props
    const text = count?.toString()

    return (
      <View style={[CONTAINER, style]}>
        <Text preset="detail" text={text} />
      </View>
    )
  }
}
