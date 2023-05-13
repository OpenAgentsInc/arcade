import React, { FC, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Header, Screen, Text, TextField } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { SearchIcon, SendIcon, UsersIcon } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { ArcadeIdentity, NostrPool } from "arclib"
import { generatePrivateKey, nip19 } from "nostr-tools"
import { User } from "app/components/User"
// import { useStores } from "app/models"

interface ChatScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Chat">> {}

export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen({
  route,
}: {
  route: any
}) {
  const [data, setData] = useState([])
  const [message, setMessage] = useState("")

  // Get route params
  const { id, name } = route.params

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  // Init relay pool
  const priv = generatePrivateKey()
  const nsec = nip19.nsecEncode(priv)

  const ident = useMemo(() => new ArcadeIdentity(nsec, "", ""), [])
  const pool = useMemo(() => new NostrPool(ident), [])

  const sendMessage = async () => {
    const event = await pool.send({ content: message, tags: [["e", id, "", "root"]], kind: 42 })
    if (event) {
      // reset state
      setMessage("")
    }
  }

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
    async function init() {
      await pool.setRelays(["wss://relay.damus.io"])
      const events = await pool.list([
        {
          "#e": [id],
          kinds: [42],
          since: Math.round(new Date().getTime() / 1000) - 24 * 3600, // 24 hours ago
          limit: 20,
        },
      ])
      setData(events)
    }

    init().catch(console.error)
  }, [pool])

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["bottom"]}>
      <View style={$container}>
        <View style={$main}>
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <View style={$messageItem}>
                <User pubkey={item.pubkey} />
                <View style={$messageContentWrapper}>
                  <Text text={item.content} style={$messageContent} />
                </View>
              </View>
            )}
            estimatedItemSize={100}
            inverted={true}
          />
        </View>
        <View style={$form}>
          <TextField
            placeholder="Message"
            placeholderTextColor={colors.palette.cyan500}
            style={$input}
            inputWrapperStyle={$inputWrapper}
            value={message}
            onChangeText={setMessage}
            RightAccessory={() => (
              <Button
                onPress={() => sendMessage()}
                LeftAccessory={() => <SendIcon style={{ color: colors.text }} />}
                style={$sendButton}
              />
            )}
          />
        </View>
      </View>
    </Screen>
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

const $inputWrapper: ViewStyle = {
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $input: ViewStyle = {
  width: "100%",
  height: 45,
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: 100,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
}

const $sendButton: ViewStyle = {
  width: 45,
  height: 45,
  minHeight: 45,
  backgroundColor: colors.palette.cyan500,
  borderRadius: 100,
  borderWidth: 0,
  flexShrink: 0,
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
