import React, { useEffect, useState } from "react"
import { View, TouchableOpacity, ViewStyle, Dimensions } from "react-native"
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Frame } from "app/components"
import { colors } from "app/theme"

const width = Dimensions.get("window").width

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [tabBarFade, setTabBarFade] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setTabBarFade(true)
    }, 250)
  }, [])
  return (
    <View style={$tabbar}>
      <Frame
        visible={tabBarFade}
        internalSquareSize={10}
        color={colors.palette.cyan400}
        style={$frame}
      >
        <View style={{ flexDirection: "row" }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key]

            const IconComponent = options.tabBarIcon as any

            const isFocused = state.index === index

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              })

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name)
              }
            }

            return (
              <Animated.View
                key={index}
                entering={FadeIn.delay(500 + 50 * index).duration(300)}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                  {IconComponent && <IconComponent focused={isFocused} />}
                </TouchableOpacity>
              </Animated.View>
            )
          })}
        </View>
      </Frame>
    </View>
  )
}

const $tabbar: ViewStyle = {
  position: "absolute",
  bottom: 50,
  left: 10,
  right: 10,
}

const $frame: ViewStyle = {
  width: width - 20,
  height: 65,
  justifyContent: "center",
}
