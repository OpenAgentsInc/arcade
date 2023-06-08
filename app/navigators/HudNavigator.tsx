import { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import { SplashScreen } from "app/screens/SplashScreen"
import { NewHomeDemo } from "app/screens/NewHomeDemo"

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
      <View style={{ backgroundColor: "black", flex: 1 }}>
        <SplashScreen />
        <StatusBar style="light" />
      </View>
    )
  }

  return <NewHomeDemo />
}
