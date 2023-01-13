import { FlashList } from '@shopify/flash-list'
import { getFriendMetadata } from 'app/lib/nostr/getFriendMetadata'
import { useGlobalFeed } from 'lib/hooks'
import { NostrEvent } from 'lib/nostr'
import { useEffect } from 'react'
import { Stack } from 'tamagui'
import { Screen } from 'views/shared'

import { TextNote } from './TextNote'

export const HomeFeed = () => {
  const events = useGlobalFeed()
  const grabIt = async () => {
    const evt = await getFriendMetadata()
    console.log(evt)
  }
  useEffect(() => {
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
