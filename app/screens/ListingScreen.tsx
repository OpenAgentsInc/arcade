import React, { FC, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Card, Header, Screen, Text, RelayContext, ListingItem } from "app/components"
import { spacing, colors } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { useStores } from "app/models"
import { delay } from "app/utils/delay"
import { ChannelManager } from "arclib/src"

interface ListingScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Listing">> {}

// #TODO: replace with real channel id
const groupId = "d4de13fde818830703539f80ae31ce3419f8f18d39c3043013bee224be341c3b"

export const ListingScreen: FC<ListingScreenProps> = observer(function ListingScreen() {
  const pool: any = useContext(RelayContext)
  const channel: any = useMemo(() => new ChannelManager(pool), [pool])

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Channel store
  const { channelStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Listing"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([channelStore.fetchMessages(channel, groupId, ''), delay(750)])
    setRefreshing(false)
  }

  useEffect(() => {
    // loading
    setLoading(true)
    // fetch messages
    channelStore.fetchMessages(channel, groupId, '')
    // done
    setLoading(false)

    return () => {
      channelStore.reset()
    }
  }, [channel, channelStore])

  return (
    <Screen style={$root} preset="scroll">
      <View style={[$root, $container]}>
        <View style={$content}>
          <FlashList
            data={channelStore.listing}
            renderItem={({ item }) => {
              return (
                <Card
                  preset="reversed"
                  ContentComponent={
                    <View>
                      <ListingItem tags={item.tags} />
                    </View>
                  }
                  onPress={() =>
                    navigation.navigate("ListingDetail", {
                      channelId: groupId,
                      listingId: item.id,
                      listingDetail: item.tags,
                    })
                  }
                  style={$item}
                />
              )
            }}
            ListEmptyComponent={
              loading ? (
                <View style={$emptyState}>
                  <Text text="Loading..." />
                </View>
              ) : (
                <View style={$emptyState}>
                  <Text text="No listings..." />
                </View>
              )
            }
            estimatedItemSize={300}
            refreshing={refreshing}
            onRefresh={manualRefresh}
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
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginBottom: spacing.small,
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: "transparent",
  shadowColor: "transparent",
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}
