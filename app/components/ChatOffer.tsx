import React from "react"
import { Text } from "./Text"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"

export function ChatOffer({ tags }: { tags: any }) {
  const offer = tags.find((item) => item[0] === "a")

  if (!offer) {
    return null
  }

  const parsedOffer = JSON.parse(offer[1])

  return (
    <View style={$container}>
      <View style={$item}>
        <Text text="From:" preset="bold" style={$title} />
        <Text text={parsedOffer.from} />
      </View>
      <View style={$item}>
        <Text text="To:" preset="bold" style={$title} />
        <Text text={parsedOffer.to} />
      </View>
      <View style={$item}>
        <Text text="Amount:" preset="bold" style={$title} />
        <Text text={parsedOffer.amount} />
      </View>
      <View style={$item}>
        <Text text="Rate:" preset="bold" style={$title} />
        <Text text={parsedOffer.rate} />
      </View>
      <View style={$item}>
        <Text text="Payment Methods:" preset="bold" style={$title} />
        <Text text={parsedOffer.payment} />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  marginTop: spacing.tiny,
  backgroundColor: colors.palette.cyan950,
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.tiny,
  padding: spacing.small,
}

const $item: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  flex: 1,
  width: "100%",
  gap: spacing.tiny,
}

const $title: TextStyle = {
  color: colors.palette.cyan400,
}
