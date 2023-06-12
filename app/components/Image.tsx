import React from "react"
import { Image as BaseImage } from "react-native"

export const Image = React.memo(({ src, style = {} }: { src: string; style?: {} }) => {
  return (
    <BaseImage
      resizeMode="contain"
      source={{ uri: src }}
      style={{
        width: undefined,
        height: undefined,
        flex: 1,
        alignSelf: "stretch",
        borderRadius: 10,
        ...style,
      }}
    />
  )
})
