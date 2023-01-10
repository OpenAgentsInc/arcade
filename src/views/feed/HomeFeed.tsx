import { useNostr } from 'app/lib/hooks'
import { useGlobalFeed } from 'app/lib/hooks/useGlobalFeed'
import { useEffect } from 'react'
import { Stack, Text } from 'tamagui'
import { Screen } from 'views/shared'

export const HomeFeed = () => {
  const nostr = useNostr()
  const events = useGlobalFeed()
  useEffect(() => {
    if (!nostr) return
    nostr.loadFirstPaint()
  }, [nostr])
  return (
    <Screen>
      <Stack f={1} justifyContent="center" alignItems="center">
        <Text color="$color12" fontSize={34}>
          {events.length} events.
        </Text>
      </Stack>
    </Screen>
  )
}
