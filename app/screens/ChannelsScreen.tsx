import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, Pressable, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Card, Header, Screen, Text, Button, AutoImage } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { RelayContext } from "app/components/RelayProvider"
import { useStores } from "app/models"
import { isImage } from "app/utils/isImage"
import { PlusIcon } from "lucide-react-native"
import { ChannelInfo, ChannelManager } from "arclib/src"

interface ChannelsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Channels">> {}

export const ChannelsScreen: FC<ChannelsScreenProps> = observer(function ChannelsScreen() {
  const pool: any = useContext(RelayContext)
  const { userStore, channelStore } = useStores()
  const mgr = new ChannelManager(pool)
  const [dat, setData] = useState([])
  const data: ChannelInfo[] = dat

  // Pull in navigation via hook
  const navigation: any = useNavigation()

  const joinChannel = (item: any) => {
    // create channel in local store
    channelStore.create(item)
    // update state
    userStore.joinChannel(item.id)
    // redirect to channel
    navigation.navigate("Chat", { id: item.id })
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
          RightActionComponent={
            <View style={$headerRightActions}>
              <Pressable onPress={() => navigation.navigate("CreateChannel")}>
                <PlusIcon size={20} color={colors.palette.cyan400} />
              </Pressable>
            </View>
          }
        />
      ),
    })
  }, [])

  useEffect(() => {
    async function initChannels() {
      const res = await mgr.listChannels(true)
      console.log("data is ", res)
      setData(res)
    }

    initChannels().catch(console.error)
  }, [])

  return (
    <Screen style={$root} preset="scroll">
      <View style={[$root, $container]}>
        <View style={$content}>
          <FlashList
            data={data}
            renderItem={({ item }) => {
              // no name or short channel name, mostly spam
              if (!item.name) {
                return null
              }
              // invalid image url, mark as spam
              if (!isImage(item.picture) && !item.is_private) {
                return null
              }
              // user joined channel, skip
              if (userStore.channels.find((el) => el.id === item.id)) {
                return null
              }
              return (
                <Card
                  preset="reversed"
                  ContentComponent={
                    <View style={$item}>
                      <View style={$itemContent}>
                        <AutoImage
                          source={{
                            uri: item.picture || "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp",
                          }}
                          style={$itemImage}
                        />
                        <View>
                          <Text text={item.name} preset="bold" />
                          <Text text={item.about} />
                        </View>
                      </View>
                      <View style={$itemActions}>
                        <Button onPress={() => joinChannel(item)} text="Join" style={$itemButton} />
                      </View>
                    </View>
                  }
                  style={$itemWrapper}
                />
              )
            }}
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
  flex: 1,
}

const $itemWrapper: ViewStyle = {
  flex: 1,
  marginBottom: spacing.medium,
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
  shadowColor: "transparent",
}

const $item: ViewStyle = {
  flexDirection: "column",
  gap: spacing.small,
}

const $itemContent: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.small,
}

const $itemImage: ImageStyle = {
  width: 60,
  height: 60,
  resizeMode: "cover",
  backgroundColor: colors.palette.cyan900,
  borderRadius: spacing.tiny,
}

const $itemActions: ViewStyle = {
  borderTopWidth: 1,
  borderColor: colors.palette.cyan600,
  height: 45,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingHorizontal: spacing.small,
}

const $itemButton: ViewStyle = {
  backgroundColor: "transparent",
  borderWidth: 0,
  paddingHorizontal: 0,
  paddingVertical: 0,
  height: 30,
  minHeight: 30,
}
