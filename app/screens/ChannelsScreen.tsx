import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Card, Header, Screen, Text, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { SearchIcon, PlusCircleIcon } from "lucide-react-native"
import { FlashList } from "@shopify/flash-list"
import { RelayContext } from "app/components/RelayProvider"
import { listChannels } from "arclib"
// import { useStores } from "app/models"

interface ChannelsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Channels">> {}

export const ChannelsScreen: FC<ChannelsScreenProps> = observer(function ChannelsScreen() {
  const pool: any = useContext(RelayContext)
  const [data, setData] = useState([])

  // Pull in navigation via hook
  const navigation: any = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Channels"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <View style={$headerRightActions}>
              <SearchIcon size={20} color={colors.palette.cyan400} />
              <PlusCircleIcon size={20} color={colors.palette.cyan400} />
            </View>
          }
        />
      ),
    })
  }, [])

  useEffect(() => {
    async function initChannels() {
      const res = await listChannels(pool)
      setData((prev) => [...prev, ...res])
    }

    initChannels().catch(console.error)
  }, [])

  return (
    <Screen style={$root} preset="scroll">
      <View style={[$root, $container]}>
        <View style={$content}>
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <Card
                preset="reversed"
                RightComponent={
                  <Button
                    onPress={() => navigation.navigate("Chat", { id: item.id, name: item.name })}
                    text="Join"
                    style={$itemButton}
                  />
                }
                heading={item.name}
                ContentComponent={
                  <View>
                    <Text text={item.about} />
                  </View>
                }
                style={$item}
              />
            )}
            estimatedItemSize={300}
          />
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $headerRightActions: ViewStyle = {
  flexDirection: "row",
  gap: spacing.medium,
  paddingRight: spacing.medium,
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  paddingHorizontal: spacing.medium,
}

const $content: ViewStyle = {
  paddingTop: spacing.medium,
}

const $item: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.extraSmall,
  paddingHorizontal: spacing.small,
  marginBottom: spacing.small,
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
  shadowColor: "transparent",
}

const $itemButton: ViewStyle = {
  backgroundColor: "transparent",
  borderWidth: 0,
  paddingHorizontal: 0,
  paddingVertical: 0,
  height: 30,
  minHeight: 30,
}
