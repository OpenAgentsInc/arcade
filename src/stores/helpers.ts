import {
  Channel,
  ChannelMessage,
  DirectMessage,
  Note,
  User,
} from './eventTypes'
import { useStore } from './index'

export const addDirectMessageHelper = (directMessage: DirectMessage) => {
  const state = useStore.getState()
  if (!state.dms.find((dm) => dm.id === directMessage.id)) {
    useStore.setState({
      dms: [...state.dms, directMessage],
    })
  }
}

export const addUserHelper = (user: User) => {
  const state = useStore.getState()
  if (!state.users.find((u) => u.pubkey === user.pubkey)) {
    useStore.setState({
      users: [...state.users, user],
    })
  }
}

export const addChannelHelper = (channel: Channel) => {
  const state = useStore.getState()
  if (!state.channels.find((c) => c.id === channel.id)) {
    useStore.setState({
      channels: [...state.channels, channel],
    })
  }
}

export const addChannelMessageHelper = (channelMessage: ChannelMessage) => {
  const state = useStore.getState()
  if (!state.channelMessages.find((cm) => cm.id === channelMessage.id)) {
    useStore.setState({
      channelMessages: [...state.channelMessages, channelMessage],
    })
  }
}

export const addNoteHelper = (note: Note) => {
  const state = useStore.getState()
  if (!state.notes.find((n) => n.id === note.id)) {
    useStore.setState({
      notes: [...state.notes, note],
    })
  }
}
