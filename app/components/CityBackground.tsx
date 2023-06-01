/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from "react"

import { Image, StyleSheet, View } from "react-native"

export const CityBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.75)",
          flex: 1,
          zIndex: 1000,
        }}
      />
      <Image
        source={require("../../assets/images/city-cyan.png")}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          width: undefined,
          height: undefined,
          resizeMode: "cover",
        }}
      />
    </View>
  )
}
