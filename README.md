# Arc

A cross-platform [Nostr](https://github.com/nostr-protocol/nostr) client, currently pre-alpha.

We use [React Native](https://reactnative.dev/), [Expo](https://expo.dev/), and [Tamagui](https://tamagui.dev/) to target Android & iOS with one codebase.

Follow [@TheArcApp on Twitter](https://twitter.com/TheArcApp) for updates.

|                                                                                                                                           |                                                                                                                                             |                                                                                                                                             |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="700" alt="login" src="https://user-images.githubusercontent.com/14167547/210706813-2eccfe72-3d7f-4965-9516-d0f3436d8672.png"> | <img width="700" alt="nostrcn" src="https://user-images.githubusercontent.com/14167547/210685699-f9358d4b-1218-4041-8500-41b541dbb911.png"> | <img width="700" alt="profile" src="https://user-images.githubusercontent.com/14167547/210916398-663c44af-7a42-470a-8151-c86320e1279f.png"> |

## Features

Current and upcoming features in order of priority:

- [x] Read and send messages to [NIP-28](https://github.com/nostr-protocol/nips/blob/master/28.md) channels ([#22](https://github.com/ArcadeLabsInc/arc/pull/22))
- [x] Account creation ([#23](https://github.com/ArcadeLabsInc/arc/pull/23))
- [x] Log in with nsec ([#23](https://github.com/ArcadeLabsInc/arc/pull/23))
- [x] Key backup ([#23](https://github.com/ArcadeLabsInc/arc/pull/23))
- [x] Pick UI theme ([#23](https://github.com/ArcadeLabsInc/arc/pull/23))
- [x] Show user kind-0 name & picture ([#25](https://github.com/ArcadeLabsInc/arc/pull/25))
- [x] Curated global feed ([#34](https://github.com/ArcadeLabsInc/arc/pull/34))
- [x] Twitter-style profiles ([#35](https://github.com/ArcadeLabsInc/arc/pull/35))
- [ ] Display [NIP-05](https://github.com/nostr-protocol/nips/blob/master/05.md) identifiers
- [ ] Follower/following feed
- [ ] Contact lists ([NIP-02](https://github.com/nostr-protocol/nips/blob/master/02.md))
- [ ] Look up user by NIP-05 identifier
- [ ] Reactions ([NIP-25](https://github.com/nostr-protocol/nips/blob/master/25.md))
- [ ] Display URLs as clickable links
- [ ] Display images from people you follow
- [ ] Mentions ([NIP-08](https://github.com/nostr-protocol/nips/blob/master/08.md))
- [ ] Click to copy any user's npub
- [ ] Add/remove/recommend relays
- [ ] Unread channel messages
- [ ] Muting
- [ ] Internationalization
- [ ] Display/pay Lightning invoices
- [ ] Search messages and feeds
- [ ] Create channels
- [ ] Pinned channel messages
- [ ] Encrypted DMs ([NIP-04](https://github.com/nostr-protocol/nips/blob/master/04.md))
- [ ] Push notifications
- [ ] Channel invites
- [ ] Reposts ([NIP-08](https://github.com/nostr-protocol/nips/blob/master/18.md))
- [ ] Emojis
- [ ] Lightning wallets via [LNbits](https://lnbits.com/)
- [ ] Re-add web support
- [ ] Log in via web extension ([NIP-07](https://github.com/nostr-protocol/nips/blob/master/07.md))
- [ ] Paid DMs
- [ ] Channel moderators
- [ ] Private group chats ([NIP-38?](https://github.com/nostr-protocol/nips/pull/59))
- [ ] Each note/post has its own web URL
- [ ] Reputation ([NIP-32](https://github.com/nostr-protocol/nips/pull/46))
- [ ] UI theme marketplace
- [ ] Marketplace listings
- [ ] Voice messages
- [ ] Audio rooms
- [ ] Video chat
- [ ] E-commerce shops
- [ ] Bots
- [ ] Developer API

[Tweet us](https://twitter.com/TheArcApp) any feature requests.

## Web Support

As of [#28](https://github.com/ArcadeLabsInc/arc/pull/28), we removed the web app to focus first on Android and iOS apps. We will re-add web support later.

The previous web app will remain available temporarily at [alpha.thearcapp.com](https://alpha.thearcapp.com), but will not receive updates.

## Architecture

Documenting on our wiki:

- [Authentication](https://github.com/ArcadeLabsInc/arc/wiki/Authentication)

## Running locally

This is pre-alpha and very little works. But if you like bugs and pain, here are the basics:

1. `git clone git@github.com:ArcadeLabsInc/arc.git`
2. `cd arc`
3. `yarn`
4. `yarn start`

Consult the [Expo docs](https://docs.expo.dev/) for more details on environment setup, running on device or emulator, and building your own version via EAS.

To learn the basics of React Native, see this author's [React Native Lightning wallet workshop](https://arcadelabs.co/articles/intro-to-react-native).

## Contributing & Bounties

- Pull requests are welcome to implement any of the above features or do smart refactors.
- We'll pay a bounty of 1 million sats (BTC) to the first three people who submit a non-trivial PR we merge to main, max one per person.
- If you want ideas for good PRs or to coordinate your work - like you probably shouldn't do a big refactor without checking that we like the general direction - [DM us on Twitter](https://twitter.com/TheArcApp).
