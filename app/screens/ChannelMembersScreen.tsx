import React, { FC, useLayoutEffect, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { ContactItem, Header, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { Channel, useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"

interface ChannelMembersScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ChannelMembers">> {}

export const ChannelMembersScreen: FC<ChannelMembersScreenProps> = observer(
  function ChannelMembersScreen({ route }: { route: any }) {
    const { id, name, privkey } = route.params

    // Stores
    const {
      channelStore: { getChannel },
    } = useStores()

    // get channel by using resolver identifier
    const channel: Channel = useMemo(() => getChannel(id), [id])

    // Pull in navigation via hook
    const navigation = useNavigation<any>()

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Members"
            titleStyle={{ color: colors.palette.white }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
            rightIcon="Plus"
            rightIconColor={colors.palette.cyan400}
            onRightPress={() =>
              navigation.navigate("Invite", {
                id,
                name,
                privkey,
              })
            }
          />
        ),
      })
    }, [])

    return (
      <Screen preset="scroll" contentContainerStyle={$root}>
        <FlashList
          data={channel.members}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={$contact}>
              <ContactItem pubkey={item} />
            </View>
          )}
          ListEmptyComponent={
            <View style={$emptyState}>
              <Text text="Private channel has no members" />
              <Text
                text="- Click Plus button above to invite"
                style={{ color: colors.palette.gray }}
              />
            </View>
          }
          estimatedItemSize={50}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}

const $contact: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}
