import { Header, Screen, Text, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors } from "app/theme"
import { useLayoutEffect, useState } from "react"
import { View, ViewStyle, SectionList } from "react-native"

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
      route: "BitcoinTrading",
    },
    {
      id: 2,
      name: "Ridesharing",
      route: "Ridesharing",
    },
    {
      id: 3,
      name: "Food delivery",
      route: "FoodDelivery",
    },
    {
      id: 4,
      name: "Event tickets",
      route: "EventTickets",
    },
    {
      id: 5,
      name: "Homestay/short-term rental",
      route: "Rentals",
    },
    {
      id: 6,
      name: "Handcrafted goods marketplace",
      route: "GoodsMarketplace",
    },
    {
      id: 7,
      name: "Peer-to-peer lending",
      route: "PeerLending",
    },
    {
      id: 8,
      name: "Charitable donations",
      route: "Donations",
    },
  ]

  return (
    <Screen style={$root}>
      <SectionList
        sections={[{ title: "", data: screens }]}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => <Text text={title} preset="heading" />}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Button
              text={item.name}
              onPress={() => navigation.navigate(item.route)}
              preset="reversed"
            />
          </View>
        )}
      />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
