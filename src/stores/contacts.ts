export interface ContactsState {
  friends: string[]
}

const initialUiState: ContactsState = {
  friends: [
    '00000000827ffaa94bfea288c3dfce4422c794fbb96625b6b31e9049f729d700', // cameri
    'npub1hu3hdctm5nkzd8gslnyedfr5ddz3z547jqcl5j88g4fame2jd08qh6h8nh', // carla
    'npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6', // fiatjaf
    'npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m', // jack
    'npub1xtscya34g58tk0z605fvr788k263gsu6cy9x0mhnm87echrgufzsevkk5s', // jb55
    'npub1ahxjq4v0zlvexf7cg8j9stumqp3nrtzqzzqxa7szpmcdgqrcumdq0h5ech', // natbrunell
    'npub1qny3tkh0acurzla8x3zy4nhrjz5zd8l9sy9jys09umwng00manysew95gx', // odell
  ],
}

export const createContactsStore = (set: any, get: any) => ({
  friends: initialUiState.friends,
})
