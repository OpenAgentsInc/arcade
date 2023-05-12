import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, ImageStyle, TextStyle, Pressable } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Text } from "app/components"
import { spacing, colors } from "app/theme"
import { ChevronDownIcon } from "lucide-react-native"
import { FlashList } from "@shopify/flash-list"
import { useNavigation } from "@react-navigation/native"
import { ScreenWithSidebar } from "app/components/ScreenWithSidebar"
import { ArcadeIdentity, NostrPool } from "arclib"
import { nip19, generatePrivateKey } from "nostr-tools"
// import { useStores } from "app/models"

interface HomeMessagesScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"HomeMessages">> {}

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
    const { navigate } = useNavigation<any>()

    const priv = generatePrivateKey()
    const nsec = nip19.nsecEncode(priv)
    const ident = new ArcadeIdentity(nsec, "", "")

    const pool = new NostrPool(ident)
    console.log(pool)

    return (
      <ScreenWithSidebar title={"Messages"}>
        <View style={[$root, $container]}>
          <View style={$main}>
            <View style={$filter}>
              <Text text="Active Contacts" preset="default" />
              <ChevronDownIcon style={{ color: colors.palette.cyan800 }} />
            </View>
            <View style={$messsages}>
              <FlashList
                data={DumpMessages}
                renderItem={({ item }) => (
                  <Pressable onPress={() => navigate("Chat")} style={$messageItem}>
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
