import React, { FC, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text, TextField } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { nip19 } from "nostr-tools"
import { ClipboardCopyIcon } from "lucide-react-native"
import * as Clipboard from "expo-clipboard"

interface BackupScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Backup">> {}

export const BackupScreen: FC<BackupScreenProps> = observer(function BackupScreen() {
  // Pull in one of our MST stores
  const { userStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const nsec = nip19.nsecEncode(userStore.privkey)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Backup"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <Screen contentContainerStyle={$root} preset="scroll">
      <View>
        <View style={$inputGroup}>
          <TextField
            label="Private Key"
            style={[$input, $inputText]}
            inputWrapperStyle={$inputWrapper}
            editable={false}
            value={userStore.privkey}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={async () => await Clipboard.setStringAsync(userStore.privkey)}
            style={$copyButton}
          >
            <ClipboardCopyIcon width={20} height={20} color={colors.palette.cyan400} />
          </TouchableOpacity>
        </View>
        <View style={$inputGroup}>
          <TextField
            label="Nsec"
            style={[$input, $inputText]}
            inputWrapperStyle={$inputWrapper}
            editable={false}
            value={nsec}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={async () => await Clipboard.setStringAsync(nsec)}
            style={$copyButton}
          >
            <ClipboardCopyIcon width={20} height={20} color={colors.palette.cyan400} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={$content}>
        <Text text="Safety Tips" size="md" preset="bold" style={$title} />
        <Text
          text="Your account is secured by a secret key. This key gives full access to your account, never share it to anyone"
          size="sm"
          style={$desc}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
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

const $inputText: TextStyle = {
  color: colors.palette.cyan900,
}

const $copyButton: ViewStyle = {
  position: "absolute",
  bottom: 12,
  right: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 50,
  height: 50,
}

const $content: ViewStyle = {
  marginTop: spacing.small,
}

const $title: TextStyle = {
  color: colors.palette.cyan500,
}

const $desc: TextStyle = {
  color: colors.palette.cyan700,
}
