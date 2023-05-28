import React, { FC, useLayoutEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text, TextField, Button } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { Formik } from "formik"

interface CreateAccountScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"CreateAccount">> {}

export const CreateAccountScreen: FC<CreateAccountScreenProps> = observer(
  function CreateAccountScreen() {
    const formikRef = useRef(null)

    // Pull in one of our MST stores
    const { userStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()

    const signup = (data: any) => {
      userStore.signup(data.username, data.displayName, data.about)
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title=""
            titleStyle={{ color: colors.palette.cyan400 }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    return (
      <Screen style={$root} preset="scroll" contentContainerStyle={$container}>
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
              <Text text="Create Profile" preset="heading" size="xl" style={$title} />
              <TextField
                label="Display Name"
                style={$input}
                inputWrapperStyle={$inputWrapper}
                onChangeText={handleChange("displayName")}
                onBlur={handleBlur("displayName")}
                value={values.displayName}
                autoCapitalize="none"
                autoFocus={true}
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
  justifyContent: "center",
  paddingHorizontal: spacing.medium,
}

const $title: TextStyle = {
  textAlign: "center",
  marginBottom: spacing.massive,
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
