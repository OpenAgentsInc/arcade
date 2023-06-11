import React, { FC, useCallback, useEffect, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text, User, ChannelMessageForm } from "app/components"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import TextWithImage from "app/components/TextWithImage"
import { LogOutIcon, UserPlusIcon } from "lucide-react-native"
import { ActivityIndicator } from "app/components"
import { NostrEvent } from "app/arclib/src"
import { Message } from "app/models"

interface ChatScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Chat">> {}

export const AIChatScreen: FC<ChatScreenProps> = observer(function ChatScreen() {
  const navigation = useNavigation<any>()

  const back = () => {
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Spirit of Satoshi"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => back()}
          RightActionComponent={
            <View style={$headerRightActions}>
              <Pressable onPress={() => {}}>
                <UserPlusIcon size={20} color={colors.palette.cyan400} />
              </Pressable>
              {/* <Pressable onPress={() => console.log("nah")}>
                <LogOutIcon size={20} color={colors.palette.cyan400} />
              </Pressable> */}
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
        // channel.addMessage(event)
      }

      async function subscribe() {
        // console.log("subscribe")
        // return await channelManager.sub({
        //   channel_id: channel.id,
        //   callback: handleNewMessage,
        //   filter: {
        //     since: Math.floor(Date.now() / 1000),
        //   },
        //   privkey: channel.privkey,
        // })
      }

      // subscribe for new messages
      subscribe().catch(console.error)

      return () => {
        console.log("unsubscribe")
        // pool.unsub(handleNewMessage)
      }
    }, []),
  )

  useEffect(() => {
    // fetch messages
    // channel.fetchMessages(channelManager)
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
              data={[]}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListEmptyComponent={
                <View style={$emptyState}>
                  <ActivityIndicator type="large" />
                </View>
              }
              removeClippedSubviews={true}
              estimatedItemSize={60}
              inverted={true}
            />
          </View>
          <View style={$form}>
            <ChannelMessageForm
              channelManager={null}
              channelId={"channel.asdfsdfasdfd"}
              privkey={"asdf"}
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
  height: 470,
}
