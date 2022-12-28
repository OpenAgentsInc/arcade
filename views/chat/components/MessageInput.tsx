import { View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
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
        <Button
          labelStyle={{ color: palette.moonRaker }}
          style={{ marginLeft: 10 }}
          mode='contained'>
          Send
        </Button>
      </View>
    </View>
  )
}
