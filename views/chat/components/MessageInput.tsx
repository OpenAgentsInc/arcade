import { TouchableOpacity, View } from 'react-native'
import { IconButton, TextInput } from 'react-native-paper'
import { palette } from '../../../lib/palette'

export const MessageInput = () => {
  return (
    <View style={{ backgroundColor: palette.night, borderTopWidth: 1, padding: 6 }}>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <TextInput
          style={{ backgroundColor: palette.night, flexGrow: 1 }}
          placeholder='Message'
          placeholderTextColor={palette.blueBellFaded}
        />
        <TouchableOpacity activeOpacity={0.8}>
          <IconButton
            icon='send'
            iconColor={palette.blueBell}
            style={{ marginLeft: 10 }}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
