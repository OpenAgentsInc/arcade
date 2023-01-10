import { demoFriends } from './dummydata'

export interface ContactsState {
  friends: string[]
}

const initialUiState: ContactsState = {
  friends: demoFriends,
}

export const createContactsStore = (set: any, get: any) => ({
  friends: initialUiState.friends,
})
