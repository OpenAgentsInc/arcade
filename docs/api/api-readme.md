# Why an API

Our Nostr chat uses no API, just Nostr relays.

Our AI chat uses an API for a few reasons:

- We need to use API keys to interact with AI services and can't securely store them client-side
- We are going to do a whole heck of a lot of interaction with vector databases and other computationally intensive stuff that only makes sense server-side

Later we may use the API for other "Nostr layer two" indexing or for other performance improvements.

# How we'll do it

- Client library: [@tanstack/react-query](https://tanstack.com/query/latest/docs/react/overview)
- API server: Python/Flask and Postgres via Supabase, hosted on Railway

# Endpoints

- `POST /message` - Send a message to an AI conversation
  - `message` - The text to send
  - `userId` - The npub the message is from
  - `conversationId` - The conversation ID
  - `conversationType` - ?
- `GET /conversation/<conversationId>` - Retrieve the 50 latest messages from this conversation
- `GET /user/<npub>/conversations` - Retrieve conversations from a given npub
