import { ChannelScreen } from 'app/features/chat/ChannelScreen'
import { ChannelsScreen } from 'app/features/chat/ChannelsScreen'
import { useRouter } from 'next/router'
import { Stack, XStack } from '@my/ui'

const Layout = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <XStack flex={1} backgroundColor="$color3">
      <XStack width={350} borderRightWidth="$1" borderColor="$color5" elevation="$4">
        <ChannelsScreen />
      </XStack>
      {id && <ChannelScreen />}
    </XStack>
  )
}

export default Layout
