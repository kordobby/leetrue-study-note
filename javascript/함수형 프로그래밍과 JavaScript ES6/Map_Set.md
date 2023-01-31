## ES6 Map(), Set()

### Map

- `Map()` 은 자바스크립트의 `key-value` 페어로 이루어진 컬렉션
- key 를 사용해서 value 를 get, set 할 수 있음
- key 들은 중복될 수 없음
  - 하나의 key 에는 하나의 value 만
- key 로 사용할 수 있는 데이터형
  - string
  - symbol(ES6)
  - object
  - function
  - number 는 사용할 수 없음에 주의

```javascript
// 새로운 map 을 만들고 map 에 key, value 엔트리를 추가
let myInfo = new Map();
myInfo.set("name", "LEETRUE");
myInfo.set("age", 20);

console.log(myInfo.get("name")); // 'LEETRUE';
```

```javascript
// 대괄호를 사용해서 map 을 선언하는 방법
const startingPokemonMap = new Map([
  ["01", "이상해씨"],
  ["02", "꼬부기"],
  ["03", "파이리"],
  ["04", "피카츄"],
]);
```

```javascript
let myInfo = new Map();
myInfo.set("name", "LEETRUE");
myInfo.set("age", 20);

// 새로운 map 을 만들고 그 데이터를 기존의 [ key, value ] 페어 컬렉션으로 채움
ley yourInfo = new Map().set('name', '지우').set('age', 12);
console.log(yourInfo.get('name')); // '지우'

// .has() : 주어진 key 가 존재하는지 확인
console.log(myInfo.has('name')); // true

// .size : map 에 담겨진 엔트리의 갯수를 조회
console.log(yourInfo.size); // 2

// .delete() : 엔트리를 삭제
myInfo.delete('age');
console.log(myInfo); // false

// .clear() : 모든 엔트리 삭제
yourInfo.clear();
console.log(yourInfo.size); // 0
```

### Map 과 Object 의 비교

- Object 의 key 는 string 과 symbol(ES6) 만 가능하지만, map 은 어떤 값도 가능
- Object 에서는 크기를 추적해서 알 수 있지만, map 은 손쉽게 얻을 수 있음 (size)

### Set

- Set() 은 value 들로 이루어진 컬렉션 ("집합" 이라는 표현이 적절)
- Array 와는 다르게 Set 은 같은 value 를 두번 포함할 수 없음
- Set 이 이미 존재하는 값을 추가하려하면 아무 일도 없음

```javascript
// 비어있는 새로운 set 만들기
let set = new Set();

// 새로운 set 만들고 인자로 전달된 iterable 로 인자 채우기
let setPokemon = new Set().add("이상해씨").add("꼬부기");

setPokemon.add("파이리");
console.log(setPokemon.size); // 3

// .has() : 주어진 값이 set 안에 존재할 경우, true 반환

// .indexOf() 보다 빠름. 단, index 가 없음
console.log(setPokemon.has("파이리")); // true

// .delete() : set 에서 주어진 값 제거
```
