import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { ContactItem, Header, RelayContext, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { CheckCircle2Icon } from "lucide-react-native"

interface ContactPickerScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ContactPicker">> {}

export const ContactPickerScreen: FC<ContactPickerScreenProps> = observer(
  function ContactPickerScreen() {
    const pool: any = useContext(RelayContext)
    const navigation = useNavigation()
    const { userStore } = useStores()

    const [selected, setSelected] = useState([])

    const toggleSelect = (pubkey: string) => {
      const arr = selected.includes(pubkey)
        ? selected.filter((i) => i !== pubkey)
        : [...selected, pubkey]
      setSelected(arr)
    }

    const done = () => {
      Alert.alert("Confirm choose those selected contacts", "Are you sure?", [
        {
          text: "Cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            console.log(selected)
          },
        },
      ])
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Choose contact"
            titleStyle={{ color: colors.palette.cyan400 }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
            RightActionComponent={
              <View style={$headerRightActions}>
                <Pressable onPress={() => done()}>
                  <Text text="Done" style={$done} />
                </Pressable>
              </View>
            }
          />
        ),
      })
    }, [selected])

    useEffect(() => {
      async function fetchContacts() {
        userStore.fetchContacts(pool)
      }
      fetchContacts().catch(console.error)
    }, [userStore.pubkey])

    return (
      <Screen preset="scroll" contentContainerStyle={$root}>
        <FlashList
          data={userStore.contacts.slice()}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable onPress={() => toggleSelect(item)} style={$contact}>
              <ContactItem pubkey={item} />
              {selected.includes(item) && (
                <View>
                  <CheckCircle2Icon width={16} height={16} color={colors.palette.cyan500} />
                </View>
              )}
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
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}

const $contact: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $headerRightActions: ViewStyle = {
  flexDirection: "row",
  gap: spacing.medium,
  paddingRight: spacing.medium,
}

const $done: TextStyle = {
  color: colors.palette.cyan500,
}
