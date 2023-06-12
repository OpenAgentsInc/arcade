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
import { ActivityIndicator, Platform, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { DirectMessageForm, Header, RelayContext, Screen, Text, User } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import TextWithImage from "app/components/TextWithImage"
import { PrivateMessageManager } from "app/arclib/src/private"
import { Message } from "app/models"

interface DirectMessageScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"DirectMessage">> {}

export const DirectMessageScreen: FC<DirectMessageScreenProps> = observer(
  function DirectMessageScreen({ route }: { route: any }) {
    const { id } = route.params
    const navigation = useNavigation<any>()
    const pool: any = useContext(RelayContext)

    const dms = useMemo(() => new PrivateMessageManager(pool), [pool])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

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
      const seen = new Set()

      async function handleNewMessage(event) {
        if (seen.has(event.id)) return
        seen.add(event.id)
        console.log("new message", event)
        setData((prev) => [event, ...prev])
      }

      async function initDMS() {
        const list = await dms.list({}, false, id)
        // update state
        setData(list)
        // stop loading
        setLoading(false)
      }

      // fetch direct messages
      initDMS().catch(console.error)

      // subscribe for new messages
      console.log("subscribing...")
      dms.sub(handleNewMessage, { since: Math.floor(Date.now() / 1000) }, undefined, id)

      return () => {
        console.log("unsubscribing...")
        pool.unsub(handleNewMessage)
      }
    }, [id, dms])

    const renderItem = useCallback(({ item }: { item: Message }) => {
      return (
        <View style={$messageItem}>
          <User pubkey={item.pubkey} createdAt={item.created_at} />
          <View style={$messageContentWrapper}>
            <TextWithImage
              text={item.content || "empty message"}
              textStyle={item.pubkey === id ? $messageContent : $messageContentMine}
              imageStyle={undefined}
            />
          </View>
        </View>
      )
    }, [])

    return (
      <Screen
        style={$root}
        preset="fixed"
        safeAreaEdges={["bottom"]}
        KeyboardAvoidingViewProps={{ behavior: Platform.OS === "ios" ? "padding" : "height" }}
        keyboardOffset={Platform.OS === "ios" ? 120 : 90}
      >
        <View style={$container}>
          <View style={$main}>
            <FlashList
              data={data}
              keyExtractor={(item: { id: string }) => item.id}
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
              estimatedItemSize={100}
              inverted={data.length !== 0}
            />
          </View>
          <View style={$form}>
            <DirectMessageForm dms={dms} replyTo={id} />
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

// from someone else
const $messageContent: TextStyle = {
  color: "#fff",
}

const $messageContentMine: TextStyle = {
  color: colors.palette.cyan400,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}
