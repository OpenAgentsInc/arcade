import { Screen, Text } from "app/components"
import { ViewStyle } from "react-native"

export const DemoScreens = () => {
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["bottom"]} keyboardOffset={120}>
      <Text text="Demo Screens" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
