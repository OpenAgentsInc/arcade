import React, { FC, useContext, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ImageStyle, Platform, Pressable, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, RelayContext, Screen, TextField, Button, Toggle, AutoImage } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { Formik } from "formik"
import { useStores } from "app/models"
import { ChannelManager } from "app/arclib/src"
import { ImagePlusIcon } from "lucide-react-native"
import { launchImageLibrary } from "react-native-image-picker"

interface CreateChannelScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"CreateChannel">> {}

export const CreateChannelScreen: FC<CreateChannelScreenProps> = observer(
  function CreateChannelScreen({ route }: { route: any }) {
    const pool: any = useContext(RelayContext)
    const channelManager: ChannelManager = new ChannelManager(pool)

    const { isPrivate } = route.params
    const { userStore, channelStore } = useStores()

    const formikRef = useRef(null)

    const [picture, setPicture] = useState(null)
    const [loading, setLoading] = useState(false)

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

    const createChannel = async (data: any) => {
      try {
        if (!data.name) {
          alert("Channel name is required")
        } else {
          const fullData = { ...data, picture }
          // broadcast channel to all relays
          const info: any = await channelManager.create(fullData)
          await channelManager.setMeta(info.id, fullData.is_private, fullData)
          console.log("created channel: ", info)

          // create channel in local store
          channelStore.create(info)

          // add created channel to user store
          userStore.joinChannel(info.id)

          if (fullData.is_private) {
            // redirect to invite screen
            navigation.replace("ContactPicker", {
              id: info.id,
              name: info.name,
              privkey: info.privkey,
            })
          } else {
            // redirect to created channel screen
            navigation.replace("Chat", { id: info.id })
          }
        }
      } catch (e) {
        console.log("error", e)
        alert(`Error, please check information again: ${e}`)
      }
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title={isPrivate ? "New Private Group" : "New Channel"}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    return (
      <Screen
        preset="fixed"
        contentContainerStyle={$container}
        safeAreaEdges={["bottom"]}
        keyboardOffset={120}
        KeyboardAvoidingViewProps={{ behavior: Platform.OS === "ios" ? "padding" : "height" }}
      >
        <Formik
          innerRef={formikRef}
          enableReinitialize={true}
          initialValues={{
            name: "",
            about: "",
            is_private: isPrivate,
          }}
          onSubmit={(values) => createChannel(values)}
        >
          {({ handleChange, handleBlur, submitForm, values, setFieldValue }) => (
            <View>
              <View style={$avatar}>
                <AutoImage
                  source={{
                    uri: picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg",
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
              <TextField
                label="Channel name"
                style={$input}
                inputWrapperStyle={$inputWrapper}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                autoCapitalize="none"
                autoFocus={false}
              />
              <TextField
                label="Description"
                style={$input}
                inputWrapperStyle={$inputWrapper}
                onChangeText={handleChange("about")}
                onBlur={handleBlur("about")}
                value={values.about}
                autoCapitalize="none"
                autoFocus={false}
              />
              <Toggle
                label="Private channel"
                inputOuterStyle={$toggle}
                inputInnerStyle={$toggleInner}
                inputDetailStyle={$toggleDetail}
                variant="switch"
                onPress={() => setFieldValue("is_private", !values.is_private)}
                value={values.is_private}
              />
              <Button text="Create" onPress={() => submitForm()} style={$button} />
            </View>
          )}
        </Formik>
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  paddingHorizontal: spacing.medium,
}

const $inputWrapper: ViewStyle = {
  padding: 0,
  backgroundColor: "transparent",
  borderWidth: 0,
  marginBottom: spacing.medium,
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

const $toggleDetail: any = {
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.cyan500,
}

const $button: ViewStyle = {
  backgroundColor: colors.palette.cyan500,
  borderWidth: 0,
  width: "100%",
  marginTop: spacing.large,
  marginBottom: spacing.small,
  height: 50,
  minHeight: 50,
}

const $avatar: ViewStyle = {
  flexShrink: 0,
  overflow: "hidden",
  alignSelf: "center",
  marginTop: spacing.medium,
  marginBottom: spacing.large,
  position: "relative",
}

const $image: ImageStyle = {
  width: "100%",
  height: "100%",
  resizeMode: "cover",
}

const $avatarImage: ImageStyle = {
  width: 60,
  height: 60,
  borderRadius: 100,
  borderWidth: 1,
  borderColor: colors.separator,
}

const $avatarButton: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 100,
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: colors.palette.overlay80,
  alignItems: "center",
  justifyContent: "center",
}
