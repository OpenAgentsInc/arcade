import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { Screen, Header, TextField, Text, Card, AutoImage } from "app/components"
import { observer } from "mobx-react-lite"
import { ImageStyle, Pressable, View, ViewStyle } from "react-native"
import { FilterIcon } from "lucide-react-native"
import { faker } from "@faker-js/faker"
import { FlashList } from "@shopify/flash-list"

function createRandomRestaurant() {
  return {
    image: faker.image.food(100, 100, true),
    name: faker.company.name(),
    deliveryTime: faker.datatype.number({ min: 10, max: 60 }),
  }
}

const createRestaurants = (num = 50) => {
  return Array.from({ length: num }, createRandomRestaurant)
}

export const RestaurantsScreen = observer(function RestaurantsScreen() {
  const navigation = useNavigation<any>()

  const [data, setData] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Restaurants"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  useEffect(() => {
    const restaurants: any = createRestaurants(20)
    setData(restaurants)
  }, [])

  return (
    <Screen preset="scroll" contentContainerStyle={$container}>
      <View style={$filters}>
        <TextField
          placeholder="Search for food"
          placeholderTextColor={colors.palette.cyan600}
          style={$searchInput}
          inputWrapperStyle={$searchInputWrapper}
          autoCapitalize="none"
          autoFocus={false}
        />
        <Pressable style={$filter}>
          <FilterIcon width={20} height={20} style={{ color: colors.palette.cyan400 }} />
        </Pressable>
      </View>
      <View style={$content}>
        <FlashList
          data={data}
          renderItem={({ item }) => {
            return (
              <Card
                preset="reversed"
                heading={item.name}
                headingStyle={{ marginTop: spacing.extraSmall, color: colors.palette.cyan400 }}
                content={"Est. delivery time: " + item.deliveryTime + " min"}
                LeftComponent={<AutoImage source={{ uri: item.image }} style={$cardImage} />}
                style={$card}
              />
            )
          }}
          ListEmptyComponent={
            <View style={$emptyState}>
              <Text text="Loading..." />
            </View>
          }
          estimatedItemSize={300}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}

const $filters: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.small,
}

const $searchInputWrapper: ViewStyle = {
  width: 306,
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $searchInput: ViewStyle = {
  width: "100%",
  height: 40,
  borderWidth: 1,
  borderColor: colors.palette.cyan800,
  borderRadius: spacing.extraSmall,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
  marginBottom: spacing.small,
}

const $filter: ViewStyle = {
  paddingHorizontal: spacing.small,
  width: 40,
  height: 40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}

const $content: ViewStyle = {
  marginTop: spacing.extraSmall,
  flex: 1,
}

const $card: ViewStyle = {
  flex: 1,
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginBottom: spacing.small,
  borderWidth: 1,
  borderColor: colors.palette.cyan800,
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.overlay20,
  shadowColor: "transparent",
  overflow: "hidden",
}

const $cardImage: ImageStyle = {
  borderTopLeftRadius: spacing.tiny,
  borderBottomLeftRadius: spacing.tiny,
}
