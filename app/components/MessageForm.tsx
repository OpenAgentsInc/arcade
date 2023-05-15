import React, { useRef, useMemo, useCallback } from "react"
import { View, ViewStyle } from "react-native"
import { Button, TextField, Text } from "app/components"
import { SendIcon, Store } from "lucide-react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
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
    if (data.offerFrom && data.offerTo && data.offerAmount && data.offerRate && data.offerPayment) {
      const offer = {
        from: data.offerFrom,
        to: data.offerTo,
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
        offerFrom: "",
        offerTo: "",
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
              <Text preset="bold" size="lg" text="Create a trade request" />
              <View>
                <TextField
                  label="From"
                  onChangeText={handleChange("offerFrom")}
                  onBlur={handleBlur("offerFrom")}
                  value={values.offerFrom}
                />
                <TextField
                  label="To"
                  onChangeText={handleChange("offerTo")}
                  onBlur={handleBlur("offerTo")}
                  value={values.offerTo}
                />
                <TextField
                  label="Amount"
                  onChangeText={handleChange("offerAmount")}
                  onBlur={handleBlur("offerAmount")}
                  value={values.offerAmount}
                />
                <TextField
                  label="Rate"
                  onChangeText={handleChange("offerRate")}
                  onBlur={handleBlur("offerRate")}
                  value={values.offerRate}
                />
                <TextField
                  label="Payment Methods"
                  onChangeText={handleChange("offerPayment")}
                  onBlur={handleBlur("offerPayment")}
                  value={values.offerPayment}
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

const $modalContent: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}
