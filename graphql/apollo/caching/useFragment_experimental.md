# Relay vs apollo client

- 기본적으로 graphql 은 HTTP POST Method 로 요청을 보냄
  - body에 query 와 variables 를 담아서 요청

```jsx
fetch("/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query,
    variables,
  }),
}).then((response) => {
  return response.json();
});
```

- 단순히 graphql 의 query 와 mutation 을 사용할 때는 별도의 라이브러리가 필요 없음
- 별도 gql 라이브러리 사용할 때의 이점
  - local state 관리
  - 서버에서 받은 데이터의 caching
  - UI framework(React) 와의 통합
  - 편리한 graphql query 의 작성
- 위와 같은 기능을 제공하는 react 에서의 graphql 라이브러리는 relay, apllo client 가 대표적
- 별도의 gql 라이브러리를 사용할 경우 caching 작업을 통해 불필요한 network request 를 줄일 수 있고 라이브러리 자체의 loacal state 를 활용해 장기적으로는 redux 에 대한 의존을 줄일 수 있음

## Relay

**Raley란?**

- React 애플리케이션에서 gql 을 사용한 데이터 fetching과 managing 기능을 제공하는 js 프레임워크
- 단순하게 api client 기능만 수행하는 것이 아니라 컴포넌트의 데이터 독립성을 위한 아키텍처도 제시
- Relay 는 컴포넌트에서 정의된 데이터의 가장 효율적인 fetching 을 보장함
  - 불필요한 리렌더링을 방지하기 위해 정말 필요할 때만 데이터의 업데이트를 수행
- gql 의 mutation 후 변경된 데이터에 대한 로컬 데이터의 업데이트를 보장하며 항상 최신의 데이터를 보장

**기존 Data Fetching 방식의 문제점**

- React 는 재사용 가능한 컴포넌트의 조합으로 이루어져있으며, 특정 컴포넌트는 아래로 여러 개의 컴포넌트의 합성으로 이루어짐
- 기존의 data fetching 방식은 크게 두 가지로 이루어짐
  ***
  1. 상위 컴포넌트에서 하위 컴포넌트로 필요한 모든 데이터를 fetching 후 하위로 넘겨줌
  2. 각각의 하위 컴포넌트에서 필요한 데이터를 알아서 fetching
  ***
  - 첫 번째 use case의 경우
    - 상위 컴포넌트와 하위 텀포넌트의 데이터 커플링이 발생
    - 하위 컴포넌트의 경우 데이터 fetching 을 담당하는 상위 컴포넌트에서 다시 fetching 해야하고, 그 결과 하위 컴포넌트의 리렌더링이 일어남
  - 두 번째 use case 의 경우
    - 데이터 fetching 의 staging 이 발생하는 문제 발생
    - 상위 컴포넌트에서 하위 컴포넌트로 내려가며 단계적으로 데이터 fetching 이 발생, 이에 따라 반복적으로 하위 컴포넌트의 리렌더링이 발생하며 성능에 안좋은 영향을 끼침
  - 기존 data fetching 방식의 문제점은 gql 과 relay 를 사용하면 해결이 가능
    - relay 는 하나의 graphql query 로 하위 컴포넌트에서 필요한 모든 데이터를 가져올 수 있음
    - 각 하위 컴포넌트는 gql fragment 라는 것을 통해 필요한 데이터 요소를 선언
    - 이로 인해 gql runtime 은 단 한 번의 네트워크 요청으로 view 에 필요한 모든 데이터를 가져올 수 있음

**컴포넌트에서 필요한 데이터 선언**

- relay 에서는 `fragment` 를 사용해 필요한 데이터를 표현 가능
- 특정 타입 객체에서 필요한 데이터 필드를 나타냄

```jsx
const authorDetailsFragment = graphql`
  fragment AuthorDetails_author on Author {
    name
    photo {
      url
    }
  }
`;
```

- 위와 같은 fragment 는 useFragment 훅을 통해 스토어에 있는 데이터를 가져올 수 있음

```jsx
export default function AuthorDetails(props) {
  const data = useFragment(authorDetailsFragment, props.author);
  // ...
}
```

- `useFragment` 훅의 두번째 파라미터인 props.author는 fragment의 참조값
- fragment의 참조값은 해당fragment를 다른 fragment나 query에서 `...`를 통해 얻을 수 있음
- fragment 자체로는 실제 서버에 있는 데이터를 가져올 수 없기 때문에 spread syntax를 통해 query내에서 사용되어야 함
- fragment 를 사용해 실제 데이터를 가져오는 쿼리는,
  ```jsx
  const storyQuery = graphql`
    query StoryQuery($storyID: ID!) {
      story(id: $storyID) {
        title
        author {
          ...AuthorDetails_author
        }
      }
    }
  `;
  ```
- 위의 쿼리를 사용하는 컴포넌트는 다음과 같음

  ```jsx
  function Story(props) {
    const data = useLazyLoadQuery(storyQuery, props.storyId);

    return (
      <>
        <Heading>{data?.story.title}</Heading>
        {data?.story?.author && <AuthorDetails author={data.story.author} />}
      </>
    );
  }
  ```

- `AuthorDetails_author` fragment를 통해 한 번의 네트워크 요청으로 `Story` , `AuthorDetails` 컴포넌트에서 필요한 데이터를 가져옴

**useFragment**

- `const data = useFragment(fragment, fragmentReference);`
  - useFragment의 첫번째 인수인 fragment는 graphql template literal로 나타낸 GraphQL fragment를 나타냄
  - fragmentReference는 Relay 객체의 참조값을 나타냄. 이 참조값을 통해 스토어에서 데이터를 가져옴
    - [graphql lint rule](https://github.com/relayjs/eslint-plugin-relay)을 통해 fragment reference가 적절히 선언되었는지 확인할 수 있음
  - 반환값
    - fragment에서 선언한 데이터 필드와 그 모양대로 스토어에서 가져온 데이터를 나타냄
  - 해당 fragment를 사용한 컴포넌트는 자동적으로 fragment data의 업데이트를 구독. 앱의 어딘가에서 데이터가 업데이트 된다면 컴포넌트는 자동적으로 최신의 데이터로 렌더링됨

**Data Masking**

- Relay에서는 컴포넌트로 하여금 해당 컴포넌트에서 명시한 데이터에만 접근할 수 있게 함
- 명시하지 않은 데이터에 대해서는 알 수도 없으며 알 필요도 없음
- 자식 컴포넌트에서 어떤 데이터를 필요로 하는지도 몰라도 됨

---

```bash
# installation
@apollo/client@beta
```

### useFragment_experimental

- 현재 캐시에 포함된 모든 데이터의 최신 상태를 반환
- 자체적으로 네트워크 요청을 유발하지 않음
- This hook enables Apollo Client to broadcast very specific fragment results to individual components
- 결과적으로 `useFragment_experimental` 을 통해 Fragment Data 를 읽는 쿼리 데이터의 모든 변경 사항을 받지만, 해당 Fragment 의 특정 데이터가 변경될 때만 업데이트를 받음

### Using useFragment_experimental

- A [GraphQL fragment](http://graphql.org/learn/queries/#fragments) is a piece of logic that can be shared between multiple queries and mutations.

```jsx
const ItemFragment = gql`
  fragment ItemFragment on Item {
    text
  }
`;
```

```jsx
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

- We can then use `useFragment_experimental` from within the `<Item>` component to create a live binding for each item by providing the `fragment` document, `fragmentName` and object reference via `from`.

```jsx
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

### useFragment_experimental API

- Supported options and result fields for the `useFragment_experimental`
   hook are listed below.
- Most calls to `useFragment_experimental`can omit the majority of these options, but it's useful to know they exist.
