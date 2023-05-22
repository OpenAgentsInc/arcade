import React, { useContext, useEffect, useState } from "react"
import { Text } from "./Text"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { RelayContext } from "./RelayProvider"
import { UserOffer } from "./UserOffer"

export function ListingItem({ listingId, tags }: { listingId: string; tags: any }) {
  const pool: any = useContext(RelayContext)

  const isListing = tags.find((item) => item[0] === "x" && item[1] === "listing")
  const hasData = tags.find((item) => item[0] === "data")

  if (!isListing && !hasData) {
    return null
  }

  const data = JSON.parse(hasData[1] || "[]")
  const [final, setFinal] = useState(null)

  useEffect(() => {
    async function fetchAccept() {
      const result = await pool.list([
        { kinds: [42], "#e": [listingId], "#x": ["final"], limit: 10, since: 0 },
      ])
      if (data) {
        setFinal(result[0])
      }
    }
    fetchAccept().catch(console.error)
  }, [isListing, hasData])

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
      <View>
        {final && (
          <>
            <Text text="Payed by: " preset="bold" style={$title} />
            <UserOffer pubkey={final.pubkey} />
          </>
        )}
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
