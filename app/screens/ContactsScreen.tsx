import React, { CSSProperties, FC, useCallback, useContext, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Pressable, RefreshControl, TouchableOpacity, View, ViewStyle } from "react-native"
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

  const [isRefresh, setIsRefresh] = useState(false)

  const unfollow = (pubkey: string) => {
    Alert.alert("Confirm remove this contact", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          removeContact(pubkey, contactManager)
        },
      },
    ])
  }

  const refresh = async () => {
    setIsRefresh(true)
    await fetchContacts(contactManager)
    setIsRefresh(false)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Contacts"
          titleStyle={{ color: colors.palette.white }}
          rightIcon="Plus"
          rightIconColor={colors.palette.cyan400}
          onRightPress={() => navigation.navigate("AddContact")}
        />
      ),
    })
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: Contact }) => {
      return (
        <View style={$item}>
          <ContactItem pubkey={item.pubkey} />
          <View style={$itemMeta}>
            {item.legacy && (
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Legacy direct message",
                    "You're using legacy direct message for this contact, all messages are encrypted, but everyone can see you interact with this contact",
                  )
                }
              >
                <Globe style={$iconUnfollow} />
              </TouchableOpacity>
            )}
            <Pressable onPress={() => unfollow(item.pubkey)}>
              <UserMinus style={$iconUnfollow} />
            </Pressable>
          </View>
        </View>
      )
    },
    [getContacts],
  )

  return (
    <Screen contentContainerStyle={$root} preset="fixed">
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
        refreshControl={
          <RefreshControl
            colors={["#155e75", "cyan"]}
            tintColor={"cyan"}
            refreshing={isRefresh}
            onRefresh={refresh}
          />
        }
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}

const $item: ViewStyle = {
  position: "relative",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $itemMeta: ViewStyle = {
  position: "absolute",
  right: 0,
  alignSelf: "center",
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  gap: spacing.small,
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
