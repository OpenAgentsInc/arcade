import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { Screen, Header, Text, User, TextField, Button, Card, AutoImage } from "app/components"
import { observer } from "mobx-react-lite"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { SendIcon } from "lucide-react-native"
import { faker } from "@faker-js/faker"
import dayjs from "dayjs"

function createRandomMessage() {
  return {
    pubkey: "126103bfddc8df256b6e0abfd7f3797c80dcc4ea88f7c2f87dd4104220b4d65f",
    content: faker.lorem.paragraph(1),
    event: {
      image: faker.image.fashion(500, 500, true),
      name: faker.company.name(),
      date: faker.date.soon(),
      location: faker.address.streetAddress(),
      availableTickets: faker.datatype.number(100),
      price: faker.datatype.number({ min: 1000, max: 10000 }),
    },
  }
}

const createMessages = (num = 50) => {
  return Array.from({ length: num }, createRandomMessage)
}

export const EventTicketsScreen = observer(function EventTicketsScreen() {
  const navigation = useNavigation<any>()

  const [data, setData] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Event Tickets"
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
                      <AutoImage source={{ uri: item.event.image }} style={$cardImage} />
                      <View style={$cardHeading}>
                        <Text text={item.event.name} preset="bold" style={$cardTitle} />
                      </View>
                      <View style={$cardMetadata}>
                        <View style={$cardRow}>
                          <Text text="Price:" style={$cardSubtitle} />
                          <Text text={item.event.price + " sats"} />
                        </View>
                        <View style={$cardRow}>
                          <Text text="Remain tickets:" style={$cardSubtitle} />
                          <Text text={item.event.availableTickets} />
                        </View>
                        <View>
                          <Text text="Location:" style={$cardSubtitle} />
                          <Text text={item.event.location} />
                        </View>
                      </View>
                    </View>
                  }
                  LeftComponent={
                    <View style={$cardTime}>
                      <Text
                        text={dayjs(item.event.date).format("d")}
                        preset="bold"
                        size="xl"
                        style={$cardDay}
                      />
                      <Text text={dayjs(item.event.date).format("MMM")} />
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

const $cardHeading: ViewStyle = {
  paddingHorizontal: 0,
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
  resizeMode: "cover",
}

const $cardTime: ViewStyle = {
  flexDirection: "column",
  alignItems: "center",
  paddingTop: spacing.small,
  paddingLeft: spacing.small,
}

const $cardDay: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.cyan500,
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
  paddingVertical: spacing.small,
}
