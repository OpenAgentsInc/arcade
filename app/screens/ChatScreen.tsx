import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Header, Screen, Text, TextField } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { SearchIcon, SendIcon, UsersIcon } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { faker } from '@faker-js/faker';
// import { useStores } from "app/models"

interface ChatScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Chat">> {}

function createRandomMessage() {
  return {
    name: faker.name.firstName(),
    content: faker.lorem.sentence(),
    picture: faker.image.avatar(),
  };
}

const createMessages = (num = 50) => {
  return Array.from({ length: num }, createRandomMessage);
};

export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen() {
  const [data, setData] = useState([]);

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="#general"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <View style={$headerRightActions}>
              <UsersIcon size={20} color={colors.palette.cyan400} />
              <SearchIcon size={20} color={colors.palette.cyan400} />
            </View>
          }
        />
      ),
    })
  }, [])

  useEffect(() => {
    const messages: any = createMessages(50);
    setData(messages);
  }, []);

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={['bottom']}>
      <View style={$container}>
        <View style={$main}>
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <View style={$messageItem}>
                <AutoImage
                  source={{ uri: "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp" }}
                  style={$messageItemAvatar}
                />
                <View style={$messageItemContentWrapper}>
                  <Text text={item.name} preset="bold" style={$messageItemName} />
                  <Text
                    text={item.content}
                    size="xs"
                    style={$messageItemContent}
                  />
                </View>
              </View>
            )}
            estimatedItemSize={100}
            inverted={true}
          />
        </View>
        <View style={$form}>
          <TextField
            placeholder="Message"
            placeholderTextColor={colors.palette.cyan500}
            style={$input}
            inputWrapperStyle={$inputWrapper}
            RightAccessory={() => (
              <Button
                onPress={() => alert("Send message")}
                LeftAccessory={() => <SendIcon style={{ color: colors.text }} />}
                style={$sendButton}
              />
            )}
          />
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  height: "100%",
  justifyContent: "space-between",
  paddingHorizontal: spacing.medium,
}

const $headerRightActions: ViewStyle = {
  flexDirection: "row",
  gap: spacing.medium,
  paddingRight: spacing.medium,
}

const $main: ViewStyle = {
  flex: 1,
}

const $form: ViewStyle = {
  flexShrink: 0,
  paddingTop: spacing.small,
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

const $messageItem: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-start",
  gap: spacing.extraSmall,
  paddingVertical: spacing.extraSmall,
}

const $messageItemAvatar: ImageStyle = {
  width: 36,
  height: 36,
  borderRadius: 100,
  flexShrink: 0,
}

const $messageItemContentWrapper: ViewStyle = {
  flex: 1,
}

const $messageItemName: TextStyle = {
  lineHeight: 0,
  color: colors.palette.cyan700,
}

const $messageItemContent: TextStyle = {
  color: '#fff'
}
