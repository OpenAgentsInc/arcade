import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  Platform,
  View,
  ViewStyle,
  SectionList,
  TextStyle,
} from "react-native"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import { useSharedValue, withTiming } from "react-native-reanimated"
import { ListItem, Screen, Text } from "./"
import { isRTL } from "../i18n"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { DrawerIconButton } from "./DrawerIconButton"

const logo = require("../../assets/images/logo.png")

interface SidebarItem {
  name: string
  items: string[]
}

interface ScreenWithSidebarProps {
  sidebarItems: SidebarItem[]
  content: Array<{ name: string; description: string; data: ReactElement[] }>
}

export const ScreenWithSidebar: FC<ScreenWithSidebarProps> = ({ sidebarItems, content }) => {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<DrawerLayout>()
  const listRef = useRef<SectionList>()
  const progress = useSharedValue(0)

  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
      drawerRef.current?.openDrawer({ speed: 2 })
    } else {
      setOpen(false)
      drawerRef.current?.closeDrawer({ speed: 2 })
    }
  }

  const handleScroll = (sectionIndex: number, itemIndex = 0) => {
    listRef.current.scrollToLocation({
      animated: true,
      itemIndex,
      sectionIndex,
    })
    toggleDrawer()
  }

  const $drawerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={Platform.select({ default: 326, web: Dimensions.get("window").width * 0.3 })}
      drawerType={"slide"}
      drawerPosition={isRTL ? "right" : "left"}
      overlayColor={open ? colors.palette.overlay20 : "transparent"}
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
          <View style={$logoContainer}>
            <Image source={logo} style={$logoImage} />
          </View>

          <FlatList
            contentContainerStyle={$flatListContentContainer}
            data={sidebarItems}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index: sectionIndex }) => (
              <View>
                <Text
                  onPress={() => handleScroll(sectionIndex)}
                  preset="bold"
                  style={$menuContainer}
                >
                  {item.name}
                </Text>
                {item.items.map((u, index) => (
                  <ListItem
                    key={`section${sectionIndex}-${u}`}
                    onPress={() => handleScroll(sectionIndex, index + 1)}
                    text={u}
                    rightIcon={isRTL ? "caretLeft" : "caretRight"}
                  />
                ))}
              </View>
            )}
          />
        </View>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
        <DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />

        <SectionList
          ref={listRef}
          contentContainerStyle={$sectionListContentContainer}
          stickySectionHeadersEnabled={false}
          sections={content}
          renderItem={({ item }) => item}
          renderSectionFooter={() => <View style={$demoUseCasesSpacer} />}
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="subheading" text="Placeholder" />
            </View>
          }
          renderSectionHeader={({ section }) => {
            return (
              <View>
                <Text preset="subheading" style={$demoItemName}>
                  {section.name}
                </Text>
                <Text style={$demoItemDescription}>{section.description}</Text>
              </View>
            )
          }}
        />
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
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $sectionListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $heading: ViewStyle = {
  marginBottom: spacing.massive,
}

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
  paddingHorizontal: spacing.large,
}

const $menuContainer: ViewStyle = {
  paddingBottom: spacing.extraSmall,
  paddingTop: spacing.large,
}

const $demoItemName: TextStyle = {
  fontSize: 24,
  marginBottom: spacing.medium,
}

const $demoItemDescription: TextStyle = {
  marginBottom: spacing.huge,
}

const $demoUseCasesSpacer: ViewStyle = {
  paddingBottom: spacing.huge,
}
