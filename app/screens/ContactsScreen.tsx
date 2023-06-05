import React, { FC, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { ContactItem, Header, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { useUserContacts } from "app/utils/useUserContacts"

interface ContactsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Contacts">> {}

export const ContactsScreen: FC<ContactsScreenProps> = observer(function ContactsScreen() {
  const contacts = useUserContacts()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Contacts"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <Screen style={$root} preset="scroll">
      <FlashList
        data={contacts}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate("DirectMessage", { item })}>
            <ContactItem pubkey={item} />
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={$emptyState}>
            <Text text="No contact..." />
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

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}
