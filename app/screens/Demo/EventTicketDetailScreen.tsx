import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import React, { useLayoutEffect } from "react"
import { Screen, Header, Text } from "app/components"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"

export const EventTicketDetailScreen = observer(function EventTicketDetailScreen({
  route,
}: {
  route: any
}) {
  // Get route params
  const { name } = route.params

  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title={name}
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Text text="Checkout" />
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}
