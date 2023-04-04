import { useEffect, useState } from 'react'
import { color, palette } from 'views/theme'

import type { DeepPartial, Theme } from 'stream-chat-expo'

export const useStreamChatTheme = () => {
  const getChatStyle = (): DeepPartial<Theme> => ({
    colors: {
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
  })
  const [chatStyle, setChatStyle] = useState(getChatStyle())

  useEffect(() => {
    setChatStyle(getChatStyle())
  }, [])

  return chatStyle
}
