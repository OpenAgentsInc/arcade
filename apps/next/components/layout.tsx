import { ChannelScreen } from 'app/features/chat/ChannelScreen'
import { ChannelsScreen } from 'app/features/chat/ChannelsScreen'
import { useRouter } from 'next/router'
import { Paragraph, XStack, YStack } from '@my/ui'

const Layout = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <YStack flex={1} backgroundColor="$color3" height="100vh" overflow="hidden">
      <XStack
        // position="absolute"
        top={0}
        left={0}
        right={0}
        height="$headerHeight"
        paddingLeft="$4"
        paddingRight="$4"
        backgroundColor="$color5"
        elevation="$7"
        zIndex={1000}
      >
        <Paragraph color="$color1">My App</Paragraph>
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

// import { ChannelScreen } from 'app/features/chat/ChannelScreen'
// import { ChannelsScreen } from 'app/features/chat/ChannelsScreen'
// import { useRouter } from 'next/router'
// import { XStack } from '@my/ui'

// const Layout = () => {
//   const router = useRouter()
//   const { id } = router.query

//   return (
//     <XStack flex={1} backgroundColor="$color3">
//       <XStack width={350} borderRightWidth="$1" borderColor="$color5" elevation="$4">
//         <ChannelsScreen />
//       </XStack>
//       {id && <ChannelScreen />}
//     </XStack>
//   )
// }

// export default Layout
