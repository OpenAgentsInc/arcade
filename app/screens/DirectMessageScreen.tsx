import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, RelayContext, Screen, Text, User } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import Nip04Manager from "arclib/src/private"
import { useStores } from "app/models"
import { nip04 } from "nostr-tools"

interface DirectMessageScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"DirectMessage">> {}

export const DirectMessageScreen: FC<DirectMessageScreenProps> = observer(
  function DirectMessageScreen({ route }: { route: any }) {
    const { userStore } = useStores()
    const { id } = route.params
    const pool: any = useContext(RelayContext)

    const [data, setData] = useState([])
    const navigation = useNavigation<any>()

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
      async function initDMS() {
        // const dms = new Nip04Manager(pool)
        // const list = await dms.list({ authors: [id] }, true)
        const list = await pool.list(
          [{ kinds: [4], authors: [id], "#p": [userStore.pubkey] }],
          true,
        )
        // update state
        setData(list)
      }

      initDMS().catch(console.error)
    }, [pool])

    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={["bottom"]} keyboardOffset={120}>
        <View style={$container}>
          <View style={$main}>
            <FlashList
              data={data}
              renderItem={({ item }) => (
                <View style={$messageItem}>
                  <User pubkey={item.pubkey} />
                  <View style={$messageContentWrapper}>
                    <Text text={item.content || "empty message"} style={$messageContent} />
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <View style={$emptyState}>
                  <Text text="Loading..." />
                </View>
              }
              estimatedItemSize={100}
              inverted={true}
            />
          </View>
          <View style={$form}></View>
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

const $messageContent: TextStyle = {
  color: "#fff",
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  transform: [{ scaleY: -1 }],
  paddingVertical: spacing.medium,
}
