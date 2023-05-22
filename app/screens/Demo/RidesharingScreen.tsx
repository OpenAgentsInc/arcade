import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { colors } from "app/theme"
import { Option, Star, XIcon } from "lucide-react-native"
import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { Screen, Header, Button, Text, Toggle, Icon } from "../../components"

export function RidesharingScreen() {
  const [isListExpanded, setIsListExpanded] = useState(false)
  const navigation = useNavigation<any>()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Ridesharing"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          // rightIcon={isListExpanded ? <XIcon /> : <Option />}
          // rightIcon={isListExpanded ? "close" : "options"}
          rightIcon="Option"
          rightIconColor={colors.palette.cyan400}
          onRightPress={() => setIsListExpanded(!isListExpanded)}
        />
      ),
    })
  }, [isListExpanded])

  const rides = [
    { id: 1, driver: "Jenny", rating: 5, time: "3 mins", price: "$5" },
    { id: 2, driver: "Mark", rating: 3.5, time: "5 mins", price: "$7" },
    { id: 3, driver: "Sara", rating: 4.5, time: "10 mins", price: "$10" },
  ]

  return (
    <Screen>
      <View style={styles.content}>
        <Text preset="subheading">Request a ride</Text>
        <Button text="I need a ride" preset="reversed" />
        {isListExpanded && (
          <View style={styles.expandedContent}>
            <FlashList
              data={rides}
              estimatedItemSize={100}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text preset="subheading">{item.driver}</Text>
                  <View style={styles.rating}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        // icon={n <= item.rating ? "star" : "staro"}
                        color={colors.palette.primary400}
                      />
                    ))}
                  </View>
                  <Text preset="subheading">{item.time}</Text>
                  <Text preset="subheading">{item.price}</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
  expandedContent: {
    marginTop: 10,
    flex: 1,
    height: 400,
    width: 400,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  rating: {
    flexDirection: "row",
    marginLeft: 10,
  },
})
