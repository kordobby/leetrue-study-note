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
