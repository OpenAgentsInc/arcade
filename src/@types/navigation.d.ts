import { Channel } from 'app/stores/chat'

type StackNavigatorParams = {
  home: undefined
  create: undefined
  login: undefined
  channel: { channel: Channel }
}
