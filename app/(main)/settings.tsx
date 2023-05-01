import * as Clipboard from 'expo-clipboard'
import { nip19 } from 'nostr-tools'
import { useStore } from 'stores'
import { Button, isWeb, ListItem, Separator, YGroup, YStack } from 'tamagui'
import { LogoutDialog } from 'views/shared'
import { useNavigation } from '@react-navigation/native'
import { Clipboard as ClipboardIcon, Key, User } from '@tamagui/lucide-icons'
import { Stack } from 'expo-router'

export default function Page() {
  const publicKey = useStore((s) => s.user.publicKey)
  const privateKey = useStore((s) => s.user.privateKey)

  const { navigate } = useNavigation<any>()

  const npubkey = nip19.npubEncode(publicKey)
  const nseckey = nip19.nsecEncode(privateKey)
  const mask = '*'.repeat(nseckey.length - 'nsec1'.length)
  const maskedNsec = `nsec1${mask}`

  const copyPublicKey = async () => {
    await Clipboard.setStringAsync(npubkey)
    alert('Public key copied to clipboard!')
  }

  const copyPrivateKey = async () => {
    await Clipboard.setStringAsync(nseckey)
    alert('Access key copied to clipboard!')
  }

  return (
    <YStack
      alignItems="center"
      p="$4"
      justifyContent="space-between"
      f={1}
      height="100%"
      bg="$color1"
    >
      <YGroup
        als="center"
        bordered
        w="100%"
        size="$5"
        maxWidth={isWeb ? '50%' : '100%'}
        separator={<Separator />}
      >
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
          title="Secret Access Key"
          subTitle={maskedNsec}
          icon={Key}
          iconAfter={ClipboardIcon}
          onPress={copyPrivateKey}
        />
      </YGroup>
      <YStack width="100%" mb="$4">
        <Button
          size="$5"
          mt="$6"
          w="100%"
          color="$color12"
          bg="$color6"
          onPress={() => navigate('Relays')}
        >
          Manage relays
        </Button>
        <LogoutDialog mt="$6" w={200} />
      </YStack>
      <Stack.Screen options={{ title: 'Settings' }} />
    </YStack>
  )
}
