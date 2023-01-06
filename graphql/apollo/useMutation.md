# useMutation

```javascript
import { gql, useMutation } from "@apollo/client";

/* Define mutation */
const ADD_TODO = gql`
    value
`;

const TodoPage = () => {
  const [mutateFunction, { data, loading, error }] = useMutation(ADD_TODO);
};
```

```javascript
import { gql, useMutation } from "@apollo/client";

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;
```

- add-todo.jsx

```javascript
const AddTodo = () => {
  let input;
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);

  if (loading) return "Submitting...";
  if (error) return `${error.message}`;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};
```

## Providing Options

```javascript
const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
  variables: {
    type: "placeholder",
    someOtherVariable: 1234,
  },
});
```

```javascript
addTodo({
  variables: {
    type: input.value,
  },
});
```

## Resetting mutation status

- Call reset to reset the mutation's result to its initial state

```javascript
const [login, { data, loading, error, reset }] = useMutation(LOGIN_MUTATION);
```

```javascript
function LoginPage() {
  const [login, { error, reset }] = useMutation(LOGIN_MUTATION);

  return (
    <>
      <form>
        <input class="login" />
        <input class="password" />
        <button onclick={login}>Login</button>
      </form>
      {error && (
        <LoginFailedMessageWindow
          message={error.message}
          onDismiss={() => reset()}
        />
      )}
    </>
  );
}
```

## Updating local data

```javascript
// Refetches two queries after mutation completes
const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
  refetchQueries: [
    { query: GET_POST }, // DocumentNode object parsed with gql
    "GetComments", // Query name
  ],
});
```

## Updating the cache directly

- Include modified objects in mutation responses
  - a mutation response should include any object(s) the mutation modified.
  - This enables Apollo Client to normalize those objects and cache them according to their `__typename` and `id` fields (by default).

```javascript
{
  "__typename": "Todo",
  "id": "5",
  "type": "groceries"
}
// Apollo Client automatically adds the __typename field to every object in your queries and mutations by default.
```

## The update function

```javascript
const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
    }
  }
`;

function AddTodo() {
  let input;
  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
```
