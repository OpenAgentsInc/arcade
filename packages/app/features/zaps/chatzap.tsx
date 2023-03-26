import { useEffect } from 'react'
import { Stack, Theme, YStack } from 'tamagui'
import { Message } from '@my/ui/src/components/Message'
import { saveNewChannel, saveNewChannelMessage } from 'lib/nostr'
import { generateRandomPlacekitten } from 'lib/utils'
import { generatePrivateKey, getPublicKey } from 'nostr-tools'

export const ChatZapScreen = () => {
  const createTestChannel = async () => {
    const privateKey = generatePrivateKey() // `sk` is a hex string
    const publicKey = getPublicKey(privateKey) // `pk` is a hex string
    const channel = {
      title: 'Arc Testing',
      about: 'Video 56 testing',
      picture: generateRandomPlacekitten(),
    }
    saveNewChannel({
      channel,
      publicKey,
      privateKey,
    })
  }

  const createTestMessage = async () => {
    const privateKey = generatePrivateKey() // `sk` is a hex string
    const publicKey = getPublicKey(privateKey) // `pk` is a hex string
    const channel = {
      relayurl: 'wss://arc1.arcadelabs.co',
      eventid:
        '581c5295bc99f6a695b743f5a3ded09d24ae5fdb087e2ae56e16d257ccbbadb2',
    }
    saveNewChannelMessage({
      channel,
      publicKey,
      privateKey,
      text: 'Running Arc',
    })
  }

  useEffect(() => {
    // createTestChannel()
    createTestMessage()
  }, [])

  const message = {
    id: '123',
    pubkey: 'asdf1234',
    content: 'yoooooo',
    sats_zapped: 0,
    created_at: 1679787890,
  }
  return (
    <Theme name="dark">
      <Theme name="blue">
        <YStack f={1} bc="$blue2Dark" ai="center">
          <Stack mt="$12" width={350} minHeight={60}>
            <Message currentUser="asdf1234" message={message} />
          </Stack>
        </YStack>
      </Theme>
    </Theme>
  )
}
