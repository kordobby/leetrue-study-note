## generator function

## generator

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

## 제너레이터 함수에서의 return

## 제너레이터 종료하기

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
