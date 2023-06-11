import React from "react"
import { View, TouchableOpacity, ViewStyle, Dimensions } from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Frame } from "app/components"
import { colors } from "app/theme"

const width = Dimensions.get("window").width

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={$tabbar}>
      <Frame internalSquareSize={10} color={colors.palette.cyan400} style={$frame} visible={true}>
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
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={0.8}
              >
                {IconComponent && <IconComponent focused={isFocused} />}
              </TouchableOpacity>
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
