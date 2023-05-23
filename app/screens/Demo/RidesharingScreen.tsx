import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import React, { useLayoutEffect, useMemo, useRef } from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { Screen, Header, TextField, Button, Text } from "app/components"
import { observer } from "mobx-react-lite"
import BottomSheet from "@gorhom/bottom-sheet"
import { ArrowLeftIcon } from "lucide-react-native"
import MapView from "react-native-maps"

export const RidesharingScreen = observer(function RidesharingScreen() {
  const navigation = useNavigation<any>()

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ["25%", "50%"], [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Ride Sharing"
          titleStyle={{ color: colors.palette.cyan400 }}
          LeftActionComponent={
            <Pressable onPress={() => navigation.goBack()} style={$backButton}>
              <ArrowLeftIcon size={24} color={colors.palette.cyan400} />
            </Pressable>
          }
          containerStyle={$header}
        />
      ),
    })
  }, [])

  return (
    <Screen preset="fixed" style={$root}>
      <View>
        <MapView
          style={$map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
      <View style={$floating}>
        <TextField
          placeholder="Search for a location"
          placeholderTextColor={colors.palette.cyan600}
          style={$floaingInput}
          inputWrapperStyle={$inputWrapper}
          autoCapitalize="none"
          autoFocus={false}
        />
        <View style={$tags}>
          <Pressable style={$tag}>
            <Text text="Exchange" />
          </Pressable>
          <Pressable style={$tag}>
            <Text text="Driver" />
          </Pressable>
          <Pressable style={$tag}>
            <Text text="Event" />
          </Pressable>
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={$modal}
        handleIndicatorStyle={$modalIndicator}
      >
        <View style={$modalContent}>
          <TextField
            label="Select a location"
            placeholder="1300 Market St, San Francisco, CA 94103"
            placeholderTextColor={colors.palette.cyan600}
            style={$modalInput}
            inputWrapperStyle={$inputWrapper}
            autoCapitalize="none"
            autoFocus={false}
          />
          <Button text="Confirm" style={$button} pressedStyle={$buttonPressed} />
        </View>
      </BottomSheet>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $header: ViewStyle = {
  position: "absolute",
  backgroundColor: "transparent",
}

const $backButton: ViewStyle = {
  paddingLeft: spacing.medium,
}

const $map: ViewStyle = {
  width: "100%",
  height: "100%",
}

const $modal: ViewStyle = {
  backgroundColor: colors.palette.cyan950,
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
}

const $modalIndicator: ViewStyle = {
  backgroundColor: colors.palette.cyan300,
}

const $modalContent: ViewStyle = {
  padding: spacing.medium,
}

const $inputWrapper: ViewStyle = {
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $modalInput: ViewStyle = {
  width: "100%",
  height: 50,
  borderWidth: 1,
  borderColor: colors.palette.cyan800,
  borderRadius: spacing.extraSmall,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
  marginBottom: spacing.small,
}

const $button: ViewStyle = {
  width: "100%",
  height: 44,
  minHeight: 44,
  backgroundColor: colors.palette.cyan500,
  borderWidth: 0,
  borderRadius: spacing.extraSmall,
}

const $buttonPressed: ViewStyle = {
  backgroundColor: colors.palette.cyan600,
}

const $floating: ViewStyle = {
  position: "absolute",
  top: 120,
  alignSelf: "center",
  width: "100%",
  paddingHorizontal: spacing.medium,
}

const $floaingInput: ViewStyle = {
  width: "100%",
  height: 50,
  borderWidth: 1,
  borderColor: colors.palette.cyan700,
  borderRadius: spacing.extraSmall,
  backgroundColor: colors.palette.cyan800,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
  marginBottom: spacing.small,
}

const $tags: ViewStyle = {
  flexDirection: "row",
  gap: spacing.extraSmall,
}

const $tag: ViewStyle = {
  backgroundColor: colors.palette.cyan800,
  borderWidth: 1,
  borderColor: colors.palette.cyan700,
  paddingVertical: spacing.micro,
  paddingHorizontal: spacing.small,
  alignItems: "center",
  alignSelf: "center",
  borderRadius: 100,
}
