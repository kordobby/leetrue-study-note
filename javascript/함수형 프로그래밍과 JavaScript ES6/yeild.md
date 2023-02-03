## generator function

- 사용자의 요구에 따라 다른 시간 간격으로 여러 값을 반환할 수 있으며, 내부 상태를 관리할 수 있는 함수
- `function* generatorFunction() {/* ... */}` 와 같이 사용
- 단 한 번의 실행으로 함수의 끝까지 실행이 완료되는 일반 함수와 달리,
  - 제너레이터 함수는 사용자의 요구에 따라 (`yeild` 와 `next` 를 통해) 일시적으로 정지될 수도 있고, 다시 시작될 수도 있음
  - 제너레이터 함수의 반환으로는 제너레이터가 반환됨

## generator

- 제너레이터 함수의 반환으로 iterable 프로토콜과 iterator 프로토콜을 따르는 객체
- 제너레이터 이터러블에서 반환하는 이터레이터는 자기 자신임

```javascript
function* generatorFunction() {
  yield 42;
}

const generator = generatorFunction();
generator === generator[Symbol.iterator]();

// 제너레이터의 이터러블은 다음과 방식으로 구현되어 있을 것
// generator[Symbol.iterator] = () => this;
```

## yield / next

- `yeild` 는 제너레이터 함수의 실행을 일시적으로 정지시키며, `yeild` 뒤에 오는 표현식은 제너레이터의 caller 에게 반환됨
- 즉, 일반 함수의 `return` 과 매우 유사
  - 제너레이터 함수 : Callee
  - 이를 호출하는 함수 : Caller
  - Caller 는 Callee 의 yield 부분에서 다음 statement 로 진행을 할 지 여부를 제어
  - 이는 next 로 인해 재개될 수 있음
- next를 일일이 호출하지 않고, programmitically하게 호출하게 하려면, 다음과 같이 재귀 호출을 하면 됨
- 예제 코드는 홀수는 그대로 출력하고 짝수에는 1을 더해 출력하는 Runner

```javascript
function* sampleGFunction() {
  console.log(yield 10);
  console.log(yield 5);
  console.log(yield 0);
}

function run(gen) {
  const it = gen();

  (function iterate({ value, done }) {
    if (done) {
      return value;
    }

    if (value % 2 === 0) {
      iterate(it.next(value + 1));
    } else {
      iterate(it.next(value));
    }
  })(it.next());
}

run(sampleGFunction);
// 11
// 5
// 1
```

## 제너레이터 함수에서의 return

- return은 수행되고 있는 이터레이터를 종료시킴
- return 뒤에 오는 값은 IteratorResult 객체의 value 프로퍼티에 할당
- done 프로퍼티는 true가 할당

```javascript
function* sampleGFunction() {
  return 42;
}

const generator = sampleGFunction();
console.log(generator.next()); // { value: 42, done: true }
```

## 제너레이터 종료하기

- 제너레이터에는 `next` 외에도 `throw`, `return` 등의 메서드가 있는데, 이 `return` 과 `throw` 를 통해 제너레이터를 종료할 수 있음
- 둘 간에 차이는 있음

### return

```javascript
function* pokemon() {
  console.log("[PIKACHU]");
  let i = 0;

  try {
    while (true) {
      yeild i++;
    }
  } catch(e) {
    console.log('[ERROR]', e);
  }
}

const withReturn = pokemon();
console.log(withReturn.next());
console.log(withReturn.next());
console.log(withReturn.next());
console.log(withReturn.next());
console.log(withReturn.return(333));

// [PIKACHU]
// { value: 0, done: false}
// { value: 1, done: false}
// { value: 2, done: false}
// { value: 3, done: false}
// { value: 333, done: true}
```

- `return` 이 호출되고 나면, `value` 에는 `return` 의 인자가 할당되고, `done`은 `true`가 됨

### return with try / finally

- `return` 메서드가 호출되었을 때 제너레이터 함수의 코드가 `try / finally` 안에 있으면, 시퀀스가 종료되지 않음
- `return` 이후 `finally` 블록의 `yeild` 표현식이 실행되며, 시퀀스는 결국 `return` 에 전달된 값으로 종료됨

```javascript
function* oneToX() {
  yield 1;

  try {
    yield 2;
  } finally {
    yield 3;
    yield 4;
  }

  yield 5;
}

var withReturnWithFinally = oneToX();

console.log(withReturnWithFinally.next()); // { value: 1, done: false }
console.log(withReturnWithFinally.next()); // { value: 2, done: false }
console.log(withReturnWithFinally.return(6)); // { value: 3, done: false }
console.log(withReturnWithFinally.next()); // { value: 4, done: false }
console.log(withReturnWithFinally.next()); // { value: 6, done: true }
```

## 다른 generator function 에 컨텍스트 위임하기

## iterable 한 generator

## yeild

- `yeild` operator is used to pause and resume a generator function.

```javascript
function* leetrue(index) {
  while (index < 2) {
    yield index;
    index++;
  }
}

const iterator = leetrue(0);

console.log(iterator.next().value); // 0
console.log(iterator.next().value); // 1
```
