import React, { FC, useCallback, useContext, useEffect, useLayoutEffect, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, TextStyle, View, ViewStyle, Alert, ActivityIndicator } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text, RelayContext, User, ChannelMessageForm } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import TextWithImage from "app/components/TextWithImage"
import { LogOutIcon, UserPlusIcon } from "lucide-react-native"
import { ChannelManager } from "app/arclib/src"
import { Channel, Message, useStores } from "app/models"

interface ChatScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Chat">> {}

export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen({
  route,
}: {
  route: any
}) {
  // init relaypool
  const pool: any = useContext(RelayContext)
  const channelManager: ChannelManager = useMemo(() => new ChannelManager(pool), [pool])

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  // Stores
  const {
    userStore: { leaveChannel },
    channelStore: { getChannel, setLoading, loading },
  } = useStores()

  // route params
  const { id } = route.params

  // get channel by using resolver identifier
  const channel: Channel = useMemo(() => getChannel(id), [id])

  const leaveJoinedChannel = () => {
    Alert.alert("Confirm leave channel", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          // update state
          leaveChannel(id)
          // redirect back
          navigation.goBack()
        },
      },
    ])
  }

  const back = () => {
    // update last message
    channel.updateLastMessage()
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title={channel.name || "No name"}
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => back()}
          RightActionComponent={
            <View style={$headerRightActions}>
              {channel.privkey && (
                <Pressable
                  onPress={() =>
                    navigation.navigate("ContactPicker", {
                      id: channel.id,
                      name: channel.name,
                      privkey: channel.privkey,
                    })
                  }
                >
                  <UserPlusIcon size={20} color={colors.palette.cyan400} />
                </Pressable>
              )}
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
      channel.addMessage(event)
    }

    async function subscribe() {
      console.log("subscribe")
      // stop loading
      setLoading(false)
      return await channelManager.sub({
        channel_id: channel.id,
        callback: handleNewMessage,
        filter: {
          since: Math.floor(Date.now() / 1000),
        },
        privkey: channel.privkey,
      })
    }

    // fetch messages
    channel.fetchMessages(channelManager)

    // subscribe for new messages
    subscribe().catch(console.error)

    return function cleanup() {
      console.log("unsubscribe")
      pool.unsub(handleNewMessage)
    }
  }, [])

  const renderItem = useCallback(({ item }: { item: Message }) => {
    return (
      <View style={$messageItem}>
        <User pubkey={item.pubkey} createdAt={item.created_at} />
        <View style={$messageContentWrapper}>
          <TextWithImage
            text={item.content || "empty message"}
            textStyle={$messageContent}
            imageStyle={undefined}
          />
        </View>
      </View>
    )
  }, [])

  return (
    <BottomSheetModalProvider>
      <Screen style={$root} preset="fixed" safeAreaEdges={["bottom"]} keyboardOffset={120}>
        <View style={$container}>
          <View style={$main}>
            <FlashList
              data={channel.allMessages}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
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
              removeClippedSubviews={true}
              estimatedItemSize={60}
              inverted={true}
            />
          </View>
          <View style={$form}>
            <ChannelMessageForm
              channelManager={channelManager}
              channelId={channel.id}
              privkey={channel.privkey}
            />
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
