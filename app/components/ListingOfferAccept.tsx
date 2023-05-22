import React, { useContext, useEffect, useState } from "react"
import { Button, DEFAULT_RELAYS, RelayContext, Text } from "app/components"
import { View, ViewStyle } from "react-native"
import QRCode from "react-qr-code"
import { colors, spacing } from "app/theme"

export function ListingOfferAccept({
  channelId,
  listingId,
  offerId,
  ownerPubkey,
}: {
  channelId: string
  listingId: string
  offerId: string
  ownerPubkey: string
}) {
  // init relay
  const pool: any = useContext(RelayContext)

  // data state
  const [data, setData] = useState(null)

  // set done
  const submit = async () => {
    const tags = [
      ["e", channelId, DEFAULT_RELAYS[0], "root"],
      ["e", listingId, DEFAULT_RELAYS[0], "reply"],
      ["x", "final"],
      ["p", ownerPubkey, DEFAULT_RELAYS[0]],
    ]

    const event = await pool.send({
      content: "",
      tags,
      kind: 42,
    })

    if (event) {
      console.log(event)
      // log, todo: remove
      console.log("published final event to listing:", listingId)
    }
  }

  useEffect(() => {
    async function fetchAccept() {
      const data = await pool.list([
        { kinds: [42], "#e": [offerId], "#x": ["accept"], limit: 10, since: 0 },
      ])
      if (data) {
        setData(data[0])
      }
    }
    fetchAccept().catch(console.error)
  }, [])

  return (
    <View style={$content}>
      {data ? (
        <>
          <Text text="Owner has accepted your offer, please make a payment via" />
          <View style={$qr}>
            <QRCode value={data.content} />
          </View>
          <Button text="Done" onPress={submit} style={$button} />
        </>
      ) : null}
    </View>
  )
}

const $content: ViewStyle = {
  width: "100%",
  marginTop: spacing.small,
  padding: spacing.medium,
  borderWidth: 1,
  borderColor: colors.palette.cyan800,
  borderRadius: spacing.small,
}

const $qr: ViewStyle = {
  alignSelf: "center",
  marginVertical: spacing.small,
}

const $button: ViewStyle = {
  backgroundColor: colors.palette.cyan500,
  borderWidth: 0,
  width: "100%",
  marginTop: spacing.small,
  marginBottom: spacing.small,
  height: 50,
  minHeight: 50,
}
