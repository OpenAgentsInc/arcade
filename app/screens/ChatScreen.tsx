import React, { FC, useContext, useEffect, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { SearchIcon, UsersIcon } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { Messages } from "app/components/Messages"
import { MessageForm } from "app/components/MessageForm"
import { RelayContext } from "app/components/RelayProvider"

interface ChatScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Chat">> {}

export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen({
  route,
}: {
  route: any
}) {
  const pool: any = useContext(RelayContext);

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

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      channelStore.fetchMessages(pool, id)
    }

    return () => {
      isMounted = false
    }
  }, [route])

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["bottom"]}>
      <View style={$container}>
        <View style={$main}>
          <Messages />
        </View>
        <View style={$form}>
          <MessageForm channelID={id} />
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
