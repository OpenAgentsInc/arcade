import { FlashList } from '@shopify/flash-list'
import { useGlobalFeed } from 'lib/hooks'
import { Note } from 'stores/eventTypes'
import { Stack } from 'tamagui'
import { Screen } from 'views/shared'

import { TextNote } from './TextNote'

export const HomeFeed = () => {
  const events = useGlobalFeed().slice(0, 50)
  return (
    <Screen>
      <FlashList
        ListHeaderComponent={<Stack h={50} />}
        estimatedItemSize={150}
        data={events}
        renderItem={({ item }: { item: Note }) => <TextNote data={item} />}
      />
    </Screen>
  )
}
