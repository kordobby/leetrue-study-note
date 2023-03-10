## 평가와 일급

### 평가

- 코드가 계산 (Evaluation) 되어 값을 만드는 것

### 일급

- 값으로 다룰 수 있음
- 변수에 담을 수 있음
- 함수의 인자로 사용될 수 있음
- 함수의 결과로 사용될 수 있음

```javascript
const a = 10; // a 라는 변수에 10이라는 값을 담는다.
const add10 = (a) => a + 10; // add10 의 인자로 a가 전달될 수 있다.
const r = add10(a); // 함수의 결과는 함수의 리턴값으로 사용될 수 있다.

console.log(r);
```

### 일급 함수

- 함수를 값으로 다룰 수 있음
- 조합성과 추상화의 도구

```javascript
const add5 = (a) => a + 5;
console.log(add5); // (a) => a+ 5;
console.log(add5(5));

const f1 => () => () => 1;
console.log(f1()); // () => 1;

const f1 = f1();
console.log(f2); // () => 1;
console.log(f2()); // 1;
```

## 함수

### 일급 함수

- 함수가 값으로 다뤄질 수 있음

### 고차 함수

- 함수를 값으로 다루는 함수

### 함수를 인자로 받아서 실행하는 함수

- apply1
- times

```javascript
const apply1 = (f) => f(1);
const add2 = (a) => a + 2;
console.log(apply1(add2)); // 3
console.log(apply1((a) => a - 1)); // 0
/*
apply1(add2) = apply1((a) => a+2) = (1) => 1+2 // 3;
*/

const times = (f, n) => {
    let i = -1;
    while (++i < n>) f(i);
}

times(console.log, 3); // 0, 1, 2;
times(a => console.log(a +10), 3); // 10, 11, 12;
```

### 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)

- addMaker

```javascript
// a 는 계속 기억이 되고 있음
const addMaker = (a) => (b) => a + b;
const add10 = addMaker(10);
console.log(add10); // b => a + b;
console.log(add10(5)); // 15;
console.log(add10(10)); // 20;
```
