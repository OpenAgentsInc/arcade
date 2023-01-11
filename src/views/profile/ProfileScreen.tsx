import { MessageSquare, Repeat, Zap } from '@tamagui/lucide-icons'
import {
  Avatar,
  Button,
  Image,
  LinearGradient,
  Paragraph,
  Text,
  XStack,
  YStack,
} from 'tamagui'
import { Screen } from 'views/shared'

export const ProfileScreen = () => {
  return (
    <Screen>
      <YStack width="100%" bg="$color8" height={110}>
        <Image
          src="https://source.unsplash.com/random/800x606"
          width="100%"
          height="100%"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 110,
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
      >
        <Avatar.Image src="https://i.pravatar.cc/150?img=23" />
        <Avatar.Fallback bc="$background" />
      </Avatar>
      <XStack space="$3" justifyContent="flex-end" mt={-45} mr="$3">
        <Button size="$3" circular icon={<Zap />} />
        <Button size="$3" circular icon={<MessageSquare />} />
        <Button size="$3">Follow</Button>
      </XStack>

      <YStack p="$4">
        <Paragraph size="$6">nikki ⚡</Paragraph>
        <Paragraph size="$3" color="$color9" mt={-4}>
          @almosthuman
        </Paragraph>

        <Paragraph size="$2" lineHeight="$1" mt="$2">
          I'm a software engineer and a designer. I love to build things that
          make people's lives easier.
        </Paragraph>

        <XStack
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
        </XStack>

        <XStack mt="$5" space="$3" borderRadius="$2" width="85%">
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
                • 38s
              </Paragraph>
            </XStack>
            <Paragraph size="$2" color="$color12">
              Just tried the new pizza place in town and it was amazing!
              Definitely recommend it.
            </Paragraph>
          </YStack>
        </XStack>

        <XStack
          ml="$5"
          mt="$4"
          space="$2"
          alignItems="center"
          top={0}
          right={0}
        >
          {/* <Button size="$3" circular icon={<Repeat />}></Button> */}
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
        </XStack>
      </YStack>
    </Screen>
  )
}
