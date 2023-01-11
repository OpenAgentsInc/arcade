import { useRoute } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { MessageSquare, Zap } from '@tamagui/lucide-icons'
import { useUserMetadata } from 'lib/hooks'
import { useUserPosts } from 'lib/hooks/useUserPosts'
import { NostrEvent } from 'lib/nostr'
import {
  Avatar,
  Button,
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

  return (
    <Screen>
      <YStack width="100%" bg="$color8" height={COVER_HEIGHT}>
        <Image
          src={require('./cover.jpeg')}
          width="100%"
          height={COVER_HEIGHT}
          //   height="100%"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: COVER_HEIGHT,
            zIndex: 200,
          }}
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
      <XStack space="$3" justifyContent="flex-end" mt={-45} mr="$3">
        <Button size="$3" circular icon={<Zap />} />
        <Button size="$3" circular icon={<MessageSquare />} />
        <Button size="$3">Follow</Button>
      </XStack>

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

        {/* <XStack
          mt="$2"
          alignItems="center"
          justifyContent="space-evenly"
          space="$2"
        >
          <Paragraph size="$2" color="$color8">
            <Text fontWeight="700" color="$color11">
              392
            </Text>{' '}
            Following
          </Paragraph>
          <Paragraph size="$2" color="$color8">
            <Text fontWeight="700" color="$color11">
              4123
            </Text>{' '}
            Followers
          </Paragraph>
          <Paragraph size="$2" color="$color8">
            <Text fontWeight="700" color="$color11">
              5
            </Text>{' '}
            Relays
          </Paragraph>
        </XStack> */}

        {/* <XStack
          ml="$5"
          mt="$4"
          space="$2"
          alignItems="center"
          top={0}
          right={0}
        >
          <Repeat size={20} color="$color8" />
          <Paragraph size="$2" color="$color8">
            nikki ⚡ reposted
          </Paragraph>
        </XStack>
        <XStack mt="$2" space="$3" borderRadius="$2" width="85%">
          <Avatar size="$3" circular mt="$2">
            <Avatar.Image src="https://i.pravatar.cc/150?img=2" />
          </Avatar>
          <YStack space="$1">
            <XStack space="$2">
              <Paragraph size="$3" fontWeight="700">
                John Doe
              </Paragraph>
              <Paragraph size="$2" color="$color8" mt={1}>
                @johndoe
              </Paragraph>
              <Paragraph size="$2" color="$color8" ml={-2} mt={1}>
                • 2m
              </Paragraph>
            </XStack>
            <Paragraph size="$2" color="$color12">
              my pronouns are nostr/ich
            </Paragraph>
          </YStack>
        </XStack>

        <XStack mt="$6" space="$3" borderRadius="$2" width="85%">
          <Avatar size="$3" circular mt="$2">
            <Avatar.Image src="https://i.pravatar.cc/150?img=23" />
          </Avatar>
          <YStack space="$1">
            <XStack space="$2">
              <Paragraph size="$3" fontWeight="700">
                nikki ⚡
              </Paragraph>
              <Paragraph size="$2" color="$color8" mt={1}>
                @almosthuman
              </Paragraph>
              <Paragraph size="$2" color="$color8" ml={-2} mt={1}>
                • 7m
              </Paragraph>
            </XStack>
            <Paragraph size="$2" color="$color12">
              I wonder how I can sell crafts on here
            </Paragraph>
          </YStack>
        </XStack> */}
      </YStack>
      <FlashList
        data={posts}
        renderItem={({ item }: { item: NostrEvent }) => (
          <TextNote data={item} />
        )}
        estimatedItemSize={150}
      />
    </Screen>
  )
}
