import React, { FC, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Header, Screen } from "app/components"
import { colors, spacing } from "app/theme"
import { PackageSearchIcon, RadioIcon, User2Icon } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"

interface DiscoverScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Discover">> {}

export const DiscoverScreen: FC<DiscoverScreenProps> = observer(function DiscoverScreen() {
  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Discover"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <Screen style={$root} preset="fixed">
      <View style={[$root, $container]}>
        <View style={$content}>
          <Button
            text="Channels"
            LeftAccessory={() => <User2Icon color={colors.palette.cyan500} />}
            style={$button}
            onPress={() => navigation.navigate("Channels")}
          />
          <Button
            text="Listing"
            LeftAccessory={() => <PackageSearchIcon color={colors.palette.cyan500} />}
            style={$button}
            onPress={() => navigation.navigate("Listing")}
          />
          <Button
            text="Nearby"
            LeftAccessory={() => <RadioIcon color={colors.palette.cyan500} />}
            style={$button}
            onPress={() => navigation.navigate("Nearby")}
          />
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  paddingHorizontal: spacing.medium - 2,
}

const $content: ViewStyle = {
  flex: 1,
  gap: spacing.medium,
}

const $button: ViewStyle = {
  paddingHorizontal: spacing.small,
  paddingVertical: 0,
  gap: spacing.extraSmall,
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
  width: "100%",
  justifyContent: "flex-start",
}
