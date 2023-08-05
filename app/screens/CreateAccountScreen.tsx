import React, { FC, useContext, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  ImageStyle,
  Platform,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, TextField, Button, AutoImage, Text, RelayContext } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { Formik } from "formik"
import { launchImageLibrary } from "react-native-image-picker"
import { ImagePlusIcon } from "lucide-react-native"

interface CreateAccountScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"CreateAccount">> {}

interface ISignup {
  displayName: string
  username: string
  about: string
}

export const CreateAccountScreen: FC<CreateAccountScreenProps> = observer(
  function CreateAccountScreen() {
    const formikRef = useRef(null)

    const [loading, setLoading] = useState(false)
    const [picture, setPicture] = useState("https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg")
    const [pickerLoading, setPickerLoading] = useState(false)

    const { pool, channelManager } = useContext(RelayContext)
    const { userStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()

    const imagePicker = async () => {
      setPickerLoading(true)
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
            setPickerLoading(false)
          }
        }
      } else {
        setPickerLoading(false)
      }
    }

    const signup = async (data: ISignup) => {
      if (!data.username) {
        alert("Username is required")
      } else if (!/^[0-9a-zA-Z_.-]+$/.test(data.username)) {
        alert("Username is invalid, please check again")
      } else {
        setLoading(true)
        await userStore
          .signup(pool, channelManager, picture, data.username, data.displayName, data.about)
          .catch((e) => {
            alert(e)
            setLoading(false)
          })
      }
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Create account"
            titleStyle={{ color: colors.palette.white }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    return (
      <Screen
        style={$root}
        safeAreaEdges={["bottom"]}
        preset="scroll"
        contentContainerStyle={$container}
      >
        <View style={$avatar}>
          <AutoImage
            source={{
              uri: picture,
            }}
            style={[$image, $avatarImage]}
          />
          {!pickerLoading ? (
            <Pressable onPress={() => imagePicker()} style={$avatarButton}>
              <ImagePlusIcon width={20} height={20} color={colors.palette.white} />
            </Pressable>
          ) : (
            <ActivityIndicator
              color={colors.palette.white}
              animating={pickerLoading}
              style={$avatarButton}
            />
          )}
        </View>
        <Formik
          innerRef={formikRef}
          initialValues={{
            displayName: "",
            username: "",
            about: "",
          }}
          onSubmit={(values) => signup(values)}
        >
          {({ handleChange, handleBlur, submitForm, values }) => (
            <>
              <View style={$inputGroup}>
                <TextField
                  label="Username *"
                  style={[$input, $username]}
                  inputWrapperStyle={$inputWrapper}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  autoCapitalize="none"
                  autoFocus={true}
                />
                <Text text="@arcade.chat" style={$nip05} />
              </View>
              <TextField
                label="Display Name"
                style={$input}
                inputWrapperStyle={$inputWrapper}
                onChangeText={handleChange("displayName")}
                onBlur={handleBlur("displayName")}
                value={values.displayName}
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
              <View style={$formButtonGroup}>
                {loading ? (
                  <ActivityIndicator color={colors.palette.cyan500} animating={loading} />
                ) : (
                  <Button
                    text="Continue"
                    onPress={() => submitForm()}
                    style={$button}
                    pressedStyle={$button}
                  />
                )}
              </View>
            </>
          )}
        </Formik>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
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

const $inputGroup: ViewStyle = {
  position: "relative",
}

const $nip05: TextStyle = {
  position: "absolute",
  top: 44,
  right: spacing.medium,
  color: colors.palette.cyan500,
}

const $username: ViewStyle = {
  paddingRight: 140,
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
  backgroundColor: "transparent",
  borderColor: colors.palette.cyan900,
  width: "100%",
  marginVertical: spacing.medium,
  height: 50,
  minHeight: 50,
}

const $formButtonGroup: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: 50,
  minHeight: 50,
  marginVertical: spacing.medium,
}
