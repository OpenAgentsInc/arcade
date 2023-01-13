import { useNavigation } from '@react-navigation/native'
import { db } from 'lib/database'
import { databaseReport } from 'lib/database/databaseReport'
import { getFriendMetadata } from 'lib/nostr/getFriendMetadata'
import { useEffect } from 'react'
import { Stack, Text } from 'tamagui'

import { Screen } from '../shared'

export const FirstLoadScreen = () => {
  const navigation = useNavigation<any>()
  const navToTabs = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'tabs' }],
    })
  }

  const doFirstLoad = async () => {
    // First we'll check to see what's in the database
    const tableCounts = await databaseReport(db)
    console.log(tableCounts)

    // const evt = await getFriendMetadata()
    // console.log(evt)
  }

  useEffect(() => {
    setTimeout(() => {
      doFirstLoad()
    }, 2000)
  }, [])

  return (
    <Screen>
      <Stack f={1} jc="center" ai="center">
        <Text color="$color10" fontSize={24}>
          Let's load stuff
        </Text>
      </Stack>
    </Screen>
  )
}
