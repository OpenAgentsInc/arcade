import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, ImageStyle, TextStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Screen, Text } from "app/components"
import { spacing, colors } from "app/theme"
import { PlusIcon } from "lucide-react-native"
import { FlashList } from "@shopify/flash-list"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

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

export const HomeMessagesScreen: FC<HomeMessagesScreenProps> = observer(
  function HomeMessagesScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    return (
      <Screen contentContainerStyle={$root} preset="scroll" safeAreaEdges={["top"]}>
        <View style={[$root, $container]}>
          <View style={$sidebar}>
            <View style={$pinList}>
              <View style={$channel}>
                <View style={$dms} />
              </View>
              <View style={$channel}>
                <AutoImage
                  source={{ uri: "https://void.cat/d/MsqUKXXC4SxDfmT2KiHovJ.webp" }}
                  style={$channelImage}
                />
              </View>
            </View>
            <View style={$divider} />
            <View style={$channelList}>
              {DumpChannels.map((uri, i) => (
                <View key={i} style={$channel}>
                  <AutoImage
                    source={{
                      uri,
                    }}
                    style={$channelImage}
                  />
                </View>
              ))}
              <View style={$channel}>
                <View style={$addChannelButton}>
                  <PlusIcon style={{ color: colors.text }} />
                </View>
              </View>
            </View>
          </View>
          <View style={$main}>
            <View>
              <Text text="Messages" size="xl" preset="heading" />
            </View>
            <View style={$activeContacts}>
              <Text text="Active Contacts" preset="default" />
            </View>
            <View style={$messsages}>
              <FlashList
                data={DumpMessages}
                renderItem={({ item }) => (
                  <View style={$messageItem}>
                    <AutoImage
                      source={{ uri: "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp" }}
                      style={$messageItemAvatar}
                    />
                    <View>
                      <Text text={item.name} preset="bold" />
                      <Text text={item.content} size="xs" numberOfLines={1} style={$messageItemContent} />
                    </View>
                  </View>
                )}
                estimatedItemSize={50}
              />
            </View>
          </View>
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
}

const $sidebar: ViewStyle = {
  width: 72,
  height: "100%",
  flexShrink: 0,
}

const $main: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  gap: spacing.small,
  width: "100%",
  height: "100%",
  paddingHorizontal: spacing.small,
}

const $pinList: ViewStyle = {
  gap: spacing.extraSmall,
}

const $divider: ViewStyle = {
  width: "50%",
  height: 2,
  backgroundColor: colors.tint,
  borderRadius: 2,
  marginVertical: spacing.extraSmall,
  alignSelf: "center",
}

const $channelList: ViewStyle = {
  flex: 1,
  gap: spacing.extraSmall,
}

const $dms: ViewStyle = {
  backgroundColor: colors.tint,
  borderRadius: 100,
  width: 50,
  height: 50,
}

const $channel: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const $channelImage: ImageStyle = {
  backgroundColor: colors.tint,
  borderRadius: 100,
  width: 50,
  height: 50,
}

const $addChannelButton: ViewStyle = {
  backgroundColor: "cyan",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 100,
  width: 50,
  height: 50,
}

const $activeContacts: ViewStyle = {
  paddingHorizontal: spacing.small,
  height: 40,
  alignItems: "flex-start",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: colors.tint,
  borderRadius: spacing.small / 2,
}

const $messsages: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.extraSmall,
  paddingHorizontal: spacing.small,
  borderWidth: 1,
  borderColor: colors.tint,
  borderRadius: spacing.small / 2,
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

const $messageItemContent: TextStyle = {
  width: 200,
  color: colors.textDim,
}
