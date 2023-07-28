import React, { FC, useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ImageStyle,
  Linking,
  Platform,
  Pressable,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import * as Clipboard from "expo-clipboard"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, ListItem, RelayContext, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { nip19 } from "nostr-tools"
import { useStores } from "app/models"
import { shortenKey } from "app/utils/shortenKey"
import { AxeIcon, EditIcon } from "lucide-react-native"
import { TouchablePopupHandler } from "app/components/BlurredPopup"

interface ProfileScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Profile">> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  const [npubCopied, setNpubCopied] = useState(false)

  const { pool, contactManager, channelManager } = useContext(RelayContext)
  const {
    userStore: { pubkey, metadata, logout },
  } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const copyNpub = async () => {
    await Clipboard.setStringAsync(nip19.npubEncode(pubkey))
    setNpubCopied(true)
    setTimeout(() => setNpubCopied(false), 500)
  }

  return (
    <Screen style={$root} preset="scroll">
      <View style={$cover}>
        <AutoImage
          source={{
            uri: metadata?.banner || "https://void.cat/d/2qK2KYMPHMjMD9gcG6NZcV.jpg",
          }}
          style={$image}
        />
      </View>
      <View style={$container}>
        <View style={$heading}>
          <View style={$avatar}>
            <AutoImage
              source={{
                uri: metadata?.picture,
              }}
              style={[$image, $avatarImage]}
            />
          </View>
          <Text
            preset="bold"
            size="lg"
            text={metadata?.display_name || metadata?.username || "No name"}
            style={$userName}
          />

          <TouchableOpacity onPress={async () => copyNpub()}>
            <Text size="sm" text={npubCopied ? "Copied" : shortenKey(pubkey)} style={$userNip05} />
          </TouchableOpacity>
        </View>
        <View style={$sections}>
          <View>
            <View style={$sectionHeadingButton}>
              <Text text="Account" preset="bold" style={$sectionHeading} />

              <TouchablePopupHandler
                options={[
                  {
                    label: "Edit Profile",
                    onPress: () => navigation.navigate("EditProfile"),
                    trailing: (
                      <EditIcon width={20} height={20} color={colors.palette.almostBlack} />
                    ),
                  },
                  {
                    label: "Just a demo",
                    trailing: <AxeIcon width={20} height={20} color={colors.palette.almostBlack} />,
                  },
                ]}
                onPress={() => {
                  navigation.navigate("EditProfile")
                }}
                highlightedChildren={
                  <EditIcon width={24} height={24} color={colors.palette.white} />
                }
              >
                <EditIcon width={24} height={24} color={colors.palette.cyan500} />
              </TouchablePopupHandler>
            </View>
            <View style={$sectionData}>
              <Pressable
                onPress={() => navigation.navigate("EditProfile")}
                style={$sectionDataItem}
              >
                <Text text={metadata?.username || "No username"} />
                <Text text="Username" size="xs" style={$sectionDataItemSubtitle} />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("EditProfile")}
                style={$sectionDataItem}
              >
                <Text text={metadata?.nip05 || "No nip-05"} />
                <Text text="NIP-05" size="xs" style={$sectionDataItemSubtitle} />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("EditProfile")}
                style={$sectionDataItem}
              >
                <Text text="About" size="xs" style={$sectionDataItemSubtitle} />
                <Text text={metadata?.about || "No about"} />
              </Pressable>
            </View>
          </View>
          <View>
            <Text text="Settings" preset="bold" style={$sectionHeading} />
            <View style={$sectionData}>
              <ListItem
                text="Manage Relays"
                leftIcon="Boxes"
                leftIconColor={colors.palette.cyan500}
                bottomSeparator={true}
                style={$sectionButton}
                onPress={() => navigation.navigate("RelayManager")}
              />
              {Platform.OS !== "ios" && (
                <ListItem
                  text="Notifications"
                  leftIcon="Bell"
                  leftIconColor={colors.palette.cyan500}
                  bottomSeparator={true}
                  style={$sectionButton}
                  onPress={() => navigation.navigate("NotificationSetting")}
                />
              )}

              <ListItem
                text="Privacy"
                leftIcon="EyeOff"
                leftIconColor={colors.palette.cyan500}
                bottomSeparator={true}
                style={$sectionButton}
                onPress={() => navigation.navigate("PrivacySetting")}
              />
              <ListItem
                text="Backup"
                leftIcon="Shield"
                leftIconColor={colors.palette.cyan500}
                onPress={() => navigation.navigate("Backup")}
                bottomSeparator={true}
                style={$sectionButton}
              />
            </View>
          </View>
          <View>
            <Text text="Resources" preset="bold" style={$sectionHeading} />
            <View style={$sectionData}>
              <ListItem
                text="Changelog"
                leftIcon="List"
                leftIconColor={colors.palette.cyan500}
                bottomSeparator={true}
                style={$sectionButton}
                onPress={() => navigation.navigate("Changelog")}
              />
              <ListItem
                text="Twitter"
                leftIcon="Twitter"
                leftIconColor={colors.palette.cyan500}
                bottomSeparator={true}
                style={$sectionButton}
                onPress={() => Linking.openURL("https://twitter.com/TheArcadeApp")}
              />
              <ListItem
                text="GitHub"
                leftIcon="Github"
                leftIconColor={colors.palette.cyan500}
                bottomSeparator={true}
                style={$sectionButton}
                onPress={() => Linking.openURL("https://github.com/ArcadeLabsInc/arcade")}
              />
            </View>
          </View>
        </View>
        <Button
          text="Logout"
          onPress={() => logout(pool, contactManager, channelManager)}
          style={$mainButton}
          pressedStyle={$mainButton}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  height: "100%",
  paddingHorizontal: spacing.medium,
  paddingBottom: 160,
}

const $cover: ImageStyle = {
  width: "100%",
  height: 200,
  resizeMode: "cover",
  borderBottomWidth: 1,
  borderColor: colors.separator,
}

const $heading: ViewStyle = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

const $avatar: ViewStyle = {
  marginTop: -40,
  overflow: "hidden",
  alignSelf: "center",
}

const $image: ImageStyle = {
  width: "100%",
  height: "100%",
  resizeMode: "cover",
  backgroundColor: colors.palette.overlay20,
}

const $avatarImage: ImageStyle = {
  borderWidth: 1,
  borderColor: colors.separator,
  backgroundColor: colors.palette.overlay50,
  width: 80,
  height: 80,
  borderRadius: 80,
}

const $userName: TextStyle = {
  color: colors.palette.cyan400,
}

const $userNip05: TextStyle = {
  lineHeight: 18,
  color: colors.palette.cyan600,
}

const $sections: ViewStyle = {
  flexDirection: "column",
  gap: spacing.medium,
  marginTop: spacing.extraLarge,
}

const $sectionHeading: TextStyle = {
  color: colors.palette.cyan600,
  marginVertical: 3,
}

const $sectionHeadingButton: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $sectionData: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.cyan900, // colors.palette.cyan500,
  borderRadius: spacing.tiny,
  // backgroundColor: colors.palette.overlay20,
  marginTop: spacing.tiny,
}

const $sectionDataItem: ViewStyle = {
  paddingHorizontal: spacing.small,
  paddingVertical: spacing.small,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.cyan900, // cyan800,
}

const $sectionDataItemSubtitle: TextStyle = {
  color: colors.palette.cyan600,
}

const $sectionButton: ViewStyle = {
  paddingHorizontal: spacing.small,
  backgroundColor: colors.palette.overlay20,
}

const $mainButton: ViewStyle = {
  backgroundColor: "rgba(0,0,0,0.5)",
  borderColor: colors.palette.cyan900,
  marginTop: spacing.large,
}
