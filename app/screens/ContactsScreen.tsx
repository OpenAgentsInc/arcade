import React, { FC, useCallback, useContext, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { ContactItem, Header, RelayContext, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { useUserContacts } from "app/utils/useUserContacts"
import { useStores } from "app/models"

interface ContactsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Contacts">> {}

export const ContactsScreen: FC<ContactsScreenProps> = observer(function ContactsScreen() {
  const pool: any = useContext(RelayContext)
  const contacts = useUserContacts()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  // Stores
  const {
    userStore: { removeContact },
  } = useStores()

  const unfollow = (pubkey: string) => {
    removeContact(pubkey, pool)
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

  const renderItem = useCallback(({ item }: { item: string }) => {
    return (
      <Pressable onPress={() => navigation.navigate("User", { id: item })} style={$item}>
        <ContactItem pubkey={item} />
        <Pressable onPress={() => unfollow(item)}>
          <Text text="Unfollow" size="xs" />
        </Pressable>
      </Pressable>
    )
  }, [])

  return (
    <Screen style={$root} preset="scroll">
      <FlashList
        data={contacts}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={$emptyState}>
            <Text text="No contacts" style={{ color: colors.palette.gray }} />
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
