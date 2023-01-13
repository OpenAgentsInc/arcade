import { FlashList } from '@shopify/flash-list'
import { getNostrEvent } from 'app/lib/nostr/getNostrEvent'
import { useGlobalFeed } from 'lib/hooks'
import { NostrEvent } from 'lib/nostr'
import { useEffect } from 'react'
import { Stack } from 'tamagui'
import { Screen } from 'views/shared'

import { TextNote } from './TextNote'

export const HomeFeed = () => {
  const events = useGlobalFeed()
  const grabIt = async () => {
    const evt = await getNostrEvent([
      {
        kinds: [0],
        authors: [
          '00000000827ffaa94bfea288c3dfce4422c794fbb96625b6b31e9049f729d700',
        ],
      },
    ])
    console.log(evt)
  }
  useEffect(() => {
    console.log('TRYING SOMETHIN')
    setTimeout(() => {
      grabIt()
    }, 4000)
  }, [])
  return (
    <Screen>
      <FlashList
        ListHeaderComponent={<Stack h={50} />}
        estimatedItemSize={150}
        data={events}
        renderItem={({ item }: { item: NostrEvent }) => (
          <TextNote data={item} />
        )}
      />
    </Screen>
  )
}
