import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react"
import { observer } from "mobx-react-lite"
import { Pressable, View, ViewStyle, Alert, Platform, TextStyle, TextInput } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import {
  Header,
  Screen,
  RelayContext,
  User,
  ChannelMessageForm,
  ActivityIndicator,
  Text,
  MessageContent,
  ReplyInfo,
  Reply,
  DirectMessageReply,
} from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { LogOutIcon, UsersIcon } from "lucide-react-native"
import { Channel, Message, useStores } from "app/models"
import { formatCreatedAt } from "app/utils/formatCreatedAt"
import { parser } from "app/utils/parser"
import { useSharedValue } from "react-native-reanimated"
import { useQueryClient } from "@tanstack/react-query"
import { SwipeableItem } from "app/components/SwipeableItem"
import { shortenKey } from "app/utils/shortenKey"

interface ChatScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Chat">> {}

export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen({
  route,
}: {
  route: any
}) {
  const { id } = route.params
  const { pool, channelManager } = useContext(RelayContext)
  const {
    userStore: { pubkey, addReply, clearReply, leaveChannel },
    channelStore: { getChannel },
  } = useStores()

  const navigation = useNavigation<any>()

  // get channel by using resolver identifier
  const channel: Channel = useMemo(() => getChannel(id), [id])

  const queryClient = useQueryClient()
  const textInputRef = useRef<TextInput>(null)
  const highlightedReply = useSharedValue<ReplyInfo | null>(null)

  const leaveJoinedChannel = () => {
    Alert.alert("Confirm leave channel", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          // update state
          leaveChannel(channelManager, channel.id)
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
          title={
            channel.name.length > 20
              ? channel.name.substring(0, 20) + "..."
              : channel.name || "No name"
          }
          titleStyle={{ color: colors.palette.white }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <View style={$headerRightActions}>
              {channel.privkey && (
                <Pressable
                  onPress={() =>
                    navigation.navigate("ChannelMembers", {
                      id: channel.id,
                      name: channel.name,
                      privkey: channel.privkey,
                    })
                  }
                >
                  <UsersIcon size={20} color={colors.palette.cyan400} />
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
    // fetch messages in 24 hours ago
    channel.fetchMessages(queryClient, pool, channelManager)

    return () => {
      clearReply()
      channel.updateLastMessage()
      channel.reset()
    }
  }, [])

  const renderItem = useCallback(({ item }: { item: Message }) => {
    const createdAt = formatCreatedAt(item.created_at)
    const content = parser(item)
    const reply = item.tags.find((el) => el[3] === "reply")?.[1]

    const onFullSwipeProgress = async () => {
      // When the user swipes the message, we want to focus the text input
      textInputRef.current?.focus()

      // That's almost a preloaded data since it has already been fetched
      // and cached by React Query
      const senderInfo: { username: string; name: string; display_name: string } =
        queryClient.getQueryData(["user", item.pubkey])

      // add reply id to mst
      addReply(item.id)

      // We set the highlightedReply to the value of the message
      // That will trigger the DirectMessageReply component to show
      highlightedReply.value = {
        sender:
          senderInfo?.username ||
          senderInfo?.name ||
          senderInfo?.display_name ||
          shortenKey(item.pubkey),
        content: content.original,
      }
    }

    if (item.pubkey === pubkey) {
      return (
        <SwipeableItem swipeDirection="left" onSwipeComplete={onFullSwipeProgress}>
          <View style={$messageItemReverse}>
            <User pubkey={item.pubkey} reverse={true} />
            <View style={$messageContentWrapperReverse}>
              {reply && <Reply id={reply} />}
              <MessageContent content={content} />
              <View style={$createdAt}>
                <Text text={createdAt} preset="default" size="xs" style={$createdAtText} />
              </View>
            </View>
          </View>
        </SwipeableItem>
      )
    } else {
      return (
        <SwipeableItem swipeDirection="right" onSwipeComplete={onFullSwipeProgress}>
          <View style={$messageItem}>
            <User pubkey={item.pubkey} />
            <View style={$messageContentWrapper}>
              {reply && <Reply id={reply} />}
              <MessageContent content={content} />
              <View style={$createdAt}>
                <Text text={createdAt} preset="default" size="xs" style={$createdAtText} />
              </View>
            </View>
          </View>
        </SwipeableItem>
      )
    }
  }, [])

  return (
    <Screen
      style={$root}
      preset="fixed"
      safeAreaEdges={["bottom"]}
      KeyboardAvoidingViewProps={{ behavior: Platform.OS === "ios" ? "padding" : "height" }}
      keyboardOffset={104}
      safeAreaBackgroundColor={colors.palette.overlay20}
    >
      <View style={$container}>
        <View style={$main}>
          <FlashList
            data={channel.allMessages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
              <View style={$emptyState}>
                {channel.loading ? <ActivityIndicator type="small" /> : <Text text="No messages" />}
              </View>
            }
            contentContainerStyle={$list}
            estimatedItemSize={120}
            inverted={channel.allMessages.length !== 0}
            keyboardDismissMode="none"
          />
        </View>
        {/* This component will show the highlighted reply */}
        <DirectMessageReply replyInfo={highlightedReply} />
        <View style={$form}>
          <ChannelMessageForm
            channelManager={channelManager}
            channelId={channel.id}
            privkey={channel.privkey}
            textInputRef={textInputRef}
            onSubmit={() => {
              // Setting the value to null will trigger the DirectMessageReply component to hide
              // It's a kind of "reset"
              highlightedReply.value = null
            }}
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
  height: "100%",
  justifyContent: "space-between",
}

const $main: ViewStyle = {
  flex: 1,
}

const $list: ViewStyle = {
  paddingHorizontal: spacing.medium,
}

const $form: ViewStyle = {
  flexShrink: 0,
}

const $messageItem: ViewStyle = {
  flexDirection: "row",
  gap: spacing.extraSmall,
  marginBottom: spacing.medium,
}

const $messageItemReverse: ViewStyle = {
  flexDirection: "row-reverse",
  gap: spacing.extraSmall,
  marginBottom: spacing.medium,
  position: "relative",
}

const $messageContentWrapper: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.overlay20,
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  paddingTop: spacing.extraLarge,
}

const $messageContentWrapperReverse: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.overlay50,
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  paddingTop: spacing.extraLarge,
}

const $createdAt: ViewStyle = {
  position: "absolute",
  top: 6,
  right: 12,
}

const $createdAtText: TextStyle = {
  color: colors.palette.cyan500,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}
