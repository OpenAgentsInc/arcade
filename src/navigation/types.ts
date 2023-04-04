/**
 * These types allow TypeScript to know what routes are defined in each navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

import { Channel } from 'stream-chat'
import { DefaultStreamChatGenerics } from 'stream-chat-expo'
import {
    NavigationContainer, NavigationProp, RouteProp
} from '@react-navigation/native'

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export type RootNavigatorParamList = {
  main: undefined
}

export type StreamNavigatorParamList = {
  streamhome: undefined
  ChannelScreen: {
    channel: Channel<DefaultStreamChatGenerics>
  }
}
