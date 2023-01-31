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
function *gen() {
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

## odds

```javascript
function* odds(l) {
  yield 1;
  yield 3;
  yield 5;
}

let iter2 = odds(10);
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
```

```javascript
function *odds(l) {
  for (let i = 0;, i < l; i++) {
    if (i % 2) yield i;
  }
}

let iter2 = odds(10);
console.log(iter2.next()); // { value: 1, done: false }
console.log(iter2.next()); // { value: 3, done: false }
console.log(iter2.next()); // { value: 5, done: false }
console.log(iter2.next()); // { value: 7, done: false }
console.log(iter2.next()); // { value: 9, done: false }
console.log(iter2.next()); // { value: undefined, done: true }
console.log(iter2.next()); // { value: undefined, done: true }
console.log(iter2.next()); // { value: undefined, done: true }
```

```javascript
function *infinity(i = 0) {
  while (true) yield i++;
}

function *limit(l, iter) {
    fonr (const a of iter) {
        yield a;
        if (a == l) return;
    }
}

function *odds(l) {
    for (const a of infinity(1)) {
        if (i % 2) yield a;
        if (a == l) return;
    }
}

let iter4 = limit(4, [1, 2, 3, 4, 5, 6]);
iter4.next(); // { value: 1, done: false }
iter4.next(); // { value: 2, done: false }
iter4.next(); // { value: 3, done: false }
iter4.next(); // { value: 4, done: false }
iter4.next(); // { value: undefined, done: true }



for (const a of odds(40)) console.log(a);
// 1
// 3
// 5
// ...
// 39
```

## for of, 전개 연산자, 구조 분해, 나머지 연산자
