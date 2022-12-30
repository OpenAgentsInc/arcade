import { display } from 'lib'
import { generateRandomPlacekitten } from 'lib/placekitten'
import { UserStore } from '../user-store'

export interface SignupProps {
  username: string
  displayName?: string
  about?: string
}

export const signup = async (self: UserStore, { username, displayName, about }: SignupProps) => {
  const metadata = {
    name: username,
    displayName,
    about,
    picture: generateRandomPlacekitten(),
    website: null,
  }

  await self.rootStore.user.createKeypair()
  await self.rootStore.relay.connect()
  await self.env.nostr.saveMetadata(metadata)
  self.setUsername(username)
  self.setAuthed(true)
  if (displayName && displayName.length > 0) {
    self.setDisplayName(displayName)
  }
  if (about && about.length > 0) {
    self.setAbout(about)
  }

  display({
    name: 'signup',
    preview: `Signed up ${username}`,
    value: {
      about,
      displayName,
      metadata,
      username,
    },
  })
  return true
}
