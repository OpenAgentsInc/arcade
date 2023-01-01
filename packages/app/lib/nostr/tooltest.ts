import { generatePrivateKey, getPublicKey } from 'nostr-tools'

export const tooltest = () => {
  let sk = generatePrivateKey() // `sk` is a hex string
  console.log('sk', sk)
  let pk = getPublicKey(sk) // `pk` is a hex string
  console.log('pk', pk)
}
