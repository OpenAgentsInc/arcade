import type { Filter } from 'nostr-tools'
import { stringify } from 'safe-stable-stringify'

export function mergeSimilarAndRemoveEmptyFilters(filters: Filter[]): Filter[] {
  const r: any[] = []
  const indexByFilter = new Map<string, number>()
  for (const filter of filters) {
    let added = false
    for (const key in filter) {
      if (
        filter[key] &&
        (['ids', 'authors', 'kinds'].includes(key) || key.startsWith('#'))
      ) {
        if (filter[key].length === 0) {
          added = true
          break
        }
        const new_filter = { ...filter }
        delete new_filter[key]
        const index_by = key + stringify(new_filter)
        const index = indexByFilter.get(index_by)
        if (index !== undefined) {
          const extendedFilter = r[index]
          // remove all other groupings for r[index]
          for (const key2 in extendedFilter) {
            if (key2 !== key) {
              const new_filter2 = { ...extendedFilter }
              delete new_filter2[key2]
              const index_by2 = key2 + stringify(new_filter2)
              indexByFilter.delete(index_by2)
            }
          }
          r[index][key] = [...new Set(r[index][key].concat(filter[key]))]
          added = true
          break
        }
        indexByFilter.set(index_by, r.length)
      }
    }
    if (!added) {
      r.push(filter)
    }
  }
  return r
}
