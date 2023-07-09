import { KeyboardAvoidingView, Platform, View } from "react-native"
import { YStack } from "tamagui"

export const SolidScreen = ({
  children,
  jc,
}: {
  children: React.ReactNode
  jc?: "space-between" | "flex-start" | "flex-end" | "center"
}) => {
  return (
    <View style={{ flex: 1, paddingBottom: 30, backgroundColor: "#000" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#000" }}
      >
        <YStack
          backgroundColor="#000000"
          f={1}
          justifyContent={jc ?? "space-between"}
          pt={50}
          w="100%"
        >
          {children}
        </YStack>
      </KeyboardAvoidingView>
    </View>
  )
}
