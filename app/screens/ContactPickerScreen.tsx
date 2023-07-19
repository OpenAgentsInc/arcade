import React, {
  FC,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { observer } from "mobx-react-lite"
import { Alert, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { ContactItem, Header, RelayContext, Screen, Text, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { ArrowRightIcon, CheckCircle2Icon } from "lucide-react-native"
import { EncChannel } from "app/arclib/src"
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet"
import { Formik } from "formik"
import { resolvePubkey } from "app/arclib/src/contacts"
import { Channel, useStores } from "app/models"

interface ContactPickerScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ContactPicker">> {}

export const ContactPickerScreen: FC<ContactPickerScreenProps> = observer(
  function ContactPickerScreen({ route }: { route: any }) {
    const { id, name, privkey } = route.params
    const { pool } = useContext(RelayContext)
    const {
      userStore: { getContacts },
      channelStore: { getChannel },
    } = useStores()

    // get channel by using resolver identifier
    const channel: Channel = useMemo(() => getChannel(id), [id])
    const encrypted: EncChannel = useMemo(() => new EncChannel(pool), [])

    const formikRef = useRef(null)
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)
    const snapPoints = useMemo(() => ["35%", "50%"], [])

    const [selected, setSelected] = useState([] as Array<string>)
    const [custom, setCustom] = useState([])

    const navigation = useNavigation<any>()

    const data = custom.concat(getContacts)

    const toggleSelect = (pubkey: string) => {
      const arr = selected.includes(pubkey)
        ? selected.filter((i) => i !== pubkey)
        : [...selected, pubkey]
      setSelected(arr)
    }

    const done = () => {
      if (selected.length === 0) {
        Alert.alert(
          "You have not invited anyone yet.",
          "Are you sure you want to skip this step?",
          [
            {
              text: "Cancel",
            },
            {
              text: "Confirm",
              onPress: async () => {
                // invite
                await encrypted.invite({
                  members: selected,
                  id,
                  privkey,
                  name,
                  about: "",
                  picture: "",
                })
                // redirect to channel
                navigation.replace("Chat", { id, name, privkey })
              },
            },
          ],
        )
      } else {
        Alert.alert("Confirm choose those selected contacts", "Are you sure?", [
          {
            text: "Cancel",
          },
          {
            text: "Confirm",
            onPress: async () => {
              // invite
              await encrypted.invite({
                members: selected,
                id,
                privkey,
                name,
                about: "",
                picture: "",
              })
              // add members to local store
              channel.addMembers(selected)
              // redirect to channel
              navigation.replace("Chat", { id, name, privkey })
            },
          },
        ])
      }
    }

    const addCustomContact = async (data) => {
      let pubkey = data.pubkey.trim()
      try {
        pubkey = await resolvePubkey(pubkey)
        if (getContacts.find((e) => e.pubkey === pubkey)) {
          alert("Contact has been added")
          return
        }
        setCustom((prev) => [...prev, { pubkey, secret: false, legacy: true }])
        setSelected((prev) => [...prev, pubkey])
        // reset form
        formikRef.current?.resetForm()
      } catch (e) {
        alert(`Invalid contact, please make sure you enter valid public key or npub`)
      }
    }

    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present()
    }, [])

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Invite"
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

    const renderItem = useCallback(
      ({ item }) => {
        return (
          <Pressable onPress={() => toggleSelect(item.pubkey)} style={$contact}>
            <ContactItem pubkey={item.pubkey} />
            {!channel.members.includes(item.pubkey) ? (
              selected.includes(item.pubkey) && (
                <View>
                  <CheckCircle2Icon width={16} height={16} color={colors.palette.cyan500} />
                </View>
              )
            ) : (
              <Text text="Added" size="sm" />
            )}
          </Pressable>
        )
      },
      [selected],
    )

    return (
      <BottomSheetModalProvider>
        <Screen preset="fixed" contentContainerStyle={$root}>
          <FlashList
            data={data}
            keyExtractor={(item) => item.pubkey}
            renderItem={renderItem}
            ListEmptyComponent={
              <View style={$emptyState}>
                <Text text="You have no contacts on Arcade yet" />
                <Text
                  text="- Invite friends to try Arcade"
                  style={{ color: colors.palette.gray }}
                />
                <Text
                  text="- Search people by public key or npub"
                  style={{ color: colors.palette.gray }}
                />
              </View>
            }
            estimatedItemSize={50}
            contentContainerStyle={$list}
          />
        </Screen>
        <View style={$floating}>
          <Button
            LeftAccessory={() => (
              <ArrowRightIcon width={24} height={24} color={colors.palette.white} />
            )}
            style={$formFloatingButton}
            pressedStyle={$formButtonActive}
            onPress={() => done()}
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={$modal}
          handleIndicatorStyle={{ backgroundColor: colors.palette.cyan700 }}
        >
          <BottomSheetScrollView style={$modalContent}>
            <Text preset="bold" size="lg" text="Invite by pubkey" style={$modalHeader} />
            <View style={$modalForm}>
              <Formik
                innerRef={formikRef}
                initialValues={{
                  pubkey: "",
                }}
                onSubmit={(values) => addCustomContact(values)}
              >
                {({ handleChange, handleBlur, submitForm, values }) => (
                  <>
                    <View style={$formInputGroup}>
                      <Text text="Public key or npub" preset="default" size="sm" />
                      <BottomSheetTextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="off"
                        placeholder="npub..."
                        placeholderTextColor={colors.palette.cyan800}
                        style={[$formInput, $formInputText]}
                        onChangeText={handleChange("pubkey")}
                        onBlur={handleBlur("pubkey")}
                        value={values.pubkey}
                      />
                    </View>
                    <Button
                      onPress={submitForm}
                      text="Add"
                      style={$formButton}
                      pressedStyle={$formButtonActive}
                    />
                  </>
                )}
              </Formik>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
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

const $list: ViewStyle = {
  paddingBottom: 100,
}

const $contact: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
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

const $floating: ViewStyle = {
  position: "absolute",
  right: spacing.small,
  bottom: spacing.extraLarge,
  alignSelf: "flex-end",
}

const $formFloatingButton: ViewStyle = {
  width: 50,
  height: 50,
  minHeight: 50,
  backgroundColor: colors.palette.cyan500,
  borderWidth: 0,
  borderRadius: 50,
}
