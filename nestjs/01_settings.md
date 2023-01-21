# NestJS 설치 & project 생성

### 1. NestJS cli 설치

```javascript
npm i -g @nestjs/cli
```

### 2. 프로젝트 설치

```javascript
nest new project-name
```

#### 설치 간에 무한루프에 걸리고 에러가 발생 메세지가 뜬다면?

- DPI 문제로 인해 발생하는 문제로, ts-jest의 의존성만 따로 설치해주면 됨

  - 단, 좌측에 폴더가 모두 설치된 경우!

    ```javascript
    npm i -D git+https://github.com/kulshekhar/ts-jest.git
    ```

### 3. 실행

```javascript
npm run start:dev
```

### 4. 생성된 프로젝트 구조

- dist
  - ts 코드를 컴파일해서 빌드한 .js 파일이 저장되는 폴더
- node_modules
  - package.json 에 정의된 패키지 모듈이 설치되는 폴더
- src
  - ts 코드가 저장되는 사용자 소스 폴더
- test
  - test 소스가 저장되는 폴더

#### src : 소스폴더 구조

- `app.controller.spec.ts`
  - test 용 소스
  - contoller 를 테스트
- `app.controller.ts`
  - controller 소스
  - client 의 request 를 처리하고, response 를 보냄
- `app.module.ts`
  - module 소스
  - 모듈을 정의 ( controller, service )
- `app.service.ts`
  - service 소스
  - controller 가 요청한 비즈니스 로직을 처리
- `main.ts`
  - 프로젝트 시작점 (Entry Point)
  - server 를 스타트하고 포트 설정, CORS 등을 정의
