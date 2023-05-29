import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Card, Header, Screen, Text, Button, AutoImage } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { RelayContext } from "app/components/RelayProvider"
import { listChannels } from "arclib"
import { useStores } from "app/models"
import { isImage } from "app/utils/isImage"

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
            renderItem={({ item }) => {
              // no name or short channel name, mostly spam
              if (!item.name || item.name.length < 4) {
                return null
              }
              // invalid image url, mark as spam
              if (!isImage(item.picture)) {
                return null
              }
              // user joined channel, skip
              if (userStore.channels.includes(item.id)) {
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
                            uri: item?.picture || "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp",
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

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  paddingHorizontal: spacing.medium,
}

const $content: ViewStyle = {
  paddingTop: spacing.medium,
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
