import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, ImageStyle, TextStyle, Pressable } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Text } from "app/components"
import { spacing, colors } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { useNavigation } from "@react-navigation/native"
import { ScreenWithSidebar } from "app/components/ScreenWithSidebar"
// import { useStores } from "app/models"

interface HomeMessagesScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"HomeMessages">> {}

const DEFAULT_CHANNELS = [
  {
    id: "1abf8948d2fd05dd1836b33b324dca65138b2e80c77b27eeeed4323246efba4d",
    name: "Arcade Open R&D",
    picture: "https://void.cat/d/MsqUKXXC4SxDfmT2KiHovJ.webp",
    about: "A place to discuss the future of Arcade Open R&D",
  },
  {
    id: "d4de13fde818830703539f80ae31ce3419f8f18d39c3043013bee224be341c3b",
    name: "Arcade Exchange Test",
    picture: "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp",
    about: "",
  },
]

export const HomeMessagesScreen: FC<HomeMessagesScreenProps> = observer(
  function HomeMessagesScreen() {
    const { navigate } = useNavigation<any>()

    return (
      <ScreenWithSidebar title={"Messages"}>
        <View style={[$root, $container]}>
          <View style={$main}>
            <View style={$messsages}>
              <FlashList
                data={DEFAULT_CHANNELS}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => navigate("Chat", { id: item.id, name: item.name })}
                    style={$messageItem}
                  >
                    <AutoImage
                      source={{ uri: "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp" }}
                      style={$messageItemAvatar}
                    />
                    <View>
                      <Text text={item.name} preset="bold" style={$messageItemName} />
                      <Text
                        text={item.about || "No description"}
                        size="xs"
                        numberOfLines={1}
                        style={$messageItemContent}
                      />
                    </View>
                  </Pressable>
                )}
                estimatedItemSize={50}
              />
            </View>
          </View>
        </View>
      </ScreenWithSidebar>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  paddingHorizontal: spacing.medium - 2,
}

const $main: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  gap: spacing.small,
  width: "100%",
  height: "100%",
  paddingHorizontal: spacing.tiny,
}

const $messsages: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.extraSmall,
  // paddingHorizontal: spacing.small,
}

const $messageItem: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.extraSmall,
}

const $messageItemAvatar: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 100,
  marginRight: spacing.small,
}

const $messageItemName: TextStyle = {
  lineHeight: 0,
}

const $messageItemContent: TextStyle = {
  width: 240,
  lineHeight: 0,
  color: "rgba(255,255,255,0.5)",
}
