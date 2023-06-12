import { useNavigation } from "@react-navigation/native"
import { Header } from "app/components"
import { colors } from "app/theme"
import React, { useLayoutEffect } from "react"
import { StatusBar, StyleSheet, View } from "react-native"

type DemoScreenDemoContainerScreenProps = {
  children?: React.ReactNode
  centered?: boolean
}

const DemoContainerScreen: React.FC<DemoScreenDemoContainerScreenProps> = ({
  children,
  centered = true,
}) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Demo"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={[styles.container, centered && styles.centered]}>{children}</View>
    </>
  )
}

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: colors.palette.almostBlack,
    flex: 1,
  },
})

export { DemoContainerScreen }
