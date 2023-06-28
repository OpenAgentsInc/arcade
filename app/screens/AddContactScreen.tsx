import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { observer } from "mobx-react-lite"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text, Button, ContactItem } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet"
import { useStores } from "app/models"
import { useContactManager, useUserContacts } from "app/utils/useUserContacts"
import { nip19 } from "nostr-tools"
import { FlashList } from "@shopify/flash-list"

interface AddContactScreenProps extends NativeStackScreenProps<AppStackScreenProps<"AddContact">> {}

export const AddContactScreen: FC<AddContactScreenProps> = observer(function AddContactScreen() {
  const mgr = useContactManager()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["35%", "50%"], [])

  const contacts = useUserContacts()

  const {
    userStore: { addContact, removeContact },
  } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  // States
  const [customContact, setCustomContact] = useState("")
  const [data, setData]: any = useState([])

  const suggestions = data ? data.profiles : []

  const addCustomContact = () => {
    let pubkey = customContact.trim()
    if (pubkey.substring(0, 4) === "npub") {
      pubkey = nip19.decode(pubkey).data
    }
    if (pubkey && !contacts.find((el) => el.pubkey === pubkey)) {
      try {
        addContact({ pubkey, secret: false, legacy: true }, mgr)
      } catch (e) {
        alert(`Invalid contact: ${e}`)
      }
    }
    navigation.goBack()
  }

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Add contact"
          titleStyle={{ color: colors.palette.white }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          rightIcon="Plus"
          rightIconColor={colors.palette.cyan400}
          onRightPress={() => handlePresentModalPress()}
        />
      ),
    })
  }, [])

  useEffect(() => {
    async function fetchSuggestion() {
      const resp = await fetch(`https://api.nostr.band/v0/trending/profiles`)
      const data = await resp.json()
      setData(data)
    }
    fetchSuggestion()
  }, [])

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={$item}>
        <ContactItem pubkey={item.pubkey} />
        {contacts.includes(item.pubkey) ? (
          <Pressable onPress={() => removeContact(item.pubkey, mgr)}>
            <Text text="Remove" size="xs" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => addContact({ pubkey: item.pubkey, legacy: true, secret: false }, mgr)}
          >
            <Text text="Add" size="xs" />
          </Pressable>
        )}
      </View>
    )
  }, [])

  return (
    <BottomSheetModalProvider>
      <Screen contentContainerStyle={$root} preset="fixed" keyboardOffset={50}>
        <View style={$heading}>
          <Text text="Suggestions" size="lg" preset="bold" />
        </View>
        <FlashList
          data={suggestions}
          keyExtractor={(item: { pubkey: string }) => item.pubkey}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={$emptyState}>
              <Text text="No data..." />
            </View>
          }
          estimatedItemSize={100}
        />
      </Screen>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={$modal}
        handleIndicatorStyle={{ backgroundColor: colors.palette.cyan700 }}
      >
        <BottomSheetScrollView style={$modalContent}>
          <Text preset="bold" size="lg" text="Add contact" style={$modalHeader} />
          <View style={$modalForm}>
            <View style={$formInputGroup}>
              <Text text="Public key or npub" preset="default" size="sm" />
              <BottomSheetTextInput
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                placeholder="npub..."
                placeholderTextColor={colors.palette.cyan800}
                onChangeText={setCustomContact}
                value={customContact}
                style={[$formInput, $formInputText]}
              />
            </View>
            <Button
              text="Add"
              style={$formButton}
              pressedStyle={$formButtonActive}
              onPress={() => addCustomContact()}
            />
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
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

const $heading: ViewStyle = {
  marginTop: spacing.medium,
  marginBottom: spacing.small,
}

const $item: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $modal: ViewStyle = {
  backgroundColor: "#000",
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
}

const $modalHeader: ViewStyle = {
  alignSelf: "center",
}

const $modalContent: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  marginBottom: spacing.extraLarge,
}

const $modalForm: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  gap: spacing.medium,
}

const $formInputGroup: ViewStyle = {
  flexDirection: "column",
  gap: spacing.tiny,
}

const $formInput: ViewStyle = {
  width: "100%",
  height: 44,
  minHeight: 44,
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.extraSmall,
  paddingHorizontal: spacing.small,
}

const $formInputText: TextStyle = {
  color: colors.text,
}

const $formButton: ViewStyle = {
  width: "100%",
  height: 44,
  minHeight: 44,
  backgroundColor: colors.palette.cyan500,
  borderWidth: 0,
  borderRadius: spacing.extraSmall,
}

const $formButtonActive: ViewStyle = {
  backgroundColor: colors.palette.cyan600,
}
