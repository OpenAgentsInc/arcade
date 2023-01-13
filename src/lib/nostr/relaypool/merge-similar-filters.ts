import type { Filter } from 'nostr-tools'
import { stringify } from 'safe-stable-stringify'

/**
 * Takes an array of filters and returns a new array of filters that have been modified in the following ways:
 * 1. Similar filters are merged together by comparing the key-value pairs of each filter.
 *    If two filters have the same keys and values, except for the key 'ids', 'authors', 'kinds' or keys that start with '#',
 *    the values of those keys are concatenated and made unique.
 * 2. Empty filters, i.e filters with empty values for the keys 'ids', 'authors', 'kinds' or keys that start with '#', are removed.
 *
 * @param {Filter[]} filters - An array of filters
 * @return {Filter[]} - A new array of filtered filters
 */
export function mergeSimilarAndRemoveEmptyFilters(filters: Filter[]): Filter[] {
  // array to hold the filtered filters
  const r: any[] = []
  // map to hold the index of similar filters
  const indexByFilter = new Map<string, number>()
  // iterate through the filters array
  for (const filter of filters) {
    console.log('filters obj initially:', filters)
    let added = false
    // iterate through the key value pairs of the filter
    for (const key in filter) {
      // check if key is 'ids', 'authors', 'kinds' or starts with '#' and filter value is not empty
      if (
        filter[key] &&
        (['authors', 'kinds'].includes(key) || key.startsWith('#'))
      ) {
        // check if filter value is empty, if yes set added to true and break
        if (filter[key].length === 0) {
          added = true
          break
        }
        // make a copy of filter and remove the current key
        const new_filter = { ...filter }
        delete new_filter[key]
        // create a unique index by combining the key and stringified new_filter
        const index_by = key + stringify(new_filter)
        // check if the map already has an index for the unique index
        const index = indexByFilter.get(index_by)
        if (index !== undefined) {
          // if an index is found, extend the filter at that index by concatenating the current filter value and making it unique
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
        // if no index is found, add the unique index to the map with the current index
        indexByFilter.set(index_by, r.length)
      }
    }
    // if filter is not added, push it to the filtered filters array
    if (!added) {
      r.push(filter)
    }
  }
  return r
}
