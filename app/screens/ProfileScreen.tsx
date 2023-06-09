import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, Pressable, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import * as Clipboard from 'expo-clipboard';
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Header, ListItem, RelayContext, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { shortenKey } from "app/utils/shortenKey"
import { EditIcon } from "lucide-react-native"

interface ProfileScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Profile">> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  const pool: any = useContext(RelayContext)
  const [profile, setProfile] = useState(null)

  // Pull in one of our MST stores
  const { userStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const logout = () => {
    // clear user store
    userStore.logout()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          backgroundColor="transparent"
          onLeftPress={() => navigation.goBack()}
          containerStyle={$header}
        />
      ),
    })
  }, [])

  useEffect(() => {
    async function fetchProfile() {
      // fetch user profile
      const list = await pool.list([{ kinds: [0], authors: [userStore.pubkey] }], true)
      const latest = list.slice(-1)[0]
      if (latest) {
        const content = JSON.parse(latest.content)
        setProfile(content)
      } else {
        alert("relay return nothing")
      }
    }
    fetchProfile().catch(console.error)
  }, [userStore.pubkey])

  return (
    <Screen style={$root} preset="scroll">
      <View style={$cover}>
        <AutoImage
          source={{
            uri: profile?.banner || "https://void.cat/d/2qK2KYMPHMjMD9gcG6NZcV.jpg",
          }}
          style={$image}
        />
      </View>
      <View style={$container}>
        <View style={$heading}>
          <View style={$avatar}>
            <AutoImage
              source={{
                uri: profile?.picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg",
              }}
              style={$image}
            />
          </View>
          <Text
            preset="bold"
            size="lg"
            text={profile?.display_name || "Loading..."}
            style={$userName}
          />
          <TouchableOpacity onPress={async () => await Clipboard.setStringAsync(userStore.pubkey)}>
          <Text size="sm" text={shortenKey(userStore.pubkey)} style={$userNip05} />
          </TouchableOpacity>
        </View>
        <View style={$sections}>
          <View>
            <View style={$sectionHeadingButton}>
              <Text text="Account" preset="bold" style={$sectionHeading} />
              <Pressable onPress={() => navigation.navigate("EditProfile")}>
                <EditIcon width={20} height={20} color={colors.palette.cyan500} />
              </Pressable>
            </View>
            <View style={$sectionData}>
              <View style={$sectionDataItem}>
                <Text text={profile?.username || "No username"} />
                <Text text="Username" size="xs" style={$sectionDataItemSubtitle} />
              </View>
              <View style={$sectionDataItem}>
                <Text text={profile?.nip05 || "No NIP-05"} />
                <Text text="NIP-05" size="xs" style={$sectionDataItemSubtitle} />
              </View>
              <View style={$sectionDataItem}>
                <Text text="Bio" size="xs" style={$sectionDataItemSubtitle} />
                <Text text={profile?.about || profile?.bio || "No bio"} />
              </View>
            </View>
          </View>
          <View>
            <Text text="Settings" preset="bold" style={$sectionHeading} />
            <View style={$sectionData}>
              <ListItem
                text="Relay management"
                leftIcon="Boxes"
                leftIconColor={colors.palette.cyan500}
                bottomSeparator={true}
                style={$sectionButton}
                onPress={() => navigation.navigate("RelayManager")}
              />
              <ListItem
                text="Notifications"
                leftIcon="Bell"
                leftIconColor={colors.palette.cyan500}
                bottomSeparator={true}
                style={$sectionButton}
                onPress={() => navigation.navigate("NotificationSetting")}
              />
              <ListItem
                text="Data and Storage"
                leftIcon="HardDrive"
                leftIconColor={colors.palette.cyan500}
                bottomSeparator={true}
                style={$sectionButton}
              />
              <ListItem
                text="Backup and Security"
                leftIcon="Shield"
                leftIconColor={colors.palette.cyan500}
                style={$sectionButton}
              />
            </View>
          </View>
          <View>
            <Text text="Others" preset="bold" style={$sectionHeading} />
            <View style={$sectionData}>
              <ListItem
                text="Arcade FAQ"
                leftIcon="Boxes"
                leftIconColor={colors.palette.cyan500}
                bottomSeparator={true}
                style={$sectionButton}
              />
              <ListItem
                text="Github"
                leftIcon="Bell"
                leftIconColor={colors.palette.cyan500}
                bottomSeparator={true}
                style={$sectionButton}
              />
            </View>
          </View>
        </View>
        <Button
          text="Logout"
          onPress={() => logout()}
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

const $header: ViewStyle = {
  backgroundColor: "transparent",
  position: "absolute",
  top: 0,
  left: 0,
}

const $container: ViewStyle = {
  height: "100%",
  paddingHorizontal: spacing.medium,
}

const $cover: ImageStyle = {
  width: "100%",
  height: 200,
  resizeMode: "cover",
}

const $heading: ViewStyle = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

const $avatar: ViewStyle = {
  width: 80,
  height: 80,
  borderRadius: 100,
  borderWidth: 2,
  borderColor: "#000",
  marginTop: -40,
  overflow: "hidden",
  alignSelf: "center",
}

const $image: ImageStyle = {
  width: "100%",
  height: "100%",
  resizeMode: "cover",
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
}

const $sectionHeadingButton: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $sectionData: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.overlay20,
  marginTop: spacing.tiny,
}

const $sectionDataItem: ViewStyle = {
  paddingHorizontal: spacing.small,
  paddingVertical: spacing.small,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.cyan800,
}

const $sectionDataItemSubtitle: TextStyle = {
  color: colors.palette.cyan600,
}

const $sectionButton: ViewStyle = {
  paddingHorizontal: spacing.small,
}

const $mainButton: ViewStyle = {
  backgroundColor: "rgba(0,0,0,0.5)",
  borderColor: colors.palette.cyan900,
  marginTop: spacing.large,
}
