import { useNostr } from 'app/lib/hooks'
import { useEffect } from 'react'
import { Text } from 'tamagui'
import { Screen } from 'views/shared'

export const HomeFeed = () => {
  const nostr = useNostr()
  useEffect(() => {
    if (!nostr) return
    console.log("Let's check out our Nostr object:", nostr)
    nostr.loadFirstPaint()
  }, [nostr])
  return (
    <Screen>
      <Text>Hello.</Text>
    </Screen>
  )
}
