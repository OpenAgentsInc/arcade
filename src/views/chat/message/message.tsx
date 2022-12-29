// import { useNavigation } from '@react-navigation/native'
import { generateRandomPlacekitten } from 'lib/placekitten'
import moment from 'moment'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { useStores } from 'stores/root-store'
// import { Text } from '@arcadecity/ui'
// import { Avatar, Text } from 'views/shared'
import { MessagePresetNames, messagePresets } from './message.presets'

// import { Message as MessageType } from '@arcadecity/use-arcade'

interface Props {
  message: any
  preset: MessagePresetNames
  setSelectedPlayer?: any
}

export const MessagePreview: React.FC<Props> = React.memo(({ message, preset }) => {
  const { relay } = useStores()
  const metadata = relay.getUserMetadata(message.pubkey)

  const username =
    metadata?.displayName || metadata?.username || `Anon-${message.pubkey.slice(0, 5)}`

  const text = message.content || JSON.parse(message.content).text
  // const username = metadata.username ?? `Anon-${message.pubkey.slice(0, 5)}`
  const date = message.created_at * 1000
  const photo = metadata?.picture || generateRandomPlacekitten() // TODO: pull this from the message user metadata

  const delivered = true
  const messagePreset: any = messagePresets[preset]
  const deliveryTime = moment(date).fromNow()

  return (
    <View key={`${deliveryTime}`}>
      <View style={messagePreset.container}>
        <View style={messagePreset.textBubble}>
          <Text style={messagePreset.textContent}>{text}</Text>
        </View>
        {delivered && (
          <View style={{ flexDirection: 'column-reverse' }}>
            <Image source={{ uri: photo }} style={{ width: 40, height: 40, borderRadius: 8 }} />
            {/* <Avatar
              preset='s32x32'
              uri={photo}
              style={{ flexDirection: 'row-reverse' }}
              forOnPress={() => {
                setParams({ username })
                navigate('inbox', {
                  screen: 'profile',
                  params: { username },
                })
              }}
            /> */}
          </View>
        )}
      </View>
      <View>
        {delivered ? (
          <View style={messagePreset.date}>
            <Text style={messagePreset.dateText}>
              {username} - {deliveryTime}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  )
})
