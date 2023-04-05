import { useEffect, useState } from 'react'
import { color, palette } from 'views/theme'

import type { DeepPartial, Theme } from 'stream-chat-expo'

export const useStreamChatTheme = () => {
  // const getChatStyle = (): DeepPartial<Theme> => ({
  //   messageSimple: {
  //     content: {
  //       deletedContainer: {
  //         backgroundColor: 'transparent',
  //         display: 'none',
  //       },
  //     },
  //   },
  //   dateHeader: {
  //     container: {
  //       display: 'none',
  //     },
  //   },
  //   inlineDateSeparator: {
  //     container: {
  //       backgroundColor: palette.backgroundMetallicBlue,
  //       margin: 5,
  //       height: 30,
  //       borderRadius: 15,
  //     },
  //     text: {
  //       color: palette.white,
  //     },
  //   },
  //   colors: {
  //     accent_blue: palette.electricBlue,
  //     accent_green: palette.neonOrange,
  //     accent_red: palette.orangeGlow,
  //     bg_gradient_end: palette.backgroundBlue,
  //     bg_gradient_start: palette.backgroundMetallicBlue,
  //     black: palette.metallic,
  //     blue_alice: palette.secondaryBlue,
  //     border: palette.backgroundMetallicBlue,
  //     button_background: palette.white,
  //     button_text: palette.electricBlue,
  //     grey: palette.secondaryBlue,
  //     grey_gainsboro: palette.backgroundBlue,
  //     grey_whisper: palette.secondaryBlue,
  //     icon_background: palette.white,
  //     modal_shadow: palette.metallic,
  //     overlay: `#000000CC`,
  //     shadow_icon: `${palette.secondaryBlue}80`,
  //     targetedMessageBackground: palette.backgroundMetallicBlue,
  //     transparent: 'transparent',
  //     white: palette.white,
  //     white_smoke: palette.backgroundBlue,
  //     white_snow: palette.backgroundMetallicBlue,
  //   },
  // })

  const getChatStyle = (): DeepPartial<Theme> => ({
    messageSimple: {
      content: {
        deletedContainer: {
          backgroundColor: 'transparent', // Set the background color for the deleted message container
          display: 'none', // Hide the deleted message container
        },
      },
    },
    dateHeader: {
      container: {
        display: 'none', // Hide the date header
      },
    },
    inlineDateSeparator: {
      container: {
        backgroundColor: palette.portGore, // Set the background color to transparent or any other color you prefer
        margin: 5,
        height: 30,
        borderRadius: 15,
      },
      text: {
        color: palette.white, // Set the text color to your preferred color
      },
    },
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
      // dateHeader: palette.blueBellFaded,
      // overlay: `${palette.blueBell}CC`, // CC = 80% opacity
      overlay: `#000000CC`, // CC = 80% opacity
      shadow_icon: `${palette.blueBell}80`, // 80 = 50% opacity
      targetedMessageBackground: '#333024',
      transparent: 'transparent',
      white: color.background,
      white_smoke: '#13151B',
      white_snow: '#0a0a0a', // Main BG
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
