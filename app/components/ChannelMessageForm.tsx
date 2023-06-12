import React, { useRef, useMemo, useCallback, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, TextField, Text } from "app/components"
import { SendIcon /* Store */ } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { BottomSheetModal, BottomSheetTextInput, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { Formik } from "formik"
import { ChannelManager } from "app/arclib/src"

export function ChannelMessageForm({
  channelManager,
  channelId,
  privkey,
}: {
  channelManager: ChannelManager
  channelId: string
  privkey: string
}) {
  // const listings = useMemo(() => new ArcadeListings(channel.nip28, channelId), [channel, channelId])

  // offer
  const [type, setType] = useState<any>("buy")
  const [attachOffer, setAttachOffer] = useState(false)

  // formik
  const formikRef = useRef(null)

  // bottom sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["50%", "75%", "100%"], [])

  /*
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  */

  const handleAttachOffer = useCallback(() => {
    // toggle attach offer
    setAttachOffer(true)
    // close bottom sheet
    bottomSheetModalRef.current?.close()
  }, [])

  const createEvent = async (data) => {
    if (data.content === "") return

    if (!attachOffer) {
      // send message
      const message = await channelManager.send({
        channel_id: channelId,
        content: data.content,
        is_private: !!privkey,
      })

      if (message) {
        // reset form
        formikRef.current?.resetForm()
        // reset attach offer state
        setAttachOffer(false)
        // log, todo: remove
        console.log("published event to channel:", message.id)
      }
    } else {
      /*
      const listing = await listings.post({
        type: "l1",
        action: type,
        item: "bitcoin",
        content: data.content,
        amt: data.amt,
        min_amt: data.min_amt,
        payments: [data.payments],
        currency: data.currency,
        price: data.price,
        expiration: data.expiration,
        geohash: data.geohash,
      })

      if (listing) {
        // reset form
        formikRef.current?.resetForm()
        // reset attach offer state
        setAttachOffer(false)
        // log, todo: remove
        console.log("published listing to channel:", channelId)
      }
      */
    }
  }

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        content: "",
        price: "",
        currency: "",
        amt: "",
        min_amt: "",
        payments: "",
        expiration: "",
        geohash: "",
      }}
      onSubmit={(values) => createEvent(values)}
    >
      {({ handleChange, handleBlur, submitForm, values }) => (
        <>
          <TextField
            placeholder="Message"
            placeholderTextColor={colors.palette.cyan500}
            style={$input}
            inputWrapperStyle={$inputWrapper}
            onChangeText={handleChange("content")}
            onBlur={handleBlur("content")}
            onSubmitEditing={() => submitForm()}
            value={values.content}
            autoCapitalize="none"
            autoCorrect={false}
            /*
            LeftAccessory={() => (
              <Button
                onPress={() => handlePresentModalPress()}
                LeftAccessory={() =>
                  attachOffer ? (
                    <View style={$attachedOffer} />
                  ) : (
                    <Store width={18} height={18} style={{ color: colors.palette.cyan600 }} />
                  )
                }
                style={$listingButton}
              />
            )}
            */
            RightAccessory={() => (
              <Button
                onPress={() => submitForm()}
                LeftAccessory={() => <SendIcon style={{ color: colors.text }} />}
                style={$sendButton}
              />
            )}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={$modal}
          >
            <BottomSheetScrollView style={$modalContent}>
              <Text preset="bold" size="lg" text="Create a trade request" style={$modalHeader} />
              <View style={$modalForm}>
                <View style={$buttonGroup}>
                  <Button
                    text="Buy"
                    textStyle={$switchText}
                    style={[$switch, type === "buy" && $switchActive]}
                    pressedStyle={$switchActive}
                    onPress={() => setType("buy")}
                  />
                  <Button
                    text="Sell"
                    textStyle={$switchText}
                    style={[$switch, type === "sell" && $switchActive]}
                    pressedStyle={$switchActive}
                    onPress={() => setType("sell")}
                  />
                </View>
                <View style={$formInputGroup}>
                  <Text text="Price" preset="default" size="sm" />
                  <BottomSheetTextInput
                    inputMode="numeric"
                    placeholder="29000"
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={handleChange("price")}
                    onBlur={handleBlur("price")}
                    value={values.price}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <View style={$formInputGroup}>
                  <Text text="Currency" preset="default" size="sm" />
                  <BottomSheetTextInput
                    placeholder="USD, EUR, etc."
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={handleChange("currency")}
                    onBlur={handleBlur("currency")}
                    value={values.currency}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <View style={$formInputGroup}>
                  <Text text="Amount" preset="default" size="sm" />
                  <BottomSheetTextInput
                    inputMode="numeric"
                    placeholder="0.00"
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={handleChange("amt")}
                    onBlur={handleBlur("amt")}
                    value={values.amt}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <View style={$formInputGroup}>
                  <Text text="Min. Amount" preset="default" size="sm" />
                  <BottomSheetTextInput
                    inputMode="numeric"
                    placeholder="0.00"
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={handleChange("min_amt")}
                    onBlur={handleBlur("min_amt")}
                    value={values.min_amt}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <View style={$formInputGroup}>
                  <Text text="Payment Methods" preset="default" size="sm" />
                  <BottomSheetTextInput
                    placeholder="PayPal, Venmo, Cash App,..."
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={handleChange("payments")}
                    onBlur={handleBlur("payments")}
                    value={values.payments}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <View style={$formInputGroup}>
                  <Text text="Expiration" preset="default" size="sm" />
                  <BottomSheetTextInput
                    placeholder="1h, 12h, ..."
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={handleChange("expiration")}
                    onBlur={handleBlur("expiration")}
                    value={values.expiration}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <View style={$formInputGroup}>
                  <Text text="Geohash" preset="default" size="sm" />
                  <BottomSheetTextInput
                    placeholder="testing only, will be removed"
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={handleChange("geohash")}
                    onBlur={handleBlur("geoash")}
                    value={values.geohash}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <Button
                  text="Create offer"
                  style={$createOfferButton}
                  pressedStyle={$createOfferButtonActive}
                  onPress={() => handleAttachOffer()}
                />
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>
        </>
      )}
    </Formik>
  )
}

const $inputWrapper: ViewStyle = {
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $input: ViewStyle = {
  width: "100%",
  height: 45,
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: 100,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
}

/*
const $listingButton: ViewStyle = {
  width: 24,
  height: 24,
  minHeight: 24,
  backgroundColor: "transparent",
  borderRadius: 100,
  borderWidth: 0,
  flexShrink: 0,
}
*/

const $sendButton: ViewStyle = {
  width: 45,
  height: 45,
  minHeight: 45,
  backgroundColor: colors.palette.cyan500,
  borderRadius: 100,
  borderWidth: 0,
  flexShrink: 0,
}

const $modal: ViewStyle = {
  backgroundColor: "#000",
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
}

const $modalHeader: ViewStyle = {
  alignSelf: "center",
}

const $modalContent: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  marginBottom: spacing.extraLarge,
}

const $modalForm: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  gap: spacing.medium,
}

const $buttonGroup: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.medium,
  borderWidth: 0,
  backgroundColor: colors.palette.cyan900,
  borderRadius: spacing.extraSmall,
  gap: spacing.tiny,
}

const $switch: ViewStyle = {
  flex: 1,
  width: "100%",
  borderRadius: spacing.extraSmall,
  backgroundColor: "transparent",
  borderWidth: 0,
  minHeight: 36,
  height: 36,
  paddingHorizontal: 0,
  paddingVertical: 0,
}

const $switchText: TextStyle = {
  lineHeight: 20,
}

const $switchActive: ViewStyle = {
  backgroundColor: colors.palette.cyan500,
}

const $formInputGroup: ViewStyle = {
  flexDirection: "column",
  gap: spacing.tiny,
}

const $formInput: ViewStyle = {
  width: "100%",
  height: 44,
  minHeight: 44,
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.extraSmall,
  paddingHorizontal: spacing.small,
}

const $formInputText: TextStyle = {
  color: colors.text,
}

const $createOfferButton: ViewStyle = {
  width: "100%",
  height: 44,
  minHeight: 44,
  backgroundColor: colors.palette.cyan500,
  borderWidth: 0,
  borderRadius: spacing.extraSmall,
}

const $createOfferButtonActive: ViewStyle = {
  backgroundColor: colors.palette.cyan600,
}

/*
const $attachedOffer: ViewStyle = {
  width: 18,
  height: 18,
  borderRadius: 18,
  backgroundColor: colors.palette.cyan200,
}
*/
