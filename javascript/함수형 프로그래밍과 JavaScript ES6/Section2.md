## 제너레이터 / 이터레이터

- 제너레이터 : 이터레이저이자 이터러블을 생성하는 함수

```javascript
function gen() {
    yeild 1;
    yeild 2;
    yeild 3;
}

let iter = gen();
console.log(iter[Symbol.iterator]() == iter); // true
console.log(iter.next()); // { value: 1, done: false}
console.log(iter.next()); // { value: 2, done: false}
console.log(iter.next()); // { value: 3, done: false}
console.log(iter.next()); // { value: undefined, done: true}

```

```javascript
function gen() {
    yeild 1;
    yeild 2;
    yeild 3;
    return 100; // return 값은 순회에서는 나오지 않음
}

let iter = gen();
console.log(iter[Symbol.iterator]() == iter); // true
console.log(iter.next()); // { value: 1, done: false}
console.log(iter.next()); // { value: 2, done: false}
console.log(iter.next()); // { value: 3, done: false}
console.log(iter.next()); // { value: 100, done: true}

for (const a of gen()) console.log(a);
// 1
// 2
// 3
```

```javascript
function gen() {
    yeild 1;
    if (false) yeild 2;
    yeild 3;
    return 100; // return 값은 순회에서는 나오지 않음
}

for (const a of gen()) console.log(a);
// 1
// 3
```

- javascript 에서는 어떠한 값이든 이터러블이면 순회할 수 있음
- 제너레이터는 하나의 문장을 값으로 만들 수 있고 이 문장을 통해 순회할 수 있는 값을 만들 수 있음
