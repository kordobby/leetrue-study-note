# Reading and writing data to the cache

- You can read and write data directly to the Apollo Client cache, without communicating with your GraphQL server.
- You can interact with data that you previously fetched from your server, and with data that's only available locally.

## multiple strategies for interacting with cached data

### Strategy

- <b>Using GraphQL queries</b>
  - API
    - `readQuery`
    - `writeQuery`
    - `updateQuery`
  - desc : Use standard GraphQL queries for managing both remote and local data.
- <b>Using GraphQL fragments</b>
  - API
    - `readFragment`
    - `writeFragment`
    - `updateFragment`
    - `useFragment_experimental`
  - desc : Access the fields of any cached object without composing an entire query to reach that object.
- <b>Directly modifying cached fields</b>
  - API
    - `cache.modify`
  - desc : Manipulate cached data without using GraphQL at all.
