import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Card, Header, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { SearchIcon, PlusCircleIcon } from "lucide-react-native"
import { faker } from "@faker-js/faker"
import { FlashList } from "@shopify/flash-list"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface FeedScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Feed">> {}

function createRandomFeed() {
  return {
    name: faker.name.firstName(),
    content: faker.lorem.paragraph(),
    image: faker.image.imageUrl(300, 300),
  }
}

const createFeeds = (num = 50) => {
  return Array.from({ length: num }, createRandomFeed)
}

export const FeedScreen: FC<FeedScreenProps> = observer(function FeedScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const [data, setData] = useState([])

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

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
    const feeds: any = createFeeds(20)
    setData(feeds)
  }, [])

  return (
    <Screen style={$root} preset="scroll">
      <View style={[$root, $container]}>
        <View style={$content}>
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <Card
                preset="reversed"
                LeftComponent={
                  <AutoImage
                    source={{ uri: "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp" }}
                    style={$itemAvatar}
                  />
                }
                heading={item.name}
                HeadingTextProps={{size: "md", preset: "bold"}}
                ContentComponent={
                  <View>
                    <Text text={item.content} />
                    <AutoImage source={{ uri: item.image }} />
                  </View>
                }
                style={$item}
              />
            )}
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
  backgroundColor: 'transparent',
  paddingVertical: spacing.large,
}

const $itemAvatar: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 100,
}
