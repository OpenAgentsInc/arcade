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
import { CompassIcon, HomeIcon, PlusIcon } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"

interface ScreenWithSidebarProps {
  title: string
  children: React.ReactNode
}

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
            <Button
              onPress={() => navigate("Home")}
              style={$pinItem}
              LeftAccessory={() => <HomeIcon color="#fff" />}
            />
            <Button
              onPress={() => navigate("Discover")}
              style={$pinItem}
              LeftAccessory={() => <CompassIcon color="#fff" />}
            />
          </View>
          <View style={$divider} />
          <View style={$channelList}>
            <FlashList
              data={DEFAULT_CHANNELS}
              renderItem={({ item }) => (
                <Button
                  onPress={() => navigate("Chat", { id: item.id, name: item.name })}
                  style={$channelItem}
                  LeftAccessory={() => (
                    <AutoImage
                      source={{
                        uri: item.picture,
                      }}
                      style={$channelImage}
                    />
                  )}
                />
              )}
              ListFooterComponent={() => (
                <Button
                  onPress={() => navigate("CreateChannel")}
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

const $pinItem: ViewStyle = {
  backgroundColor: colors.palette.cyan400,
  borderWidth: 0,
  borderRadius: 100,
  width: 50,
  height: 50,
  minHeight: 50,
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
  backgroundColor: colors.palette.cyan900,
  borderWidth: 0,
  borderRadius: 100,
  width: 50,
  height: 50,
  minHeight: 50,
  alignSelf: "center",
}
