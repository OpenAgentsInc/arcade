import React, { FC, useCallback, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { ContactItem, Header, ListItem, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { Contact } from "app/arclib/src/contacts"
import { useStores } from "app/models"

interface NewMessageScreenProps extends NativeStackScreenProps<AppStackScreenProps<"NewMessage">> {}

export const NewMessageScreen: FC<NewMessageScreenProps> = observer(function NewMessageScreen() {
  const navigation = useNavigation<any>()

  const {
    userStore: { getContacts },
  } = useStores()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="New Chat"
          titleStyle={{ color: colors.palette.white }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  const renderItem = useCallback(({ item }: { item: Contact }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("DirectMessage", {
            id: item.pubkey,
            legacy: item.legacy,
          })
        }
        style={$item}
      >
        <ContactItem pubkey={item.pubkey} />
      </Pressable>
    )
  }, [])

  return (
    <Screen contentContainerStyle={$root} preset="fixed">
      <View style={$actions}>
        <ListItem
          text="New channel"
          leftIcon="Users2Icon"
          leftIconColor={colors.palette.cyan500}
          bottomSeparator={true}
          style={$button}
          onPress={() => navigation.navigate("CreateChannel", { isPrivate: false })}
        />
        <ListItem
          text="New private channel"
          leftIcon="FolderLockIcon"
          leftIconColor={colors.palette.cyan500}
          bottomSeparator={true}
          style={$button}
          onPress={() => navigation.navigate("CreateChannel", { isPrivate: true })}
        />
        <ListItem
          text="New AI chat"
          leftIcon="Bot"
          leftIconColor={colors.palette.cyan500}
          bottomSeparator={true}
          style={$button}
          onPress={() => navigation.navigate("AIChannel")}
        />
      </View>
      <FlashList
        data={getContacts}
        keyExtractor={(item) => item.pubkey}
        renderItem={renderItem}
        contentContainerStyle={$list}
        ListHeaderComponent={
          <Text text="Recent contacts" size="md" preset="bold" style={$heading} />
        }
        ListEmptyComponent={
          <View style={$emptyState}>
            <Text text="You have no contacts on Arcade yet" />
            <Text text="- Invite friends to try Arcade" style={{ color: colors.palette.gray }} />
            <Text
              text="- Search people by public key or npub"
              style={{ color: colors.palette.gray }}
            />
          </View>
        }
        estimatedItemSize={50}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}

const $actions: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.tiny,
  marginBottom: spacing.large,
}

const $button: ViewStyle = {
  paddingHorizontal: spacing.small,
  backgroundColor: colors.palette.overlay20,
}

const $heading: TextStyle = {
  color: colors.palette.cyan600,
}

const $list: ViewStyle = {
  paddingBottom: spacing.large,
}

const $item: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}
