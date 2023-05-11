import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Card, Header, Screen, Text, Button } from "app/components"
import { spacing, colors } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { SearchIcon, PlusCircleIcon, ChevronDownIcon } from "lucide-react-native"
import { faker } from "@faker-js/faker"
import { FlashList } from "@shopify/flash-list"
// import { useStores } from "app/models"

interface ListingScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Listing">> {}

function createRandomOffer() {
  return {
    market: "BTC/" + faker.finance.currencyCode(),
    price: faker.finance.amount(29000, 35000, 2, "", true),
    limits:
      faker.datatype.number({ min: 1, max: 10, precision: 0.01 }) +
      " - " +
      faker.datatype.number({ min: 1, max: 10, precision: 0.01 }),
    amount: faker.finance.amount(),
    method: "Bank transfer",
    rep: faker.datatype.number({ min: 10, max: 99 }),
    seller: faker.internet.email(),
    action: faker.helpers.arrayElement(["Buy", "Sell"]),
  }
}

const createOffers = (num = 50) => {
  return Array.from({ length: num }, createRandomOffer)
}

export const ListingScreen: FC<ListingScreenProps> = observer(function ListingScreen() {
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
          title="Listing"
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
    const offers: any = createOffers(50)
    setData(offers)
  }, [])

  return (
    <Screen style={$root} preset="scroll">
      <View style={[$root, $container]}>
        <View style={$filters}>
          <View style={$filter}>
            <Text text="New York, NY" preset="default" />
            <ChevronDownIcon style={{ color: colors.palette.cyan800 }} />
          </View>
          <View style={$filter}>
            <Text text="USD/BTC" preset="default" />
            <ChevronDownIcon style={{ color: colors.palette.cyan800 }} />
          </View>
        </View>
        <View style={$content}>
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <Card
                preset="reversed"
                RightComponent={<Button text={item.action} style={$itemButton} />}
                heading={item.market}
                ContentComponent={
                  <View>
                    <Text text={"Price: " + item.price} />
                    <Text text={"Amount: " + item.amount} />
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

const $filters: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  gap: spacing.small,
}

const $filter: ViewStyle = {
  paddingHorizontal: spacing.small,
  flex: 1,
  height: 40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
}

const $content: ViewStyle = {
  paddingTop: spacing.medium,
}

const $item: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.extraSmall,
  paddingHorizontal: spacing.small,
  marginBottom: spacing.small,
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
  shadowColor: 'transparent',
}

const $itemButton: ViewStyle = {
  backgroundColor: 'transparent',
  borderWidth: 0,
  paddingHorizontal: 0,
  paddingVertical: 0,
  height: 30,
  minHeight: 30,
}
