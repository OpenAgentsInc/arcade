import React from "react"
import { Text } from "./Text"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"

export function ListingItem({ tags }: { tags: string[][] }) {
  const isListing = tags.find((item) => item[0] === "x" && item[1] === "listing")
  const hasData = tags.find((item) => item[0] === "data")

  if (!isListing && !hasData) {
    return null
  }

  const data = JSON.parse(hasData[1] || "[]")

  return (
    <View style={$container}>
      <View style={$item}>
        <Text text="Action:" preset="bold" style={$title} />
        <Text text={data.action} />
      </View>
      <View style={$item}>
        <Text text="Item:" preset="bold" style={$title} />
        <Text text={data.item} />
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
        <Text text="Min. amount:" preset="bold" style={$title} />
        <Text text={data.min_amt} />
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
  marginTop: spacing.tiny,
  backgroundColor: colors.palette.cyan950,
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.tiny,
  padding: spacing.small,
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
