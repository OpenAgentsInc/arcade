import { useStore } from 'app/stores'
import { BackButton, Screen } from 'app/views'
import { AlertDialogDemo } from 'app/views/AlertDialog'
import * as Clipboard from 'expo-clipboard'
import { npubEncode, nsecEncode } from 'nostr-tools/nip19'
import { Alert } from 'react-native'
import { H2, ListItem, Paragraph, Separator, YGroup, YStack } from '@my/ui'
import { Clipboard as ClipboardIcon, Key, User } from '@tamagui/lucide-icons'
import { LogoutButton } from './logout-button'

export const SettingsScreen = () => {
  const publicKey = useStore((s) => s.user.publicKey)
  const privateKey = useStore((s) => s.user.privateKey)

  const npubkey = npubEncode(publicKey)
  const nseckey = nsecEncode(privateKey)
  const mask = '*'.repeat(nseckey.length - 'nsec1'.length)
  const maskedNsec = `nsec1${mask}`

  const copyPublicKey = async () => {
    await Clipboard.setStringAsync(npubkey)
    Alert.alert('Public key copied to clipboard!')
  }

  const copyPrivateKey = async () => {
    await Clipboard.setStringAsync(nseckey)
    Alert.alert('Secret key copied to clipboard!')
  }

  return (
    <Screen>
      <BackButton />
      <H2 textAlign="center" mb="$4">
        Settings
      </H2>
      <YStack alignItems="center">
        <YGroup als="center" bordered w="100%" size="$5" maxWidth="50%" separator={<Separator />}>
          <ListItem
            hoverTheme
            pressTheme
            title="Public Account ID"
            subTitle={npubkey}
            icon={User}
            iconAfter={ClipboardIcon}
            onPress={copyPublicKey}
          />
          <ListItem
            hoverTheme
            pressTheme
            title="Secret Account Login Key"
            subTitle={maskedNsec}
            icon={Key}
            iconAfter={ClipboardIcon}
            onPress={copyPrivateKey}
          />
        </YGroup>
        <LogoutButton mt="$6" w={200} />
      </YStack>
    </Screen>
  )
}
