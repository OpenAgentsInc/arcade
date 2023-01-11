import { FlashList } from '@shopify/flash-list'
import { useGlobalFeed, useNostr } from 'lib/hooks'
import { NostrEvent } from 'lib/nostr'
import { useEffect } from 'react'
import { Stack, Text } from 'tamagui'
import { Screen } from 'views/shared'

import { TextNote } from './TextNote'

export const HomeFeed = () => {
  const nostr = useNostr()
  const events = useGlobalFeed()
  useEffect(() => {
    if (!nostr) return
    nostr.loadFirstPaint()
  }, [nostr])
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
