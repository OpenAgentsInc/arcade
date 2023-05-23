import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { DemoScreens } from "app/screens"
import * as Screens from "app/screens/Demo"
import React from "react"

export type DemoStackParamList = {
  DemoScreens: undefined
  BitcoinTrading: undefined
  Ridesharing: undefined
  FoodDelivery: undefined
  Restaurants: undefined
  EventTickets: undefined
  EventTicketDetail: undefined
  Rentals: undefined
  RentalMap: undefined
  GoodsMarketplace: undefined
  PeerLending: undefined
  Charity: undefined
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
      <Stack.Screen name="RentalMap" component={Screens.RentalMapScreen} />
      <Stack.Screen name="GoodsMarketplace" component={Screens.GoodsMarketplaceScreen} />
      <Stack.Screen name="FoodDelivery" component={Screens.FoodDeliveryScreen} />
      <Stack.Screen name="Restaurants" component={Screens.RestaurantsScreen} />
      <Stack.Screen name="EventTickets" component={Screens.EventTicketsScreen} />
      <Stack.Screen name="EventTicketDetail" component={Screens.EventTicketDetailScreen} />
      <Stack.Screen name="PeerLending" component={Screens.PeerLendingScreen} />
      <Stack.Screen name="Charity" component={Screens.CharityScreen} />
      <Stack.Screen name="Donation" component={Screens.DonationScreen} />
    </Stack.Navigator>
  )
}
