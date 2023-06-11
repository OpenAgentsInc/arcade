import { ActivityIndicator } from "app/components"
import { ExpandedButton } from "./ExpandedButton"
import { DemoContainerScreen } from "./DemoScreenContainer"
import { colors } from "app/theme"
import React, { useState } from "react"

const ActivityIndicatorScreenDemo: React.FC = () => {
  const [type, setType] = useState<"large" | "small">("large")

  return (
    <DemoContainerScreen>
      <ActivityIndicator color={colors.tint} type={type} />
      <ExpandedButton
        onPress={() => {
          setType((t) => (t === "large" ? "small" : "large"))
        }}
        title="Large / Small"
      />
    </DemoContainerScreen>
  )
}

export { ActivityIndicatorScreenDemo }
