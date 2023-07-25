import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
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
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { useStores } from "app/models"
import { formatCreatedAt } from "app/utils/formatCreatedAt"
import { parser } from "app/utils/parser"
import { BlindedEvent } from "app/arclib/src"
import { useSharedValue } from "react-native-reanimated"
import { SwipeableItem } from "app/components/SwipeableItem"
import { useMutation } from "@tanstack/react-query"
import { DirectMessageReply, ReplyInfo } from "app/components/DirectMessageReply"
import { shortenKey } from "app/utils/shortenKey"

interface DirectMessageScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"DirectMessage">> {}

export const DirectMessageScreen: FC<DirectMessageScreenProps> = observer(
  function DirectMessageScreen({ route }: { route: any }) {
    const { id, name, legacy } = route.params
    const { pool, privMessageManager } = useContext(RelayContext)

    const navigation = useNavigation<any>()
    const textInputRef = useRef<TextInput>(null)
    const highlightedReply = useSharedValue<ReplyInfo | null>(null)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const {
      userStore: { pubkey, addReply, clearReply },
    } = useStores()

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title={name.length > 20 ? name.substring(0, 20) + "..." : name || "Direct Message"}
            titleStyle={{ color: colors.palette.white }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    useFocusEffect(
      useCallback(() => {
        function handleNewDM(event) {
          setData((prev) => {
            if (prev && prev.find((ev) => ev.id === event.id)) return prev
            return [event, ...prev]
          })
        }

        // subscribe for new message
        privMessageManager.sub(handleNewDM, { since: Math.floor(Date.now() / 1000) }, undefined, id)

        return () => {
          pool.unsub(handleNewDM)
        }
      }, [loading]),
    )

    useEffect(() => {
      async function initDMS() {
        try {
          const list = await privMessageManager.list({ limit: 500 }, true, id)
          const sorted = list.sort((a, b) => b.created_at - a.created_at).filter((e) => e?.content)
          console.log("dm: showing", list.length)
          // update state
          setData(sorted)
          setLoading(false)
        } catch (e) {
          console.log("dm: error loading messages", e)
        }
        setLoading(false)
      }

      // fetch direct messages
      initDMS().catch(console.error)

      return () => {
        clearReply()
      }
    }, [id])

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
            sender:
              senderInfo?.username ||
              senderInfo?.name ||
              senderInfo?.display_name ||
              shortenKey(id),
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
              estimatedItemSize={120}
              inverted={data.length !== 0}
              keyboardDismissMode="none"
            />
          </View>
          {/* This component will show the highlighted reply */}
          <DirectMessageReply replyInfo={highlightedReply} />
          <View style={$form}>
            <DirectMessageForm
              dms={privMessageManager}
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
