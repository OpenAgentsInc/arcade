import { colors } from "app/theme"
import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

type ExpandedButtonProps = {
  onPress: () => void
  title: string
}

const ExpandedButton: React.FC<ExpandedButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles.container}>
      <Text style={buttonStyles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const buttonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: colors.palette.cyan100,
    borderRadius: 20,
    borderWidth: 1,
    height: 60,
    justifyContent: "center",
    marginTop: 50,
    width: "80%",
  },
  text: {
    color: colors.palette.cyan500,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
})

export { ExpandedButton }
