// components/layout.tsx
import { ChannelScreen } from 'app/features/chat/ChannelScreen'
import { ChannelsScreen } from 'app/features/chat/ChannelsScreen'
import { useRouter } from 'next/router'
import { XStack } from '@my/ui'

const Layout = ({ children }: any) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div style={{ display: 'flex', backgroundColor: 'blue' }}>
      <XStack width={350}>
        <ChannelsScreen />
      </XStack>
      {id && <ChannelScreen />}
    </div>
  )
}

export default Layout
