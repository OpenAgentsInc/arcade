import React, { FC, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"

interface ChangelogScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Changelog">> {}

export const ChangelogScreen: FC<ChangelogScreenProps> = observer(function ChangelogScreen() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Changelog"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          rightIcon="Github"
          rightIconColor={colors.palette.cyan400}
          onRightPress={() => Linking.openURL("https://github.com/ArcadeLabsInc/arcade/releases")}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <Screen contentContainerStyle={$root} preset="fixed" keyboardOffset={50}>
      <View style={$heading}>
        <Text text={"v0.1.1"} size="lg" preset="bold" />
        <Text text={"13 June 2023"} size="xs" style={$subtitle} />
        <View style={$divider} />
        <Text text={"v0.1.0 - Oslo"} size="lg" preset="bold" />
        <Text text={"12 June 2023"} size="xs" style={$subtitle} />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}

const $heading: ViewStyle = {
  marginTop: spacing.medium,
  marginBottom: spacing.small,
}

const $subtitle: TextStyle = {
  color: colors.palette.cyan800,
}

const $divider: ViewStyle = {
  borderBottomColor: colors.palette.cyan800,
  borderBottomWidth: 1,
  marginVertical: 24,
}
