import { KeyboardAvoidingView, Platform, View } from "react-native"

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
        <View
          style={{
            backgroundColor: "#000",
            flex: 1,
            justifyContent: jc ?? "space-between",
            paddingTop: 50,
            width: "100%",
          }}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
