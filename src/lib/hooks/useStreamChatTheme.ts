import { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { color, palette } from 'views/theme'

import type { DeepPartial, Theme } from 'stream-chat-expo'

export const useStreamChatTheme = () => {
  const colorScheme = useColorScheme()
  const getChatStyle = (): DeepPartial<Theme> => ({
    avatar: {
      image: {
        height: 32,
        width: 32,
      },
    },
    colors:
      colorScheme === 'dark'
        ? {
            accent_blue: '#005FFF',
            accent_green: '#20E070',
            accent_red: '#FF3742',
            bg_gradient_end: '#101214',
            bg_gradient_start: '#070A0D',
            black: '#FFFFFF',
            blue_alice: '#00193D',
            border: '#141924',
            grey: '#7A7A7A',
            grey_gainsboro: '#2D2F2F',
            grey_whisper: '#1C1E22',
            icon_background: '#FFFFFF',
            modal_shadow: '#000000',
            overlay: '#00000066', // 66 = 40% opacity
            overlay_dark: '#FFFFFFCC', // CC = 80% opacity
            shadow_icon: '#00000080', // 80 = 50% opacity
            targetedMessageBackground: '#302D22',
            transparent: 'transparent',
            white: '#101418', // message input
            white_smoke: '#13151B',
            white_snow: '#070A0D', // main BG
          }
        : {
            accent_blue: '#005FFF',
            accent_green: '#20E070',
            accent_red: '#FF3742',
            bg_gradient_end: '#F7F7F7',
            bg_gradient_start: '#FCFCFC',
            black: '#000000',
            blue_alice: '#E9F2FF',
            border: '#00000014', // 14 = 8% opacity; top: x=0, y=-1; bottom: x=0, y=1
            grey: '#7A7A7A',
            grey_gainsboro: '#DBDBDB',
            grey_whisper: '#ECEBEB',
            icon_background: '#FFFFFF',
            modal_shadow: '#00000099', // 99 = 60% opacity; x=0, y= 1, radius=4
            overlay: '#00000033', // 33 = 20% opacity
            overlay_dark: '#00000099', // 99 = 60% opacity
            shadow_icon: '#00000040', // 40 = 25% opacity; x=0, y=0, radius=4
            targetedMessageBackground: '#FBF4DD', // dark mode = #302D22
            transparent: 'transparent',
            white: '#FFFFFF',
            white_smoke: '#F2F2F2',
            white_snow: '#FCFCFC',
          },
    imageGallery: {
      blurType: colorScheme === 'dark' ? 'dark' : 'light',
    },
    spinner: {
      height: 15,
      width: 15,
    },
  })

  // const getChatStyle = (): DeepPartial<Theme> => ({
  //   messageSimple: {
  //     content: {
  //       deletedContainer: {
  //         backgroundColor: 'transparent', // Set the background color for the deleted message container
  //         display: 'none', // Hide the deleted message container
  //       },
  //     },
  //   },
  //   dateHeader: {
  //     container: {
  //       display: 'none', // Hide the date header
  //     },
  //   },
  //   inlineDateSeparator: {
  //     container: {
  //       backgroundColor: palette.portGore, // Set the background color to transparent or any other color you prefer
  //       margin: 5,
  //       height: 30,
  //       borderRadius: 15,
  //     },
  //     text: {
  //       color: palette.white, // Set the text color to your preferred color
  //     },
  //   },
  //   colors: {
  //     accent_blue: palette.electricIndigo,
  //     accent_green: 'cyan',
  //     accent_red: palette.radicalRed,
  //     bg_gradient_end: '#101214',
  //     bg_gradient_start: '#070A0D',
  //     black: palette.moonRaker,
  //     blue_alice: '#00193D',
  //     border: '#141924',
  //     button_background: '#FFFFFF',
  //     button_text: '#005FFF',
  //     grey: palette.blueBell,
  //     grey_gainsboro: palette.portGore, // message bg and send button
  //     grey_whisper: palette.blueBell,
  //     icon_background: '#FFFFFF',
  //     modal_shadow: '#000000',
  //     // dateHeader: palette.blueBellFaded,
  //     // overlay: `${palette.blueBell}CC`, // CC = 80% opacity
  //     overlay: `#000000CC`, // CC = 80% opacity
  //     shadow_icon: `${palette.blueBell}80`, // 80 = 50% opacity
  //     targetedMessageBackground: '#333024',
  //     transparent: 'transparent',
  //     white: color.background,
  //     white_smoke: '#13151B',
  //     white_snow: palette.haiti,
  //   },
  // })
  const [chatStyle, setChatStyle] = useState(getChatStyle())

  useEffect(() => {
    setChatStyle(getChatStyle())
  }, [])

  return chatStyle
}
