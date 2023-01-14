import { bechToHex } from 'lib/nostr/bech32'

// some folks from https://bitcoinnostr.com/https://bitcoinnostr.com/
const demoFriendsany = [
  'npub1qg8j6gdwpxlntlxlkew7eu283wzx7hmj32esch42hntdpqdgrslqv024kw', // adam3us
  '00000000827ffaa94bfea288c3dfce4422c794fbb96625b6b31e9049f729d700', // cameri
  'npub1hu3hdctm5nkzd8gslnyedfr5ddz3z547jqcl5j88g4fame2jd08qh6h8nh', // carla
  '3f770d65d3a764a9c5cb503ae123e62ec7598ad035d836e2a810f3877a745b24', // derekmross
  'npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6', // fiatjaf
  'npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m', // jack
  'npub1xtscya34g58tk0z605fvr788k263gsu6cy9x0mhnm87echrgufzsevkk5s', // jb55
  'npub1ahxjq4v0zlvexf7cg8j9stumqp3nrtzqzzqxa7szpmcdgqrcumdq0h5ech', // natbrunell
  'npub1qny3tkh0acurzla8x3zy4nhrjz5zd8l9sy9jys09umwng00manysew95gx', // odell

  '883fea4c071fda4406d2b66be21cb1edaf45a3e058050d6201ecf1d3596bbc39', // Adam Curry
  'npub1m3xsmhkcmv20wgaywfeelmvxeww4d67d8sct5cvlffzfa3lkxpus7vdwhx', // Alpha Zeta
  'npub1rtlqca8r6auyaw5n5h3l5422dm4sry5dzfee4696fqe8s6qgudks7djtfs', // AMERICAN HODL
  '1b11ed41e815234599a52050a6a40c79bdd3bfa3d65e5d4a2c8d626698835d6', // André Neves
  'npub14hn6p34vegy4ckeklz8jq93mendym9asw8z2ej87x2wuwf8werasc6a32x', // Anil
  'e9e4276490374a0daf7759fd5f475deff6ffb9b0fc5fa98c902b5f4b2fe3bba2', // Ben Arc
  'npub1yvthlcvf7gz57c4s2kezt787uhgdftf7lq4l9vvatvkwg3sjrqns2puxwr', // Bitcoin Liotta
]

export const demoFriends = demoFriendsany.map(
  // if key begins with npub, convert to hex
  (key) => (key.startsWith('npub') ? bechToHex(key) : key)
)
