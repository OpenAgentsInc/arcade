import { display } from 'lib'
import { NostrEventToSerialize, NostrKind, relayPool } from 'lib/nostr'
import { timeNowInSeconds } from 'lib/utils'

export class Nostr {
  pool: any
  publicKey: string | undefined
  privateKey: string | undefined

  constructor() {
    this.pool = relayPool()
  }

  async unsubscribeAll() {
    this.pool.removeRelay('wss://arc1.arcadelabs.co')
    console.log('Unsubscribed from all relays')
  }

  setKeys(publicKey: string, privateKey: string) {
    this.publicKey = publicKey
    this.privateKey = privateKey
    this.pool.setPrivateKey(privateKey)
  }

  ensureKeys() {
    if (!this.publicKey || !this.privateKey) {
      throw new Error('No public or private key set')
    }
  }

  async connect(publicKey: string, privateKey: string) {
    this.setKeys(publicKey, privateKey)
    this.pool.addRelay('wss://arc1.arcadelabs.co', { read: true, write: true })
    // this.createDummyChannels()
  }

  async sendChannelMessage(channelId: string, text: string) {
    this.ensureKeys()
    const event: NostrEventToSerialize = {
      content: text,
      created_at: timeNowInSeconds(),
      kind: NostrKind.channelmessage,
      pubkey: this.publicKey as string,
      tags: [['e', channelId]],
    }
    this.publish(event)
  }

  async saveMetadata(metadata) {
    this.ensureKeys()
    const event: NostrEventToSerialize = {
      content: JSON.stringify(metadata),
      created_at: timeNowInSeconds(),
      kind: NostrKind.metadata,
      pubkey: this.publicKey as string,
      tags: [],
    }
    await this.publish(event)
  }

  async publish(eventObject: NostrEventToSerialize) {
    this.ensureKeys()
    display({
      name: 'Nostr.publish',
      preview: `Attempting to publish...`,
      value: { eventObject },
    })
    await this.pool.publish(eventObject, (status, url) => {
      if (status === 0) {
        console.log(`publish request sent to ${url}`)
      }
      if (status === 1) {
        console.log(`event published by ${url}`) // , ev
        display({
          name: 'Nostr.publish',
          preview: `Event published by ${url}`,
          value: eventObject,
        })
      }
    })
  }

  async publishTestEvent() {
    this.ensureKeys()
    const event: NostrEventToSerialize = {
      content: 'Hello!',
      created_at: timeNowInSeconds(),
      kind: 1,
      pubkey: this.publicKey as string,
      tags: [],
    }
    this.publish(event)
  }

  async createDummyChannels() {
    this.ensureKeys()
    const channels = [
      {
        name: 'Bitcoin',
        about: 'Talk about Bitcoin.',
        picture: 'https://arcade.city/img/bitcoin.png',
      },
      {
        name: 'Ridesharing',
        about: 'Talk about ridesharing.',
        picture: 'https://arcade.city/img/bitcoincar.png',
      },
      {
        name: 'World Chat',
        about: 'Talk about anything.',
        picture: 'https://arcade.city/img/earth.png',
      },
      {
        name: 'Arcade City',
        about: 'Talk about this app.',
        picture: 'https://arcade.city/img/emails/rides.png',
      },
    ]
    channels.forEach((channel) => {
      const event: NostrEventToSerialize = {
        content: JSON.stringify({
          about: channel.about,
          name: channel.name,
          picture: channel.picture,
        }),
        created_at: timeNowInSeconds(),
        kind: 40,
        pubkey: this.publicKey as string,
        tags: [],
      }
      this.publish(event)
    })
  }
}
