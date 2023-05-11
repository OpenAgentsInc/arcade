import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, ImageStyle, TextStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Screen, Text, TextField } from "app/components"
import { spacing, colors } from "app/theme"
import { ChevronDownIcon, PlusIcon, SearchIcon } from "lucide-react-native"
import { FlashList } from "@shopify/flash-list"
import { useNavigation } from "@react-navigation/native"
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
    const [toggleSearch, setToggleSearch] = useState(false)

    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const { navigate } = useNavigation<any>()

    return (
      <Screen contentContainerStyle={$root} preset="fixed" safeAreaEdges={["top"]}>
        <View style={[$root, $container]}>
          <View style={$sidebar}>
            <View style={$pinList}>
              <View style={$dms} />
              <View>
                <AutoImage
                  source={{ uri: "https://void.cat/d/MsqUKXXC4SxDfmT2KiHovJ.webp" }}
                  style={$channelImage}
                />
              </View>
            </View>
            <View style={$divider} />
            <View>
              <FlashList
                data={DumpChannels}
                renderItem={({ item }) => (
                  <Button onPress={() => navigate("Chat")} style={$channelItem}>
                    <AutoImage
                      source={{
                        uri: item,
                      }}
                      style={$channelImage}
                    />
                  </Button>
                )}
                ListFooterComponent={() => (
                  <View>
                    <Button
                      onPress={() => alert("Create a new channel")}
                      LeftAccessory={() => <PlusIcon style={{ color: colors.text }} />}
                      style={$channelButton}
                    />
                  </View>
                )}
                estimatedItemSize={50}
              />
            </View>
          </View>
          <View style={$main}>
            <View style={$mainHeader}>
              <Text text="Messages" preset="bold" size="lg" />
              <Button
                onPress={() => setToggleSearch((prev) => !prev)}
                LeftAccessory={() => (
                  <SearchIcon width={20} height={20} style={{ color: colors.palette.cyan800 }} />
                )}
                style={$searchButton}
                pressedStyle={$searchButtonPressed}
              />
            </View>
            {toggleSearch && (
              <TextField
                placeholder="Search..."
                placeholderTextColor={colors.palette.cyan500}
                inputWrapperStyle={$searchField}
              />
            )}
            <View style={$filter}>
              <Text text="Active Contacts" preset="default" />
              <ChevronDownIcon style={{ color: colors.palette.cyan800 }} />
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
                      <Text text={item.name} preset="bold" style={$messageItemName} />
                      <Text
                        text={item.content}
                        size="xs"
                        numberOfLines={1}
                        style={$messageItemContent}
                      />
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
  alignItems: "center",
}

const $main: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  gap: spacing.small,
  width: "100%",
  height: "100%",
  paddingHorizontal: spacing.tiny,
}

const $pinList: ViewStyle = {
  gap: spacing.small,
}

const $divider: ViewStyle = {
  width: "50%",
  height: 2,
  backgroundColor: colors.palette.cyan500,
  borderRadius: 2,
  marginVertical: spacing.small,
  alignSelf: "center",
}

const $dms: ViewStyle = {
  backgroundColor: colors.palette.cyan400,
  borderRadius: 100,
  width: 50,
  height: 50,
}

const $channelItem: ViewStyle = {
  marginBottom: spacing.small,
}

const $channelImage: ImageStyle = {
  backgroundColor: colors.palette.cyan100,
  borderRadius: 100,
  width: 50,
  height: 50,
}

const $channelButton: ViewStyle = {
  backgroundColor: colors.palette.cyan500,
  borderWidth: 0,
  borderRadius: 100,
  width: 50,
  height: 50,
  minHeight: 50,
}

const $filter: ViewStyle = {
  paddingHorizontal: spacing.small,
  height: 40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
}

const $mainHeader: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $searchButton: ViewStyle = {
  padding: 0,
  margin: 0,
  backgroundColor: "transparent",
  borderWidth: 0,
  minHeight: 0,
}

const $searchButtonPressed: ViewStyle = {
  backgroundColor: colors.palette.cyan900,
}

const $searchField: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
}

const $messsages: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.extraSmall,
  paddingHorizontal: spacing.small,
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
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
  width: 200,
  lineHeight: 0,
  color: colors.palette.cyan700,
}
