import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import React, { useLayoutEffect } from "react"
import { Screen, Header, Text } from "app/components"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"

export const BitcoinTradingScreen = observer(function BitcoinTradingScreen() {
  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Bitcoin Trading"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <Screen preset="fixed" style={$root} contentContainerStyle={$container}>
      <Text text="TODO" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium,
}
