import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"
import { observer } from "mobx-react-lite"
import { Platform, TextStyle, View, ViewStyle } from "react-native"
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
} from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { PrivateMessageManager } from "app/arclib/src/private"
import { useStores } from "app/models"
import { formatCreatedAt } from "app/utils/formatCreatedAt"
import { parser } from "app/utils/parser"
import { BlindedEvent, NostrPool, objectId } from "app/arclib/src"

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

    const {
      userStore: { pubkey },
    } = useStores()

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Direct Message"
            titleStyle={{ color: colors.palette.cyan400 }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    useEffect(() => {
      async function handleNewMessage(event) {
        setData((prev) => {
          if (prev && prev.find(ev=>ev.id==event.id)) return prev;
          return [event, ...prev]
        })
      }
  
      async function initDMS() {
        try {
          const list = await dms.list({limit: 500}, true, id, handleNewMessage)
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

    const renderItem = useCallback(({ item }: { item: BlindedEvent }) => {
      const createdAt = formatCreatedAt(item.created_at)
      const content = parser(item)

      if (item.pubkey === pubkey) {
        return (
          <View style={$messageItemReverse}>
            <User pubkey={item.pubkey} reverse={true} />
            <View style={$messageContentWrapperReverse}>
              {item.blinded && <Text style={$blindedIconLeft}>🕶️</Text>}
              <MessageContent content={content} />
              <View style={$createdAt}>
                <Text text={createdAt} preset="default" size="xs" style={$createdAtText} />
              </View>
            </View>
          </View>
        )
      } else {
        return (
          <View style={$messageItem}>
            {item.blinded && <Text style={$blindedIconRight}>🕶️</Text>}
            <User pubkey={item.pubkey} />
            <View style={$messageContentWrapper}>
              <MessageContent content={content} />
              <View style={$createdAt}>
                <Text text={createdAt} preset="default" size="xs" style={$createdAtText} />
              </View>
            </View>
          </View>
        )
      }
    }, [id])

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
              contentContainerStyle={$list}
              removeClippedSubviews={true}
              estimatedItemSize={100}
              inverted={true}
              keyboardDismissMode="none"
            />
          </View>
          <View style={$form}>
            <DirectMessageForm dms={dms} replyTo={id} legacy={legacy} />
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

const $blindedIconLeft: TextStyle = {
  position: "absolute",
  top: 5,
  right: 5,
  fontSize: 20,
}

const $blindedIconRight: TextStyle = {
  position: "absolute",
  top: 5,
  right: 15,
  fontSize: 20,
}
