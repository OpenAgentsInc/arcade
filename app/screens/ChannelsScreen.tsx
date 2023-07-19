import React, { FC, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react"
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
import { PlusIcon } from "lucide-react-native"
import { ChannelInfo, Nip28ChannelInfo, NostrEvent } from "app/arclib/src"

interface ChannelsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Channels">> {}

interface TopData {
  ev: NostrEvent
  up: NostrEvent[]
  cnt: number
  msg: NostrEvent[]
}

export const ChannelsScreen: FC<ChannelsScreenProps> = observer(function ChannelsScreen() {
  const { channelManager } = useContext(RelayContext)
  const { userStore, channelStore } = useStores()

  const [data, setData] = useState([] as ChannelInfo[])

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const joinChannel = (item: ChannelInfo) => {
    // create channel in local store
    channelStore.create(item)
    // update state
    userStore.joinChannel(channelManager, item)
    // redirect to channel
    navigation.navigate("Chat", item)
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
              <Pressable onPress={() => navigation.navigate("CreateChannel", { isPrivate: false })}>
                <PlusIcon size={20} color={colors.palette.cyan400} />
              </Pressable>
            </View>
          }
        />
      ),
    })
  }, [])

  useEffect(() => {
    async function initTop() {
      const dat = await fetch(
        "https://raw.githubusercontent.com/ArcadeLabsInc/arcade-static/main/top.json",
      )
      const js: Record<string, TopData> = await dat.json()
      const sugg = Object.values(js)
        .map((el) => {
          try {
            return {
              ...(JSON.parse(el.ev.content) as Nip28ChannelInfo),
              id: el.ev.id,
              author: el.ev.pubkey,
              is_private: false,
            }
          } catch {
            return null
          }
        })
        .filter((ev) => ev)
      return sugg
    }

    async function initChannels(prev) {
      let res = await channelManager.listChannels(true)

      // remove private channel
      res = res.filter((el) => !el.is_private)

      // merge array, remove dup
      const final = [...new Map([...prev, ...res].map((el) => [el.id, el])).values()]

      setData(final)
    }

    initTop()
      .then((prev) => initChannels(prev).catch(console.error))
      .catch(console.error)
  }, [])

  const renderItem = useCallback(({ item }: { item: ChannelInfo }) => {
    return (
      <Card
        preset="reversed"
        ContentComponent={
          <View style={$item}>
            <View style={$itemContent}>
              <AutoImage
                source={{
                  uri: item.picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg",
                }}
                style={$itemImage}
              />
              <View>
                <Text text={item.name} preset="bold" />
                <Text text={item.about} />
              </View>
            </View>
            <View style={$itemActions}>
              {!userStore.channels.find((el) => el.id === item.id) ? (
                <Button onPress={() => joinChannel(item)} text="Join" style={$itemButton} />
              ) : (
                <Button
                  onPress={() => navigation.navigate("Chat", item)}
                  text="View channel"
                  style={$itemButton}
                />
              )}
            </View>
          </View>
        }
        style={item.privkey ? $itemWrapperPrivate : $itemWrapper}
      />
    )
  }, [])

  return (
    <Screen style={$root} preset="scroll">
      <View style={[$root, $container]}>
        <View style={$content}>
          <FlashList
            keyExtractor={(item) => item.id}
            data={data}
            extraData={userStore.getChannels}
            renderItem={renderItem}
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

const $itemWrapperPrivate: ViewStyle = {
  flex: 1,
  marginBottom: spacing.medium,
  borderWidth: 1,
  borderColor: colors.palette.cyan100,
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
