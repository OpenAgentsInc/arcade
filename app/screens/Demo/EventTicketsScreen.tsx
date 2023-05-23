import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import React, { useLayoutEffect } from "react"
import { Screen, Header, TextField } from "app/components"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"

export const EventTicketsScreen = observer(function EventTicketsScreen() {
  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Event Tickets"
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
      <View>
        <TextField
          placeholder="Search events"
          placeholderTextColor={colors.palette.cyan600}
          style={$searchInput}
          inputWrapperStyle={$searchInputWrapper}
          autoCapitalize="none"
          autoFocus={false}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium,
}

const $searchInputWrapper: ViewStyle = {
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $searchInput: ViewStyle = {
  width: "100%",
  height: 40,
  borderWidth: 1,
  borderColor: colors.palette.cyan800,
  borderRadius: spacing.extraSmall,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
  marginBottom: spacing.small,
}
