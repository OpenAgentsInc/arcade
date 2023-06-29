import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import {
  AutoImage,
  Button,
  Header,
  ListItem,
  RelayContext,
  Screen,
  Text,
  Toggle,
} from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { shortenKey } from "app/utils/shortenKey"
import { useStores } from "app/models"
import { NostrPool } from "app/arclib/src"
import { useContactManager } from "app/utils/useUserContacts"

interface UserScreenProps extends NativeStackScreenProps<AppStackScreenProps<"User">> {}

export const UserScreen: FC<UserScreenProps> = observer(function UserScreen({
  route,
}: {
  route: any
}) {
  // Get route params
  const { id }: { id: string } = route.params
  const pool = useContext(RelayContext) as NostrPool
  const contacts = useContactManager()

  const [profile, setProfile] = useState(null)
  const [followed, setFollowed] = useState(false)
  const [legacy, setLegacy] = useState(true)
  const [secret, setSecret] = useState(false)

  const {
    userStore: { addContact, removeContact },
  } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const toggleFollow = async () => {
    if (followed) {
      removeContact(id, contacts)
      setFollowed(!followed)
    } else {
      addContact({ pubkey: id, legacy, secret }, contacts)
      setFollowed(!followed)
    }
  }

  const togglePrivFollow = async () => {
    await contacts.add({ pubkey: id, legacy, secret: !secret }).catch((e) => console.log(e))
    setSecret(!secret)
  }

  const toggleLegacy = async () => {
    // addContact({ pubkey: id, legacy: !legacy, secret })
    // broadcast to relays
    await contacts.add({ pubkey: id, legacy: !legacy, secret }).catch((e) => console.log(e))
    setLegacy(!legacy)
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
        />
      ),
    })
  }, [])

  useEffect(() => {
    async function fetchProfile() {
      const list = await pool.list([{ kinds: [0], authors: [id] }], true)
      const latest = list.slice(-1)[0]
      if (latest) {
        const content = JSON.parse(latest.content)
        setProfile(content)
      }
      const ctx = contacts.contacts.get(id)
      if (ctx) {
        setFollowed(true)
        setLegacy(ctx.legacy)
        setSecret(ctx.secret)
      }
    }
    fetchProfile().catch(console.error)
  }, [id])

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
              text={profile?.name || profile?.display_name || "No name"}
              style={$userName}
            />
            <Text
              preset="default"
              size="sm"
              text={profile?.nip05 || shortenKey(id)}
              style={$userNip05}
            />
          </View>
          <View style={$userAbout}>
            <Text preset="default" text={profile?.about || "No bio"} />
          </View>
        </View>
        <View style={$buttonGroup}>
          <Button
            text="Message"
            style={$profileButton}
            onPress={() => navigation.navigate("DirectMessage", { id, legacy })}
          />
          <Button
            text={followed ? "Unfollow" : "Follow"}
            onPress={() => toggleFollow()}
            style={$profileButton}
          />
          <View>
            <Button
              text={secret ? "Stop private follow" : "Private follow"}
              onPress={() => togglePrivFollow()}
              style={$profileButton}
            />
            <Text text="Nobody can see your private follow" size="xs" style={$note} />
          </View>
        </View>
        <View style={$section}>
          <Text text="Contact settings" preset="bold" style={$sectionHeading} />
          <View style={$sectionData}>
            <ListItem
              text="Use legacy, unblinded DM's"
              bottomSeparator={true}
              style={$sectionItem}
              containerStyle={$sectionItemContainer}
              RightComponent={
                <Toggle
                  id="legacy"
                  inputOuterStyle={$toggle}
                  inputInnerStyle={$toggleInner}
                  inputDetailStyle={$toggleDetail}
                  variant="switch"
                  value={legacy && !secret}
                  disabled={secret}
                  onPress={toggleLegacy}
                />
              }
            />
          </View>
        </View>
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
}

const $cover: ImageStyle = {
  width: "100%",
  height: 150,
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

const $buttonGroup: ViewStyle = {
  flexDirection: "column",
  gap: spacing.small,
  marginVertical: spacing.medium,
}

const $profileButton: ViewStyle = {
  flex: 1,
  width: "100%",
  backgroundColor: colors.palette.overlay20,
  borderColor: colors.palette.cyan500,
}

const $note: TextStyle = {
  color: colors.palette.cyan500,
  textAlign: "center",
  marginTop: 2,
}

const $toggle: ViewStyle = {
  borderWidth: 1,
  marginTop: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.extraSmall,
  backgroundColor: colors.palette.overlay20,
}

const $toggleInner: ViewStyle = {
  backgroundColor: colors.palette.cyan800,
}

const $toggleDetail: any = {
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.cyan500,
}

const $section: ViewStyle = {
  flexDirection: "column",
  gap: spacing.extraSmall,
  marginTop: spacing.medium,
}

const $sectionHeading: TextStyle = {
  color: colors.palette.cyan600,
}

const $sectionData: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.overlay20,
  marginTop: spacing.tiny,
}

const $sectionItemContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.small,
}

const $sectionItem: ViewStyle = {
  alignItems: "center",
}
