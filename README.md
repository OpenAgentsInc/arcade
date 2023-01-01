# Arc

A cross-platform [Nostr](https://github.com/nostr-protocol/nostr) chat client, currently pre-alpha.

Focuses first on implementing [NIP-28](https://github.com/nostr-protocol/nips/blob/master/28.md) for a Telegram-like experience.

We use [React Native](https://reactnative.dev/), [Expo](https://expo.dev/), and [Tamagui](https://tamagui.dev/) to target Android, iOS & web with one codebase.

The `main` branch is automatically deployed to https://arc-next-azure.vercel.app. It may or may not be usable.

Follow [@TheArcApp on Twitter](https://twitter.com/TheArcApp) for updates.

|                                                                                                                                           |                                                                                                                                               |                                                                                                                                            |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="700" alt="chats" src="https://user-images.githubusercontent.com/14167547/209855695-e8597eb9-7850-4904-9e92-1d9f42424a4a.png"> | <img width="700" alt="textinput" src="https://user-images.githubusercontent.com/14167547/209863990-54c869d7-9f2a-4db2-87fc-adc1f9156546.png"> | <img width="700" alt="device" src="https://user-images.githubusercontent.com/14167547/210024319-9af65899-9ec8-4b2c-add0-f4f6fbafb16c.png"> |

## Architecture

Documenting on our wiki:

- [Authentication](https://github.com/ArcadeLabsInc/arc/wiki/Authentication)

## Running locally

This is pre-alpha and very little works. But if you like bugs and pain, here are the basics:

1. `git clone git@github.com:ArcadeLabsInc/arc.git`
2. `cd arc`
3. `yarn`
4. `yarn start`
5. Scan the QR code with Expo Go (on Android) or the Camera app (iOS) to open the app on your device in Expo Go. Or press a or i to open in an emulator if you have one set up.

Consult the [Expo docs](https://docs.expo.dev/) for more details on environment setup, running on device or emulator, and building your own version via EAS.

To learn the basics of React Native, see this author's [React Native Lightning wallet workshop](https://arcadelabs.co/articles/intro-to-react-native).
