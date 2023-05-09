import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const { navigate } = useNavigation<any>()
  return (
    <Screen preset="fixed" style={$root} contentContainerStyle={$screenContent}>
      <Text text="arcaDe" preset="heading" style={$arcade} />
      <View style={{ width: "80%", maxWidth: 300, marginTop: 30 }}>
        <Button
          preset="reversed"
          text="Enter"
          onPress={() => navigate("Tabs")}
          style={{
            borderWidth: 1,
            borderColor: "#555",
            backgroundColor: "transparent",
          }}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $screenContent: ViewStyle = {
  justifyContent: "center",
  flex: 1,
  alignItems: "center",
}

const $arcade: TextStyle = {
  fontSize: 50,
  lineHeight: 100,
  letterSpacing: 4,
  color: "white",
  textShadowColor: "#00ffff",
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 15,
}
