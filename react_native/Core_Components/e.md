# [ 공용 모달 제작기 ] Context API 그리고 컴포넌트 분리의 중요함을 느꼈던 하루.

# Context

---

- React component 간에 어떠한 값을 공유할 수 있게 해주는 기능
- 주로 전역적(global)으로 필요한 값을 다룰 때 사용
- 단순하게 “ React Component” 에서 Props 가 아닌 또 다른 방식으로 컴포넌트 간에 값을 전달하는 방법 이라고 접근해보자

## How to use `Context`

---

### 1. `Context` 만들기

- React package 에서 `createContext` 라는 함수를 불러와서 `Context` 를 만들 수 잇음

```jsx
import { createContext } from "react";

const TrueContext = createContext();
```

### 2. `Provider` 감싸주고 공유하고자 하는 값 설정하기

- `Context` 객체 내부에는 `Provider` 라는 컴포넌트가 들어있으며, 컴포넌트 간에 공유하고자 하는 값을 `value` 라는 Props로 설정하면 자식 컴포넌트들에서 해당 값에 바로 접근이 가능

```jsx
function App() {
	return (
		<TrueContext.Provider value="leetrue-the-best!"/>
			<GrandParent/>
		</TrueContext.Provider>
	)
}
```

### 3. `useContext` 라는 Hook으로 `Context` 에서 원하는 값 꺼내서 사용하기

- Hook 의 인자에 `createContext` 로 만든 `TrueContext` 를 넣어서 값을 가져옴

```jsx
import { useContext } from "react";

function GrandSon() {
  const value = useContext(TrueContext);
  return <div>Received : {value}</div>;
}
```

## `Context` 를 이용해 카운터를 만들어봤다.

---

- 내가 고민하고 있는 부분은 결국은 변하는 상태값을 이용해 화면에 모달을 띄워주는 과정이니, Context 를 이용해 상태 변화까지 이용할 수 있어야했기에 카운터를 만들어봤다.

### 1. Modal 컴포넌트 만들기

```jsx
import Modal from "./components/Modal";

const App = () => {
  return (
    <>
      <Modal />
    </>
  );
};

export default App;
```

### 2. Modal 컴포넌트 만들기

![스크린샷 2023-01-15 오전 4.16.46.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f50c9cf3-0076-432a-bf2c-8858686d7b2b/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-15_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.16.46.png)

![스크린샷 2023-01-15 오전 4.17.54.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/16f936fa-7202-4abd-bf53-ef0aca809ad8/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-15_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.17.54.png)

```jsx
import { createContext, useContext } from "react";
import React, { useState } from "react";

export const CounterContext = createContext();

/* #1. useState를 이용해 counter를 넣어줄 상태  만들기 */
const CounterProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);

  // #2. 상태값 뿐만 아니라 setState 함수도 함께 Provider props 로 넘겨주기
  return (
    <CounterContext.Provider value={{ value: counter, trigger: setCounter }}>
      {children}
    </CounterContext.Provider>
  );
};

/* #3. 상태 변경을 유발하는 트리거 컴포넌트 작성 */
const CounterTrigger = () => {
  const { value, trigger } = useContext(CounterContext);

  return (
    <div>
      <button onClick={() => trigger(value + 1)}> + 1 </button>
      <button onClick={() => trigger(value - 1)}> - 1 </button>
    </div>
  );
};

/* #4. 바뀐 상태값을 화면에 보여줄 컴포넌트 작성 */
const CounterValue = () => {
  const { value } = useContext(CounterContext);

  return <h1>{value}</h1>;
};

/* #5. Provider로 컴포넌트들을 감싸주기 */
const Modal = () => {
  return (
    <>
      <CounterProvider>
        <CounterTrigger />
        <CounterValue />
      </CounterProvider>
    </>
  );
};

export default Modal;
```

### 3. 렌더링 체크

- Context Provider 내부에 있는 컴포넌트와 외부에 있는 컴포넌트에 렌더링은 어떻게 달라질까 궁금했다.
- 외부에 있는 컴포넌트 같은 경우라면 형제 컴포넌트이기 때문에 영향을 당연히 받지않을 것이라 생각이 들었는데 내부 같은 경우는 Provider 의 영향이 있을 수도 있지 않을까? 라는 생각에 테스트를 해봤다.

```jsx
const Modal = () => {
  return (
    <>
      <CounterProvider>
        <CounterValue />
        <CounterTrigger />
        <RenderCheckerInside />
      </CounterProvider>
      <RenderCheckerOutside />
    </>
  );
};
```

- 결과는
  - 첫 렌더링 이후로는 Provider 에서 선언한 값들의 상태가 바뀌더라도 Provider 내부와 외부의 모든 컴포넌트는 렌더링에 영향을 받지않았다.
  - 내부의 트리거 컴포넌트 뿐만 아니라 렌더체커 컴포넌트도 상탯값을 가지고 있지는 않기 때문에 리렌더는 일어나지 않는다.

![스크린샷 2023-01-15 오전 4.21.50.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/59c32303-2c77-4f14-8388-2cd5b5eb3cc3/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-15_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.21.50.png)

![스크린샷 2023-01-15 오전 4.22.04.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fb475749-82cc-4a34-9fee-6b1d91108434/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-15_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.22.04.png)

### 4. 그러면 우리 앱에서 사용하는 apollo 에서 제공하는 `makeVar` 를 이용해 만들어보면?

- 찜찜해서 `makeVar` 를 이용해 새로운 카운터를 만들어봤다.
  - Context 를 이용해서 만들어줬던 카운터와는 컴포넌트를 그려내는 구조가 조금 달라졌다.
  - 전역에서 선언되어 관리하는 데이터를 컴포넌트에서 그냥 가져와서 띄워준다는 생각에 굳이 컴포넌트를 나누지 않고 풀어서 작성을 했다.

```jsx
import { modalVar } from "../apollo/store";
import { handlePlusCounter, handleMinusCounter } from "../apollo/store";
import { useReactiveVar } from "@apollo/client";
import RenderCheckerInside from "./RenderCheckerInside";

const ApolloModal = () => {
  const counter = useReactiveVar(modalVar);
  return (
    <>
      <h1>{counter.value}</h1>
      <div>
        <button onClick={handlePlusCounter}>+ 1</button>
        <button onClick={handleMinusCounter}>+ 1</button>
      </div>
      <RenderCheckerInside />
    </>
  );
};

export default ApolloModal;
```

- 그 결과는 ?
  - 카운터를 누를 때 마다 렌더링을 하는 현상이 발생했다.

![스크린샷 2023-01-15 오전 4.33.01.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b341f6c1-3e92-4a0c-9d03-dc68d6fe9666/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-15_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.33.01.png)

![스크린샷 2023-01-15 오전 4.51.34.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/735fec72-c9e2-41ab-9ddf-63beba68aafb/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-15_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.51.34.png)

<aside>
💡 **그런데 이 와중에 위에 한 줄을 작성하면서 문득 이런 생각이 들었다.**

- 내가 Context 를 이용한 카운터와 차이를 둔게 있지 않을까?
- 컴포넌트 구조 자체가 달라서 생긴 문제가 아니었을까?
</aside>

- 그래서 눈을 씻고 다시 컴포넌트를 바라봤고, 구조를 다시 작성을 해봤다.
- Context 를 이용해 만든 컴포넌트와 차별점이 없는 상태에서 다시 테스트를 해보기 위해!

```jsx
const CounterValue = () => {
  const counter = useReactiveVar(modalVar);
  return <h1>{counter.value}</h1>;
};

const CounterTrigger = () => {
  return (
    <div>
      <button onClick={handlePlusCounter}>+ 1</button>
      <button onClick={handleMinusCounter}>+ 1</button>
    </div>
  );
};

const ApolloModal = () => {
  // const counter = useReactiveVar(modalVar); <- 필요가 없어짐
  return (
    <>
      <CounterValue />
      <CounterTrigger />
      <RenderCheckerInside />
    </>
  );
};
```

- 그 결과는?
  - 상태값을 담고있는 `<CounterView/>` 컴포넌트를 제외하고는 리렌더링이 일어나지 않았다. 👀
  - 내가 괜히… 아폴로를 미워했군.. 싶고.. 그냥.. 미안해..

![스크린샷 2023-01-15 오전 4.21.50.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dacc471e-ebce-412f-a041-e84bd004278f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-15_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.21.50.png)

![스크린샷 2023-01-15 오전 4.32.52.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0a7da56b-bd1b-4f24-adc9-5b1b674031a4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-15_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.32.52.png)

## 그러니까 결론은,

- 어떤 전역상태 라이브러리를 사용하던 간에 내가 컴포넌트만 잘 분리를 해주면 불필요한 리렌더링을 줄일 수 있다.
- 모달 컴포넌트를 작성하기 위해서 어떠한 라이브러리를 쓸 것이냐 보다 중요한 것은 내가 얼마나 컴포넌트를 잘 쪼개고 관리를 해주는가가 중요하다는 것
- 어쨌든 회사에서는 apollo 를 잘 활용하고 있고 굳이 새로운거 가져와서 쓰지 말고, 있는 걸로 예쁘게 잘 만들어봐야겠다.

## 다음 step !

1. 사용중인 모달 컴포넌트 구조 뜯어보기 📌
2. 컴파운드 컴포넌트 패턴에 대해서 공부하기
3. 팝업 모달 컴포넌트 작성해보기

### 참고

https://velog.io/@velopert/react-context-tutorial
