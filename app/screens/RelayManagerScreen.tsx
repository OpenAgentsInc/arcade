import React, { FC, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, ListItem, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { XIcon } from "lucide-react-native"

interface RelayManagerScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"RelayManager">> {}

export const RelayManagerScreen: FC<RelayManagerScreenProps> = observer(
  function RelayManagerScreen() {
    // Pull in one of our MST stores
    const {
      userStore: { getRelays, addRelay, removeRelay },
    } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Relay Manager"
            titleStyle={{ color: colors.palette.cyan400 }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    return (
      <Screen contentContainerStyle={$root} preset="fixed">
        <FlashList
          data={getRelays}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ListItem
              text={item}
              style={$item}
              containerStyle={$itemContainer}
              RightComponent={
                <Pressable onPress={() => removeRelay(item)}>
                  <XIcon width={20} height={20} color={colors.palette.cyan500} />
                </Pressable>
              }
            />
          )}
          ListHeaderComponent={<Text text="Connected" size="lg" preset="bold" style={$heading} />}
          ListEmptyComponent={
            <View style={$emptyState}>
              <Text text="No relay found..." />
            </View>
          }
          estimatedItemSize={50}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}

const $heading: ViewStyle = {
  marginTop: spacing.medium,
  marginBottom: spacing.small,
}

const $itemContainer: ViewStyle = {
  alignItems: "center",
}

const $item: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.small,
  marginBottom: spacing.small,
  alignItems: "center",
}
