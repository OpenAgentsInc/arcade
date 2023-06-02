import React, { FC, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, TextStyle, View, ViewStyle, Alert, ActivityIndicator } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import {
  Header,
  Screen,
  Text,
  RelayContext,
  User,
  ChannelMessageForm,
  ListingItem,
} from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { FlashList } from "@shopify/flash-list"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import TextWithImage from "app/components/TextWithImage"
import { LogOutIcon } from "lucide-react-native"
import { ChannelManager } from "arclib/src"

interface ChatScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Chat">> {}

export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen({
  route,
}: {
  route: any
}) {
  // Get route params
  const { id, name, privkey } = route.params

  // init relaypool
  const pool: any = useContext(RelayContext)
  const channel: ChannelManager = useMemo(() => new ChannelManager(pool), [pool])

  // Store
  const { userStore, channelStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const [loading, setLoading] = useState(true)

  const leaveJoinedChannel = () => {
    Alert.alert("Confirm leave channel", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          // update state
          userStore.leaveChannel(id)
          // redirect back
          navigation.goBack()
        },
      },
    ])
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title={name || "No name"}
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <View style={$headerRightActions}>
              <Pressable onPress={() => leaveJoinedChannel()}>
                <LogOutIcon size={20} color={colors.palette.cyan400} />
              </Pressable>
            </View>
          }
        />
      ),
    })
  }, [])

  useEffect(() => {
    function handleNewMessage(event) {
      console.log("new message", event)
      channelStore.addMessage(event)
    }

    async function subscribe() {
      // stop loading
      setLoading(false)
      return await channel.sub({
        channel_id: id,
        callback: handleNewMessage,
        filter: {
          since: Math.floor(Date.now() / 1000),
        },
        privkey,
      })
    }

    // fetch all channel messages
    channelStore.fetchMessages(channel, id, privkey)

    // subscribe for new messages
    subscribe().catch(console.error)

    return () => {
      console.log("unsubscribe")
      pool.unsub(handleNewMessage)
      // clear channel store
      channelStore.reset()
    }
  }, [id, channel])

  return (
    <BottomSheetModalProvider>
      <Screen style={$root} preset="fixed" safeAreaEdges={["bottom"]} keyboardOffset={120}>
        <View style={$container}>
          <View style={$main}>
            <FlashList
              data={channelStore.allMessages}
              renderItem={({ item }) => (
                <View style={$messageItem}>
                  <User pubkey={item.pubkey} />
                  <View style={$messageContentWrapper}>
                    <TextWithImage
                      text={item.content || "empty message"}
                      textStyle={$messageContent}
                      imageStyle={undefined}
                    />
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
                loading ? (
                  <View style={$emptyState}>
                    <ActivityIndicator color={colors.palette.cyan500} animating={loading} />
                  </View>
                ) : (
                  <View style={$emptyState}>
                    <Text text="No message..." />
                  </View>
                )
              }
              estimatedItemSize={100}
              inverted={true}
            />
          </View>
          <View style={$form}>
            <ChannelMessageForm channel={channel} channelId={id} privkey={privkey} />
          </View>
        </View>
      </Screen>
    </BottomSheetModalProvider>
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
  height: "100%",
  justifyContent: "space-between",
  paddingHorizontal: spacing.medium,
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
