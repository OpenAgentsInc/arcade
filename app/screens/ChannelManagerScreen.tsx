import React, { CSSProperties, FC, useContext, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Pressable, RefreshControl, View, ViewStyle } from "react-native"
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
      userStore: { getChannels, updateChannels, leaveChannel },
      channelStore,
    } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation<any>()

    const [isRefresh, setIsRefresh] = useState(false)

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
      navigation.navigate("Invite", {
        id: info.id,
        name: info.name,
        privkey: info.privkey,
      })
    }

    const refresh = async () => {
      setIsRefresh(true)
      const channels = await channelManager.listJoined()
      console.log("joined channels:", channels)
      for (const channel of channels) {
        const meta = await channelManager.getMeta(channel)
        channelStore.create({
          id: channel,
          author: "",
          privkey: "",
          name: meta.name,
          about: meta.about,
          picture: meta.picture,
          is_private: false,
        })
      }
      updateChannels(channels)
      setIsRefresh(false)
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Channel Manager"
            titleStyle={{ color: colors.palette.white }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    return (
      <Screen contentContainerStyle={$root} preset="fixed">
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
          refreshControl={
            <RefreshControl
              colors={["#155e75", "cyan"]}
              tintColor="cyan"
              refreshing={isRefresh}
              onRefresh={refresh}
            />
          }
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
