import React, { FC, useCallback, useContext } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { ScreenWithSidebar, AIChannelItem, ChannelItem, Text, RelayContext } from "app/components"
import { FlashList } from "@shopify/flash-list"
import { useStores } from "app/models"
import { ChannelManager, NostrPool } from "app/arclib/src"
import { useFocusEffect } from "@react-navigation/native"
import { DirectMessageItem } from "app/components/DirectMessageItem"
import { StatusBar } from "expo-status-bar"
import { spacing } from "app/theme"
import Animated, { FadeInDown } from "react-native-reanimated"

interface HomeMessagesScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"HomeMessages">> {}

const colors = {
  black: "black",
  bottomBarBackground: "rgba(0,24,24,0.65)",
  bottomBarBorder: "rgba(0,48,48,0.85)",
  logo: "#155e75",
  logoActive: "cyan",
}

export const HomeMessagesScreen: FC<HomeMessagesScreenProps> = observer(
  function HomeMessagesScreen() {
    const pool = useContext(RelayContext) as NostrPool
    const channelManager = new ChannelManager(pool) as ChannelManager

    const {
      userStore: { getChannels, privMessages, fetchPrivMessages },
    } = useStores()

    useFocusEffect(
      useCallback(() => {
        fetchPrivMessages(pool)
      }, []),
    )

    const aiRooms = [
      {
        id: " ",
        name: "Spirit of Satoshi",
        about: "Awaiting your questions...",
        kind: 911911,
        lastMessageAt: Date.now() - 1600000000000,
        lastMessage: "",
        lastMessageBy: "",
        lastMessageByAvatar: "",
        picture: "https://pbs.twimg.com/profile_images/1655658089989693440/KXx1NU9i_400x400.jpg",
      },
    ]

    const data = [...getChannels, ...privMessages, ...aiRooms].sort(
      (a: any, b: any) => b.lastMessageAt - a.lastMessageAt,
    )

    const renderItem = useCallback(({ item, index }) => {
      return (
        <Animated.View entering={FadeInDown.delay(100 * index).duration(800)}>
          {item.kind === 4 ? (
            <DirectMessageItem dm={item} pool={pool} />
          ) : item.kind === 911911 ? (
            <AIChannelItem channel={item} />
          ) : (
            <ChannelItem channel={item} channelManager={channelManager} />
          )}
        </Animated.View>
      )
    }, [])

    return (
      <ScreenWithSidebar title={"Home"}>
        <StatusBar style="light" />
        <FlashList
          data={data}
          keyExtractor={(item: { id: string }) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text text="No data..." />
            </View>
          }
          estimatedItemSize={50}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScreenWithSidebar>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
  emptyState: {
    alignSelf: "center",
    paddingVertical: spacing.medium,
  },
  list: {
    // flex: 1,
    // marginTop: 40,
    paddingHorizontal: 2,
    paddingVertical: 10,
  },
  logo: { color: colors.logo },
  logoActive: { color: colors.logoActive },
})
