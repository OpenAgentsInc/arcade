import { hexToNpub, hexToNsec } from 'lib/nostr/bech32'

describe('bech32', () => {
  describe('hexToNpub', () => {
    it('converts hex to npub format', () => {
      const hex =
        'd1376346622f67222d6907c22488d0a2990c2a6c0bf266d64424c89a1009157e'
      const expectedResult =
        'npub16ymkx3nz9anjyttfqlpzfzxs52vsc2nvp0exd4jyynyf5yqfz4lqfrsykh'

      expect(hexToNpub(hex)).toEqual(expectedResult)
    })
  })

  describe('hexToNsec', () => {
    it('converts hex to nsec format', () => {
      const hex =
        'a2788fba66a2f7edf1781e3447c903659d8790855bf3601268a9e29fbb959c90'
      const expectedResult =
        'nsec15fuglwnx5tm7mutcrc6y0jgrvkwc0yy9t0ekqyng483flwu4njgqcg7p85'

      expect(hexToNsec(hex)).toEqual(expectedResult)
    })
  })
})
