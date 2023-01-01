import { generatePrivateKey, getPublicKey } from 'nostr-tools'

export const tooltest = () => {
  let sk = generatePrivateKey() // `sk` is a hex string
  let pk = getPublicKey(sk) // `pk` is a hex string
  console.log('sk: ', sk)
  console.log('pk: ', pk)
  alert('pub: ' + pk)
}
