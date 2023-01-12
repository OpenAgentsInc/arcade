import { Plus, PlusCircle } from '@tamagui/lucide-icons'
import { Sheet } from '@tamagui/sheet'
import { DEFAULT_RELAYS } from 'lib/constants/relays'
import { useRelayPool } from 'lib/nostr/relaypool/useRelayPool'
import { useState } from 'react'
import { Alert } from 'react-native'
import { useStore } from 'stores'
import {
  Button,
  Fieldset,
  H1,
  H2,
  Input,
  Label,
  Paragraph,
  XStack,
  YStack,
} from 'tamagui'

export const AddRelay = () => {
  const [position, setPosition] = useState(0)
  const [open, setOpen] = useState(false)
  const [relayUrl, setRelayUrl] = useState('')
  const relays = useStore((state) => state.relays)
  const addOrModifyRelay = useStore(
    (state) => state.relayActions.addOrModifyRelay
  )

  const addRelay = () => {
    const newRelayUrl = relayUrl.replace(/\/$/, '')
    let url = newRelayUrl
    if (url.startsWith('ws://')) {
      Alert.alert(
        'Sorry, only secure connections are accepted. Please use wss://'
      )
      return
    }

    if (!url.startsWith('wss://')) {
      url = 'wss://' + url
    }
    const isValidUrl = /^wss:\/\/(.+?)/.test(url)
    if (!isValidUrl) {
      Alert.alert('Invalid URL')
      return
    }

    console.log("Checking to see if it's already added...", url)
    if (relays.some((relay) => relay.url === url)) {
      Alert.alert('This relay is already added!')
      return
    } else {
      console.log('no has.')
    }

    console.log('Adding:', url)
    addOrModifyRelay({ url, status: 'connecting', connected: false })
    console.log('adddeddddd')
    setOpen(false)
    setRelayUrl('')
    Alert.alert(`Relay ${url} added!`)
  }

  return (
    <>
      <Button
        circular
        onPress={() => setOpen(true)}
        my={-10}
        size="$3"
        bg="$color5"
      >
        <Plus size={20} color="$color12" />
      </Button>

      <Sheet
        forceRemoveScrollEnabled={open}
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[75, 50, 25]}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
      >
        <Sheet.Overlay backgroundColor="black" />
        <Sheet.Handle />
        <Sheet.Frame f={1} p="$4" space="$5">
          <>
            <YStack space="$1">
              <Label w={160} justifyContent="flex-end" htmlFor="name">
                Relay URL
              </Label>
              <Input
                autoFocus
                spellCheck={false}
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="off"
                id="name"
                placeholder="wss://"
                size="$4"
                value={relayUrl}
                onChangeText={(text) => {
                  setRelayUrl(text)
                }}
              />
            </YStack>
            <Button size="$4" mt="$4" icon={PlusCircle} onPress={addRelay}>
              Add Relay
            </Button>
          </>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
