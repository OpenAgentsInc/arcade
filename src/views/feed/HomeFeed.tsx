import { FlashList } from '@shopify/flash-list'
import { getFriendMetadata } from 'app/lib/nostr/getFriendMetadata'
import { getNostrEvent } from 'app/lib/nostr/getNostrEvent'
import { useStore } from 'app/stores'
import { useGlobalFeed } from 'lib/hooks'
import { NostrEvent } from 'lib/nostr'
import { useEffect, useState } from 'react'
import { Stack } from 'tamagui'
import { Screen } from 'views/shared'

import { TextNote } from './TextNote'

export const HomeFeed = () => {
  const events = useGlobalFeed()
  const grabIt = async () => {
    const evt = await getFriendMetadata(useStore.getState().friends)
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
