import { User } from './eventTypes'
import { useStore } from './index'

export const addUserHelper = (user: User) => {
  const state = useStore.getState()

  if (!state.users.find((u) => u.pubkey === user.pubkey)) {
    useStore.setState({
      users: [...state.users, user],
    })
    console.log('USER ADDED')
  } else {
    console.log('USER ALREADY EXIST')
  }
}
