import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { useDirectMessages } from 'lib/hooks/useDirectMessages'
import { useRef } from 'react'
import { DirectMessage } from 'stores/eventTypes'
import { Separator, YStack } from 'tamagui'

import { Screen } from '../shared'
import { DmPreview } from './DmPreview'

export const DirectMessagesScreen = () => {
  const dms = useDirectMessages()
  const flashListRef = useRef<FlashList<DirectMessage>>(null)

  const renderItem = ({ index }: ListRenderItemInfo<DirectMessage>) => {
    const dm = dms[index]
    if (!dm) return <></>

    return (
      <DmPreview
        conversation={dm}
        // onPress={() => {
        //   //   console.log(
        //   //     `Clicked channel: ${channel.name} with picture: ${channel.picture}, ${channel.about}}`
        //   //   )
        //   //   navigate('channel', { channel })
        // }}
      />
    )
  }

  console.log('DMs:', dms.length)
  return (
    <Screen>
      <FlashList
        ref={flashListRef}
        renderItem={renderItem}
        estimatedItemSize={150}
        data={dms}
        ListHeaderComponent={() => <YStack mt="$9" />}
        ItemSeparatorComponent={() => (
          <Separator borderColor="$color4" borderWidth={0.5} />
        )}
      />
    </Screen>
  )
}
