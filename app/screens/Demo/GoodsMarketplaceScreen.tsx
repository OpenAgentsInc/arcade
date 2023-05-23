import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { Screen, Header, Text, TextField, Card, AutoImage } from "app/components"
import { observer } from "mobx-react-lite"
import { ImageStyle, Pressable, View, ViewStyle } from "react-native"
import { PlusIcon } from "lucide-react-native"
import { faker } from "@faker-js/faker"
import { FlashList } from "@shopify/flash-list"

function createRandomProduct() {
  return {
    image: faker.image.technics(100, 100, true),
    price: faker.commerce.price(),
    name: faker.commerce.productName(),
    location: faker.address.city(),
  }
}

const createProducts = (num = 50) => {
  return Array.from({ length: num }, createRandomProduct)
}

export const GoodsMarketplaceScreen = observer(function GoodsMarketplaceScreen() {
  const navigation = useNavigation<any>()

  const [data, setData] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Goods Marketplace"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <Pressable>
              <PlusIcon width={20} height={20} style={{ color: colors.palette.cyan400 }} />
            </Pressable>
          }
        />
      ),
    })
  }, [])

  useEffect(() => {
    const products: any = createProducts(20)
    setData(products)
  }, [])

  return (
    <Screen preset="scroll" style={$root} contentContainerStyle={$container}>
      <View>
        <TextField
          placeholder="Search for goods"
          placeholderTextColor={colors.palette.cyan600}
          style={$searchInput}
          inputWrapperStyle={$searchInputWrapper}
          autoCapitalize="none"
          autoFocus={false}
        />
        <View style={$tags}>
          <Pressable style={$tag}>
            <Text text="Art" />
          </Pressable>
          <Pressable style={$tag}>
            <Text text="Clothing" />
          </Pressable>
          <Pressable style={$tag}>
            <Text text="Jewelry" />
          </Pressable>
          <Pressable style={$tag}>
            <Text text="Furnishings" />
          </Pressable>
          <Pressable style={$tag}>
            <Text text="Home decor" />
          </Pressable>
        </View>
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
                content={"Price: " + item.price + " sats"}
                footer={"Location: " + item.location}
                footerStyle={{ marginTop: spacing.small, color: colors.palette.cyan700 }}
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

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium,
}

const $searchInputWrapper: ViewStyle = {
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $searchInput: ViewStyle = {
  width: "100%",
  height: 50,
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

const $tags: ViewStyle = {
  flexDirection: "row",
  gap: spacing.extraSmall,
}

const $tag: ViewStyle = {
  backgroundColor: colors.palette.cyan900,
  borderWidth: 1,
  borderColor: colors.palette.cyan800,
  paddingVertical: spacing.micro,
  paddingHorizontal: spacing.small,
  alignItems: "center",
  alignSelf: "center",
  borderRadius: 100,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}

const $content: ViewStyle = {
  marginTop: spacing.large,
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
