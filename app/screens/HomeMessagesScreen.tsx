import React, { FC, useCallback, useContext } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { ScreenWithSidebar, ChannelItem, Text, RelayContext } from "app/components"
import { spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { useStores } from "app/models"
import { ChannelManager } from "app/arclib/src"
import { useFocusEffect } from "@react-navigation/native"
import { DirectMessageItem } from "app/components/DirectMessageItem"

interface HomeMessagesScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"HomeMessages">> {}

export const HomeMessagesScreen: FC<HomeMessagesScreenProps> = observer(
  function HomeMessagesScreen() {
    const pool: any = useContext(RelayContext)
    const channelManager = new ChannelManager(pool)

    const {
      userStore: { getChannels, privMessages, fetchPrivMessages },
    } = useStores()

    useFocusEffect(
      useCallback(() => {
        fetchPrivMessages(pool)
      }, []),
    )

    const data = [...getChannels, ...privMessages]

    const renderItem = useCallback(({ item }) => {
      if (item.kind === 4) {
        return <DirectMessageItem dm={item} pool={pool} />
      } else {
        return <ChannelItem channelManager={channelManager} channel={item} />
      }
    }, [])

    return (
      <ScreenWithSidebar title={"Home"}>
        <View style={$main}>
          <View style={$messsages}>
            <FlashList
              data={data}
              keyExtractor={(item: { id: string }) => item.id}
              renderItem={renderItem}
              ListEmptyComponent={
                <View style={$emptyState}>
                  <Text text="No channel..." />
                </View>
              }
              estimatedItemSize={50}
            />
          </View>
        </View>
      </ScreenWithSidebar>
    )
  },
)

const $main: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  gap: spacing.small,
  width: "100%",
  height: "100%",
  paddingHorizontal: spacing.medium,
}

const $messsages: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.extraSmall,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}
