import { useRoute } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
// import { MessageSquare, Zap } from '@tamagui/lucide-icons'
import { useUserMetadata } from 'lib/hooks'
import { useUserPosts } from 'lib/hooks/useUserPosts'
import { NostrEvent } from 'lib/nostr'
import { StyleSheet } from 'react-native'
import {
  Avatar,
  Image,
  LinearGradient,
  Paragraph,
  Separator,
  XStack,
  YStack,
} from 'tamagui'
import { Screen } from 'views/shared'

import { TextNote } from '../feed/TextNote'

const COVER_HEIGHT = 130

export const ProfileScreen = () => {
  const pubkey = useRoute<any>().params.pubkey
  const metadata = useUserMetadata(pubkey)
  const posts = useUserPosts(pubkey)

  const ProfileHeader = () => (
    <>
      <YStack width="100%" bg="$color8" height={COVER_HEIGHT}>
        <Image
          src={require('./cover.jpeg')}
          width="100%"
          height={COVER_HEIGHT}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}
          style={styles.gradient}
        />
      </YStack>
      <Avatar
        circular
        size={120}
        mt={-60}
        ml="$3"
        borderWidth={2}
        borderColor="$color3"
        elevation="$16"
      >
        <Avatar.Image src={metadata.picture} />
        <Avatar.Fallback bc="$background" />
      </Avatar>
      <XStack space="$3" justifyContent="flex-end" mt={-45} mr="$3" h="$3" />

      <YStack pt="$4" px="$4">
        <Paragraph size="$6">
          {metadata.display_name ?? metadata.name}
        </Paragraph>
        <Paragraph size="$3" color="$color9" mt={-4}>
          {`@${metadata.name}`}
        </Paragraph>

        <Paragraph size="$2" lineHeight="$1" mt="$2">
          {metadata.about}
        </Paragraph>

        <Separator mt="$5" mb={0} pb={0} />
      </YStack>
    </>
  )

  return (
    <Screen>
      <FlashList
        ListHeaderComponent={ProfileHeader}
        data={posts}
        renderItem={({ item }: { item: NostrEvent }) => (
          <TextNote data={item} />
        )}
        estimatedItemSize={150}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: COVER_HEIGHT,
    zIndex: 200,
  },
})
