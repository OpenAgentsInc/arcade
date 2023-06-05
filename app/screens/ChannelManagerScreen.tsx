import React, { FC, useContext, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { ChannelItem, Header, RelayContext, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { ChannelManager } from "arclib/src"

interface ChannelManagerScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ChannelManager">> {}

export const ChannelManagerScreen: FC<ChannelManagerScreenProps> = observer(
  function ChannelManagerScreen() {
    const pool: any = useContext(RelayContext)
    const channelManager = new ChannelManager(pool)

    // Pull in one of our MST stores
    const {
      userStore: { getChannels, leaveChannel },
    } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()

    const leave = (id: string) => {
      console.log("leaving: ", id)
      leaveChannel(id)
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Channel Manager"
            titleStyle={{ color: colors.palette.cyan400 }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    return (
      <Screen style={$root} preset="scroll">
        <FlashList
          data={getChannels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={$item}>
              <ChannelItem channelManager={channelManager} channel={item} manage={true} />
              <Pressable onPress={() => leave(item.id)}>
                <Text text="Leave" size="xs" />
              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <View style={$emptyState}>
              <Text text="No contact..." />
            </View>
          }
          estimatedItemSize={50}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}

const $item: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}
