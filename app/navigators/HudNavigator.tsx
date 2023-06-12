import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import { SplashScreen } from "app/screens/SplashScreen"
import { colors } from "app/theme"

// keeping this for now to show how to transition from initial splash to the splashscreen that blurs out the logo
export const HudNavigator = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowSplashScreen(false)
    }, 2000)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  if (showSplashScreen) {
    return (
      <View style={styles.container}>
        <SplashScreen />
        <StatusBar style="light" />
      </View>
    )
  }

  return <></>
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.black, flex: 1 },
})
