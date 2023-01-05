import { ChannelScreen } from 'app/features/chat/ChannelScreen'
import { ChannelsScreen } from 'app/features/chat/ChannelsScreen'
import { useRouter } from 'next/router'
import { useLink } from 'solito/link'
import { Button, H3, Stack, XStack, YStack } from '@my/ui'
import { ChevronLeft, Settings } from '@tamagui/lucide-icons'

const Layout = () => {
  const router = useRouter()
  const { id } = router.query
  const linkprops = useLink({ href: '/settings' })

  return (
    <YStack flex={1} backgroundColor="$color3" height="100vh" overflow="hidden">
      <XStack
        top={0}
        left={0}
        right={0}
        height="$headerHeight"
        paddingLeft="$4"
        paddingRight="$4"
        backgroundColor="$color4"
        elevation="$7"
        zIndex={1000}
        paddingVertical="$2"
        borderBottomWidth="$1"
        borderColor="$color5"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <H3 color="$color11">ARC</H3>
        {router.pathname === 'settings' ? (
          <Stack width="$1" />
        ) : (
          <Button
            {...linkprops}
            backgrounded={false}
            circular
            width="$3"
            marginHorizontal={-10}
            outlineStyle={undefined}
            pressStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
            hoverStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
            focusStyle={{ backgrounded: false, backgroundColor: 'transparent' }}
          >
            <Settings />
          </Button>
        )}
      </XStack>
      <XStack flex={1} paddingTop="$headerHeight" backgroundColor="$color3">
        <XStack width={350} borderRightWidth="$1" borderColor="$color5" elevation="$4">
          <ChannelsScreen />
        </XStack>
        {id && <ChannelScreen />}
      </XStack>
    </YStack>
  )
}

export default Layout
