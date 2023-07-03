# Why an API

Our Nostr chat uses no API, just Nostr relays.

Our AI chat uses an API for a few reasons:

- We need to use API keys to interact with AI services and can't securely store them client-side
- We are going to do a whole heck of a lot of interaction with vector databases and other computationally intensive stuff that only makes sense server-side

Later we may use the API for other "Nostr layer two" indexing or for other performance improvements.

# How we'll do it

- Client library: `@tanstack/react-query`
- API: Python/Flask and Postgres via Supabase, hosted on Railway
