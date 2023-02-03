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

###
