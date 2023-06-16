import React, { FC, useCallback, useContext, useEffect, useLayoutEffect, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, View, ViewStyle, Alert, Platform, TextStyle } from "react-native"
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
} from "app/components"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { LogOutIcon, UserPlusIcon } from "lucide-react-native"
import { ChannelManager, NostrEvent, NostrPool } from "app/arclib/src"
import { Channel, Message, useStores } from "app/models"
import { formatCreatedAt } from "app/utils/formatCreatedAt"
import TextWithImage from "app/components/TextWithImage"

interface ChatScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Chat">> {}

export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen({
  route,
}: {
  route: any
}) {
  // init relaypool
  const pool = useContext(RelayContext) as NostrPool
  const channelManager: ChannelManager = useMemo(() => new ChannelManager(pool), [pool])

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  // Stores
  const {
    userStore: { pubkey, leaveChannel },
    channelStore: { getChannel },
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
          leaveChannel(channel.id)
          // redirect back
          navigation.goBack()
        },
      },
    ])
  }

  const back = () => {
    // update last message
    channel.updateLastMessage()
    channel.reset()
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

  useFocusEffect(
    useCallback(() => {
      function handleNewMessage(event: NostrEvent) {
        console.log("new message", event)
        channel.addMessage(event)
      }

      async function subscribe() {
        console.log("subscribe")
        return await channelManager.sub({
          channel_id: channel.id,
          callback: handleNewMessage,
          filter: {
            since: Math.floor(Date.now() / 1000),
          },
          privkey: channel.privkey,
        })
      }

      // subscribe for new messages
      subscribe().catch(console.error)

      return () => {
        console.log("unsubscribe")
        pool.unsub(handleNewMessage)
      }
    }, []),
  )

  useEffect(() => {
    // fetch messages
    channel.fetchMessages(channelManager)
  }, [])

  const renderItem = useCallback(({ item }: { item: Message }) => {
    const createdAt = formatCreatedAt(item.created_at)

    if (item.pubkey === pubkey) {
      return (
        <View style={$messageItemReverse}>
          <User pubkey={item.pubkey} reverse={true} />
          <View style={$messageContentWrapperReverse}>
            <TextWithImage
              text={item.content || "empty message"}
              textStyle={$messageContent}
              imageStyle={undefined}
            />
            <Text
              text={createdAt}
              preset="default"
              size="xs"
              style={[$createdAt, $createdAtText]}
            />
          </View>
        </View>
      )
    } else {
      return (
        <View style={$messageItem}>
          <User pubkey={item.pubkey} />
          <View style={$messageContentWrapper}>
            <TextWithImage
              text={item.content || "empty message"}
              textStyle={$messageContent}
              imageStyle={undefined}
            />
            <Text
              text={createdAt}
              preset="default"
              size="xs"
              style={[$createdAt, $createdAtText]}
            />
          </View>
        </View>
      )
    }
  }, [])

  return (
    <BottomSheetModalProvider>
      <Screen
        style={$root}
        preset="fixed"
        safeAreaEdges={["bottom"]}
        KeyboardAvoidingViewProps={{ behavior: Platform.OS === "ios" ? "padding" : "height" }}
        keyboardOffset={104}
      >
        <View style={$container}>
          <View style={$main}>
            <FlashList
              data={channel.allMessages}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListEmptyComponent={
                <View style={$emptyState}>
                  <ActivityIndicator type="small" />
                  {/* <Text text="No messages" /> */}
                </View>
              }
              contentContainerStyle={$list}
              removeClippedSubviews={true}
              estimatedItemSize={60}
              inverted={channel.allMessages.length !== 0}
              keyboardDismissMode="none"
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
}

const $main: ViewStyle = {
  flex: 1,
}

const $list: ViewStyle = {
  paddingHorizontal: spacing.medium,
}

const $form: ViewStyle = {
  flexShrink: 0,
  paddingTop: spacing.small,
}

const $messageItem: ViewStyle = {
  flexDirection: "row",
  gap: spacing.extraSmall,
  marginTop: spacing.medium,
}

const $messageItemReverse: ViewStyle = {
  flexDirection: "row-reverse",
  gap: spacing.extraSmall,
  marginTop: spacing.medium,
  position: "relative",
}

const $messageContentWrapper: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.overlay20,
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  paddingTop: spacing.extraLarge,
  paddingBottom: spacing.large,
  paddingHorizontal: spacing.small,
}

const $messageContentWrapperReverse: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.overlay50,
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  paddingTop: spacing.extraLarge,
  paddingBottom: spacing.large,
  paddingHorizontal: spacing.small,
}

const $messageContent: TextStyle = {
  color: "#fff",
}

const $createdAt: ViewStyle = {
  position: "absolute",
  bottom: 4,
  right: 4,
}

const $createdAtText: TextStyle = {
  color: colors.palette.cyan700,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}
