import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen } from "app/components"
import { colors, spacing } from "app/theme"
import { HomeIcon, PackageSearchIcon, RadioIcon } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface DiscoverScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Discover">> {}

export const DiscoverScreen: FC<DiscoverScreenProps> = observer(function DiscoverScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const { navigate } = useNavigation<any>()

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]}>
      <View style={[$root, $container]}>
        <View style={$content}>
          <Button
            text="Home"
            LeftAccessory={() => <HomeIcon color={colors.palette.cyan500} />}
            style={$button}
            onPress={() => navigate("Home")}
          />
          <Button
            text="Listing"
            LeftAccessory={() => <PackageSearchIcon color={colors.palette.cyan500} />}
            style={$button}
          />
          <Button
            text="Radar"
            LeftAccessory={() => <RadioIcon color={colors.palette.cyan500} />}
            style={$button}
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
  paddingVertical: spacing.extraSmall,
  paddingHorizontal: spacing.small,
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
}

const $button: ViewStyle = {
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: "transparent",
  paddingHorizontal: 0,
  paddingVertical: 0,
  gap: spacing.extraSmall,
  alignSelf: "flex-start",
}
