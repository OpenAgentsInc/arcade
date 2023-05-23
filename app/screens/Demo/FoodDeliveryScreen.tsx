import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { Screen, Header, Text, User, TextField, Button, Card, AutoImage } from "app/components"
import { observer } from "mobx-react-lite"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { ArrowRightIcon, ListIcon, SendIcon } from "lucide-react-native"
import { faker } from "@faker-js/faker"

function createRandomMessage() {
  return {
    pubkey: "126103bfddc8df256b6e0abfd7f3797c80dcc4ea88f7c2f87dd4104220b4d65f",
    content: "Today menu",
    metadata: {
      image: faker.image.food(500, 500, true),
      name: faker.company.name(),
      deliveryTime: faker.datatype.number({ min: 10, max: 60 }),
      menu: ["Pizza", "Pasta", "Burger", "Salad", "Soup", "Sandwich", "Sushi", "Dessert", "Drink"],
      rating: faker.datatype.number({ min: 1, max: 5 }),
    },
  }
}

const createMessages = (num = 50) => {
  return Array.from({ length: num }, createRandomMessage)
}

export const FoodDeliveryScreen = observer(function FoodDeliveryScreen() {
  const navigation = useNavigation<any>()

  const [data, setData] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Food Delivery"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <Pressable
              onPress={() => navigation.navigate("Restaurants")}
              style={$headerRightActions}
            >
              <ListIcon size={20} color={colors.palette.cyan400} />
            </Pressable>
          }
        />
      ),
    })
  }, [])

  useEffect(() => {
    const messages: any = createMessages(20)
    setData(messages)
  }, [])

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={$container}
      safeAreaEdges={["bottom"]}
      keyboardOffset={120}
    >
      <View style={$main}>
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <Pressable style={$messageItem}>
              <User pubkey={item.pubkey} />
              <View style={$messageContentWrapper}>
                <Text text={item.content || "empty message"} style={$messageContent} />
                <Card
                  preset="reversed"
                  ContentComponent={
                    <View style={$cardContent}>
                      <AutoImage source={{ uri: item.metadata.image }} style={$cardImage} />
                      <View style={$cardHeading}>
                        <Text text={item.metadata.name} preset="bold" style={$cardTitle} />
                        <Pressable>
                          <ArrowRightIcon
                            width={20}
                            height={20}
                            style={{ color: colors.palette.cyan500 }}
                          />
                        </Pressable>
                      </View>
                      <View style={$cardMetadata}>
                        <View style={$cardRow}>
                          <Text text="Delivery time:" style={$cardSubtitle} />
                          <Text text={item.metadata.deliveryTime + " mins"} />
                        </View>
                        <View style={$cardRow}>
                          <Text text="Arcade Score:" style={$cardSubtitle} />
                          <Text text={item.metadata.rating + "/5"} />
                        </View>
                        <View>
                          <Text text="Menu:" style={$cardSubtitle} />
                          {item.metadata.menu.map((item: string, index: number) => (
                            <Text key={index} text={"- " + item} />
                          ))}
                        </View>
                      </View>
                    </View>
                  }
                  style={$card}
                />
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={$emptyState}>
              <Text text="Loading..." />
            </View>
          }
          estimatedItemSize={120}
          inverted={true}
        />
      </View>
      <View style={$form}>
        <TextField
          placeholder="Message"
          placeholderTextColor={colors.palette.cyan500}
          style={$input}
          inputWrapperStyle={$inputWrapper}
          autoCapitalize="none"
          RightAccessory={() => (
            <Button
              LeftAccessory={() => <SendIcon style={{ color: colors.text }} />}
              style={$sendButton}
            />
          )}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}

const $main: ViewStyle = {
  flex: 1,
}

const $headerRightActions: ViewStyle = {
  flexDirection: "row",
  gap: spacing.medium,
  paddingRight: spacing.medium,
}

const $form: ViewStyle = {
  paddingTop: spacing.small,
}

const $messageItem: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.extraSmall,
}

const $messageContentWrapper: ViewStyle = {
  paddingLeft: 48,
  marginTop: -24,
}

const $messageContent: TextStyle = {
  color: "#fff",
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  transform: [{ scaleY: -1 }],
  paddingVertical: spacing.medium,
}

const $inputWrapper: ViewStyle = {
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $input: ViewStyle = {
  width: "100%",
  height: 45,
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: 100,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
}

const $sendButton: ViewStyle = {
  width: 45,
  height: 45,
  minHeight: 45,
  backgroundColor: colors.palette.cyan500,
  borderRadius: 100,
  borderWidth: 0,
  flexShrink: 0,
}

const $card: ViewStyle = {
  flex: 1,
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginTop: spacing.small,
  marginBottom: spacing.small,
  borderWidth: 1,
  borderColor: colors.palette.cyan800,
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.overlay20,
  shadowColor: "transparent",
  overflow: "hidden",
}

const $cardHeading: ViewStyle = {
  paddingHorizontal: spacing.small,
  paddingVertical: spacing.extraSmall,
  borderBottomWidth: 1,
  borderColor: colors.palette.cyan800,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $cardContent: ViewStyle = {
  flexDirection: "column",
}

const $cardImage: ImageStyle = {
  borderTopRightRadius: spacing.tiny,
  width: "100%",
  height: 200,
}

const $cardTitle: TextStyle = {
  color: colors.palette.cyan500,
}

const $cardRow: ViewStyle = {
  flexDirection: "row",
  gap: spacing.tiny,
}

const $cardSubtitle: TextStyle = {
  color: colors.palette.cyan600,
}

const $cardMetadata: ViewStyle = {
  padding: spacing.small,
}
