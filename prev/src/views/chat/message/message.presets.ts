import { Platform, TextStyle, ViewStyle } from 'react-native'
import { color, spacing, typography } from 'views/theme'

const STATUS_ROW = {
  marginVertical: spacing[2],
  marginLeft: spacing[2],
  flexDirection: 'row',
}

const BASE_MESSAGE = {
  container: {
    flexDirection: 'row',
    marginTop: 20,
  } as ViewStyle,
  avatarContainer: {
    alignSelf: 'flex-end',
  } as ViewStyle,
  textBubble: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: color.palette.moonRaker,
    paddingHorizontal: spacing[2],
    marginRight: spacing[4],
    ...Platform.select({
      ios: {
        shadowColor: color.palette.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      // android: {  TODO: Figure out why this causes typescript error
      //   elevation: 5,
      // },
    }),
  } as ViewStyle,
  textContent: {
    marginHorizontal: spacing[4],
    marginVertical: spacing[4],
    color: color.palette.minsk,
    fontFamily: typography.primary,
  } as TextStyle,
  date: {
    ...STATUS_ROW,
  } as ViewStyle,
  dateText: {
    fontSize: 11,
    color: color.palette.blueBell,
    fontFamily: typography.primary,
  } as TextStyle,
  error: {
    ...STATUS_ROW,
  } as ViewStyle,
  errorText: {
    fontSize: 12,
    color: color.error,
    fontFamily: typography.primary,
  } as TextStyle,
  errorIcon: {
    marginRight: spacing[1],
    alignSelf: 'center',
  },
}

export const messagePresets = {
  sent: BASE_MESSAGE,
  received: {
    ...BASE_MESSAGE,
    container: {
      flexDirection: 'row-reverse',
      marginTop: 20,
    } as ViewStyle,
    textBubble: {
      ...BASE_MESSAGE.textBubble,
      marginRight: 0,
      marginLeft: spacing[4],
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 0,
      backgroundColor: color.palette.electricIndigo,
    } as ViewStyle,
    textContent: {
      ...BASE_MESSAGE.textContent,
      color: color.palette.moonRaker,
    } as TextStyle,
    date: {
      ...BASE_MESSAGE.date,
      justifyContent: 'flex-end',
      marginRight: spacing[2],
    } as ViewStyle,
    error: {
      ...BASE_MESSAGE.error,
      justifyContent: 'flex-end',
      marginRight: spacing[2],
    } as ViewStyle,
  },
}
/**
 * A list of preset names.
 */
export type MessagePresetNames = keyof typeof messagePresets
