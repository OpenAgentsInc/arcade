import React, { useContext, useEffect, useState } from "react"
import { ContactItem, RelayContext, Text } from "app/components"
import { Pressable, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { FlashList } from "@shopify/flash-list"
import { CheckCircle2Icon } from "lucide-react-native"

export function ContactPicker() {
  const pool: any = useContext(RelayContext)
  const { userStore } = useStores()
  const [selected, setSelected] = useState([])

  const toggleSelect = (pubkey: string) => {
    const arr = selected.includes(pubkey)
      ? selected.filter((i) => i !== pubkey)
      : [...selected, pubkey]
    setSelected(arr)
  }

  useEffect(() => {
    async function fetchContacts() {
      userStore.fetchContacts(pool)
    }
    fetchContacts().catch(console.error)
  }, [userStore.pubkey])

  return (
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
  )
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
