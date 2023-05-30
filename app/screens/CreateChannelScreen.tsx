import React, { FC, useContext, useLayoutEffect, useMemo, useRef } from "react"
import { observer } from "mobx-react-lite"
import { Platform, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, RelayContext, Screen, Text, TextField, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { Formik } from "formik"
import { useStores } from "app/models"
import Nip28Channel from "arclib/src/channel"

interface CreateChannelScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"CreateChannel">> {}

export const CreateChannelScreen: FC<CreateChannelScreenProps> = observer(
  function CreateChannelScreen() {
    const pool: any = useContext(RelayContext)
    const channel: any = useMemo(() => new Nip28Channel(pool), [pool])

    const { userStore } = useStores()
    const formikRef = useRef(null)

    // Pull in navigation via hook
    const navigation = useNavigation<any>()

    const createChannel = async (data: any) => {
      try {
        const result = await channel.create(data)
        if (result) {
          console.log("created channel: ", result)
          const metadata = JSON.parse(result.content)
          // add created channel to user store
          userStore.joinChannel(result.id)
          // redirect to channel
          navigation.navigate("Chat", { id: result.id, name: metadata.name })
        }
      } catch {
        alert("Error, please check information again")
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
            name: "",
            picture: "",
            about: "",
          }}
          onSubmit={(values) => createChannel(values)}
        >
          {({ handleChange, handleBlur, submitForm, values }) => (
            <View>
              <Text text="Create Channel" preset="heading" size="xl" style={$title} />
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
                label="Channel description"
                style={$input}
                inputWrapperStyle={$inputWrapper}
                onChangeText={handleChange("about")}
                onBlur={handleBlur("about")}
                value={values.about}
                autoCapitalize="none"
                autoFocus={false}
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
