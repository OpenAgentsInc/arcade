import { useWindowDimensions } from "react-native"
import { DemoContainerScreen } from "./DemoScreenContainer"
import React from "react"
import { ArwesTextInput } from "app/components"

const TextInputDemoScreen: React.FC = () => {
  const { width: windowWidth } = useWindowDimensions()
  const textInputHeight = 60
  const textInputFontSize = 16

  return (
    <DemoContainerScreen>
      <ArwesTextInput
        style={{
          width: windowWidth * 0.9,
          maxWidth: windowWidth * 0.9,
          height: textInputHeight,
        }}
        defaultValue="Type here..."
        internalSquareSize={15}
        textInputStyle={{
          fontSize: textInputFontSize,
        }}
      />
    </DemoContainerScreen>
  )
}

export { TextInputDemoScreen }
