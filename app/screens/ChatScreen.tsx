import React, { FC, useContext, useEffect, useLayoutEffect, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text, RelayContext, User, MessageForm, ListingItem } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { SearchIcon, UsersIcon } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { FlashList } from "@shopify/flash-list"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ArcadeListings } from "arclib"
import Nip28Channel from "arclib/src/channel"

interface ChatScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Chat">> {}

export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen({
  route,
}: {
  route: any
}) {
  // Get route params
  const { id, name } = route.params

  // init relaypool
  const pool: any = useContext(RelayContext)
  const channel: any = useMemo(() => new Nip28Channel(pool), [pool])
  const listings = useMemo(() => new ArcadeListings(channel, id), [channel, id])

  // Channel store
  const { channelStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title={name}
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <View style={$headerRightActions}>
              <UsersIcon size={20} color={colors.palette.cyan400} />
              <SearchIcon size={20} color={colors.palette.cyan400} />
            </View>
          }
        />
      ),
    })
  }, [])

  useEffect(() => {
    // fetch messages
    channelStore.reset()
    channelStore.fetchMessages(channel, id).catch(console.error)
    // listing new messages
    pool.addEventCallback((event) => {
      channelStore.addMessage(event)
    })
    pool.start([{ "#e": [id], kinds: [42], since: Math.floor(Date.now() / 1000) }])
  }, [id])

  return (
    <BottomSheetModalProvider>
      <Screen style={$root} preset="fixed" safeAreaEdges={["bottom"]} keyboardOffset={120}>
        <View style={$container}>
          <View style={$main}>
            <FlashList
              data={channelStore.sortedAndIgnoreOffers}
              renderItem={({ item }) => (
                <View style={$messageItem}>
                  <User pubkey={item.pubkey} />
                  <View style={$messageContentWrapper}>
                    <Text text={item.content || "empty message"} style={$messageContent} />
                    <Pressable
                      onPress={() =>
                        navigation.navigate("ListingDetail", {
                          channelId: id,
                          listingId: item.id,
                          listingDetail: item.tags,
                        })
                      }
                    >
                      <ListingItem tags={item.tags} />
                    </Pressable>
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <View style={$emptyState}>
                  <Text text="Loading..." />
                </View>
              }
              estimatedItemSize={100}
              inverted={true}
            />
          </View>
          <View style={$form}>
            <MessageForm channel={channel} listings={listings} channelId={id} />
          </View>
        </View>
      </Screen>
    </BottomSheetModalProvider>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  height: "100%",
  justifyContent: "space-between",
  paddingHorizontal: spacing.medium,
}

const $headerRightActions: ViewStyle = {
  flexDirection: "row",
  gap: spacing.medium,
  paddingRight: spacing.medium,
}

const $main: ViewStyle = {
  flex: 1,
}

const $form: ViewStyle = {
  flexShrink: 0,
  paddingTop: spacing.small,
}

const $messageItem: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.extraSmall,
}

const $messageContentWrapper: ViewStyle = {
  paddingLeft: 48,
  marginTop: -24,
}

const $messageContent: TextStyle = {
  color: "#fff",
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  transform: [{ scaleY: -1 }],
  paddingVertical: spacing.medium,
}
