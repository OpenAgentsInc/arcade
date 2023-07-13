import React, { CSSProperties, FC, useContext, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Pressable, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, RelayContext, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { ChannelManagerItem } from "app/components/ChannelManagerItem"
import { UserMinus, UserPlus } from "lucide-react-native"

interface ChannelManagerScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ChannelManager">> {}

export const ChannelManagerScreen: FC<ChannelManagerScreenProps> = observer(
  function ChannelManagerScreen() {
    const { channelManager } = useContext(RelayContext)
    const {
      userStore: { getChannels, leaveChannel },
    } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation<any>()

    const leave = (id: string) => {
      Alert.alert("Confirm leave channel", "Are you sure?", [
        {
          text: "Cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            leaveChannel(channelManager, id)
          },
        },
      ])
    }

    const invite = (info: { id: string; name: string; privkey: string }) => {
      navigation.navigate("ContactPicker", {
        id: info.id,
        name: info.name,
        privkey: info.privkey,
      })
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Channel Manager"
            titleStyle={{ color: colors.palette.cyan400 }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    return (
      <Screen style={$root} preset="scroll">
        <FlashList
          data={getChannels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={$item}>
              <ChannelManagerItem channelManager={channelManager} channel={item} />
              <Pressable onPress={() => invite(item)}>
                <UserPlus style={$icon} />
              </Pressable>
              <Pressable onPress={() => leave(item.id)}>
                <UserMinus style={$icon} />
              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <View style={$emptyState}>
              <Text text="No channels" />
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

const $item: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}

const $icon: CSSProperties = {
  width: 20,
  height: 20,
  color: colors.palette.cyan100,
  marginLeft: 10,
}
