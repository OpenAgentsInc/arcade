import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Header, RelayContext, Screen, Text, ContactItem } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { EditIcon, LogOutIcon } from "lucide-react-native"
import { FlashList } from "@shopify/flash-list"

interface ProfileScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Profile">> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  const pool: any = useContext(RelayContext)
  const [profile, setProfile] = useState(null)

  // Pull in one of our MST stores
  const { userStore, channelStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const logout = () => {
    // clear user store
    userStore.logout()
    // clear channel store
    channelStore.reset()
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
      if (list.length > 0) {
        const content = JSON.parse(list[0].content)
        setProfile(content)
      } else {
        alert("relay return nothing")
      }
      // fetch user contact list
      userStore.fetchContacts(pool)
    }
    fetchProfile().catch(console.error)
  }, [userStore.pubkey])

  return (
    <Screen style={$root} preset="scroll">
      <View style={$cover}>
        <AutoImage
          source={{
            uri:
              profile?.banner ||
              "https://pbs.twimg.com/profile_banners/1216165042472620034/1670567469/1500x500",
          }}
          style={$image}
        />
      </View>
      <View style={$container}>
        <View>
          <View style={$avatar}>
            <AutoImage
              source={{
                uri: profile?.picture || "https://void.cat/d/KmypFh2fBdYCEvyJrPiN89.webp",
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
                text={profile?.nip05 || "Loading..."}
                style={$userNip05}
              />
            </View>
            <View style={$userAbout}>
              <Text preset="default" text={profile?.about || "Loading..."} />
            </View>
          </View>
        </View>
        <View style={$contacts}>
          <Text text="Contacts" size="lg" preset="bold" />
          <FlashList
            data={userStore.contacts.slice()}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <ContactItem pubkey={item} />}
            ListEmptyComponent={
              <View style={$emptyState}>
                <Text text="No contact..." />
              </View>
            }
            estimatedItemSize={50}
          />
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

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}

const $contacts: ViewStyle = {
  marginTop: spacing.large,
}
