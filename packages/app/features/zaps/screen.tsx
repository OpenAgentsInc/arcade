import { useEffect, useState } from 'react'
import { Button, Paragraph, ScrollView, YStack } from '@my/ui'
import { SimplePool } from 'nostr-tools'
import { Zap } from '@tamagui/lucide-icons'

export function ZapScreen() {
  const [userAccounts, setUserAccounts] = useState<any>([])

  const zapUser = async (account: any) => {
    console.log('lets zap', account)
  }

  const fetchUserAccounts = async () => {
    if (userAccounts.length > 0) return
    const pool = new SimplePool()
    const relays = ['wss://relay.damus.io', 'wss://arc1.arcadelabs.co']

    const events = await pool.list(relays, [{ kinds: [0] }])
    console.log(`Got ${events.length} events`)
    const userAccounts2 = events
      .filter(
        (event: any) =>
          JSON.parse(event.content).lud06 || JSON.parse(event.content).lud16
      )
      .map((event) => {
        return {
          id: event.id,
          pubkey: event.pubkey,
          metadata: event.content,
        }
      })

    setUserAccounts(userAccounts2)
  }

  useEffect(() => {
    fetchUserAccounts()
  }, [])
  return (
    <ScrollView f={1}>
      <YStack f={1} jc="center" ai="center" p="$4" mt="$8" space>
        {userAccounts.map((account: any) => {
          return (
            <YStack key={account.id}>
              <Paragraph ta="center">
                {JSON.parse(account.metadata)?.name || 'unnamed'}
              </Paragraph>
              <Paragraph ta="center">
                {JSON.parse(account.metadata)?.lud06 || 'no lud06'}
              </Paragraph>
              <Paragraph ta="center">
                {JSON.parse(account.metadata)?.lud16 || 'no lud16'}
              </Paragraph>

              <Button
                onPress={() => zapUser(account)}
                bg="$orange10Dark"
                color="white"
                fontWeight="700"
              >
                <Zap size={24} color="white" />
                Zap {JSON.parse(account.metadata).name || account.pubkey}
              </Button>
            </YStack>
          )
        })}
      </YStack>
    </ScrollView>
  )
}
