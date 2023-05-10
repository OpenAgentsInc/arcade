import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage } from "app/components"
import { spacing } from "app/theme"
import { ScreenWithSidebar } from "app/components/ScreenWithSidebar"

interface HomeMessagesScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"HomeMessages">> {}

// #TODO: Replace with real data
const DumpChannels = [
  "https://ui-avatars.com/api/?name=a1&background=random&size=200",
  "https://ui-avatars.com/api/?name=a2&background=random&size=200",
  "https://ui-avatars.com/api/?name=a3&background=random&size=200",
  "https://ui-avatars.com/api/?name=a4&background=random&size=200",
  "https://ui-avatars.com/api/?name=a5&background=random&size=200",
]

const DumpMessages = [
  {
    picture: "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp",
    name: "Satoshi Nakamoto",
    content: "#bitcoin",
  },
  {
    picture: "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp",
    name: "Design Review Chat",
    content: "Document",
  },
  {
    picture: "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp",
    name: "R4IN80W",
    content: "That is how you do it!",
  },
  {
    picture: "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp",
    name: "480 Design",
    content: "Check out this new claymorphism design!",
  },
  {
    picture: "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp",
    name: "help! I'm in the hole",
    content: "🎉",
  },
  {
    picture: "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp",
    name: "Pleb",
    content: "You: GM!",
  },
]

export const TestDrawerScreen: FC<HomeMessagesScreenProps> = observer(function TestDrawerScreen() {
  const sidebarItems = DumpChannels.map((uri, index) => {
    return {
      name: `Channel ${index + 1}`, // or just "" if you don't have a name
      items: [`Channel ${index + 1}`],
    }
  })

  const content = DumpMessages.map((message, index) => {
    return {
      name: message.name,
      description: message.content,
      data: [
        <AutoImage key={index} source={{ uri: message.picture }} style={$messageItemAvatar} />,
      ],
    }
  })

  return <ScreenWithSidebar sidebarItems={sidebarItems} content={content} />
})

const $messageItemAvatar: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 100,
  marginRight: spacing.small,
}
