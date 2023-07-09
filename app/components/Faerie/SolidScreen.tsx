import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native"
import React from "react"
import { colors } from "app/theme"

export const SolidScreen = ({
  children,
  jc,
}: {
  children: React.ReactNode
  jc?: "space-between" | "flex-start" | "flex-end" | "center"
}) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={[styles.innerView, { justifyContent: jc || "space-between" }]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.black,
    flex: 1,
    paddingBottom: 30,
  },
  innerView: {
    backgroundColor: colors.palette.black,
    flex: 1,
    paddingTop: 50,
    width: "100%",
  },
  keyboardAvoidingView: {
    backgroundColor: colors.palette.black,
    flex: 1,
  },
})
