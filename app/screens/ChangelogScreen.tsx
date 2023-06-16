import React, { FC, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"

interface ChangelogScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Changelog">> {}

export const ChangelogScreen: FC<ChangelogScreenProps> = observer(function ChangelogScreen() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Changelog"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          rightIcon="Github"
          rightIconColor={colors.palette.cyan400}
          onRightPress={() => Linking.openURL("https://github.com/ArcadeLabsInc/arcade/releases")}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <Screen contentContainerStyle={$root} preset="scroll" keyboardOffset={50}>
      <Text text={"v0.1.3"} size="lg" preset="bold" />
      <Text text={"16 June 2023"} size="xs" style={$subtitle} />
      <View style={$changelogContainer}>
        <Text style={$changelogText}>- Add contact by npub or suggestion from nostr.band</Text>
        <Text style={$changelogText}>- Add nicer chat UI and loading indicators</Text>
      </View>
      <View style={$divider} />

      <Text text={"v0.1.2"} size="lg" preset="bold" />
      <Text text={"14 June 2023"} size="xs" style={$subtitle} />
      <View style={$changelogContainer}>
        <Text style={$changelogText}>- Added image uploads</Text>
        <Text style={$changelogText}>- Improved DM reliability</Text>
      </View>
      <View style={$divider} />

      <Text text={"v0.1.1"} size="lg" preset="bold" />
      <Text text={"13 June 2023"} size="xs" style={$subtitle} />
      <View style={$changelogContainer}>
        <Text style={$changelogText}>
          - Fixed bug: DM channel wasn't showing recipient's messages
        </Text>
        <Text style={$changelogText}>- Added nsec export to profile screen</Text>
        <Text style={$changelogText}>- Added this changelog</Text>
      </View>
      <View style={$divider} />

      <Text text={"v0.1.0 - Oslo"} size="lg" preset="bold" />
      <Text text={"12 June 2023"} size="xs" style={$subtitle} />

      <View style={$changelogContainer}>
        <Text style={$changelogText}>
          Today we launch our first Arcade beta build for Android and iOS, featuring three kinds of
          Nostr-based chat:
        </Text>
        <Text style={$changelogText}>- Public channels (NIP-28)</Text>
        <Text style={$changelogText}>- Encrypted direct messages (NIP-4)</Text>
        <Text style={$changelogText}>- Encrypted private channels (NIP-112)</Text>

        <Text style={$changelogText}>
          Combining Nostr chat with Nostr-based user authentication (NIP-06) and followers & contact
          management, the Arcade app is now the first cross-platform mobile app intended to be a
          drop-in replacement for Telegram and other popular chat apps.
        </Text>

        <Text style={$changelogText}>
          You'll notice our app has no proprietary back-end: only Nostr relays. This enables truly
          unstoppable chat, as our chat channels can be accessed by any Nostr clients.
        </Text>

        <Text style={$changelogText}>
          A lot of work remains to get Arcade to the level of polish of the major chat apps. This
          will be heavily work in progress over the next few months as we proceed toward a stable
          release we can put into the app stores.
        </Text>

        <Text style={$changelogText}>
          We hope you'll help us by testing this app and telling us how we can improve it so you'll
          feel comfortable using it regularly. Please post any feedback in the "Arcade Feedback"
          channel, tweet at us @TheArcadeApp, or file an issue on our GitHub.
        </Text>

        <Text style={$changelogText}>
          We name this release Oslo because that is where we're launching it from - and in
          recognition of the importance of censorship-resistant communications technology to the
          many people fighting for freedom around the globe. We are here to serve you.
        </Text>

        <Text style={$changelogHeading}>Features:</Text>
        <Text style={$changelogText}>- Log in with Nostr nsec or create a new account</Text>
        <Text style={$changelogText}>
          - See a unified list of your chat channels: public (NIP-28), DMs (NIP-4), and private
          groups (NIP-112)
        </Text>
        <Text style={$changelogText}>- See a list of your contacts</Text>
        <Text style={$changelogText}>- Create a new public or private channel</Text>
        <Text style={$changelogText}>- Invite your contacts to any public or private channel</Text>
        <Text style={$changelogText}>
          - View the profile of any chat channel member and follow or message them
        </Text>
        <Text style={$changelogText}>- Add or remove Nostr relays</Text>
        <Text style={$changelogText}>
          - Edit your profile name/username/bio and avatar/cover images
        </Text>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingBottom: 80,
}

const $subtitle: TextStyle = {
  color: colors.palette.cyan800,
}

const $divider: ViewStyle = {
  borderBottomColor: colors.palette.cyan800,
  borderBottomWidth: 1,
  marginVertical: 24,
}

const $changelogContainer: ViewStyle = {
  marginTop: spacing.medium,
}

const $changelogHeading: TextStyle = {
  // fontSize: 24,
  fontWeight: "bold",
  marginVertical: spacing.small,
  color: colors.palette.cyan400,
}

const $changelogText: TextStyle = {
  marginBottom: spacing.medium,
}
