import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Header, Screen, Text, TextField } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { EyeIcon, EyeOffIcon } from "lucide-react-native"

interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const [nsec, setNsec] = useState("")
  const [secure, setSecure] = useState(true)

  // Pull in one of our MST stores
  const { userStore, channelStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  // login
  const login = () => {
    if (!nsec.startsWith("nsec1") || nsec.length < 60) {
      alert("Invalid nsec")
    }
    channelStore.createDefaultChannels()
    userStore.loginWithNsec(nsec)
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
    <Screen
      style={$root}
      safeAreaEdges={["bottom"]}
      preset="scroll"
      contentContainerStyle={$container}
    >
      <View>
        <Text text="Enter access key" preset="subheading" size="xl" style={$title} />
        <View style={$inputGroup}>
          <TextField
            secureTextEntry={secure}
            placeholder="nsec..."
            placeholderTextColor={colors.palette.cyan500}
            style={$input}
            inputWrapperStyle={$inputWrapper}
            onChangeText={setNsec}
            value={nsec}
            autoCapitalize="none"
            autoFocus={true}
          />
          <Pressable onPress={() => setSecure((prev) => !prev)} style={$secureButton}>
            {secure ? (
              <EyeOffIcon width={20} height={20} color={colors.palette.cyan500} />
            ) : (
              <EyeIcon width={20} height={20} color={colors.palette.cyan500} />
            )}
          </Pressable>
        </View>
        <Button text="Enter" onPress={login} style={$button} pressedStyle={$button} />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  paddingHorizontal: spacing.medium,
}

const $title: TextStyle = {
  textAlign: "center",
  marginTop: spacing.medium,
  marginBottom: spacing.huge,
}

const $inputGroup: ViewStyle = {
  position: "relative",
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
  paddingRight: 50,
}

const $secureButton: ViewStyle = {
  position: "absolute",
  right: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 50,
  height: 50,
}

const $button: ViewStyle = {
  backgroundColor: "transparent",
  borderColor: colors.palette.cyan900,
  width: "100%",
  marginVertical: spacing.medium,
  height: 50,
  minHeight: 50,
}
