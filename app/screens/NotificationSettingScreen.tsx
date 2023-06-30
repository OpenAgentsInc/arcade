import React, { FC, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Header, ListItem, RelayContext, Screen, Text, Toggle } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { NostrPool } from "app/arclib/src"
import { ProfileManager, Profile } from "app/arclib/src/profile"
import { useStores } from "app/models"
import { Formik } from "formik"
import { registerForPushNotifications } from "app/utils/notification"

interface NotificationSettingScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"NotificationSetting">> {}

// good to have a few non-arcade backups
const ARCADE_RELAYS = [
  "wss://relay.arcade.city",
  "wss://arc1.arcadelabs.co",
  "wss://relay.damus.io",
  "wss://nos.lol",
]

const ARCADE_PUBKEY = "c4899d1312a7ccf42cc4bfd0559826d20f7564293de4588cb8b089a574d71757"

export const NotificationSettingScreen: FC<NotificationSettingScreenProps> = observer(
  function NotificationSettingScreen() {
    const pool: NostrPool = useContext(RelayContext) as NostrPool
    const profmgr = new ProfileManager(pool)

    const formikRef = useRef(null)
    const [profile, setProfile] = useState(null)

    // Pull in one of our MST stores
    const { userStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation<any>()

    const updateSettings = async (data: PrivateSettings) => {
      try {
        await updateProfile(profmgr, { ...profile, ...data })

        console.log("updated notification settings")
        // navigate back
        navigation.goBack()
      } catch (e) {
        alert(`Failed to save settings: ${e}`)
      }
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Notifications"
            titleStyle={{ color: colors.palette.white }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    useEffect(() => {
      async function fetchProfile() {
        const content = await profmgr.load()
        if (content) {
          setProfile(content)
        } else {
          console.log("user profile not found", userStore.pubkey)
        }
      }

      fetchProfile().catch(console.error)
    }, [userStore.pubkey])

    return (
      <Screen contentContainerStyle={$root} preset="scroll">
        <Formik
          innerRef={formikRef}
          enableReinitialize={true}
          initialValues={{
            privchat_push_enabled: profile?.privchat_push_enabled || false,
            channel_push_enabled: profile?.channel_push_enabled || false,
            buyoffer_push_enabled: profile?.buyoffer_push_enabled || false,
            selloffer_push_enabled: profile?.selloffer_push_enabled || false,
          }}
          onSubmit={(values) => updateSettings(values)}
        >
          {({ values, setFieldValue, submitForm }) => (
            <View style={$sections}>
              <View>
                <Text text="Notifications for chats" preset="bold" style={$sectionHeading} />
                <View style={$sectionData}>
                  <ListItem
                    text="Private Chats"
                    bottomSeparator={true}
                    style={$sectionItem}
                    containerStyle={$sectionItemContainer}
                    RightComponent={
                      <Toggle
                        inputOuterStyle={$toggle}
                        inputInnerStyle={$toggleInner}
                        variant="switch"
                        onPress={() =>
                          setFieldValue("privchat_push_enabled", !values.privchat_push_enabled)
                        }
                        value={values.privchat_push_enabled}
                      />
                    }
                  />
                  <ListItem
                    text="Channels"
                    bottomSeparator={true}
                    style={$sectionItem}
                    containerStyle={$sectionItemContainer}
                    RightComponent={
                      <Toggle
                        inputOuterStyle={$toggle}
                        inputInnerStyle={$toggleInner}
                        variant="switch"
                        onPress={() =>
                          setFieldValue("channel_push_enabled", !values.channel_push_enabled)
                        }
                        value={values.channel_push_enabled}
                      />
                    }
                  />
                </View>
              </View>
              <View>
                <Button text="Update" onPress={() => submitForm()} style={$button} />
              </View>
            </View>
          )}
        </Formik>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}

const $sections: ViewStyle = {
  flexDirection: "column",
  gap: spacing.medium,
  marginTop: spacing.extraLarge,
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

const $toggle: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.extraSmall,
  backgroundColor: colors.palette.overlay20,
}

const $toggleInner: ViewStyle = {
  backgroundColor: colors.palette.cyan800,
}

const $button: ViewStyle = {
  backgroundColor: colors.palette.cyan500,
  borderWidth: 0,
  width: "100%",
  marginTop: spacing.small,
  marginBottom: spacing.small,
  height: 50,
  minHeight: 50,
}

export type PrivateSettings = {
  privchat_push_enabled: boolean
  channel_push_enabled: boolean
  buyoffer_push_enabled: boolean
  selloffer_push_enabled: boolean
}

export async function updateProfile(profmgr: ProfileManager, profile: Profile & PrivateSettings) {
  // save public and private settings
  await profmgr.save(profile, [
    "privchat_push_enabled",
    "channel_push_enabled",
    "buyoffer_push_enabled",
    "selloffer_push_enabled",
  ])

  // update arcade push notification settings
  if (
    profile.privchat_push_enabled ||
    profile.channel_push_enabled ||
    profile.buyoffer_push_enabled ||
    profile.selloffer_push_enabled
  ) {
    const pool = profmgr.pool
    const token = await registerForPushNotifications()

    const pushSettings = {
      pubkey: pool.ident.pubKey,
      token,
      privchat_push_enabled: profile.privchat_push_enabled,
      channel_push_enabled: profile.channel_push_enabled,
      buyoffer_push_enabled: profile.buyoffer_push_enabled,
      selloffer_push_enabled: profile.selloffer_push_enabled,
    }

    const tmpPool = new NostrPool(pool.ident)
    await tmpPool.setRelays(ARCADE_RELAYS)

    // change to nip44 once that merges
    const content = await pool.ident.nip04XEncrypt(
      pool.ident.privKey,
      ARCADE_PUBKEY,
      JSON.stringify(pushSettings),
    )

    // use replceable event
    await tmpPool.send({
      kind: 30199,
      content,
      tags: [
        ["d", "arcade-push"],
        ["p", ARCADE_PUBKEY],
      ],
    })

    // close tmp pool
    tmpPool.close()
  }
}
