import { FlashList } from '@shopify/flash-list'
import { useGlobalFeed } from 'lib/hooks'
import { NostrEvent } from 'lib/nostr'
import { Stack } from 'tamagui'
import { Screen } from 'views/shared'

import { TextNote } from './TextNote'

export const HomeFeed = () => {
  const events = useGlobalFeed()
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
