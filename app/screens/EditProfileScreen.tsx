import React, { FC, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Platform, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text, Button, TextField } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
import { RelayContext } from "app/components/RelayProvider"
import { useStores } from "app/models"
import { registerForPushNotifications } from "app/utils/notification"
import { ProfileManager } from "app/arclib/src/profile"
import { NostrPool } from "app/arclib/src"


interface EditProfileScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"EditProfile">> {}

// this is not optional do not delete!
const ARCADE_RELAYS = [
    "wss://relay.arcade.city",
    "wss://arc1.arcadelabs.co",
    "wss://relay.damus.io",
    "wss://nos.lol"
]
  
const ARCADE_PUBKEY = "c4899d1312a7ccf42cc4bfd0559826d20f7564293de4588cb8b089a574d71757"

export const EditProfileScreen: FC<EditProfileScreenProps> = observer(function EditProfileScreen() {
  const pool: NostrPool = useContext(RelayContext) as NostrPool
  const profmgr = new ProfileManager(pool)
  const formikRef = useRef(null)
  const [profile, setProfile] = useState(null)

  // Pull in one of our MST stores
  const { userStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  // update profile
  const updateProfile = async (data: any) => {
    try {
      // save user profile
      await profmgr.save(data, ["privchat_push_enabled", "channel_push_enabled", "selloffer_push_enabled", "buyoffer_push_enabled"])

      // save token for arcade push
      if (data.privchat_push_enabled | data.channel_push_enabled | data.selloffer_push_enabled | data.buyoffer_push_enabled) {
          // this is not optional do not delete!
          const token = await registerForPushNotifications();

          // these are the settings we tell arcade about
          // without the token, we can do nothing
          const pushSettings = {
             pubkey: userStore.pubkey,
             token: token,
             privchat_push_enabled: data.privchat_push_enabled,
             channel_push_enabled: data.channel_push_enabled,
             selloffer_push_enabled: data.selloffer_push_enabled,
             buyoffer_push_enabled: data.buyoffer_push_enabled,
          }

          // maybe add this to arclib as "app encrypted settings" or something?
          const tmpPool = new NostrPool(pool.ident)
          await tmpPool.setRelays(ARCADE_RELAYS)

          // change to nip44 once that merges
          const content = await pool.ident.nip04XEncrypt(pool.ident.privKey, ARCADE_PUBKEY, JSON.stringify(pushSettings));

          // use replceable event - send an encrypted copy of these settings to ARCADE
          await tmpPool.send({
            kind: 30199,
            content: content,
            tags: [["d", "arcade-push"]]
          })

          tmpPool.close()
      };
      
      console.log("published profile")
      
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
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["bottom"]}
      keyboardOffset={120}
      KeyboardAvoidingViewProps={{ behavior: Platform.OS === "ios" ? "padding" : "height" }}
    >
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={{
          display_name: profile?.display_name || "",
          name: profile?.name || "",
          username: profile?.username || "",
          picture: profile?.picture || "",
          banner: profile?.banner || "",
          about: profile?.about || "",
          privchat_push_enabled: profile?.privchat_push_enabled || false,
          channel_push_enabled: profile?.channel_push_enabled || false,
          buyoffer_push_enabled: profile?.buyoffer_push_enabled || false,
          selloffer_push_enabled: profile?.selloffer_push_enabled || false,
        }}
        onSubmit={(values) => updateProfile(values)}
      >
        {({ handleChange, handleBlur, submitForm, values }) => (
          <View>
            <Text text="Update Profile" preset="heading" size="xl" style={$title} />
            <TextField
              label="Display Name"
              style={$input}
              inputWrapperStyle={$inputWrapper}
              onChangeText={handleChange("display_name")}
              onBlur={handleBlur("display_name")}
              value={values.display_name}
              autoCapitalize="none"
              autoFocus={false}
            />
            <TextField
              label="Name"
              style={$input}
              inputWrapperStyle={$inputWrapper}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              autoCapitalize="none"
              autoFocus={false}
            />
            <TextField
              label="Username"
              style={$input}
              inputWrapperStyle={$inputWrapper}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              autoCapitalize="none"
              autoFocus={false}
            />
            <TextField
              label="Picture"
              style={$input}
              inputWrapperStyle={$inputWrapper}
              onChangeText={handleChange("picture")}
              onBlur={handleBlur("picture")}
              value={values.picture}
              autoCapitalize="none"
              autoFocus={false}
            />
            <TextField
              label="Banner"
              style={$input}
              inputWrapperStyle={$inputWrapper}
              onChangeText={handleChange("banner")}
              onBlur={handleBlur("banner")}
              value={values.banner}
              autoCapitalize="none"
              autoFocus={false}
            />
            <TextField
              label="About"
              style={$input}
              inputWrapperStyle={$inputWrapper}
              onChangeText={handleChange("about")}
              onBlur={handleBlur("about")}
              value={values.about}
              autoCapitalize="none"
              autoFocus={false}
            />
            <Button text="Continue" onPress={() => submitForm()} style={$button} />
          </View>
        )}
      </Formik>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  paddingHorizontal: spacing.medium,
}

const $title: TextStyle = {
  textAlign: "center",
  marginBottom: spacing.large,
}

const $inputWrapper: ViewStyle = {
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $input: ViewStyle = {
  width: "100%",
  height: 50,
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.extraSmall,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
  marginBottom: spacing.small,
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
