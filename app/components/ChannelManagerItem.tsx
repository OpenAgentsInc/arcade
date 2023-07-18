import React, { useEffect } from "react"
import { AutoImage, Text } from "app/components"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { Channel } from "app/models"
import { ChannelManager } from "app/arclib/src"
import { observer } from "mobx-react-lite"

export const ChannelManagerItem = observer(function ChannelItem({
  channelManager,
  channel,
}: {
  channelManager: ChannelManager
  channel: Channel
}) {
  const { navigate } = useNavigation<any>()

  useEffect(() => {
    // only fetch meta if channel name not present
    if (!channel.name) {
      channel.fetchMeta(channelManager)
    }
  }, [channel.name])

  return (
    <Pressable onPress={() => navigate("Chat", { id: channel.id })} style={$messageItem}>
      <AutoImage
        source={{ uri: channel?.picture || "https://void.cat/d/HxXbwgU9ChcQohiVxSybCs.jpg" }}
        style={$messageAvatar}
      />
      <View style={$messageContent}>
        <View style={$messageContentHeading}>
          <Text text={channel?.name || "No name"} preset="bold" />
        </View>
        <Text
          text={channel?.about || "No description"}
          size="sm"
          numberOfLines={1}
          style={$messageContentAbout}
        />
      </View>
    </Pressable>
  )
})

const $messageItem: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.extraSmall,
}

const $messageAvatar: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 100,
  marginRight: spacing.small,
}

const $messageContent: ViewStyle = {
  flex: 1,
}

const $messageContentHeading: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $messageContentAbout: TextStyle = {
  maxWidth: 250,
  color: "rgba(255,255,255,0.5)",
}
