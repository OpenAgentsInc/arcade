import { useEffect } from 'react'
import { Separator, YGroup, YStack } from 'tamagui'
import { useNavigation } from '@react-navigation/native'
import { ChannelList } from './ChannelList'

export function ChannelsScreen() {
  const { setOptions } = useNavigation()
  useEffect(() => {
    setOptions({ title: 'Chats' })
  }, [])
  return (
    <YStack f={1} jc="center" ai="center" space backgroundColor="#000">
      <YGroup
        als="center"
        f={1}
        w="100%"
        separator={<Separator />}
        backgroundColor="#000"
      >
        <ChannelList />
      </YGroup>
    </YStack>
  )
}
