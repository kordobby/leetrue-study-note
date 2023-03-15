# CSS 스타일시트와 CSS 규칙

# CSS 스타일시트와 CSS 규칙

## CSS 스타일 시트

스타일 시트는 외부 스타일시트를 포함하도록 `HTMLLinkElement` 노드를 사용하거나 인라인 스타일시트를 정의하도록 `HTMLStyleElement` 노드를 사용해 `HTML` 문서에 추가된다.

```html
// HTMLLinkElement
<link href="stylesheet.css" rel="stylesheet" type="text/css" />

// HTMLStyleElement
<style></style>
```

아래 `HTML` 문서에는 DOM 내에 위의 두 가지 `Element` 노드가 존재하며, 해당 노드를 생성하는 생성자를 검증한다. 스타일시트가 `HTML` 문서에 추가되면 `CSSStyleSheet` 개체로 표현되며, 스타일시트 내부의 각 `CSS` 규칙은 `CSSStyleRule` 개체로 표현된다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      id="linkElement"
      href="http://yui/..../reset-min.css"
      rel="stylesheet"
      type="text/css"
    />

    <style id="styleElement">
      body {
        background-color: #fff;
      }
    </style>
  </head>
  <body>
    <script>
      console.log(document.querySelector("#linkElement").constructor);
      <!-- function HTMLLinkElement() { [native code] } 출력 -->

      console.log(document.querySelector("#styleElement").constructor);
      <!-- function HTMLStyleElement() { [native code] } 출력 -->
    </script>
  </body>
</html>
```

스타일시트와 스타일 시트 내의 각 CSS 규칙(선택자와 CSS 속성 및 값)을 생성하는 생성자를 검증해보자. 스타일시트 자체를 표현하는 실제 개체(`CSSStyleSheet`)에 접근하는 것과 동일하지 않다는 점에 유의하자.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      id="linkeElement"
      href="http://yui/..../reset-min.css"
      rel="stylesheet"
      type="text/css"
    />

    <style id="styleElement">
      body {
        background-color: #fff;
      }
    </style>
  </head>
  <body>
    <script>
      console.log(document.querySelector("#linkElement").sheet.constructor);
      <!-- 이 개체는 스타일시트 자체이므로 function CSSStyleSheet() { [native code] } 출력 -->

      console.log(document.querySelector("#styleElement").sheet.constructor);
      <!-- 이 개체는 스타일시트 내부 규칙이므로 function CSSStyleRule() { [native code] } 출력 -->
    </script>
  </body>
</html>
```

## DOM 내의 모든 스타일시트 (`CSSStylesheet` 개체)에 접근하기

`document.styleSheets` 는 `HTML` 문서 내에 명시적으로 연결되거나 내장된 모든 스타일시트 개체 리스트에 접근할 수 있게 해준다. 이제 `styleSheets` 를 활용해 문서 내에 포함된 모든 스타일시트에 대한 접근을 얻어내보자.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      id="linkeElement"
      href="http://yui/..../reset-min.css"
      rel="stylesheet"
      type="text/css"
    />

    <style id="styleElement">
      body {
        background-color: #fff;
      }
    </style>
  </head>
  <body>
    <script>
      console.log(document.styleSheets.length);
      <!-- 2가 출렫됨 -->
      console.log(document.styleSheets[0]);
      <!-- <link> -->
      console.log(document.styleSheets[1]);
      <!-- <style> -->
    </script>
  </body>
</html>
```

`styleSheets` 를 사용해 문서의 스타일시트에 접근하는 것뿐만 아니라 DOM 내의 `element` (`<style>` 또는 `<link>`)를 선택한 후 `.sheet` 속성을 사용해 `CSSStylesheet` 개체에 접근할 수도 있다. 다음 코드에서는 먼서 스타일시트를 포함하기 위해 사용된 `element` 를 선택한 후 `.sheet` 속성을 활용해 스타일 시트에 접근하자.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      id="linkeElement"
      href="http://yui/..../reset-min.css"
      rel="stylesheet"
      type="text/css"
    />

    <style id="styleElement">
      body {
        background-color: #fff;
      }
    </style>
  </head>
  <body>
    <script>
      <!-- <link> 에 해당하는 CSSStylesheet 개체를 얻음 -->
      console.log(document.querySelector("#linkElement").sheet);
      <!-- document.styleSheets[0]와 동일 -->

      <!-- <style> 에 해당하는 CSSStylesheet 개체를 얻음 -->
      console.log(document.querySelector("#styleElement").sheet);
      <!-- document.styleSheets[1]와 동일 -->
    </script>
  </body>
</html>
```

## `CSSStyleSheet` 의 속성 및 메서드

`CSSStyleSheet` 노드에서 사용 가능한 속성 및 메서드에 관련된 정확한 정보를 얻으려면, 사양서를 무시하고 브라우저에 직접 물어보는 것이 가장 좋다. 다음 코드에서 생성되는 배열을 살펴보면 `CSSStyleSheet` 노드에서 사용 가능한 속성 및 메서드에 대해 알 수 있다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      id="linkeElement"
      href="http://yui/..../reset-min.css"
      rel="stylesheet"
      type="text/css"
    />

    <style id="styleElement">
      body {
        background-color: #fff;
      }
    </style>
  </head>
  <body>
    <script>
      var styleSheet = document.querySelector("#styleElement").sheet;

      <!-- 고유 속성을 출력 -->
      console.log(Object.keys(styleSheet).sort());

      <!-- 고유 속성 및 상속받은 속성을 출력 -->
      var styleSheetPropertiesIncludeInherited = [];
      for (var p in styleSheet) {
        styleSheetPropertiesIncludeInherited.push(p);
      }

      console.log(styleSheetPropertiesIncludeInherited.sort());

      <!-- 상속받은 속성만을 출력 -->
      var styleSheetPropertiesOnlyInherited = [];
      for (var p in styleSheet) {
        if (!styleSheet.hasOwnProperty(p)) {
          styleSheetPropertiesOnlyInherited.push(p);
        }
      }

      console.log(styleSheetPropertiesOnlyInherited.sort());
    </script>
  </body>
</html>
```

`styleSheets` 리스트나 `.sheet` 속성을 통해 접근 가능한 `CSSStylesheet` 개체는 다음과 같은 속성과 메서드를 가진다.

- disabled
- href
- media
- ownerNode
- parentStylesheet
- title
- type
- cssRules
- ownerRule
- deleteRule
- insertRule

<aside>
💡 href, media, ownerNode, parentStylesheet, title, type 은 읽기 전용 속성으로 이 속성들에는 새로운 값을 부여할 수 없다.

</aside>

## CSSStyleRule 개요

`CSSStyleRule` 개체는 스타일시트에 포함된 각 `CSS` 규칙을 표현한다. 기본적으로 `CSSStyleRule` 은 선택자에 연결되는 `CSS` 속성과 값에 대한 인터페이스다. 다음 코드에서는 스타일 시트 내의 CSS 규칙을 표현하는 `CSSStyleRule` 개체에 접근해 인라인 시트에 포함된 각 규칙들의 상세 내용을 알아보자.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      id="linkeElement"
      href="http://yui/..../reset-min.css"
      rel="stylesheet"
      type="text/css"
    />

    <style id="styleElement">
      /* CSS 규칙 */
      body {
        background-color: #fff;
        margin: 20px;
      }

      /* CSS 규칙 */
      p {
        line-height: 1.4em;
        color: blue;
      }
    </style>
  </head>
  <body>
    <script>
      var sSheet = document.querySelector("#styleElement").sheet;

      console.log(sSheet.cssRules[0].cssText);
      <!-- "body { background-color : ... }" 출력 -->

      console.log(sSeet.cssRules[1].cssText);
      <!-- "p { line-height : ... }" 출력 -->
    </script>
  </body>
</html>
```

## CSSStyleRule 의 속성 및 메서드

`CSSStyleRule` 노드에서 사용 가능한 속성 및 메서드에 관련된 정확한 정보를 얻으려면, 사양서를 무시하고 브라우저에 직접 물어보는 것이 가장 좋다. 다음 코드에서 생성되는 배열을 살펴보면 `CSSStyleRule` 노드에서 사용 가능한 속성 및 메서드에 대해 자세히 알 수 있다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      id="linkeElement"
      href="http://yui/..../reset-min.css"
      rel="stylesheet"
      type="text/css"
    />

    <style id="styleElement">
      /* CSS 규칙 */
      body {
        background-color: #fff;
        margin: 20px;
      }

      /* CSS 규칙 */
      p {
        line-height: 1.4em;
        color: blue;
      }
    </style>
  </head>
  <body>
    <script>
      var styleSheetRule =
        document.querySelector("#styleElement").sheet.cssRules;

      <!-- 고유 속성을 출력 -->
      console.log(Object.keys(styleSheetRule).sort());

      <!-- 고유 속성 및 상속받은 속성을 출력 -->
      var styleSheetPropertiesIncludeInherited = [];
      for (var p in styleSheetRule) {
        styleSheetRulePropertiesIncludeInherited.push(p);
      }

      consnole.log(styleSheetPropertiesIncludeInherited.sort());

      <!-- 상속받은 속성만을 출력 -->
      var styleSheetPropertiesOnlyInherited = [];
      for (var p in styleSheetRule) {
        if (!styleSheetRule.hasOwnProperty(p)) {
          styleSheetRulePropertiesOnlyInherited.push(p);
        }
      }

      console.log(styleSheetRulePropertiesOnlyInherited.sort());
    </script>
  </body>
</html>
```

`cssRules` 개체를 사용해 스타일시트 내에 포함되는 규칙(ex. `body{ background ...}` )을 스크립트로 작성할 수 있다. 이 개체는 다음 속성을 제공한다.

- cssText
- parentRule
- parentStylesheet
- selectorText
- style
- type

## `cssRules` 를 사용해 스타일 시트 내의 CSS 규칙 목록을 가져오기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      id="linkeElement"
      href="http://yui/..../reset-min.css"
      rel="stylesheet"
      type="text/css"
    />

    <style id="styleElement">
      /* CSS 규칙 */
      body {
        background-color: #fff;
        margin: 20px;
      }

      /* CSS 규칙 */
      p {
        line-height: 1.4em;
        color: blue;
      }
    </style>
  </head>
  <body>
    <script>
      var sSheet = document.querySelector("#styleElement").sheet;

      <!-- 스타일 내의 각 CSS 규칙을 표현하는 CSSRule 개체들을 모두 가지고 있는 유사 배열 리스트 -->
      console.log(sSheet.cssRules);

      console.log(sSheet.cssRules.length);

      <!-- CSSRules 리스트 내의 규칙들은 인덱스 0부터 시작 -->
      console.log(sSheet.cssRules[0]);
      console.log(sSheet.cssRules[1]);
    </script>
  </body>
</html>
```

## insertRule() 과 deleteRule()을 사용해 스타일시트에 CSS 규칙을 삽입하고 삭제하기

`insertRule()` 과 `deleteRule()` 메서드는 스타일시트 내의 CSS 규칙을 프로그래밍적으로 조작할 수 있게 해준다. 아래 코드에서는 `insertRule()` 을 사용해 인라인 스타일시트의 인덱스 1에 `p { color: red }` 라는 CSS 규칙을 추가한다. 스타일시트 내의 CSS 규칙은 0부터 시작하는 인덱스를 가진다는 점에 유의한다. 따라서 새로운 규칙을 인덱스 1에 삽입하면, 인덱스 1에 있는 현재 규칙 (`p { font-size: 50px}`)은 인덱스 2가 된다.

규칙을 삭제하거나 제거하려면 스타일시트에서 `deleteRule()` 메서드를 호출하면서 스타일시트에서 삭제할 규칙의 인덱스를 전달하기만 하면 된다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      id="linkeElement"
      href="http://yui/..../reset-min.css"
      rel="stylesheet"
      type="text/css"
    />

    <style id="styleElement">
      p {
        line-height: 1.4em;
        color: blue;
      } // 인덱스 0

      p {
        font-size: 50px;
      } // 인덱스 1
    </style>
  </head>

  <p>리윤트 천재</p>

  <body>
    <script>
      <!-- 인라인 스타일시트의 인덱스 1에 새로운 CSS 규칙을 추가하기 -->
      document
        .querySelector("#styleElement")
        .sheet.insertRule("p{color:red}", 1);

      <!-- 추가되었는지 확인하기 -->
      console.log(
        document.querySelector("#styleElement").sheet.cssRules[1].cssText
      );

      <!-- 방금 추가한 것을 삭제하기 -->
      document.querySelector("#styleElement").sheet.deleteRule(1);

      <!-- 삭제되었는지 확인하기 -->
      console.log(
        document.querySelector("#styleElement").sheet.cssRules[1].cssText
      );
    </script>
  </body>
</html>
```

규칙을 삽입하고 삭제하는 것이 단계를 관리하고 숫자 인덱스 시스템을 사용해 스타일시트를 업데이트 하는 것처럼 어렵게 수행되는 경우는 별로 없다. 클라이언트에서 프로그래밍적으로 변경하는 것보다 클라이언트에 서비스되기 전에 CSS 및 HTML 파일에서 CSS 규칙에 대한 작업을 수행하는 것이 더욱 간단하다.

## style 속성을 사용해 CSSStyleRule 의 값을 편집하기

element 노드의 인라인 스타일을 조작할 수 있게 해주는 `.style` 속성이 있듯이, 스타일시트에는 스타일을 조작할 수 있도록 `CSSStyleRule` 개체에도 `.style` 속성이 존재한다. 다음 코드에서는 `.style` 속성을 활용해 인라인 스타일시트에 포함된 CSS 규칙의 값을 설정하고 가져온다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      id="linkeElement"
      href="http://yui/..../reset-min.css"
      rel="stylesheet"
      type="text/css"
    />

    <style id="styleElement">
      p {
        color: blue;
      }
      strong {
        color: green;
      }
    </style>
  </head>

  <p>리윤트 천재</p>

  <body>
    <script>
      var styleSheet = document.querySelector("#styleElement").sheet;

      <!-- 스타일시트 내의 CSS 규칙을 설정 -->
      styleSheet.cssRules[0].style.color = "red";
      styleSheet.cssRules[1].style.color = "purple";

      <!-- CSS 규칙을 가져옴 -->
      console.log(styleSheet.cssRules[0].style.color); // 'red'
      console.log(styleSheet.cssRules[1].style.color); // 'purple'
    </script>
  </body>
</html>
```

## 새로운 인라인 CSS 스타일시트 생성하기

`HTML` 페이지가 로드된 후 새로운 스타일시트를 즉석에서 만드려면, 새로운 `<style>` 노드를 만들고 `innerHTML` 을 사용해 이 노드에 `CSS` 규칙을 추가한 다음, `<style>` 노드를 `HTML` 문서에 추가하기만 하면 된다.

다음 코드에서는 스타일시트를 프로그래밍적으로 생성해 `body { color: red }` CSS 규칙을 추가한 후, 스타일 시트를 DOM에 추가한다.

```html
<!DOCTYPE html>
<html lang="en">
<head></head>

<body>
<p>리윤트 <strong>천재</string></p>

<script>

var styleElm = document.createElement('style');
styleElm.innerHTML = 'body{color:red}';

<!-- 새로운 인라인 스타일시트 때문에 문서 내의 마크업이 red 색상으로 변경됨 -->
document.querySelector('head').appendChild(styleElm);

</script>
</body>
</html>
```

## HTML 문서에 외부 스타일시트를 프로그래밍적으로 추가하기

HTML 문서에 CSS 파일을 프로그램이적으로 추가하려면, 적절한 attribute 로 `<link>` element 노드를 생성해서 DOM 에 추가한다. 다음 코드에서는 새로운 `<link>` element 를 만들고 DOM에 추가해 외부 스타일시트를 프로그래밍적으로 포함시킨다.

```html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <script>

      <!-- <link>를 생성하고 attribute를 추가 -->
      var linkElm = document.createElement('link');
      linkElm.setAttribute('rel', 'stylesheet');
      linkElm.setAttribute('type', 'text/css');
      linkElm.setAttribute('id', 'linkElement');
      linkElm.setAttribute('href', 'http://yui.../reset-min.css');

      <!-- DOM에 추가 -->
      document.head.appendChild(linkElm);

      <!-- DOM에 추가되었는지 확인 -->
      console.log(document.querySelector('#linkElement;));
    </script>
  </body>
</html>
```

## disabled 속성을 사용해 스타일시트를 사용 가능 / 불가능하게 하기
