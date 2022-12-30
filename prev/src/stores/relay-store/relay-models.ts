import { Instance, types } from 'mobx-state-tree'

export const EventModel = types.model('Event').props({
  content: types.frozen(),
  created_at: types.number,
  kind: types.number,
  id: types.identifier,
  pubkey: types.string,
  sig: types.string,
  tags: types.frozen(),
})

export const UserMetadataModel = types.model('UserMetadata').props({
  about: types.string,
  created_at: types.number,
  displayName: types.string,
  picture: types.string,
  pubkey: types.identifier,
  username: types.string,
})

export interface Event extends Instance<typeof EventModel> {}
export interface UserMetadata extends Instance<typeof UserMetadataModel> {}
