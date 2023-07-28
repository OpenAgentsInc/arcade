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
import { Alert, Pressable, SectionList, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Header, ListItem, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { PlusSquareIcon, XIcon } from "lucide-react-native"
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet"

interface RelayManagerScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"RelayManager">> {}

const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/

export const RelayManagerScreen: FC<RelayManagerScreenProps> = observer(
  function RelayManagerScreen() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)
    const snapPoints = useMemo(() => ["35%"], [])

    // Pull in one of our MST stores
    const {
      userStore: { getRelays, addRelay, removeRelay },
    } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()

    const [url, setURL] = useState("")
    const [suggests, setSuggests] = useState([])

    const filtered = suggests.filter((el) => !getRelays.includes(el))
    const data: any = [
      {
        title: "Connected",
        desc: "You always need at least one relay to use Arcade",
        type: "remove",
        data: [...getRelays],
      },
      { title: "Suggested relays", desc: "", type: "add", data: [...filtered] },
    ]

    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present()
    }, [])

    const add = (url: string) => {
      Alert.alert("Confirm add this relay", "Are you sure?", [
        {
          text: "Cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            // remove from suggest list
            const index = getRelays.findIndex((el: any) => el === url)
            if (index === -1) {
              addRelay(url)
            } else {
              alert("You have add this relay")
            }
          },
        },
      ])
    }

    const remove = (url: string) => {
      Alert.alert("Confirm remove this relay", "Are you sure?", [
        {
          text: "Cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            removeRelay(url)
          },
        },
      ])
    }

    const addCustomRelay = () => {
      try {
        const relay = new URL(url.replace(/\s/g, ""))
        if (
          domainRegex.test(relay.host) &&
          (relay.protocol === "wss:" || relay.protocol === "ws:")
        ) {
          if (!getRelays.includes(relay.origin)) {
            addRelay(relay.origin)
            setURL("")
            // close bottom sheet
            bottomSheetModalRef.current?.close()
          } else {
            alert("You're using this relay, please add another")
          }
        } else {
          alert(
            "Relay must use websocket protocol (start with wss:// or ws://), please check again",
          )
        }
      } catch {
        alert("Relay is not valid, please check again")
        setURL("")
      }
    }

    const getSuggests = async () => {
      try {
        const response = await fetch("https://api.nostr.watch/v1/online")
        const json = await response.json()
        setSuggests(json)
      } catch (error) {
        console.error(error)
      }
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Relay Manager"
            titleStyle={{ color: colors.palette.white }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            rightIcon="Plus"
            rightIconColor={colors.palette.cyan400}
            onRightPress={handlePresentModalPress}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    useEffect(() => {
      getSuggests()
    }, [])

    return (
      <BottomSheetModalProvider>
        <Screen contentContainerStyle={$root} preset="fixed">
          <SectionList
            sections={data}
            extraData={suggests}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, section: { type } }) => (
              <ListItem
                text={item}
                style={$item}
                containerStyle={$itemContainer}
                RightComponent={
                  type === "add" ? (
                    <Pressable onPress={() => add(item)}>
                      <PlusSquareIcon width={20} height={20} color={colors.palette.cyan500} />
                    </Pressable>
                  ) : (
                    getRelays.length > 1 && (
                      <Pressable onPress={() => remove(item)}>
                        <XIcon width={20} height={20} color={colors.palette.cyan500} />
                      </Pressable>
                    )
                  )
                }
              />
            )}
            renderSectionHeader={({ section: { title, desc } }) => (
              <View style={$heading}>
                <Text text={title} size="lg" preset="bold" />
                {desc && <Text text={desc} size="xs" style={$subtitle} />}
              </View>
            )}
            renderSectionFooter={({ section: { data } }) =>
              data.length === 0 ? (
                <View style={$emptyState}>
                  <Text text="Loading..." />
                </View>
              ) : (
                <View />
              )
            }
            stickySectionHeadersEnabled={false}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={$modal}
            keyboardBehavior="fillParent"
            android_keyboardInputMode="adjustResize"
            handleIndicatorStyle={{ backgroundColor: colors.palette.cyan700 }}
          >
            <BottomSheetView style={$modalContent}>
              <Text preset="bold" size="lg" text="Add custom relay" style={$modalHeader} />
              <View style={$modalForm}>
                <View style={$formInputGroup}>
                  <Text text="Relay URL" preset="default" size="sm" />
                  <BottomSheetTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="off"
                    placeholder="wss://"
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={setURL}
                    value={url}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <Button
                  text="Add"
                  style={$formButton}
                  pressedStyle={$formButtonActive}
                  onPress={() => addCustomRelay()}
                />
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </Screen>
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

const $heading: ViewStyle = {
  marginTop: spacing.medium,
  marginBottom: spacing.small,
}

const $subtitle: TextStyle = {
  color: colors.palette.cyan800,
}

const $itemContainer: ViewStyle = {
  alignItems: "center",
}

const $item: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.cyan900, // cyan500,
  borderRadius: spacing.tiny,
  // backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.small,
  marginBottom: spacing.small,
  alignItems: "center",
}

const $modal: ViewStyle = {
  backgroundColor: "#000",
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
}

const $modalHeader: ViewStyle = {
  alignSelf: "center",
  marginBottom: spacing.small,
}

const $modalContent: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
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
