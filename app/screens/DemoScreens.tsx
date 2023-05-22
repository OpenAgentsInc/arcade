import { Header, Screen, Text, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { useLayoutEffect, useState } from "react"
import { View, ViewStyle, SectionList, FlatList } from "react-native"
import { BlankScreen as BitcoinTradingScreen } from "./BlankScreen"
import { BlankScreen as RidesharingScreen } from "./BlankScreen"
import { BlankScreen as FoodDeliveryScreen } from "./BlankScreen"
import { BlankScreen as EventTicketsScreen } from "./BlankScreen"
import { BlankScreen as RentalsScreen } from "./BlankScreen"
import { BlankScreen as GoodsMarketplaceScreen } from "./BlankScreen"
import { BlankScreen as PeerLendingScreen } from "./BlankScreen"
import { BlankScreen as DonationsScreen } from "./BlankScreen"

export const DemoScreens = () => {
  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Demos"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  const [selectedScreen, setSelectedScreen] = useState(1)

  const screens = [
    {
      id: 1,
      name: "Peer-to-peer bitcoin trading",
    },
    {
      id: 2,
      name: "Ridesharing",
    },
    {
      id: 3,
      name: "Food delivery",
    },
    {
      id: 4,
      name: "Event tickets",
    },
    {
      id: 5,
      name: "Homestay/short-term rental",
    },
    {
      id: 6,
      name: "Handcrafted goods marketplace",
    },
    {
      id: 7,
      name: "Peer-to-peer lending",
    },
    {
      id: 8,
      name: "Charitable donations",
    },
  ]

  const renderScreen = (screenId: number) => {
    console.log(screenId)
    switch (screenId) {
      case 1:
        return <BitcoinTradingScreen />
      case 2:
        console.log("rijosdiaosidfj")
        return <RidesharingScreen />
      case 3:
        return <FoodDeliveryScreen />
      case 4:
        return <EventTicketsScreen />
      case 5:
        return <RentalsScreen />
      case 6:
        return <GoodsMarketplaceScreen />
      case 7:
        return <PeerLendingScreen />
      case 8:
        return <DonationsScreen />
    }
  }

  return (
    <Screen style={$root}>
      <SectionList
        sections={[{ title: "", data: screens }]}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => <Text text={title} preset="heading" />}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Button text={item.name} onPress={() => setSelectedScreen(item.id)} preset="reversed" />
          </View>
        )}
      />
      <View>{renderScreen(selectedScreen)}</View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
