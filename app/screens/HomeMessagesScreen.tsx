import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, ImageStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Screen, Text } from "app/components"
import { spacing, colors } from "app/theme"
import { PlusIcon } from "lucide-react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeMessagesScreenProps extends NativeStackScreenProps<AppStackScreenProps<"HomeMessages">> {}

export const HomeMessagesScreen: FC<HomeMessagesScreenProps> = observer(function HomeMessagesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen contentContainerStyle={$root} preset="scroll" safeAreaEdges={["top"]}>
      <View style={$container}>
        <View style={$sidebar}>
          <View style={$pinList}>
            <View style={$channel}>
              <View style={$dms} />
            </View>
            <View style={$channel}>
              <AutoImage source={{uri: 'https://void.cat/d/MsqUKXXC4SxDfmT2KiHovJ.webp'}} style={$channelImage} />
            </View>
          </View>
          <View style={$divider} />
          <View style={$channelList}>
            <View style={$channel}>
              <AutoImage source={{uri: 'https://ui-avatars.com/api/?name=a1&background=random&size=200'}} style={$channelImage} />
            </View>
            <View style={$channel}>
              <AutoImage source={{uri: 'https://ui-avatars.com/api/?name=a2&background=random&size=200'}} style={$channelImage} />
            </View>
            <View style={$channel}>
              <AutoImage source={{uri: 'https://ui-avatars.com/api/?name=a3&background=random&size=200'}} style={$channelImage} />
            </View>
            <View style={$channel}>
              <AutoImage source={{uri: 'https://ui-avatars.com/api/?name=a4&background=random&size=200'}} style={$channelImage} />
            </View>
            <View style={$channel}>
              <AutoImage source={{uri: 'https://ui-avatars.com/api/?name=a5&background=random&size=200'}} style={$channelImage} />
            </View>
            <View style={$channel}>
              <View style={$addChannelButton}>
                <PlusIcon style={{color: colors.text}} />
              </View>
            </View>
          </View>
        </View>
        <View style={$main}>
          <Text text="arcaDe" preset="heading" />
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
}

const $sidebar: ViewStyle = {
  width: 72,
  height: "100%",
  flexShrink: 0,
}

const $main: ViewStyle = {
  flex: 1,
  width: "100%",
  height: "100%",
}

const $pinList: ViewStyle = {
  gap: spacing.extraSmall,
}

const $divider: ViewStyle = {
  width: "50%",
  height: 2,
  backgroundColor: colors.tint,
  borderRadius: 2,
  marginVertical: spacing.extraSmall,
  alignSelf: "center",
}

const $channelList: ViewStyle = {
  flex: 1,
  gap: spacing.extraSmall,
}

const $dms: ViewStyle = {
  backgroundColor: colors.tint,
  borderRadius: 100,
  width: 50,
  height: 50,
}

const $channel: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const $channelImage: ImageStyle = {
  backgroundColor: colors.tint,
  borderRadius: 100,
  width: 50,
  height: 50,
}

const $addChannelButton: ViewStyle = {
  backgroundColor: "cyan",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 100,
  width: 50,
  height: 50,
}
