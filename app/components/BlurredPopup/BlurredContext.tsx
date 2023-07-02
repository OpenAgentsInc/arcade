import React from "react"
import { MeasuredDimensions } from "react-native-reanimated"

type PopupAlignment = "top-left" | "top-right" | "bottom-left" | "bottom-right"

type PopupOptionType = {
  label: string
  onPress?: () => void
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

type BlurredContextType = {
  showPopup: (_: {
    layout: MeasuredDimensions
    node: React.ReactNode
    options: PopupOptionType[]
  }) => void
}

const BlurredPopupContext = React.createContext<BlurredContextType>({
  showPopup: () => {
    //
  },
})

export { PopupAlignment, PopupOptionType, BlurredContextType, BlurredPopupContext }
