import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Card, Header, Screen, Text, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { RelayContext } from "app/components/RelayProvider"
import { listChannels } from "arclib"
import { useStores } from "app/models"

interface ChannelsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Channels">> {}

export const ChannelsScreen: FC<ChannelsScreenProps> = observer(function ChannelsScreen() {
  const pool: any = useContext(RelayContext)
  const { userStore } = useStores()

  const [data, setData] = useState([])

  // Pull in navigation via hook
  const navigation: any = useNavigation()

  const joinChannel = (item: any) => {
    // update state
    userStore.joinChannel(item.id)
    // redirect to channel
    navigation.navigate("Chat", { id: item.id, name: item.name })
  }

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
        />
      ),
    })
  }, [])

  useEffect(() => {
    async function initChannels() {
      const res = await listChannels(pool)
      // update data state
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
                  <Button onPress={() => joinChannel(item)} text="Join" style={$itemButton} />
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
            ListEmptyComponent={<Text text="Loading..." />}
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
