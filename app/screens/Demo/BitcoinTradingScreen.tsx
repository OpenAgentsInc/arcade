import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { Screen, Header, Text, User, TextField, Button, Card } from "app/components"
import { observer } from "mobx-react-lite"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { SendIcon } from "lucide-react-native"
import { faker } from "@faker-js/faker"

function createRandomMessage() {
  return {
    pubkey: "126103bfddc8df256b6e0abfd7f3797c80dcc4ea88f7c2f87dd4104220b4d65f",
    content: faker.lorem.sentence(5),
    metadata: {
      action: faker.helpers.arrayElement(["Buy", "Sell"]),
      price: faker.commerce.price(),
      currency: faker.finance.currencyCode(),
      amt: faker.datatype.number({ min: 0.1, max: 50 }),
      expiration: "1 hour",
      payment: faker.helpers.arrayElement(["Paypal", "Cash App", "Venmo"]),
      reputation: faker.datatype.number({ min: 1, max: 100 }),
    },
  }
}

const createMessages = (num = 50) => {
  return Array.from({ length: num }, createRandomMessage)
}

export const BitcoinTradingScreen = observer(function BitcoinTradingScreen() {
  const navigation = useNavigation<any>()

  const [data, setData] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Bitcoin Trading"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
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
            <Pressable
              onPress={() => navigation.navigate("EventTicketDetail", { name: item.event.name })}
              style={$messageItem}
            >
              <User pubkey={item.pubkey} />
              <View style={$messageContentWrapper}>
                <Text text={item.content || "empty message"} style={$messageContent} />
                <Card
                  preset="reversed"
                  ContentComponent={
                    <View style={$cardContent}>
                      <View style={$cardMetadata}>
                        <Text
                          text={item.metadata.action + " BTC"}
                          preset="bold"
                          style={$cardTitle}
                        />
                        <View style={$cardRow}>
                          <Text text="Price:" />
                          <Text text={item.metadata.price + " sats"} style={$cardSubtitle} />
                        </View>
                        <View style={$cardRow}>
                          <Text text="Currency:" />
                          <Text text={item.metadata.currency} style={$cardSubtitle} />
                        </View>
                        <View style={$cardRow}>
                          <Text text="Amount:" />
                          <Text text={item.metadata.amt} style={$cardSubtitle} />
                        </View>
                        <View style={$cardRow}>
                          <Text text="Expiration:" />
                          <Text text={item.metadata.expiration} style={$cardSubtitle} />
                        </View>
                        <View style={$cardRow}>
                          <Text text="Payment methods:" />
                          <Text text={item.metadata.payment} style={$cardSubtitle} />
                        </View>
                        <View style={$cardRow}>
                          <Text text="Reputation:" />
                          <Text text={item.metadata.rating + "/5"} style={$cardSubtitle} />
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

const $cardContent: ViewStyle = {
  flexDirection: "column",
  gap: spacing.small,
}

const $cardTitle: TextStyle = {
  color: colors.palette.cyan500,
}

const $cardRow: ViewStyle = {
  flexDirection: "row",
  gap: spacing.tiny,
}

const $cardSubtitle: TextStyle = {
  color: colors.palette.cyan700,
}

const $cardMetadata: ViewStyle = {
  padding: spacing.small,
}
