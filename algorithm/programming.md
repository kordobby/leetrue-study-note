# 자료구조 구현을 위한 C 프로그래밍 기법

## 🖐🏻 들어가며,

---

## ✏️ 배열

---

배열(Array)은 자료형이 같은 자료를 나열해 메모리에 연속으로 저장하여 만든 자료 그룹이다. 배열의 각 요소들은 간단히 구별하기 위해 번호를 사용하는데, 이는 인덱스(Index)라고 한다. 특정 배열 요소를 사용할 경우에는 `배열 이름[배열 요소의 인덱스]` 로 지정하고 변수처럼 사용할 수 있다. 모든 자료형은 배열로 구성이 가능하며, 구성 형태에 따라 1차원 배열뿐만 아니라 2차원이나 3차원 등 다차원 배열로도 구성할 수 있다.

## 1️⃣ 1차원 배열

---

## 2️⃣ 다차원 배열

---

배열은 배열 요소들을 2차원, 3차원으로 구성해 2차원 배열, 3차원 배열로 나타낼 수 있다. 즉 2차원 배열은 배열의 배열이고, 3차원 배열은 배열의 배열의 배열이다. 2차원 이상의 배열을 다차원 배열이라고 한다.

### 자바스크립트의 2차원 배열

자바스크립트는 진정한 2차원 배열은 없다. C에서의 다차원 배열을 떠올리면 `var array = [][];` 이런게 있을 것 같지만 자바스크립트에서는 이와 같은 배열 선언은 불가능하다. 다만, 약간의 트릭을 통해 2차원 배열과 비슷한 배열은 생성이 가능하다.

자바스크립트의 2차원 배열은 1차원 배열에 또 다른 배열 객체를 추가해 2차원 배열을 만드는 방법을 사용한다. 자바스크립트의 배열은 동적으로 배열의 크기 조절이 가능하며, 배열에는 모든 유형의 변수 그리고 함수, 객체도 담을 수가 있어 유연한 사용이 가능하다.

- 초기값을 할당해 배열을 생성하기

```jsx
// array[5][2]
const array = [
  ["a", "b"],
  ["c", "d"],
  ["e", "f"],
  ["g", "h"],
  ["i", "j"],
];
```

- 반복문을 사용해 빈 배열 생성하기

```jsx
// array[5][2]
var array = new Array(5);

for (let i = 0; i < array.length; i++) {
  array[i] = new Array(2);
}
```

- 2차원 배열 생성 함수를 만들어 사용하기

```jsx
function create2DArray(rows, columns) {
  var arr = new Array(rows);
  for (var i = 0; i < rows; i++) {
    arr[i] = new Array(columns);
  }
  return arr;
}

// array[5][2]
var array = create2DArray(5, 2);
```

- Array 객체에 배열 생성 함수를 추가해 사용하기

```jsx
Array.matrix = function (m, n, initial) {
  var a,
    i,
    j,
    mat = [];
  for (i = 0; i < m; i += 1) {
    a = [];
    for (j = 0; j < n; j += 1) {
      a[j] = initial;
    }
    mat[i] = a;
  }
  return mat;
};

// matrix('행', '열', '기본값')
var arr = Array.matrix(5, 2, 0);
```

- ES6 문법을 활용한 방법

```jsx
// arr[5][2] (빈 배열 생성)
const arr1 = Array.from(Array(5), () => new Array(2)

// arr[5][2] (null로 초기화하여 생성)
const arr2 = Array.from(Array(5), () => Array(2).fill(null))
```

## 📌  포인터

---

우리가 사용하는 모든 변수는 메모리의 특정 위치에 저장되는데 그 위치를 나타내는 메모리 주소를 “포인터”라고 부른다. 포인터 변수는 메모리의 주소값을 저장하는 특별한 변수이며 포인터에 어떤 변수의 주소를 저장한다는 것은 포인터가 그 변수를 가리키고 있다는 것이다. 포인터는 이름 앞에 (`*`)를 넣어 포인터 변수임을 표시한다.

포인터의 연산자는 주소 연산자(`&`)를 사요ㅕㅇ해 변수의 주소를 지정할 수 있고, 참조 연산자(`*`)를 사용해 포인터가 가리키는 변수의 값을 사용할 수 있다.

### 포인터에 주소를 지정하는 방법

- 주소 연산자를 사용해 변수의 주소 지정
- 동적 메모리를 할당하고 그 시작 주소를 포인터 값으로 지정
- 문자형 포인터에 문자열의 시작 주소 지정
- 배열 이름으로 배열의 시작 주소 사용
- 주소 연산자를 사용해 첫 번째 배열 요소의 시작 주소 사용

## 📌  구조체

---

구조체도 배열처럼 여러 데이터를 그룹으로 묶어 하나의 자료형으로 정의하고 사용하는 자료형이다. 배열은 자료형이 같을 때만 그룹으로 묶을 수 있지만, 구조체는 서로 다른 자료형도 그룹으로 묶을 수 있어 복잡한 자료 형태를 정의할 때 유용하게 쓸 수 있다.

구조체는 서로 다른 자료형을 그룹으로 묶어 새로운 자료형을 정의한다. 구조체는 구조체 이름, 자료형, 데이터 항목으로 구성된다. 구조체 선언은 사용할 구조체의 모양을 정의한 것일 뿐, 실제로 구조체를 사용하려면 변수를 다시 선언해야 한다.

구조체의 점 연산자(`.`)는 구조체 변수의 데이터 항목을 지정하는 연산자이고, 화살표 연산자(`→`)는 구조체형 포인터에서 포인터가 가리키는 데이터 항목을 지정한다.

### 객체와 C언어의 비교

C언어에는 살짝 부족한 객체의 개념으로 구조체가 있다. 구조체는 메서드가 존재하지 않아서 구조체의 정보활용이 어렵다. 구조체 변수에 함수 포인터를 만들어 억지로 객체처럼 함수를 맵핑시켜 구조체처럼 사용은 가능하다.

## 📌  재귀호출

---

재귀호출은 자기 자신을 호출해 순환 수행되는 것으로 순환 호출이라고도 한다. 프로그램 크기를 줄이고 간단하게 작성할 수 있지만, 잘못 사용하면 오히려 프로그램 속도가 느려지거나 무한 반복하는 등 상당히 복잡한 문제가 발생할 수 있으므로 주의해야 한다.

## 🖐🏻 마무리

---

# 참고

---

- C로 배우는 쉬운 자료구조 4판 - 이지영
- 그림으로 배우는 알고리즘 - 영진닷컴
- [그림으로 쉽게 배우는 자료구조와 알고리즘 - 인프런/감자](https://www.inflearn.com/course/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B8%B0%EB%B3%B8)
- [자바스크립트 2차원 배열 선언 및 사용법 - 젠트](https://gent.tistory.com/296)