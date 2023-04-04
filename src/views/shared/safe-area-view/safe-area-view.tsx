import { FunctionComponent, memo } from 'react'
import { View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type SafeAreaViewProps = {
  disableBottomSafeArea?: boolean
  disableTopSafeArea?: boolean
  disableSidesSafeArea?: boolean
  children: React.ReactNode
  style?: ViewStyle
}

export const SafeAreaView: FunctionComponent<SafeAreaViewProps> = memo(
  (props: SafeAreaViewProps) => {
    const {
      disableBottomSafeArea = false,
      disableTopSafeArea = false,
      disableSidesSafeArea = false,
      children,
    } = props

    const insets = useSafeAreaInsets()

    let style: ViewStyle = { ...props.style }

    if (!disableBottomSafeArea) {
      style.paddingBottom = insets.bottom
      // style.marginBottom = insets.bottom
    }

    if (!disableTopSafeArea) {
      style.marginTop = insets.top
    }

    if (!disableSidesSafeArea) {
      style.marginRight = insets.right
      style.marginLeft = insets.left
    }

    return <View style={style}>{children}</View>
  }
)
