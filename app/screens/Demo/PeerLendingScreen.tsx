import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { Screen, Header, Text, User, TextField, Button, Card } from "app/components"
import { observer } from "mobx-react-lite"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { ArrowRightIcon, SendIcon } from "lucide-react-native"
import { faker } from "@faker-js/faker"

function createRandomMessage() {
  return {
    pubkey: "126103bfddc8df256b6e0abfd7f3797c80dcc4ea88f7c2f87dd4104220b4d65f",
    content: "I need to spend money, so this is my loan offer, contact me if you are interested",
    metadata: {
      loanAmount: faker.datatype.number({ min: 100000, max: 100000000 }),
      interestRate: faker.datatype.number({ min: 0.1, max: 100 }),
      duration: faker.datatype.number({ min: 1, max: 12 }),
      purpose: faker.lorem.sentence(5),
    },
  }
}

const createMessages = (num = 50) => {
  return Array.from({ length: num }, createRandomMessage)
}

export const PeerLendingScreen = observer(function PeerLendingScreen() {
  const navigation = useNavigation<any>()

  const [data, setData] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="P2P Lending"
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
                      <View style={$cardHeading}>
                        <Text text="Loan Offer" preset="bold" style={$cardTitle} />
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
                          <Text text="Loan amount:" style={$cardSubtitle} />
                          <Text text={item.metadata.loanAmount + " sats"} />
                        </View>
                        <View style={$cardRow}>
                          <Text text="Interest rate:" style={$cardSubtitle} />
                          <Text text={item.metadata.interestRate + "%"} />
                        </View>
                        <View style={$cardRow}>
                          <Text text="Duration:" style={$cardSubtitle} />
                          <Text text={item.metadata.duration + " month"} />
                        </View>
                        <View>
                          <Text text="Purpose:" style={$cardSubtitle} />
                          <Text text={item.metadata.purpose} />
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
