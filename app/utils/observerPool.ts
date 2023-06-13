import { merge } from 'rxjs/operators' 
import { map as map$, Rx } from 'rxjs'
import { NostrPool, NostrEvent, ArcadeDb } from 'app/arclib/src'

class ObserverPool extends NostrPool {  

  // reactive equivalent of list()
  observe(filters: Filter[]): Rx.Observable<NostrEvent[]> {  
    // here we're merging two observables:  
    // - the one that will emit an event whenever there's a new list of NostrEvent[] in the database  
    // - the one that doesn't actually emit anything, merely adapts NostrPool#sub to be Rx-compatible  
    // such that when NostrPool#observe() is subscribed to, we'll subscribe to relays, and when it's
    // unsubscribed from, we'll automtically unsubscribe from these filters on relays 
    return merge(  
     // see impl below  
     this.db.observeEvents(filters),  
     this._subToDb(filters, since),  
    )
  }
  
  _subToDb(filters: Filter[], since?: number): Rx.Observable<void> {
    return new Observable(subscriber => {  
      // TODO: Batch multiple insertions  
      const onEvent = event => {
        this.db?.saveEvent(event) 
      }
      this.sub(filters, onEvent, undefined, since)  
     
      // do on unsubscribe  
      // TODO: Clarify desigred behavior re: unsubscribing from filters on relays
      return () => this.unsub(onEvent)  
    })
  }
}

// ...

class ObserveDb extends ArcadeDb {
  
  async observeEvents(filters: Filter[]): Rx.Observable<NostrEvent[]> {  
    // same as ArcadeDb.list(), but we're observing Query instead of fetching it  
    // and then transforming Rx observable to get NostrEvent[] and not DbEvent[] 
    return this.collections.get(DbEvent.table)  
      .query(this.filterToQuery(filters))  
      .observe()  
      // tip: if you ever need observable counters, just change it to .observeCount()  
      .pipe(
        map$(records => {  
          return records.map(ev => ev.asEvent())  
        })  
      ) 
  }
}


const enhance = compose(
  withPool,
  withObservables(['pubkey', 'pool'], ({ pubkey, pool }) => ({
    events: pool.observe([{ kinds: [0], authors: [pubkey] }])
  }))
)

// You can add a helper HOC withPool in a common place, it would look like so:
export function withPool(BaseComponent) {
  return function WithPool(props) {
    const pool = useContext(RelayContext)
    return React.createElement(BaseComponent, { ...props, pool })
  }
}  
