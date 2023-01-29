## 기존과 달라진 ES6에서의 리스트 순회

```javascript
for i++
for of
```

```javascript
// ES5
const list = [1, 2, 3];

for (let i = 0; i < list.length; i++) {
  console.log(list[i]);
}

const str = "abc";
for (let i = 0; i < str.length; i++) {
  console.log(str[i]);
}

// ES6
for (const a of list) {
  console.log(a);
}

for (const a of str) {
  console.log(a);
}
```

### Array 를 통해 알아보기

- Array
- Set
- Map

```javascript
/* Array */
const arr = [1, 2, 3];
for (const a of arr) console.log(a);
// 1
// 2
// 3
```

```javascript
/* Set */
const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);
// 1
// 2
// 3
```

```javascript
/* Map */
const map = new Map(["a", 1], ["b", 2], ["c", 3]);
for (const a of map) console.log(a);
// ["a", 1]
// ["b", 2]
// ["c", 3]
```

### for of 문에 대해

#### Key 값으로 접근을 해서 값을 뽑아오는걸까?

- 접근 가능 : array

```javascript
/* Array */
const arr = [1, 2, 3];
for (const a of arr) console.log(a);
// 1
// 2
// 3

/* Key 로 접근이 가능 */
arr[0]; // 1
arr[1]; // 2
arr[2]; // 3
```

- 접근 불가능 : Map, Set

```javascript
/* Map */
const map = new Map(["a", 1], ["b", 2], ["c", 3]);
for (const a of map) console.log(a);
// ["a", 1]
// ["b", 2]
// ["c", 3]

/* Key 로 접근이 불가능 */
map[0]; // undefined
map[1]; // undefined
map[2]; // undefined

/* Set */
const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);
// 1
// 2
// 3

/* Key 로 접근이 불가능 */
set[0]; // undefined
set[1]; // undefined
set[2]; // undefined
```

## Symbol

```javascript
Symbol.iterator;
// Symbol(Symbol.iterator)
```

- array

```javascript
/* Array */
const arr = [1, 2, 3];

/* Symbol.interator 에는 함수가 담겨있음 */
console.log(arr[Symbol.iterator]); // function

/* Symbol.interator 에 담겨있는 함수를 비워준다면? */
arr[Symbol.iterator] = null;
for (const a of arr) console.log(a);
// [ Error !]
// Uncaught TypeError : arr is not iterable
// for of 문과 Symbol.iterator 에 담겨져있는 함수가 관련이 있겠군..
```

- Set & Map 도 마찬가지

```javascript
/* Set */
const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);

console.log(set[Symbol.iterator]); // function

/* Map */
const map = new Map(["a", 1], ["b", 2], ["c", 3]);
for (const a of map) console.log(a);

console.log(map[Symbol.iterator]); // function
```

## iterable / iterator protocol

- `array`, `Map`, `Set` 은 javascript 의 내장객체로서 `iterable / iterator protocol` 을 따르고 있음
- interable : iterator 를 리턴하는 `[Symbol.iterator]()` 를 가진 값
- iterator : `{value, done}` 객체를 리턴하는 `next()`를 가진 값

  - `.next()` method
    ```javascript
    iterator.next(); // { value: 1, done : false }
    iterator.next(); // { value: 2, done : false }
    iterator.next(); // { value: 3, done : false }
    ```

- iterable / iterator protocol : iterable 을 `for ...of`, 전개 연산자 등과 함께 동작하도록 규약

```javascript
/* Array */

// [Symbol.interator]() 를 실행한 iterator 를 계속 순회하면서
// value 로 떨어지는 값을 출력하는 것
const arr = [1, 2, 3];
console.log(arr[Symbol.iterator]); // function values() {[native code]}
let iterator = arr[Symbol.iterator](); // undefined

iterator.next(); // { value: 1, done : false }
iterator.next(); // { value: 2, done : false }
iterator.next(); // { value: 3, done : false }
iterator.next(); // { value: undefined, done : true }
iterator.next(); // { value: undefined, done : true }

const iter1 = arr[Symbol.iterator]();
iter1.next();
for (const a of iter1) console.log(a);
// 2
// 3

const iter2 = arr[Symbol.iterator]();
iter2.next();
iter2.next();
for (const a of iter1) console.log(a);
// 3
```

```javascript
/* Set */
const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);

const iterator = set[Symbol.iterator]();
iterator.next(); // { value: 1, done : false }
iterator.next(); // { value: 2, done : false }
iterator.next(); // { value: 3, done : false }
iterator.next(); // { value: undefined, done : true }
iterator.next(); // { value: undefined, done : true }
```

```javascript
/* Map */
const map = new Map(["a", 1], ["b", 2], ["c", 3]);
for (const a of map) console.log(a);

const iterator = map[Symbol.iterator]();
iterator.next(); // { value: ["a", 1], done : false }
iterator.next(); // { value: ["b", 2], done : false }
iterator.next(); // { value: ["c", 3], done : false }
iterator.next(); // {  value: undefined, done : true }
iterator.next(); // { value: undefined, done : true }
```

- map 에서 더 재밌는 것

```javascript
// .keys() 메서드는 iterator 를 리턴
map.keys(); // MapIterator {"a", "b", "c"}

const keyOfValues = map.keys();
keyOfValues.next(); // { value: "a", done: false }
keyOfValues.next(); // { value: "b", done: false }
keyOfValues.next(); // { value: "c", done: false }

for (const a of map) console.log(a);
// ["a", 1]
// ["b", 2]
// ["c", 3]

/* .keys() : key 만 뽑아줌 */
for (const a of map.keys()) console.log(a);
// "a"
// "b"
// "c"

/* .values() : key 만 뽑아줌 */
for (const a of map.values()) console.log(a);
// 1
// 2
// 3

/* .entries() : key 와 value 를 entry 로 뽑아줌 */
for (const a of map.entries()) console.log(a);
// ["a", 1]
// ["b", 2]
// ["c", 3]

const it = map.values();
const it2 = it[Symbol.iterator]();
it2.next(); // { value: 1, done: false }
it2.next(); // { value: 2, done: false }
if2.next(); // { value: 3, done: false }
```

### 궁금한점

- 그래서 iterable 객체가 뭘까
- next() 메서드의 직접적인 역할은 뭘까

## 사용자 정의 이터러블을 통해 알아보기

```javascript
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false };
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { done: true }

for (const a of iterable) console.log(a);
// 3
// 2
// 1

const arr2 = [1, 2, 3];
for (const a of arr2) console.log(a);
// 1
// 2
// 3

/* iterator 가 자기 자신을 반환하는 Symbol.iterator 를 가지고 있을 때
well-formed iterator, well-formed iterable 이라고 함 */
const iter2 = arr2[Symbol.iterator]();
console.log(iter2[Symbol.iterator]()); // function
for (const a of iter2) console.log(a);
// 1
// 2
// 3
```

```javascript
console.log(document.querySelectorAll('*'));
for ( const a of document.querySelectorAll('*') console.log(a));
const all = document.querySelectorAll('*');
console.log(all) // NodeList [html, head, script, body, ...], __proto__ : NodeList
console.log(all[Symbol.iterator]); // function
console.log(all[Symbol.iterator]()); // Array Iterator {}
let iter3 = all[Symbol.iterator]();
console.log(iter3.next()); // { value: html, done: false }
console.log(iter3.next()); // { value: head, done: false }
console.log(iter3.next()); // { value: script, done: false }
```

## 전개 연산자

```javascript
const a = [1, 2];
console.log(...a); // 1 2
console.log([...a, ...[3, 4]]); // [1, 2, 3, 4]

a[Symbol.iterator] = null;
console.log([...a, ...[3, 4]]); // TypeError : a is not iterable
```

```javascript
/* Array */
const arr = [1, 2, 3];
/* Set */
const set = new Set([1, 2, 3]);
/* Map */
const map = new Map(["a", 1], ["b", 2], ["c", 3]);

console.log([...arr, ...set, ...map]);
// [1, 2, 3, 1, 2, 3, ["a", 1], ["b", 2], ["c", 3]];

console.log([...arr, ...set, ...map.values()]);
// [1, 2, 3, 1, 2, 3, 1, 2, 3 ];

console.log([...arr, ...set, ...map.keys()]);
// [1, 2, 3, 1, 2, 3, "a", "b", "c" ];
```
