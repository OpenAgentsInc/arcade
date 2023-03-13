import { getPublicKey, nip19, nip06 } from 'nostr-tools';

export function toPrivateKeyHex(anything: string): string {
  if (!anything || anything.length === 0) {
    throw new Error('data is empty');
  }

  if (nip06.validateWords(anything)) {
    return nip06.privateKeyFromSeedWords(anything);
  }

  if (anything.startsWith('nsec')) {
    const { type, data } = nip19.decode(anything);
    if (type === 'nsec' && typeof data === 'string') {
      return data;
    }

    throw new Error('invalid nsec');
  }

  if (anything.length === 64) {
    try {
      getPublicKey(anything);
      return anything;
    } catch (err: any) {
      console.error(err);
      throw new Error('invalid hex private key');
    }
  }

  throw new Error('secret format not supported at the moment');
}
