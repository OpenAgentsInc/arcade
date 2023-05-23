import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import React, { useLayoutEffect } from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { Screen, Header, TextField } from "app/components"
import { observer } from "mobx-react-lite"
import { ArrowLeftIcon } from "lucide-react-native"
import MapView from "react-native-maps"

export const RentalsScreen = observer(function RentalsScreen() {
  const navigation = useNavigation<any>()

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
          placeholderTextColor={colors.palette.cyan500}
          style={$input}
          inputWrapperStyle={$inputWrapper}
          autoCapitalize="none"
          autoFocus={false}
        />
      </View>
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

const $inputWrapper: ViewStyle = {
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $input: ViewStyle = {
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

const $floating: ViewStyle = {
  position: "absolute",
  top: 120,
  alignSelf: "center",
  width: "100%",
  paddingHorizontal: spacing.medium,
}
