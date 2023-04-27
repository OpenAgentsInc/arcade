import { getParams } from 'js-lnurl'

export const getLnurlPayRequestUrl = async (ludValue) => {
  if (ludValue.startsWith('lnurl1') || ludValue.startsWith('LNURL1')) {
    // LUD-06 format
    try {
      const params = (await getParams(ludValue)) as any
      console.log(params)
      if (params.status === 'ERROR') {
        alert(`Error: ${params.reason}`)
        return null
      }
      if (params.tag === 'payRequest') {
        return params.callback
      } else {
        console.error('Invalid LUD-06 tag:', params.tag)
        return null
      }
    } catch (err) {
      console.error('Error processing LUD-06:', err)
      return null
    }
  } else {
    // LUD-16 format
    const [username, domain] = ludValue.split('@')
    const protocol = domain.endsWith('.onion') ? 'http' : 'https'
    return `${protocol}://${domain}/.well-known/lnurlp/${username}`
  }
}
