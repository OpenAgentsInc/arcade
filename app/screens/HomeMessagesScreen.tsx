import React, { FC, useCallback, useContext, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, RefreshControl } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { ScreenWithSidebar, ChannelItem, Text, RelayContext, AIChannelDetail } from "app/components"
import { FlashList } from "@shopify/flash-list"
import { useStores } from "app/models"
import { DirectMessageItem } from "app/components/DirectMessageItem"
import { StatusBar } from "expo-status-bar"
import { spacing } from "app/theme"
import Animated, { FadeIn } from "react-native-reanimated"
import { useConversations } from "app/hooks/useConversations"

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
    const { conversations } = useConversations()
    const { privMessageManager } = useContext(RelayContext)
    const {
      userStore: { getChannels, getChats, fetchPrivMessages },
    } = useStores()

    const [isRefresh, setIsRefresh] = useState(false)

    const data = useMemo(
      () =>
        [...getChannels, ...getChats, ...conversations].sort(
          (a: { lastMessageAt: number }, b: { lastMessageAt: number }) =>
            b.lastMessageAt - a.lastMessageAt,
        ),
      [isRefresh, getChannels, getChats, conversations],
    )

    const refresh = async () => {
      setIsRefresh(true)
      await fetchPrivMessages(privMessageManager)
      // await fetchChannelInvite(pool, privMessageManager)
      setIsRefresh(false)
    }

    const renderItem = useCallback(({ item, index }) => {
      return (
        <Animated.View entering={FadeIn.delay(100 * index).duration(800)}>
          {item.kind === 4 ? (
            <DirectMessageItem dm={item} />
          ) : item.kind === 10101010 ? (
            <AIChannelDetail channel={item} /> // Add your component here
          ) : (
            <ChannelItem channel={item} />
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
          refreshControl={
            <RefreshControl
              colors={[colors.logo, colors.logoActive]}
              tintColor={colors.logoActive}
              refreshing={isRefresh}
              onRefresh={refresh}
            />
          }
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
