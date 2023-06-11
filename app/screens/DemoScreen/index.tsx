import { View, ViewStyle } from "react-native"
import React from "react"
import { colors, spacing } from "app/theme"

import { ListItem } from "app/components"
import { useNavigation } from "@react-navigation/native"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { DemoContainerScreen } from "./DemoScreenContainer"
import { ActivityIndicatorScreenDemo } from "./ActivityIndicatorScreen"
import { FrameScreenDemo } from "./FrameScreen"
import { TextInputDemoScreen } from "./TextInputScreen"
import { ButtonDemoScreen } from "./ArwesButtonScreen"

type DemoStackParamList = {
  Main: undefined
  ActivityIndicatorDemo: undefined
  FrameDemo: undefined
  ButtonDemo: undefined
  TextInputDemo: undefined
}

const DemoStack = createNativeStackNavigator<DemoStackParamList>()

const MainDemosScreen: React.FC = () => {
  const navigation = useNavigation<any>()

  return (
    <DemoContainerScreen centered={false}>
      <View>
        <View style={$sectionData}>
          <ListItem
            text="Frame Demo"
            leftIcon="Frame"
            leftIconColor={colors.palette.cyan500}
            bottomSeparator
            style={$sectionButton}
            onPress={() => {
              navigation.navigate("FrameDemo")
            }}
          />
          <ListItem
            text="Button Demo"
            leftIcon="Touchpad"
            leftIconColor={colors.palette.cyan500}
            bottomSeparator
            style={$sectionButton}
            onPress={() => {
              navigation.navigate("ButtonDemo")
            }}
          />
          <ListItem
            text="Text Input Demo"
            leftIcon="Text"
            leftIconColor={colors.palette.cyan500}
            bottomSeparator
            style={$sectionButton}
            onPress={() => {
              navigation.navigate("TextInputDemo")
            }}
          />
          <ListItem
            text="Activity Indicator"
            leftIcon="Loader"
            leftIconColor={colors.palette.cyan500}
            style={$sectionButton}
            onPress={() => {
              navigation.navigate("ActivityIndicatorDemo")
            }}
          />
        </View>
      </View>
    </DemoContainerScreen>
  )
}

const $sectionData: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.overlay20,
  marginTop: spacing.tiny,
}

const $sectionButton: ViewStyle = {
  paddingHorizontal: spacing.small,
}

const DemosScreen = () => {
  return (
    <DemoStack.Navigator initialRouteName="Main">
      <DemoStack.Screen name="Main" component={MainDemosScreen} />
      <DemoStack.Screen name="ActivityIndicatorDemo" component={ActivityIndicatorScreenDemo} />
      <DemoStack.Screen name="FrameDemo" component={FrameScreenDemo} />
      <DemoStack.Screen name="ButtonDemo" component={ButtonDemoScreen} />
      <DemoStack.Screen name="TextInputDemo" component={TextInputDemoScreen} />
    </DemoStack.Navigator>
  )
}

export { DemosScreen }
