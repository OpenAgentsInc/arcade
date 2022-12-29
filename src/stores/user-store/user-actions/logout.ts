import * as SecureStore from 'expo-secure-store'
import { UserStore } from '../user-store'

export const logout = async (self: UserStore) => {
  self.reset()
  self.rootStore.relay.reset()
  self.env.nostr.unsubscribeAll()
  const storeAvailable = await SecureStore.isAvailableAsync()
  if (storeAvailable) {
    await SecureStore.deleteItemAsync('ARC_NPUB')
    await SecureStore.deleteItemAsync('ARC_NSEC')
    await SecureStore.deleteItemAsync('ARC_MNEMONIC')
  }
}
