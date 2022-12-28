import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  channelName: string
  channelImageUrl: string
}

export const ChannelHeader: React.FC<Props> = ({ channelName, channelImageUrl }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <TouchableOpacity activeOpacity={0.8}>
        <AntDesign name='left' size={24} color='#329FFD' />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, color: '#fff' }}>{channelName}</Text>
      <Avatar.Image size={40} source={{ uri: channelImageUrl }} />
    </View>
  )
}
