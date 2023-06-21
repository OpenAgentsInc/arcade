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
  AutoImage
} from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import TextWithImage from "app/components/TextWithImage"
import { PrivateMessageManager } from "app/arclib/src/private"
import { Message, useStores } from "app/models"
import { formatCreatedAt } from "app/utils/formatCreatedAt"

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
      const seen = new Set()

      async function handleNewMessage(event) {
        if (seen.has(event.id)) return;
        if (!event.content) return;
        seen.add(event.id);
        console.log("dm: new message", event);
        setData((prev) => [event, ...prev]);
      }

      async function initDMS() {
        try {
            const list = await dms.list(null, true, id, handleNewMessage)
            console.log("dm: showing", list.length)
            const sorted = list
              .sort((a, b) => b.created_at - a.created_at)
              .filter((e) => e?.content)
            
            list.forEach(e=>seen.add(e.id))
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

    const renderItem = useCallback(({ item }: { item: Message }) => {
      const createdAt = formatCreatedAt(item.created_at)

      if (item.pubkey === pubkey) {
        return (
          <View style={$messageItemReverse}>
            <User pubkey={item.pubkey} reverse={true} />
            <View style={$messageContentWrapperReverse}>
              {item.blinded && <Text style={$blindedIconLeft}>🕶️</Text>}
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
            {item.blinded && <Text style={$blindedIconRight}>🕶️</Text>}
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
              keyExtractor={(item: { id: string }) => item.id}
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
              inverted={data.length !== 0}
              keyboardDismissMode="none"
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

const $blindedIconLeft: TextStyle = {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 20,
}

const $blindedIconRight: TextStyle = {
    position: 'absolute',
    top: 5,
    right: 15,
    fontSize: 20,
}