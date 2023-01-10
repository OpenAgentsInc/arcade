export interface ContactsState {
  friends: string[]
}

const initialUiState: ContactsState = {
  friends: [],
}

export const createContactsStore = (set: any, get: any) => ({
  friends: initialUiState.friends,
})
