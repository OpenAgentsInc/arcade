import React, { useRef, useMemo, useCallback, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, TextField, Text } from "app/components"
import { SendIcon, Store } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet"
import { Formik } from "formik"

export function MessageForm({
  pool,
  channelID,
  replyTo,
}: {
  pool: any
  channelID: string
  replyTo?: string
}) {
  // channel messages store
  const { channelStore } = useStores()

  // offer type
  const [type, setType] = useState("buy")

  // bottom sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["50%", "75%", "90%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const createEvent = async (data) => {
    // create tags
    const tags = [["e", channelID, "", "root"]]

    // add reply to tag if present
    if (replyTo) {
      tags.push(["e", replyTo, "", "reply"])
    }

    // create offer and add offer to tags if present
    if (data.offerCurrency && data.offerAmount && data.offerRate && data.offerPayment) {
      const offer = {
        from: type === "buy" ? data.offerCurrency : "BTC",
        to: type === "buy" ? "BTC" : data.offerCurrency,
        amount: data.offerAmount,
        rate: data.offerRate,
        payment: data.offerPayment,
      }

      tags.push(["a", JSON.stringify(offer), "", "offer"])
    }

    // publish event
    const event = await pool.send({
      content: data.message,
      tags,
      kind: 42,
    })

    if (event) {
      // add event to channel store
      channelStore.addMessage(event)
      // log, todo: remove
      console.log("published event to channel:", channelID)
    }
  }

  return (
    <Formik
      initialValues={{
        message: "",
        offerCurrency: "",
        offerAmount: "",
        offerRate: "",
        offerPayment: "",
      }}
      onSubmit={(values) => createEvent(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <>
          <TextField
            placeholder="Message"
            placeholderTextColor={colors.palette.cyan500}
            style={$input}
            inputWrapperStyle={$inputWrapper}
            onChangeText={handleChange("message")}
            onBlur={handleBlur("message")}
            value={values.message}
            autoCapitalize="none"
            LeftAccessory={() => (
              <Button
                onPress={() => handlePresentModalPress()}
                LeftAccessory={() => (
                  <Store width={18} height={18} style={{ color: colors.palette.cyan600 }} />
                )}
                style={$listingButton}
              />
            )}
            RightAccessory={() => (
              <Button
                onPress={() => handleSubmit()}
                LeftAccessory={() => <SendIcon style={{ color: colors.text }} />}
                style={$sendButton}
              />
            )}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={$modal}
          >
            <BottomSheetView style={$modalContent}>
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
                  <Text text="Currency" preset="default" size="sm" />
                  <BottomSheetTextInput
                    placeholder="USD"
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={handleChange("offerCurrency")}
                    onBlur={handleBlur("offerCurrency")}
                    value={values.offerAmount}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <View style={$formInputGroup}>
                  <Text text="Amount" preset="default" size="sm" />
                  <BottomSheetTextInput
                    inputMode="numeric"
                    placeholder="0.00"
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={handleChange("offerAmount")}
                    onBlur={handleBlur("offerAmount")}
                    value={values.offerAmount}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <View style={$formInputGroup}>
                  <Text text="Rate" preset="default" size="sm" />
                  <BottomSheetTextInput
                    inputMode="numeric"
                    placeholder="0.00"
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={handleChange("offerRate")}
                    onBlur={handleBlur("offerRate")}
                    value={values.offerRate}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <View style={$formInputGroup}>
                  <Text text="Payment Methods" preset="default" size="sm" />
                  <BottomSheetTextInput
                    placeholder="PayPal, Venmo, Cash App"
                    placeholderTextColor={colors.palette.cyan800}
                    onChangeText={handleChange("offerPayment")}
                    onBlur={handleBlur("offerPayment")}
                    value={values.offerPayment}
                    style={[$formInput, $formInputText]}
                  />
                </View>
                <Button
                  text="Create offer"
                  style={$createOfferButton}
                  pressedStyle={$createOfferButtonActive}
                />
              </View>
            </BottomSheetView>
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

const $listingButton: ViewStyle = {
  width: 24,
  height: 24,
  minHeight: 24,
  backgroundColor: "transparent",
  borderRadius: 100,
  borderWidth: 0,
  flexShrink: 0,
}

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
