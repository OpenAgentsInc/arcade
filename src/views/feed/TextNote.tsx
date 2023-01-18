import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Heart } from '@tamagui/lucide-icons'
import { handleEvent, useRelayPool } from 'app/lib/nostr'
import { AuthedStackParams } from 'app/navigation/AuthedNavigator'
import { useStore } from 'app/stores'
import { Note } from 'app/stores/eventTypes'
import { useUserMetadata } from 'lib/hooks'
import {
  generateRandomPlacekitten,
  hexToBech32,
  parseId,
  timeAgoSince,
  timeNowInSeconds,
  truncateString,
} from 'lib/utils'
import { getEventHash, signEvent } from 'nostr-tools'
import React, { useMemo } from 'react'
import { Avatar, Button, Paragraph, XStack, YStack } from 'tamagui'

export const TextNote = (props: { data: Note }) => {
  const data = props.data

  const didReactionSubscribe = React.useRef(false)

  const privateKey = useStore((s) => s.user.privateKey)
  const publicKey = useStore((s) => s.user.publicKey)
  const reactions = useStore((s) => s.reactions)

  const reactionsForNote = reactions[data.id] || {}

  const ownLikeReaction: boolean = React.useMemo(
    () =>
      Object.values(reactionsForNote).some(
        (reaction) =>
          hexToBech32('npub', reaction.pubkey) ===
          hexToBech32('npub', publicKey)
      ),
    [reactionsForNote]
  )

  const onlyLikeReactions = React.useMemo(
    () =>
      Object.values(reactionsForNote).filter(
        (reaction) => !['-', '👎'].includes(reaction.content) // filter out negatives/downvotes
      ),
    [reactionsForNote]
  )

  const likedState = React.useRef(ownLikeReaction)
  const [liked, setLiked] = React.useState(ownLikeReaction)

  const time = timeAgoSince(new Date(data.created_at * 1000))
  const metadata = useUserMetadata(data.pubkey)
  const name =
    (metadata?.display_name ?? metadata?.name) || truncateString(data.pubkey, 8)
  const username = `${metadata?.name}` || ''
  const picture = useMemo(
    () => metadata?.picture || generateRandomPlacekitten(),
    [metadata]
  )

  const relaypool = useRelayPool()
  React.useEffect(() => {
    if (!didReactionSubscribe.current) {
      relaypool.relayPool?.subscribe(
        [
          {
            kinds: [7],
            id: `thread-related:${parseId(data.id).substring(0, 8)}`,
            '#e': [data.id],
          },
        ],
        relaypool.relays.map((relay) => relay.url),
        (event) => handleEvent(event)
      )

      didReactionSubscribe.current = true
    }
  }, [data])

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthedStackParams>>()

  function handleReaction() {
    if (likedState.current) {
      return
    }

    likedState.current = !likedState.current
    setLiked((prev) => !prev)

    const event: any = {
      content: '+',
      created_at: timeNowInSeconds(),
      kind: 7,
      pubkey: publicKey,
      tags: [
        ['e', parseId(data.id)],
        ['p', parseId(data.pubkey)],
      ],
    }

    event.id = getEventHash(event)
    event.sig = signEvent(event, privateKey)

    relaypool.relayPool?.publish(
      event,
      relaypool.relays.map((relay) => relay.url)
    )
  }

  return (
    <XStack
      mt="$5"
      space="$3"
      borderRadius="$2"
      width="85%"
      px="$2"
      onPress={() => console.log(data)}
    >
      <Avatar
        size="$3"
        circular
        mt="$2"
        onPress={() => navigate('profile', { pubkey: data.pubkey })}
        pressStyle={{ opacity: 0.8 }}
      >
        <Avatar.Image src={picture} />
      </Avatar>
      <YStack space="$1">
        <XStack space="$2">
          <Paragraph size="$3" fontWeight="700">
            {name}
          </Paragraph>
          <Paragraph size="$2" color="$color8" mt={1}>
            {username}
          </Paragraph>
          <Paragraph size="$2" color="$color8" ml={-2} mt={1}>
            • {time}
          </Paragraph>
        </XStack>
        <Paragraph size="$2" color="$color12">
          {data.content}
        </Paragraph>
        <XStack space="$2">
          <Button
            onClick={handleReaction}
            size="$2"
            color={liked ? '$color12' : '$color8'}
            icon={Heart}
          >
            <Paragraph
              size="$3"
              color={liked ? '$color12' : '$color8'}
              fontWeight="700"
            >
              {onlyLikeReactions.length + (liked && !ownLikeReaction ? 1 : 0)}
            </Paragraph>
          </Button>
        </XStack>
      </YStack>
    </XStack>
  )
}
