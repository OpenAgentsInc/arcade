import React, { FC, useContext, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ImageStyle, Platform, Pressable, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Button, TextField, AutoImage } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
import { RelayContext } from "app/components/RelayProvider"
import { useStores } from "app/models"
import { Profile, ProfileManager } from "app/arclib/src/profile"
import { NostrPool } from "app/arclib/src"
import { ImagePlusIcon } from "lucide-react-native"
import { launchImageLibrary } from "react-native-image-picker"
import { PrivateSettings } from "app/utils/profile"

interface EditProfileScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"EditProfile">> {}

export const EditProfileScreen: FC<EditProfileScreenProps> = observer(function EditProfileScreen() {
  const pool: NostrPool = useContext(RelayContext) as NostrPool
  const profmgr = new ProfileManager(pool)

  const formikRef = useRef(null)

  const [picture, setPicture] = useState(null)
  const [loading, setLoading] = useState(false)

  // Pull in one of our MST stores
  const {
    userStore: { metadata, updateMetadata },
  } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const imagePicker = async () => {
    setLoading(true)
    // open image picker
    const result = await launchImageLibrary({ mediaType: "photo", selectionLimit: 1 })

    if (!result.didCancel) {
      const filename = result.assets[0].fileName
      const filetype = result.assets[0].type

      const data: any = new FormData()
      data.append("image", {
        name: filename,
        type: filetype,
        uri:
          Platform.OS === "ios"
            ? result.assets[0].uri.replace("file://", "")
            : result.assets[0].uri,
      })

      const res = await fetch("https://nostrimg.com/api/upload", {
        body: data,
        method: "POST",
        headers: {
          accept: "application/json",
        },
      })

      if (res.ok) {
        const data = await res.json()
        if (typeof data?.imageUrl === "string" && data.success) {
          const url = new URL(data.imageUrl).toString()
          setPicture(url)
          setLoading(false)
        }
      }
    } else {
      setLoading(false)
    }
  }

  const updateSettings = async (data: Profile & PrivateSettings) => {
    try {
      updateMetadata(data, profmgr).then(() => navigation.navigate("Profile"))
    } catch (e) {
      alert(`Failed to save settings: ${e}`)
    }
  }

  // update profile
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Edit profile"
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <Screen
      preset="scroll"
      style={$container}
      KeyboardAvoidingViewProps={{
        behavior: Platform.OS === "ios" ? "padding" : "height",
        keyboardVerticalOffset: 120,
      }}
      keyboardOffset={120}
      keyboardShouldPersistTaps="never"
    >
      <View style={$avatar}>
        <AutoImage
          source={{
            uri: picture || metadata.picture,
          }}
          style={[$image, $avatarImage]}
        />
        {!loading ? (
          <Pressable onPress={() => imagePicker()} style={$avatarButton}>
            <ImagePlusIcon width={20} height={20} color={colors.palette.white} />
          </Pressable>
        ) : (
          <ActivityIndicator
            color={colors.palette.white}
            animating={loading}
            style={$avatarButton}
          />
        )}
      </View>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={{
          display_name: metadata.display_name,
          username: metadata.username,
          nip05: metadata.nip05,
          picture: picture || metadata.picture,
          banner: metadata.banner,
          about: metadata.about,
          privchat_push_enabled: metadata.privchat_push_enabled,
          channel_push_enabled: metadata.channel_push_enabled,
          buyoffer_push_enabled: metadata.channel_push_enabled,
          selloffer_push_enabled: metadata.channel_push_enabled,
        }}
        onSubmit={(values) => updateSettings(values)}
      >
        {({ values, handleChange, handleBlur, submitForm }) => (
          <View>
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
              label="NIP-05"
              style={$input}
              inputWrapperStyle={$inputWrapper}
              onChangeText={handleChange("displayName")}
              onBlur={handleBlur("displayName")}
              value={values.nip05}
              autoCapitalize="none"
              autoFocus={false}
            />
            <TextField
              label="Bio"
              style={$input}
              inputWrapperStyle={$inputWrapper}
              onChangeText={handleChange("about")}
              onBlur={handleBlur("about")}
              value={values.about}
              autoCapitalize="none"
              autoFocus={false}
            />
            <Button text="Update" onPress={() => submitForm()} style={$button} />
          </View>
        )}
      </Formik>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}

const $avatar: ViewStyle = {
  overflow: "hidden",
  alignSelf: "center",
  marginBottom: spacing.large,
  position: "relative",
}

const $image: ImageStyle = {
  width: "100%",
  height: "100%",
  resizeMode: "cover",
}

const $avatarImage: ImageStyle = {
  width: 80,
  height: 80,
  borderRadius: 100,
  borderWidth: 1,
  borderColor: colors.separator,
}

const $avatarButton: ViewStyle = {
  width: 80,
  height: 80,
  borderRadius: 100,
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: colors.palette.overlay80,
  alignItems: "center",
  justifyContent: "center",
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
