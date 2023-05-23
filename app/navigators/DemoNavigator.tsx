import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { DemoScreens } from "app/screens"
import * as Screens from "app/screens/Demo"
import React from "react"

export type DemoStackParamList = {
  DemoScreens: undefined
  BitcoinTrading: undefined
  Ridesharing: undefined
  FoodDelivery: undefined
  EventTickets: undefined
  Rentals: undefined
  GoodsMarketplace: undefined
  PeerLending: undefined
  Donation: undefined
}

const Stack = createNativeStackNavigator<DemoStackParamList>()

export const DemoNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DemoScreens" component={DemoScreens} />
      <Stack.Screen name="BitcoinTrading" component={Screens.BitcoinTradingScreen} />
      <Stack.Screen name="Ridesharing" component={Screens.RidesharingScreen} />
      <Stack.Screen name="Rentals" component={Screens.RentalsScreen} />
      <Stack.Screen name="GoodsMarketplace" component={Screens.GoodsMarketplaceScreen} />
      {/* <Stack.Screen name="FoodDelivery" component={Screens.FoodDeliveryScreen} />
      <Stack.Screen name="EventTickets" component={Screens.EventTicketsScreen} />
      <Stack.Screen name="PeerLending" component={Screens.PeerLendingScreen} /> */}
      <Stack.Screen name="Donation" component={Screens.DonationScreen} />
    </Stack.Navigator>
  )
}
