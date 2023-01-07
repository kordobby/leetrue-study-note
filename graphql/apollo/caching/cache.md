# cache 갱신

- apollo client 는 먼저 cache 에 원하는 데이터가 있는지 확인하고
  - 있으면 데이터를 반환하고 없으면 데이터를 요청한 뒤 재사용하기 위해 캐시에 쓰고 클라이언트에 넘겨줌
- 만약 cache 가 없었다면 데이터가 필요할 때 마다 서버에 요청해 받아오거나 직접 캐싱을 구현해야하겠지만, 캐시를 지원해주기 때문에 불필요한 데이터 요청을 줄일 수 있음

## InMemoryCache

- apollo client를 설정하고 `useQuery` 훅에 `graphql query`를 전달하여 데이터를 불러오게 되면 해당 데이터들은 `InMemoryCache` 에 저장이 되어 불필요한 네트워크 요청없이 데이터를 요청하여 사용 할 수 있게됨
- 공식 문서에서는 `InMemoryCache` 는 응답 개체를 내부 저장소에 저장하기 전에 아래 단계를 거친다고 소개

1. 캐시는 응답 받은 데이터에 포함된 모든 식별 가능한 객체에 대해 고유 cache ID를 생성
2. 캐시는 각 객체를 생성한 cache ID 별로 flat lookup table 에 저장
3. 들어오는 객체가 기존 객체와 동일한 ID로 저장될때 마다 해당 객체의 필드는 병합됨

- 만약 query를 실행 한 뒤 cache를 업데이트 하고 싶다면 아래 방법들 중 하나를 수행하면 됨
  - 직접 cache에 접근해 데이터 변경
  - `fetchPolicy` 사용
  - `cache.reset()` 을 호출한 뒤 데이터 요청을 진행

## CACHE KEY

- apolloClient는 `__typename : _id` 형태로 타입 오브젝트를 정규화
- 애플리케이션 내 해당 아이디를 갖는 오브젝트는 유일함
  ```javascript
      Task:1234: { name: "Go grocery shopping" }
      Task:2345: { name: "Go to gym" }
      Task:3456: { name: "Learn GoLang" }
  ```
- apolloClient 는 심지어 각각의 쿼리에 대한 응답 또한 캐싱함

  - 이는 해당 쿼리에 대해 똑같은 변수를 사용하며 캐시로 응답함을 의미함
  - 이를 갱신하기 위해 `fetchPolicy` 를 수정하거나 `refetch`가 필요함

    ```javascript
    const MY_TASKS = gql`query mytasks($name:String!){
            tasks(name:$name){
                ...
                ...
                ...
            }
        }`;
    // apolloClient는 쿼리 이력을 아래와 같이 변수+데이터와 함께 저장한다.
    // 해당 캐시를 수정하는 내용을 밑에 설명해두었다.
    ROOT_QUERY:
    tasks(name: "G"): [{}, {}, {}]
    tasks(name: "Go"): [{}, {}, {}]
    tasks(name: "Gol"): [{}]
    ...

    // update 함수 내에서 캐시에 쿼리 날리기.
    const data = cache.readQuery({
    query:MY_TASKS,
    variables : {name:"G"},
    })
    ```

    - 해당 캐시를 업데이트하기 위해선 ID를 통해 수정 정보를 서버에서 결과로 응답하여 갱신해주면 됨
    - 그렇지 않은 경우 캐시를 직접 조작해 줄 필요가 있음

## 캐시 조작 방법은 자고 일어나서..
