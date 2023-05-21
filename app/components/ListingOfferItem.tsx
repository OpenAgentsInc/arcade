import React from "react"
import { Text } from "./Text"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"

export function ListingOfferItem({ data }: { data: any }) {
  return (
    <View style={$container}>
      <View style={$item}>
        <Text text="Message:" preset="bold" style={$title} />
        <Text text={data.content} />
      </View>
      <View style={$item}>
        <Text text="Currency:" preset="bold" style={$title} />
        <Text text={data.currency} />
      </View>
      <View style={$item}>
        <Text text="Price:" preset="bold" style={$title} />
        <Text text={data.price} />
      </View>
      <View style={$item}>
        <Text text="Amount:" preset="bold" style={$title} />
        <Text text={data.amt} />
      </View>
      <View style={$item}>
        <Text text="Expiration:" preset="bold" style={$title} />
        <Text text={data.expiration} />
      </View>
      <View style={$item}>
        <Text text="Payment" preset="bold" style={$title} />
        <Text text={data.payments} />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  backgroundColor: "transparent",
  borderWidth: 0,
  marginTop: spacing.small,
  padding: 0,
  width: "100%",
  minHeight: 200,
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
