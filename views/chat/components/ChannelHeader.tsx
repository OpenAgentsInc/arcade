import * as React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Avatar, IconButton } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  channelName: string
  channelImageUrl: string
}

export const ChannelHeader: React.FC<Props> = ({ channelName, channelImageUrl }) => {
  //   const navigation = useNavigation()
  const goBack = () => {
    // navigation.goBack()
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={goBack}>
        <AntDesign name='left' size={24} color='#329FFD' />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, color: '#fff' }}>{channelName}</Text>
      <Avatar.Image size={40} source={{ uri: channelImageUrl }} />
    </View>
  )
}
