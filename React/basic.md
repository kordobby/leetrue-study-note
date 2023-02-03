### 런타임

- 컴퓨터 언어 안에 쓰인 프로그램을 관리하기 위해 특정한 컴파일러나 가상 머신이 사용하는 기본 코드 라이브러리나 프로그램

### Nodes

- 자바스크립트 엔진인 V8으로 빌드된 자바스크립트 런타임
- 자바스크립트로 서버 사이드 애플리케이션으로 구현할 수 있게 해줌

### npm

- Node js으로 만들어진 모듈을 관리해주는 툴
- 파이썬에서는 pip, 루비에서는 gem으로 연상하면 됨

### 명령문 npx

- npm 5.2+ 버전의 패키지 실행 도구

### React

- 자바스크립트 라이브러리
- 컴포넌트라고 불리는 독립적인 코드 조각들을 활용하여, 복잡한 UI를 유연하게 구현할 수 있게 도와주는 역할

### Babel

- 자바스크립트 컴파일러
- Babel의 입력과 출력 모두 자바스크립트
- 최신 버전의 자바스크립트 문법을 브라우저가 이해하지 못하기 때문에, 바벨이 브라우저가 이해할 수 있는 문법으로 변환해줌
- ES6, ES7 등의 최신 문법을 사용해서 코딩을 할 수 있기 때문에 생산성 향상에 좋음

### Bundler

- 분리된 javascript, css 모듈 코드를 최적화된 여러개의 파일로 결합해주는 역할
- 대표적으로 webpack, browserify

### Webpack

- 모듈의 의존성을 쉽게 관리할 수 있게 해줌

### Browserify

- require(“모듈명”) 함수를 사용하여, 모듈을 참조하는건 node js에서 가능
- browserify를 사용하면, 이 문법을 사용하여 모듈을 불러올 수 있음

### JSX

```javascript
const element = <h1>Hello, americanopeople world!</h1>;
```

- 자바스크립트를 확장한 문법
- JSX라고 하면, 템플릿 언어가 떠오를 수 있지만 Javascript의 모든 기능을 실행할 수 있음
- JSX는 React의 Element를 생성
- 자바스크립트 안에 UI 마크업 언어를 쉽게 넣을 수 있도록 도와줌

```javascript
function formatName(user) {
  return user.firstName + " " + user.lastName;
}

const user = {
  firstName: "Harper",
  lastName: "Perez",
};

const element = <h1>Hello, {formatName(user)}!</h1>;

ReactDOM.render(element, document.getElementById("root"));
```

### React Element

- React의 Element는 React 앱을 구성하는 블록
- 엘리먼트는 화면을 구성하는 요소이며, 불변 값
- 주로 직접 사용되지는 않고, React Component에 의해서 만들어짐

### React Component

- 페이지에 렌더링할 React Element는 재사용가능한 작은 코드 조각

### React Props

- 부모 컴포넌트로부터 자식 컴포넌트에게 전달된 데이터
- props는 읽기전용 데이터이기 때문에 변경하면 안됨
- 변경해야하는 값은 state를 사용해야함

### React Props > children

- props.children은 컴포넌트의 여는 태그와 닫는 태그 사이의 내용을 말함

```javascript
<Welcome>Hello world!</Welcome>;

function Welcome(props) {
  return <p>{props.children}</p>;
}

class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### React State

- 컴포넌트에 관한 일부 데이터가 시간에 따라 변경될때, state가 사용됨
- 하나의 state는 하나의 컴포넌트에서 관리되어야함
- 서로 다른 두 컴포넌트의 state를 동기화하려고 하면 안됨
- 두 공통 상태를 공통 조상으로 끌어올리고, 해당 데이터를 두 컴포넌트에 props으로 전달해야함

### React Controlled Component

- 리액트에 의해 입력값이 제어되는 Form을 Controlled Component라 칭함
- 사용자가 Controlled Component에 데이터를 입력하면, 이벤트 핸들러가 호출되고, 코드가 입력값의 유효성을 체크하는 방식으로 동작

### React Key

- Element 배열을 만들 때, 각 Element를 식별하기 위해서는 Key를 사용
- 특정 Element를 삭제,추가 작업 같은 제어를 할 수 있음

### Reconciliation

- React Component의 state 혹은 props가 변경되면, React는 새로 반환된 Component를 이전에 렌더링된 Component와 대조하여 실제 DOM을 업데이트해야하는지를 결정
- 두 Component가 동일하지 않다면, React는 Dom을 다시 렌더링
- 이 작업을 Reconciliation(재조정)이라 말함
