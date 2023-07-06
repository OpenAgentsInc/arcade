import React, { FC, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, ListItem, RelayContext, Screen, Text, Toggle, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { NostrPool } from "app/arclib/src"
import { ProfileManager } from "app/arclib/src/profile"
import { colors, spacing } from "app/theme"
import { Formik } from "formik"

interface PrivacySettingScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"PrivacySetting">> {}

export const PrivacySettingScreen: FC<PrivacySettingScreenProps> = observer(
  function PrivacySettingScreen() {
    const pool: NostrPool = useContext(RelayContext) as NostrPool
    const profmgr = new ProfileManager(pool)

    const formikRef = useRef(null)
    const [profile, setProfile] = useState(null)

    // Pull in one of our MST stores
    const { userStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()

    const updateSettings = async (data: { prefersLegacyDMs: boolean }) => {
      try {
        const profileSettings = {
          ...profile,
          prefersLegacyDMs: data.prefersLegacyDMs,
        }

        await profmgr.save(profileSettings, ["prefersLegacyDMs"])

        console.log("updated privacy settings")
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
            title="Privacy"
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
            prefersLegacyDMs: profile?.prefersLegacyDMs || false,
          }}
          onSubmit={(values) => updateSettings(values)}
        >
          {({ values, setFieldValue, submitForm }) => (
            <View style={$sections}>
              <View>
                <Text text="Blinded (unleak metadata)" preset="bold" style={$sectionHeading} />
                <View style={$sectionData}>
                  <ListItem
                    text="Direct message"
                    bottomSeparator={true}
                    style={$sectionItem}
                    containerStyle={$sectionItemContainer}
                    RightComponent={
                      <Toggle
                        inputOuterStyle={$toggle}
                        inputInnerStyle={$toggleInner}
                        variant="switch"
                        onPress={() => setFieldValue("prefersLegacyDMs", !values.prefersLegacyDMs)}
                        value={values.prefersLegacyDMs}
                      />
                    }
                  />
                </View>
              </View>
              <View>
                <Text
                  text="Currently, this feature only supported by Arcade and not it compatible with other clients."
                  size="sm"
                  style={$desc}
                />
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

const $desc: TextStyle = {
  color: colors.palette.cyan700,
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
