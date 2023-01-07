# Reading and writing data to the cache

- You can read and write data directly to the Apollo Client cache, without communicating with your GraphQL server.
- You can interact with data that you previously fetched from your server, and with data that's only available locally.

## multiple strategies for interacting with cached data

### Strategy

- Using GraphQL queries : GraphQL 쿼리를 이용해 cache 에 저장된 성보를 수정
- Fragement : 전체 쿼리를 작성하지 않고, 이전에 불러온 필드 값만을 수정
- Modify : graqhQL 을 전혀 사용하지 않고 캐시된 데이터를 직접 수정하거나 필드를 완전히 삭제

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

## Using GraphQL queries

- You can read and write cache data using GraphQL queries that are similar (or even identical) to queries that you execute on your server.

### readQuery : cache data 읽어오기

- `readQuery` method enables you to execute a GraphQL directly on ur cache.

  - like so :

    ```javascript
    // GraphQL Query 사용해서 todo를 가져오기
    const READ_TODO = gql`
      query ReadTodo($id: ID!) {
        todo(id: $id) {
          id
          text
          completed
        }
      }
    `;
    ```

    ```javascript
    // Fetch the cached to-do item with ID 5
    const { todo } = client.readQuery({
      query: READ_TODO,
      // Provide any required variables in this object.
      // Variables of mismatched types will return `null`.
      variables: {
        id: 5,
      },
    });
    ```

    - If your cache contains data for all of the query's fields, readQuery returns an object that matches the shape of the query:

    ```javascript
    // 읽어온 데이터 내용
    {
        todo: {
            __typename: 'Todo', // __typename is automatically included
            id: 5,
            text: 'Buy oranges 🍊',
            completed: true
        }
    }
    // Apollo Client automatically queries for every object's __typename by default, even if you don't include this field in your query string.
    ```

    - <b>Do not modify the returned object directly.</b>
      - The same object might be returned to multiple components.
    - If the cache is missing data for any of the query's fields, readQuery returns null. It does not attempt to fetch data from your GraphQL server.
    - The query you provide readQuery can include fields that are not defined in your GraphQL server's schema.

### writeQuery : cache에 data 작성하기

- The writeQuery method enables you to write data to your cache in a shape that matches a GraphQL query. It resembles readQuery, except that it requires a data option:

  ```javascript
  // This example creates (or edits) a cached Todo object with ID 5.
  client.writeQuery({
    query: gql`
      query WriteTodo($id: Int!) {
        todo(id: $id) {
          id
          text
          completed
        }
      }
    `,
    data: {
      // Contains the data to write
      todo: {
        __typename: "Todo",
        id: 5,
        text: "Buy grapes 🍇",
        completed: false,
      },
    },
    variables: {
      id: 5,
    },
  });
  ```

  #### `writeQuery`

  - Any changes you make to cached data with `writeQuery` are not pushed to ur GraphQL server.
    - If u reload ir environment, these changes disappear.
  - The shape of ur query is no enforced by ur GraphQL server's schema :
    - the query can include fields that r not present in ur schema.
    - u can provide values for schema fields r invalid according to ur schema.

  #### Editing existing data

  - In the example above, if your cache already contains a Todo object with ID 5, writeQuery overwrites the fields that are included in data (other fields are preserved):

  ```javascript
  // BEFORE
    {
    'Todo:5': {
        __typename: 'Todo',
        id: 5,
        text: 'Buy oranges 🍊',
        completed: true,
        dueDate: '2022-07-02'
    }
    }

    // AFTER
    {
    'Todo:5': {
        __typename: 'Todo',
        id: 5,
        text: 'Buy grapes 🍇',
        completed: false,
        dueDate: '2022-07-02'
    }
    }
  ```

## Using GraphQL fragments

- You can read and write cache data using GraphQL fragments on any normalized cache object.
- This provides more "random access" to your cached data than `readQuery/writeQuery`, which require a complete valid query.

### readFragment

- This example fetches the same data as the example for readQuery using readFragment instead:

  ```javascript
  const todo = client.readFragment({
    id: "Todo:5", // The value of the to-do item's cache ID
    fragment: gql`
      fragment MyTodo on Todo {
        id
        text
        completed
      }
    `,
  });
  ```

- Unlike readQuery, <b>readFragment requires an id option.</b>

  - This option specifies the cache ID for the object in your cache.
  - By default, cache IDs have the format `<__typename>:<id>` (which is why we provide Todo:5 above).

- In the example above, readFragment returns null in either of the following cases:
  - There is no cached Todo object with ID 5.
  - There is a cached Todo object with ID 5, but it's missing a value for either text or completed.

### writeFragment

- In addition to reading "random-access" data from the Apollo Client cache with `readFragment`, you can write data to the cache with the `writeFragment` method.
  - Any changes you make to cached data with `writeFragment` are not pushed to your GraphQL server
  - If you reload your environment, these changes will disappear.
- The `writeFragment` method resembles `readFragment`, except it requires an additional data variable.
  - For example, the following call to `writeFragment` updates the completed flag for a `Todo` object with an `id` of `5`:
    ```javascript
    client.writeFragment({
      id: "Todo:5",
      fragment: gql`
        fragment MyTodo on Todo {
          completed
        }
      `,
      data: {
        completed: true,
      },
    });
    ```
  - All subscribers to the Apollo Client cache (including all active queries) see this change and update your application's UI accordingly.

### useFragment_experimental

- The `useFragment_experimental` hook is currently at the preview stage in Apollo Client and is available by installing `@apollo/client@beta`.
- You can read data for a given fragment directly from the cache using the `useFragment_experimental` hook.
- This hook returns an always-up-to-date view of whatever data the cache currently contains for a given fragment.
- api : https://www.apollographql.com/docs/react/api/react/hooks-experimental

#### Using `useFragment_experimental`

- A GraphQL fragment is a piece of logic that can be shared between multiple queries and mutations.

- Given the following fragment definition:

  ```javascript
  const ItemFragment = gql`
    fragment ItemFragment on Item {
      text
    }
  `;
  ```

- We can first use the `useQuery` hook to retrieve a list of items with `id`s.

  ```javascript
  const listQuery = gql`
    query {
      list {
        id
      }
    }
  `;
  function List() {
    const { loading, data } = useQuery(listQuery);
    return (
      <ol>
        {data?.list.map((item) => (
          <Item key={item.id} id={item.id} />
        ))}
      </ol>
    );
  }
  ```

- We can then use `useFragment_experimental` from within the `<Item>` component to create a live binding for each item by providing the `fragment` document, `fragmentName`and object reference via from.

  ```javascript
  function Item(props: { id: number }) {
  const { complete, data } = useFragment_experimental({
      fragment: ItemFragment,
      fragmentName: "ItemFragment",
      from: {
      __typename: "Item",
      id: props.id,
      },
  });
  return <li>{complete ? data!.text : "incomplete"}</li>;
  }
  ```

#### APIs

- basic form

  ```javascript
  const {
    /* RESULTS */
    complete, // type : booelan
    data, // type : TData
    missing, // type : MissingTree
  } = useFragment_experimental({
    /* Operation options - REQUIRED */
    fragment: ItemFragment, // type : DocumentNode
    fragmentName: "ItemFragment", // type : string
    from: {
      // type : string | StoreObject | Reference
      __typename: "Item",
      id: props.id,
    },
    /* Operation options */
    optimistic: true, // type : boolean
    variables: { id: 5 }, // type : { [key: string] : any }
    returnPartialData: true, // type : boolean
    canonizeResults: true, // boolean
  });
  ```

- Options
  - `from`
    - An object containing a `__typename` and primary key fields (such as `id`) identifying the entity object from which the fragment will be retrieved, or a `{ __ref: "..." }` reference, or a `string` ID (uncommon).
  - `fragment`
    - A GraphQL fragment document parsed into an AST with the gql template literal.
  - `fragmentName`
    - The name of the fragment defined in the fragment document to use in the call.
  - `optimistic`
    - If `true`, `readFragment` returns optimistic results. (default : `true`)
  - `variables`
    - An object containing all of the GraphQL variables your fragment requires.
  - `returnPartialData`
    - If `true`, the query can return partial results from the cache if the cache doesn't contain results for all queried fields. (default : `true`)
  - `canonizeResults`
    - If true, result objects read from the cache will be canonized, which means deeply-equal objects will also be `===` (literally the same object), allowing much more efficient comparison of past/present results. (default : `true`)
- Result
  - `data` : An object containing the data for a given GraphQL fragment.
  - `complete`
    - A boolean indicating whether the data returned for the fragment is complete.
    - When false, the missing field should explain which fields were responsible for the incompleteness.
  - `missing`
  - A tree of all MissingFieldError messages reported during fragment reading, where the branches of the tree indicate the paths of the errors within the query result.
