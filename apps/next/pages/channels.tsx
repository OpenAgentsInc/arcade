// pages/channels.tsx
import Layout from '../components/layout'

const WebChannelsScreen = () => {
  return (
    <h1 style={{ color: 'black' }}>hi</h1>
    /** Your content */
  )
}

WebChannelsScreen.getLayout = (page: any) => <Layout>{page}</Layout>

export default WebChannelsScreen

// import { ChannelScreen } from 'app/features/chat/ChannelScreen'
// import { ChannelsScreen } from 'app/features/chat/ChannelsScreen'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { useEffect } from 'react'
// import { Button, XStack } from '@my/ui'

// const WebChannelsScreen = () => {
//   const router = useRouter()
//   const { id } = router.query
//   console.log('soooo', id)

//   useEffect(() => {
//     if (id) {
//       router.push(`/channel/${id}`)
//     }
//   }, [id, router])

//   const handleChannelClick = (
//     channelId: string = 'c62e286a8d2438b783f77dc8f714b468151256d879cec4251e0b142ae4c69390'
//   ) => {
//     router.push(`/channels/${channelId}`, `/channels/${channelId}`, {
//       shallow: true,
//     })
//   }

//   return (
//     <div style={{ display: 'flex' }}>
//       <XStack width={350}>
//         <Button onPress={() => handleChannelClick()}>Test</Button>
//         {/* <Link
//           href="/channel/c62e286a8d2438b783f77dc8f714b468151256d879cec4251e0b142ae4c69390"
//           legacyBehavior
//         >
//           <a style={{ color: 'black' }}>Go to channel Chess</a>
//         </Link> */}
//         <ChannelsScreen />
//       </XStack>
//       {id && <ChannelScreen />}
//     </div>
//   )
// }

// export default WebChannelsScreen

// import { ChannelsScreen } from 'app/features/chat/ChannelsScreen'
// import Link from 'next/link'
// import { XStack } from '@my/ui'

// const WebChannelsScreen = () => {
//   return (
//     <XStack width={350}>
//       <ChannelsScreen />
//   <Link
//     href="/channel/c62e286a8d2438b783f77dc8f714b468151256d879cec4251e0b142ae4c69390"
//     legacyBehavior
//   >
//     <a style={{ color: 'black' }}>Go to channel Chess</a>
//   </Link>
//     </XStack>
//   )
// }

// export default WebChannelsScreen
