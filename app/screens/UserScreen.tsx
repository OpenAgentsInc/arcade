import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Header, RelayContext, Screen, Text, Toggle } from "app/components"
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
      // update mst store
      removeContact(id, contacts)
      // broadcast to relays
      await contacts.remove(id)
      setFollowed(!followed)
    } else {
      // update mst store
      addContact({ pubkey: id, legacy, secret }, contacts)
      // broadcast to relays
      await contacts.add({ pubkey: id, legacy, secret }).catch((e) => console.log(e))
      setFollowed(!followed)
    }
  }

  const toggleLegacy = async () => {
    // addContact({ pubkey: id, legacy: !legacy, secret })
    // broadcast to relays
    await contacts.add({ pubkey: id, legacy: !legacy, secret }).catch((e) => console.log(e))
    setLegacy(!legacy)
  }

  const toggleSecret = async () => {
    // addContact({ pubkey: id, legacy, secret: !secret })
    await contacts.add({ pubkey: id, legacy, secret: !secret }).catch((e) => console.log(e))
    setSecret(!secret)
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
      } else {
        console.log("relay return nothing")
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
              text={profile?.display_name || "Loading..."}
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
        </View>
        <View>
          <Toggle
            id="legacy"
            variant="checkbox"
            label="Use legacy, unblinded DM's"
            inputOuterStyle={secret ? $toggleDisabled : $toggle}
            inputInnerStyle={$toggleInner}
            inputDetailStyle={$toggleDetail}
            value={legacy && !secret}
            disabled={secret}
            onPress={toggleLegacy}
          />
          <Toggle
            id="secret"
            variant="checkbox"
            label="Hide this contact (private follow)"
            inputOuterStyle={$toggle}
            inputInnerStyle={$toggleInner}
            inputDetailStyle={$toggleDetail}
            value={secret}
            onPress={toggleSecret}
          />
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

const $buttonGroup: ViewStyle = {
  flexDirection: "row",
  gap: spacing.small,
  marginVertical: spacing.medium,
}

const $profileButton: ViewStyle = {
  flex: 1,
  width: "100%",
  backgroundColor: "transparent",
  borderColor: colors.palette.cyan500,
}

const $toggle: ViewStyle = {
  borderWidth: 1,
  marginTop: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.extraSmall,
  backgroundColor: colors.palette.overlay20,
}

const $toggleDisabled: ViewStyle = {
  ...$toggle,
  backgroundColor: colors.palette.cyan800,
}

const $toggleInner: ViewStyle = {
  backgroundColor: colors.palette.cyan800,
}

const $toggleDetail: any = {
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.cyan500,
}
