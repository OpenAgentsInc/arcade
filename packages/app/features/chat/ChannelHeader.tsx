import * as React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
// import { Avatar } from 'react-native-paper'
// import { typography } from 'views/theme'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type Props = {
  channelName: string
  channelImageUrl: string
}

export const ChannelHeader: React.FC<Props> = ({ channelName, channelImageUrl }) => {
  const { goBack } = useNavigation()
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 38,
        paddingHorizontal: 10,
        marginTop: 40,
      }}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
        <AntDesign name="left" size={24} color="#329FFD" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          color: '#fff',
          //   , fontFamily: typography.bold
        }}
      >
        {channelName}
      </Text>
      <Image style={{ width: 30 }} source={{ uri: channelImageUrl }} />
    </View>
  )
}
