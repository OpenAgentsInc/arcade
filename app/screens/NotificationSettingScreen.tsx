import React, { FC, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, ListItem, Screen, Text, Toggle } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"

interface NotificationSettingScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"NotificationSetting">> {}

export const NotificationSettingScreen: FC<NotificationSettingScreenProps> = observer(
  function NotificationSettingScreen() {
    // Pull in navigation via hook
    const navigation = useNavigation<any>()

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Notifications"
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
                    inputDetailStyle={$toggleDetail}
                    variant="switch"
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
                    inputDetailStyle={$toggleDetail}
                    variant="switch"
                  />
                }
              />
            </View>
          </View>
          <View>
            <Text text="Notifications for listings" preset="bold" style={$sectionHeading} />
            <View style={$sectionData}>
              <ListItem
                text="Buy offer"
                bottomSeparator={true}
                style={$sectionItem}
                containerStyle={$sectionItemContainer}
                RightComponent={
                  <Toggle
                    inputOuterStyle={$toggle}
                    inputInnerStyle={$toggleInner}
                    inputDetailStyle={$toggleDetail}
                    variant="switch"
                  />
                }
              />
              <ListItem
                text="Sell offer"
                bottomSeparator={true}
                style={$sectionItem}
                containerStyle={$sectionItemContainer}
                RightComponent={
                  <Toggle
                    inputOuterStyle={$toggle}
                    inputInnerStyle={$toggleInner}
                    inputDetailStyle={$toggleDetail}
                    variant="switch"
                  />
                }
              />
            </View>
          </View>
        </View>
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

const $toggleDetail: any = {
  borderRadius: spacing.tiny,
  backgroundColor: colors.palette.cyan500,
}
