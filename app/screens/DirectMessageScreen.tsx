import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { observer } from "mobx-react-lite"
import { Platform, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import {
  ActivityIndicator,
  DirectMessageForm,
  Header,
  RelayContext,
  Screen,
  Text,
  User,
  MessageContent,
  Reply,
} from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { PrivateMessageManager } from "app/arclib/src/private"
import { useStores } from "app/models"
import { formatCreatedAt } from "app/utils/formatCreatedAt"
import { parser } from "app/utils/parser"
import { BlindedEvent, NostrPool } from "app/arclib/src"
import { useSharedValue } from "react-native-reanimated"
import { SwipeableItem } from "app/components/SwipeableItem"
import { useMutation } from "@tanstack/react-query"
import { DirectMessageReply, ReplyInfo } from "app/components/DirectMessageReply"

interface DirectMessageScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"DirectMessage">> {}

export const DirectMessageScreen: FC<DirectMessageScreenProps> = observer(
  function DirectMessageScreen({ route }: { route: any }) {
    const { id, legacy } = route.params

    const navigation = useNavigation<any>()
    const pool = useContext(RelayContext) as NostrPool
    const dms = useMemo(() => new PrivateMessageManager(pool), [pool])

    const [data, setData] = useState([] as BlindedEvent[])
    const [loading, setLoading] = useState(true)

    const textInputRef = useRef<TextInput>(null)
    const highlightedReply = useSharedValue<ReplyInfo | null>(null)

    const {
      userStore: { pubkey, addReply, clearReply },
    } = useStores()

    const goBack = () => {
      clearReply()
      navigation.goBack()
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Direct Message"
            titleStyle={{ color: colors.palette.cyan400 }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => goBack()}
          />
        ),
      })
    }, [])

    useEffect(() => {
      async function handleNewMessage(event) {
        setData((prev) => {
          if (prev && prev.find((ev) => ev.id === event.id)) return prev
          return [event, ...prev]
        })
      }

      async function initDMS() {
        try {
          const list = await dms.list({ limit: 500 }, true, id, handleNewMessage)
          console.log("dm: showing", list.length)
          const sorted = list.sort((a, b) => b.created_at - a.created_at).filter((e) => e?.content)

          // update state
          setData(sorted)
          // disable loading
        } catch (e) {
          console.log("dm: error loading messages", e)
        }
        setLoading(false)
      }

      // fetch direct messages
      initDMS().catch(console.error)

      return () => {
        console.log("dm: unsubscribing...")
        pool.unsub(handleNewMessage)
      }
    }, [id, dms])

    const { mutateAsync: getSenderInfo } = useMutation(["user", id], async () => {
      const list = await pool.list([{ kinds: [0], authors: [id] }], true)
      const latest = list.slice(-1)[0]
      if (latest) {
        return JSON.parse(latest.content)
      }
    })

    const renderItem = useCallback(
      ({ item }: { item: BlindedEvent }) => {
        const createdAt = formatCreatedAt(item.created_at)
        const content = parser(item)
        const reply = item.tags.find((el) => el[0] === "e")?.[1]

        const onFullSwipeProgress = async () => {
          // When the user swipes the message, we want to focus the text input
          textInputRef.current?.focus()

          // That's almost a preloaded data since it has already been fetched
          // and cached by React Query
          const senderInfo = await getSenderInfo()

          // add reply id to mst
          addReply(item.id)

          // We set the highlightedReply to the value of the message
          // That will trigger the DirectMessageReply component to show
          highlightedReply.value = {
            sender: senderInfo.username || senderInfo.name || senderInfo,
            content: content.original,
          }
        }

        if (item.pubkey === pubkey) {
          return (
            // We use the SwipeableItem component to wrap the message
            // It will handle the swipe gesture and the animation
            // basically we just set the swipeDirection and the onSwipeComplete
            <SwipeableItem swipeDirection="left" onSwipeComplete={onFullSwipeProgress}>
              <View style={$messageItemReverse}>
                <User pubkey={item.pubkey} reverse={true} blinded={item.blinded} />
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
                <User pubkey={item.pubkey} blinded={item.blinded} />
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
      },
      [id],
    )

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
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListEmptyComponent={
                loading ? (
                  <View style={$emptyState}>
                    <ActivityIndicator type="small" />
                  </View>
                ) : (
                  <View style={$emptyState}>
                    <Text text="No messages" />
                  </View>
                )
              }
              ListHeaderComponent={<View style={{ height: spacing.small }} />}
              contentContainerStyle={$list}
              removeClippedSubviews={true}
              estimatedItemSize={100}
              inverted={data.length !== 0}
              keyboardDismissMode="none"
            />
          </View>
          {/* This component will show the highlighted reply */}
          <DirectMessageReply replyInfo={highlightedReply} />
          <View style={$form}>
            <DirectMessageForm
              dms={dms}
              recipient={id}
              legacy={legacy}
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
  },
)

const $root: ViewStyle = {
  flex: 1,
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
