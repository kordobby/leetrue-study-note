# Hooks

- Apollo Client react hooks API ref

## ApolloProvider component

```javascript
import { ApolloProvider } from `@apollo/client`;
```

### Props

- `client`

  - type : `ApolloClient<TCache>`
  - desc : An ApolloClient instance
  - example

    ```javascript
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: "http://localhost:4000/graphql",
    });

    ReactDOM.render(
      <ApolloProvider client={client}>
        <MyRootComponent />
      </ApolloProvider>,
      document.getElementById("root")
    );
    ```

## ApolloConsumer component

```javascript
import { ApolloConsumer } from "@apollo/client";

function WithApolloClient() {
  return (
    <ApolloConsumer>
      {(client) => "We have access to the client!" /* do stuff here */}
    </ApolloConsumer>
  );
}
```

## useQuery

- example

  ```javascript
  import { gql, useQuery } from "@apollo/client";

  const GET_GREETING = gql`
    query GetGreeting($language: String!) {
      greeting(language: $language) {
        message
      }
    }
  `;

  function Hello() {
    const { loading, error, data } = useQuery(GET_GREETING, {
      variables: { language: "english" },
    });
    if (loading) return <p>Loading ...</p>;
    return <h1>Hello {data.greeting.message}!</h1>;
  }
  ```

- Function Signature

```javascript
function useQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {}
```

- Params

```javascript
const {
/* Operation data */
data, previousData, error, variables,
/* Network Info */
loading, networkStatus, client, called,
/* Helper functions */
refetch, fetchMore, startPolling, stopPolling, subscribeToMore, updateQuery } = useQuery(GET_GREETING, {
  /* Operation options */
  variables: { language: "english" },
  errorPolicy: "all",
  onCompleted : () => void,
  onError : () => void,
  skip : false

  /* Networking options */
  pollInterval : 0,
  notifyOnNetworkStatusChange : true,

  /* Caching options */
  fetchPolicy : cache-first,
  nextFetchPolicy : network-only,
  returnPartialData : true
});
```

- `query`
  - type : `DocumentNode`
  - desc : A GraphQL query document parsed into an AST by gql
- `options`

  - Operation options
    - `query`
      - Optional for the useQuery hook, because the query can be provided as the first parameter to the hook.
    - `variables`
      - An object containing all of the GraphQL variables your query requires to execute.
      - Each key in the object corresponds to a variable name, and that key's value corresponds to the variable value.
    - `errorPolicy`
      - Specifies how the query handles a response that returns both GraphQL errors and partial results.
      ```javascript
      {
      "data": {
          "getInt": 12,
          "getString": null
      },
      "errors": [
          {
          "message": "Failed to get string!"
          // ...additional fields...
          }
      ]
      }
      ```
    - `onCompleted`
    - `onError`
    - `skip`
      - If true, the query is not executed.
      - defatul : `false`
  - Networking options
    - `pollInterval`
      - Specifies the interval (in milliseconds) at which the query polls for updated results.
      - defatul : `0` (no polling)
    - `notifyOnNetworkStatusChange`
      - If true, the in-progress query's associated component re-renders whenever the network status changes or a network error occurs.
      - defatul : `false`
    - `context`
    - `ssr`
    - `client`
  - Caching options
    - `fetchPolicy`
      - default : `cache-first`
      - https://www.apollographql.com/docs/react/data/queries/#setting-a-fetch-policy
      - example.
      ```javascript
      const { loading, error, data } = useQuery(GET_DOGS, {
        fetchPolicy: "network-only", // Doesn't check cache before making a network request
      });
      ```
    - `nextFetchPolicy`
      - Specifies the fetchPolicy to use for all executions of this query after this execution.
      - you can use this to switch back to a cache-first fetch policy after using cache-and-network or network-only for a single execution.
    - `returnPartialData`
      - If true, the query can return partial results from the cache if the cache doesn't contain results for all queried fields.
      - default : `false`
  - Deprecated options
    - `partailRefetch` : \*Deprecated

- Result

  - Operation data

    - `data`
      - An object containing the result of your GraphQL query after it completes.
      - This value might be undefined if a query results in one or more errors.
    - `previousData`
      - An object containing the result from the most recent previous execution of this query.
    - `error`
      - this object contains either an array of graphQLErrors or a single networkError.
      - https://www.apollographql.com/docs/react/data/error-handling/
    - `variables`
      - An object containing the variables that were provided for the query.

- Network Info

  - `loading`
  - `networkStatus`

    ```javascript
    export enum NetworkStatus {
      loading = 1,
      setVariables = 2,
      fetchMore = 3,
      refetch = 4,
      poll = 6,
      ready = 7,
      error = 8,
    }

    export function isNetworkRequestInFlight(
      networkStatus?: NetworkStatus,
      ): boolean {
      return networkStatus ? networkStatus < 7 : false;
    }
    ```

  - `client`
  - `called`

  - Helper functions
    - `refetch`
      - type : `(variables?: Partial<TVariables>) => Promise<ApolloQueryResult>`
      - function that enables you to re-execute the query, optionally passing in new variables
      - To guarantee that the refetch performs a network request, its fetchPolicy is set to network-only (unless the original query's fetchPolicy is no-cache or cache-and-network, which also guarantee a network request).
    - `fetchMore`
      - type : `({ query?: DocumentNode, variables?: TVariables, updateQuery: Function}) => Promise<ApolloQueryResult>`
      - function that helps you fetch the next set of results for a paginated list field
    - `startPolling` : function that instructs the query to begin re-executing at a specified interval (in milliseconds)
    - `stopPolling` : function that instructs the query to stop polling after a previous call to startPolling
    - `subscribeToMore`
    - `updateQuery`
      - type : `(mapFn: (previousResult: TData, options: { variables: TVariables }) => TData) => void`
      - function that enables you to update the query's cached result without executing a followup GraphQL operation.
      - https://www.apollographql.com/docs/react/caching/cache-interaction/#using-updatequery-and-updatefragment
