import { FlashList } from '@shopify/flash-list'
import { useGlobalFeed, useNostr } from 'lib/hooks'
import { useEffect } from 'react'
import { Text } from 'tamagui'
import { Screen } from 'views/shared'

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
        estimatedItemSize={150}
        data={events.map((e) => JSON.stringify(e))}
        renderItem={({ item }) => <Text color="$color11">{item}</Text>}
      />
    </Screen>
  )
}
1
