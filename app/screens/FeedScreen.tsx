import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Card, Header, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { SearchIcon, PlusCircleIcon } from "lucide-react-native"
import { FlashList } from "@shopify/flash-list"
import { RelayContext } from "app/components/RelayProvider"
import { UserFeed } from "app/components/UserFeed"

interface FeedScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Feed">> {}

const date = Math.round(new Date().getTime() / 1000) - 3 * 3600

export const FeedScreen: FC<FeedScreenProps> = observer(function FeedScreen() {
  const pool: any = useContext(RelayContext)
  const [data, setData] = useState([])

  // Pull in navigation via hook
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Newsfeed"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <View style={$headerRightActions}>
              <SearchIcon size={20} color={colors.palette.cyan400} />
              <PlusCircleIcon size={20} color={colors.palette.cyan400} />
            </View>
          }
        />
      ),
    })
  }, [])

  useEffect(() => {
    async function fetchFeeds() {
      const data = await pool.list([{ kinds: [1], limit: 10, since: date }])
      setData(data)
    }

    fetchFeeds().catch(console.error)
  }, [])

  return (
    <Screen style={$root} preset="scroll">
      <View style={[$root, $container]}>
        <View style={$content}>
          <FlashList
            data={data}
            extraData={data}
            renderItem={({ item }) => (
              <Card
                preset="reversed"
                ContentComponent={
                  <View>
                    <UserFeed pubkey={item.pubkey} />
                    <View style={$itemContent}>
                      <Text text={item.content} />
                    </View>
                  </View>
                }
                style={$item}
              />
            )}
            ListEmptyComponent={
              <View style={$emptyState}>
                <Text text="Loading..." />
              </View>
            }
            estimatedItemSize={300}
          />
        </View>
      </View>
    </Screen>
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
  flex: 1,
  flexDirection: "column",
  paddingHorizontal: spacing.medium,
}

const $content: ViewStyle = {
  paddingTop: spacing.medium,
}

const $item: ViewStyle = {
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: "transparent",
  paddingBottom: spacing.large,
}

const $itemContent: ViewStyle = {
  paddingLeft: 48,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}
