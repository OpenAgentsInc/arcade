import { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { color, palette } from 'views/theme'

import type { DeepPartial, Theme } from 'stream-chat-expo'

export const useStreamChatTheme = () => {
  // const colorScheme = useColorScheme()
  const colorScheme = 'light'
  const getChatStyle = (): DeepPartial<Theme> => ({
    colors:
      // colorScheme === 'dark'
      {
        accent_blue: palette.electricIndigo,
        accent_green: 'cyan',
        accent_red: palette.radicalRed,
        bg_gradient_end: '#101214',
        bg_gradient_start: '#070A0D',
        black: palette.moonRaker,
        blue_alice: '#00193D',
        border: '#141924',
        button_background: '#FFFFFF',
        button_text: '#005FFF',
        grey: palette.blueBell,
        grey_gainsboro: palette.portGore, // message bg and send button
        grey_whisper: palette.blueBell,
        icon_background: '#FFFFFF',
        modal_shadow: '#000000',
        dateHeader: palette.blueBellFaded,
        // overlay: `${palette.blueBell}CC`, // CC = 80% opacity
        overlay: `#000000CC`, // CC = 80% opacity
        shadow_icon: `${palette.blueBell}80`, // 80 = 50% opacity
        targetedMessageBackground: '#333024',
        transparent: 'transparent',
        white: color.background,
        white_smoke: '#13151B',
        white_snow: palette.haiti,
      },
    // {
    //   accent_blue: palette.electricIndigo,
    //   accent_green: '#20E070',
    //   accent_red: '#FF3742',
    //   bg_gradient_end: '#F7F7F7',
    //   bg_gradient_start: '#FCFCFC',
    //   black: palette.moonRaker,
    //   blue_alice: '#E9F2FF',
    //   border: '#00000014', // 14 = 8% opacity; top: x=0, y=-1; bottom: x=0, y=1
    //   button_background: '#005FFF',
    //   button_text: '#FFFFFF',
    //   grey: palette.blueBell,
    //   grey_gainsboro: palette.purple,
    //   grey_whisper: palette.blueBell,
    //   icon_background: '#FFFFFF',
    //   modal_shadow: '#00000099', // 99 = 60% opacity; x=0, y= 1, radius=4
    //   overlay: '#00000099', // 99 = 60% opacity
    //   shadow_icon: '#00000040', // 40 = 25% opacity; x=0, y=0, radius=4
    //   targetedMessageBackground: '#FBF4DD', // dark mode = #302D22
    //   transparent: 'transparent',
    //   white: palette.haiti,
    //   white_smoke: palette.haiti,
    //   white_snow: palette.haiti,
    // },
  })
  const [chatStyle, setChatStyle] = useState(getChatStyle())

  useEffect(() => {
    setChatStyle(getChatStyle())
  }, [colorScheme])

  return chatStyle
}
