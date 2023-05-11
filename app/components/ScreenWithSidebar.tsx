import React, { FC, useRef, useState } from "react"
import { ImageStyle, Platform, View, ViewStyle } from "react-native"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import { useSharedValue, withTiming } from "react-native-reanimated"
import { AutoImage, Button, Header, Screen } from "./"
import { isRTL } from "../i18n"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { DrawerIconButton } from "./DrawerIconButton"
import { FlashList } from "@shopify/flash-list"
import { PlusIcon } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"

interface ScreenWithSidebarProps {
  title: string
  children: React.ReactNode
}

// #TODO: Replace with real data
const DumpChannels = [
  "https://ui-avatars.com/api/?name=a1&background=random&size=200",
  "https://ui-avatars.com/api/?name=a2&background=random&size=200",
  "https://ui-avatars.com/api/?name=a3&background=random&size=200",
  "https://ui-avatars.com/api/?name=a4&background=random&size=200",
  "https://ui-avatars.com/api/?name=a5&background=random&size=200",
]

export const ScreenWithSidebar: FC<ScreenWithSidebarProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<DrawerLayout>()
  // const listRef = useRef<SectionList>()
  const progress = useSharedValue(0)

  const { navigate } = useNavigation<any>()

  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
      drawerRef.current?.openDrawer({ speed: 2 })
    } else {
      setOpen(false)
      drawerRef.current?.closeDrawer({ speed: 2 })
    }
  }

  /*
  const handleScroll = (sectionIndex: number, itemIndex = 0) => {
    listRef.current.scrollToLocation({
      animated: true,
      itemIndex,
      sectionIndex,
    })
    toggleDrawer()
  }
  */

  const $drawerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={Platform.select({ default: 70 })}
      drawerType={"slide"}
      drawerPosition={isRTL ? "right" : "left"}
      overlayColor={open ? colors.palette.overlay50 : "transparent"}
      onDrawerSlide={(drawerProgress) => {
        progress.value = open ? 1 - drawerProgress : drawerProgress
      }}
      onDrawerStateChanged={(newState: DrawerState, drawerWillShow: boolean) => {
        if (newState === "Settling") {
          progress.value = withTiming(drawerWillShow ? 1 : 0, {
            duration: 250,
          })
          setOpen(drawerWillShow)
        }
      }}
      renderNavigationView={() => (
        <View style={[$drawer, $drawerInsets]}>
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
          <View style={$channelList}>
            <FlashList
              data={DumpChannels}
              renderItem={({ item }) => (
                <Button
                  onPress={() => navigate("Chat")}
                  style={$channelItem}
                  LeftAccessory={() => (
                    <AutoImage
                      source={{
                        uri: item,
                      }}
                      style={$channelImage}
                    />
                  )}
                />
              )}
              ListFooterComponent={() => (
                <Button
                  onPress={() => alert("Create a new channel")}
                  LeftAccessory={() => <PlusIcon style={{ color: colors.text }} />}
                  style={$channelButton}
                />
              )}
              estimatedItemSize={50}
            />
          </View>
        </View>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
        <Header
          title={title}
          LeftActionComponent={<DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />}
          safeAreaEdges={[]}
        />
        {children}
      </Screen>
    </DrawerLayout>
  )
}

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
  alignItems: "center",
}

const $pinList: ViewStyle = {
  gap: spacing.small,
}

const $dms: ViewStyle = {
  backgroundColor: colors.palette.cyan400,
  borderRadius: 100,
  width: 50,
  height: 50,
}

const $divider: ViewStyle = {
  width: "50%",
  height: 2,
  backgroundColor: colors.palette.cyan500,
  borderRadius: 2,
  marginVertical: spacing.small,
}

const $channelList: ViewStyle = {
  flex: 1,
}

const $channelItem: ViewStyle = {
  marginBottom: spacing.small,
  paddingHorizontal: 0,
  paddingVertical: 0,
  width: 50,
  height: 50,
  minHeight: 50,
  backgroundColor: "transparent",
  borderWidth: 0,
  alignSelf: "center",
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
  alignSelf: "center",
}
