import React, { CSSProperties, FC, useCallback, useContext, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { ContactItem, Header, RelayContext, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { UserMinus, Globe } from "lucide-react-native"
import { useStores } from "app/models"
import { Contact } from "app/arclib/src/contacts"

interface ContactsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Contacts">> {}

export const ContactsScreen: FC<ContactsScreenProps> = observer(function ContactsScreen() {
  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const { contactManager } = useContext(RelayContext)
  const {
    userStore: { getContacts, fetchContacts, removeContact },
  } = useStores()

  const unfollow = (pubkey: string) => {
    removeContact(pubkey, contactManager)
  }

  const refresh = () => {
    fetchContacts(contactManager)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Contacts"
          titleStyle={{ color: colors.palette.white }}
          leftIcon="RefreshCcw"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => refresh()}
          rightIcon="Plus"
          rightIconColor={colors.palette.cyan400}
          onRightPress={() => navigation.navigate("AddContact")}
        />
      ),
    })
  }, [])

  const renderItem = useCallback(({ item }: { item: Contact }) => {
    return (
      <Pressable onPress={() => navigation.navigate("User", { id: item.pubkey })} style={$item}>
        <ContactItem pubkey={item.pubkey} />
        {item.legacy && <Globe style={$iconUnfollow} />}
        <Pressable onPress={() => unfollow(item.pubkey)}>
          <UserMinus style={$iconUnfollow} />
        </Pressable>
      </Pressable>
    )
  }, [])

  return (
    <Screen style={$root} preset="scroll">
      <FlashList
        data={getContacts}
        keyExtractor={(item) => item.pubkey}
        renderItem={renderItem}
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

const $item: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}

const $iconUnfollow: CSSProperties = {
  width: 20,
  height: 20,
  color: colors.palette.cyan100,
  marginLeft: 10,
}
