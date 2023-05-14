import React, { FC, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { SearchIcon, UsersIcon } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { MessageForm } from "app/components/MessageForm"
import { RelayContext } from "app/components/RelayProvider"
import Nip28Channel from "arclib/src/channel"
import { User } from "app/components/User"
import { FlashList } from "@shopify/flash-list"
import { delay } from "app/utils/delay"

interface ChatScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Chat">> {}

export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen({
  route,
}: {
  route: any
}) {
  const pool: any = useContext(RelayContext)
  const nip28 = useMemo(() => new Nip28Channel(pool), [pool])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Get route params
  const { id, name } = route.params

  // Channel store
  const { channelStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

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

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([channelStore.fetchMessages(nip28, id), delay(750)])
    setRefreshing(false)
  }

  useEffect(() => {
    // loading
    setLoading(true)
    // fetch messages
    channelStore.reset()
    channelStore.fetchMessages(nip28, id)
    // done
    setLoading(false)
  }, [id, channelStore])

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["bottom"]}>
      <View style={$container}>
        <View style={$main}>
          <FlashList
            data={channelStore.messages.slice()}
            extraData={channelStore.messages}
            renderItem={({ item }) => (
              <View style={$messageItem}>
                <User pubkey={item.pubkey} />
                <View style={$messageContentWrapper}>
                  <Text text={item.content} style={$messageContent} />
                </View>
              </View>
            )}
            ListEmptyComponent={loading ? <Text text="Loading..." /> : <Text text="No messages" />}
            estimatedItemSize={100}
            inverted={true}
            refreshing={refreshing}
            onRefresh={manualRefresh}
          />
        </View>
        <View style={$form}>
          <MessageForm channel={nip28} channelID={id} />
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
