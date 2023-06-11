import React, { useState } from "react"
import { DemoContainerScreen } from "./DemoScreenContainer"
import { Frame } from "app/components"
import { ExpandedButton } from "./ExpandedButton"
import { colors } from "app/theme"
import { StyleSheet } from "react-native"

const FrameScreenDemo: React.FC = () => {
  const [visible, setVisible] = useState(true)

  return (
    <DemoContainerScreen>
      <Frame color={colors.palette.cyan400} style={frameScreenStyles.frame} visible={visible} />
      <ExpandedButton
        onPress={() => {
          setVisible((v) => !v)
        }}
        title="Show / Hide"
      />
    </DemoContainerScreen>
  )
}

const frameScreenStyles = StyleSheet.create({
  frame: {
    height: 100,
    width: 200,
  },
})

export { FrameScreenDemo }
