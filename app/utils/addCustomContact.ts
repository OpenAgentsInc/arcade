import { nip19, queryProfile } from 'nostr-tools';

const hexRegEx = /^[0-9A-Fa-f]{64}$/;
const suffixes = ['@damus.io', '@arcade.chat', '@iris.to'];

async function resolvePubkey(input: string): Promise<string | undefined> {
    if (input.startsWith('npub')) {
        return nip19.decode(pubkey).data.toString()
    } else if (hexRegEx.test(input)) {
        return input;
    } else if (input.startsWith('@') {
        if (input.includes('.')) {
            try {
                const profile = await queryProfile(input);
                return profile && profile!pubkey;
            } catch (err) {
                console.error(`Error while trying to resolve pubkey for ${input.substring(1) + suffix}`, err);
            }

        }

        for (const suffix of suffixes) {
            try {
                const result = await resolvePubkey(input.substring(1) + suffix);
                if (result) {
                    return result;
                }
            } catch (err) {
                console.error(`Error while trying to resolve pubkey for ${input.substring(1) + suffix}`, err);
            }
        }
    } else if (input.includes('@')) {
        const profile = await queryProfile(input);
        return profile?.pubkey;
    }
}



export async function addCustomContact(input: string) => {
     
    let pubkey: string = input.trim()
    if (pubkey.substring(0, 4) === "npub") {
      pubkey = nip19.decode(pubkey).data.toString()
    }
    if (pubkey && !contacts.find((el) => el.pubkey === pubkey)) {
      try {
        addContact({ pubkey, legacy: true, secret: false }, mgr)
      } catch (e) {
        alert(`Invalid contact: ${e}`)
      }
    }
    navigation.goBack()
  }

