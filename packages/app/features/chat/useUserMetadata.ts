import { useStore } from 'app/stores'

export const useUserMetadata = (pubkey: string) => {
  const userMetadata = useStore((s) => s.userMetadata)
  const metadataArray = Object.entries(userMetadata).map(([key, value]) => ({
    pubkey: key,
    ...value,
  }))
  return metadataArray.find((metadata) => metadata.pubkey === pubkey)
}

// export const useUserMetadata = (pubkey: string) => {
//   console.log('Looking for user metadata for pubkey: ', pubkey)
//   const userMetadata = useStore((s) => s.userMetadata)
//   console.log(userMetadata)
//   //   console.log('userMetadata total is: ', userMetadata.size)
//   try {
//     const isit = userMetadata.get(pubkey)
//     console.log('isit is: ', isit)
//     return isit
//   } catch (e) {
//     console.log('Error: ', e)
//     return null
//   }
// }
