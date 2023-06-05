import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Header, RelayContext, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { EditIcon, LogOutIcon } from "lucide-react-native"
import { shortenKey } from "app/utils/shortenKey"

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
          title="Profile"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <View style={$headerRightActions}>
              <Pressable onPress={() => navigation.navigate("EditProfile")}>
                <EditIcon size={20} color={colors.palette.cyan400} />
              </Pressable>
              <Pressable onPress={() => logout()}>
                <LogOutIcon size={20} color={colors.palette.cyan400} />
              </Pressable>
            </View>
          }
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
        <View>
          <View style={$avatar}>
            <AutoImage
              source={{
                uri: profile?.picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg",
              }}
              style={$image}
            />
          </View>
          <View>
            <View>
              <Text
                preset="bold"
                size="lg"
                text={profile?.display_name || "Loading..."}
                style={$userName}
              />
              <Text
                preset="default"
                size="sm"
                text={profile?.nip05 || shortenKey(userStore.pubkey)}
                style={$userNip05}
              />
            </View>
            <View style={$userAbout}>
              <Text preset="default" text={profile?.about || "No bio"} />
            </View>
          </View>
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $headerRightActions: ViewStyle = {
  flexDirection: "row",
  gap: spacing.medium,
  paddingRight: spacing.medium,
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

const $avatar: ViewStyle = {
  width: 80,
  height: 80,
  borderRadius: 100,
  borderWidth: 2,
  borderColor: "#000",
  marginTop: -40,
  overflow: "hidden",
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

const $userAbout: ViewStyle = {
  marginTop: spacing.small,
}
