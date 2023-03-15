# 👩🏻‍💻  C 언어의 메모리 누수의 발생과 해결방법

---

이번엔 C언어에서의 메모리 누수가 일어나는 원인에 대해, 그 중에서 포인터에서 누수가 많이 일어나는 이유에 대해 알아보려고 한다. 그리고 이 때 어떤 방식으로 메모리 누수를 해결하고 이를 바탕으로 내가 많이 사용하고 있는 JavaScript 에서는 어떻게 메모리 누수를 관리하면 좋을지에 대해서 공부를 해보고자 한다!

## 🖐🏻  C 언어에서의 메모리 누수를 들어가기 전에,

---

### 📝  C언어의 메모리 구조

![스크린샷 2023-03-04 오전 11.42.05.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9f9dc47c-ca53-4579-aa8b-0201059af0f7/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-04_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.42.05.png)

### 📝  메모리 구조 영역 구분

- code(text), data, stack 영역
  - 컴파일러가 컴파일 할 때 그 크기를 계산해 필요한 메모리 공간을 결정
- heap
  - 개발자에 의해 프로그램 동작 시 결정됨

### 📝  SMA & DMA

- **Static Memory Allocation**
  - 정적 메모리
  - 메모리의 data 영역, stack 영역을 사용함
    - **data** 영역 : 프로그램 시작과 동시에 할당된 영역이 잡히고 끝나면 OS 에 반환
    - **stack** 영역 : 함수 시작과 동시에 할당된 영역이 잡히고 끝나면 OS 에 반환
- **Dynamic Memory Allocation**
  - 동적 메모리
  - 메모리의 heap 영역을 사용
    - **heap** 영역 : stack 에서 pointer 변수를 할당하고, 그 pointer가 가리키는 heap 영역의 임의의 공간부터 원하는 크기만큼 할당해 사용

### 📝  메모리 구조의 각 영역

![스크린샷 2023-03-04 오전 11.42.13.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4dd4a2f3-b204-4ef0-8957-659ac89a6db4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-04_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.42.13.png)

- **stack**
  - 프로그램이 자동으로 사용하는 임시 메모리 영역
  - 지역변수, 매개변수, 리턴 값 등 잠시 사용되었다가 사라지는 데이터를 저장하는 영역
  - 함수 호출 시 생성되고 함수가 끝나면 시스템에 반환됨
  - 스택 사이즈는 각 프로세스마다 할당되지만 프로세스가 메모리에 로드될 때 사이즈가 고정되어 있어 런타임 시 스택 사이즈를 바꿀 수는 없음
  - 명령 실행 시 자동 증가/감소 하므로 보통 메모리의 마지막 번지를 지정함
- **heap**
  - 필요에 의해 동적으로 메모리를 할당하고자 할 때 위치하는 메모리 영역
  - 할당해야 할 메모리의 크기를 프로그램이 실행되는 동안 결정해야하는 경우(런 타임 때) 유용하게 사용되는 공간
  - 동적 데이터 영역이라고 부름
  - 메모리 주소 값에 의해서만 참조되고 사용되는 영역
  - C 에서는 `malloc()` , C++ 은 `new()` 함수를 사용
- **static data 영역 (initialized data)**
  - 전역변수(global), 정적변수(static), 배열(array), 구조체(structure) 등이 저장됨
  - 초기화된 데이터는 data 영역에 저장
  - 초기화되지 않은 데이터는 BSS(blocked stated symbol) 영역에 저장
  - 프로그램이 실행될 때 생성되고 프로그램이 종료되면 시스템에 반환됨
  - 함수 내부에 선언된 static 변수는 프로그램이 실행될 때 공간만 할당되고, 그 함수가 실행될 때 초기화됨
- **BSS(blocked stated symbol) 영역**
  - 초기화되지 않은 데이터가 저장되는 영역
- **text(code) 영역**
  - 코드 자체를 구성하는 메모리 영역
    - Hex 파일이나 BIN 파일 메모리
  - 프로그램 명령이 위치하는 곳으로 기계어로 제어되는 메모리 영역

### 📝  각 영역에 저장되는 자료들

- **stack (스택)**
  - 해당 영역에 메모리를 블록처럼 쌓아놓는 방식 (자료 구조에서의 스택 이해해보기)
  - 블록이 차곡차곡 쌓여있으므로 중간 블록을 빼는 것은 불가
    - 마지막 블록부터 차곡차곡 빼내야 함
  - 지역 변수들과 매개변수 및 리턴주소가 저장됨
  - 스택에 저장된 값들은 함수 호출이 종료되면 해제됨

[ stack 예제 1 ]

![스크린샷 2023-03-04 오전 10.53.25.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e4285683-7dd6-44f3-b8be-3d000229d056/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-04_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.53.25.png)

```c
void func2(int arg2_1, int arg2_2) {
	int local_var_2 = 3;

	printf("local_var_2=&d, arg2_1=%d, arg2_2=%d\n",
					local_var_2, arg_2, arg2_2);
}

void func1(int arg1_1, int arg1_2) {
	int local_var_1_1 = 1;
	int local_var_1_2 = 2;

	printf("local_var_1_1=&d local_var_1_2=%d arg1_1=%d arg1_2=%d\n",
					local_var_1_1, local_var_1_2, arg1_1, arg1_2);

	func2(30, 40);
}

int main() {
	int main_local = 0;

	printf("main_local=%d\n", main_local);

	func1(10, 20);

	return 0;
}

main_local => arg1_1 => arg1_2 => main 의 리턴 주소값?(오ㅐ..?) =>
```

[ stack 예제 2 ]

![스크린샷 2023-03-04 오후 12.00.58.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/71b2c5a6-d0d4-4afb-bcf9-388d6a23dc6b/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.00.58.png)

```c
#include <stdio.h>

void fct1(int);
void fct2(int);

int a = 10;
int b = 20;

int main() {

	int i = 100;

	fct1(i);
	fct2(i);

	return 0;
}

void fct1(int c) {
	int d = 30;
}

void fct2(int e) {
	int f = 40;
}
```

- **힙 (heap)**
  - ‘ 더미 ‘ 로 직역될 수 있음
  - 스택이 함수 호출에 따라 메모리가 차곡차곡 쌓이는 모양이라면 힙은 메모리가 힙 영역에 아무렇게나 할당이 되어있음
  - 힙의 대표적인 세 가지 특징
    - **힙에 저장된 데이터는 함수 호출이 종료되어도 해제되지 않아서, 개발자가 명시적으로 해제하거나 프로그램이 종료되어야 해제됨**
    - 프로그램은 메모리 주소에 따라서 힙 데이터에 접근
    - 힙 공간은 크기의 제약이 없어서 메모리가 충분하다면 힙 영역은 필요한 만큼 확장될 수 있음
  - 힙의 특징들로 인해 발생되는 문제
    - **사용이 종료된 데이터가 해제되지 않으면 프로그램이 종료될 때까지 메모리 공간을 차지함**
    - 프로그램은 **힙에 데이터가 해제되었어도 메모리 주소에 따라 접근이 가능**
    - 힙 영역은 크기의 제한은 없지만 가용 메모리가 가득찰 경우 커널의 OOM Killer 에 의해 프로그램이 종료될 수 있음
  - 힙에 메모리를 할당할 때는 `malloc`, `calloc`, `realloc` 함수를 사용하고, 해제는 `free` 함수를 사용함

[ heap 예제 1 ]

![스크린샷 2023-03-04 오전 11.10.30.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a399f0f3-1709-4592-80f1-6bc476c5db6a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-04_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.10.30.png)

```c
#include <stdio.h>
#include <stdlib.h>

struct example {
	int a;
	int b;
	char c;
};

int main() {
	struct example *ex;
	ex = malloc(sizeof(*ex));

	ex->a = 1;
	ex->b = 2;
	ex->c = 'c';

	printf("a=%d b=%d c=%c\n", ex->a, ex->b, ex->c);

	free(ex);

	return 0;
}
```

## 🤔  C 언어에서 쉽게 겪을 수 있는 메모리 문제들의 유형

---

### 💦  메모리 릭 Memory Leak

- 프로그램이 불필요한 메모리를 계속 점유하는 현상
- 일반적으로 프로그램 가동 시간 혹은 사용량에 비례해 프로그램의 메모리 사용량이 점점 늘어나는 것으로 확인 가능

![스크린샷 2023-03-04 오전 11.02.20.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/27fbbb44-3bc2-41ea-9438-a5c1ea30f0c0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-04_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.02.20.png)

- 위와 같이 메모리 누수가 일어난 그래프를 확인해보면,
  - 파란색 그래프 (SVG patch off)가 메모리 릭이 발생한 모습
    - **사용 시간에 따라 점진적으로 메모리 사용량이 증가함**
  - 메모리 릭이 발생하지 않은 노란색 그래프(SVG patch on)
    - **오르락 내리락하며 일정한 메모리 사용량을 보임**

### 🧐  메모리 릭이 발생하는 이유?

- **힙 영역에 할당된 메모리를 해제하지 않아서 발생**
  - C언어에서는 힙 영역에 동적 메모리를 할당함
  - 힙 영역에 할당된 메모리는 함수 호출이 종료되어도 해제되지 않음
    - 대신 `free()` 등을 이용해 사용이 완료된 메모리를 명시적으로 해제해야 함
    - 메모리를 해제하지 않으면 메모리 릭이 발생함

### 😶‍🌫️  댕글링 포인터 Dangiling Pointer

- 댕글링 포인터란 이미 해제된 메모리를 가르키는 포인터를 뜻함

![스크린샷 2023-03-04 오전 11.10.38.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a3269d78-09e1-488c-823a-a10014300f60/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-04_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.10.38.png)

- 동적 할당된 메모리를 가리키는 포인터가 있다고 가정할 때,
  - 포인터는 메모리가 동적할당된 공간(힙)에 정상적으로 있다고 알고 있음
  - 만약 여기서 동적 할당된 메모리가 해제되면 해당하는 공간을 가리키던 포인터에 있는 주소 공간은 아무런 의미가 없게 됨
  - 이 때, 포인터에 저장된 주소 공간에서 데이터를 가져오거나 어떤 동작을 수행하면 문제가 될 수 있음
  - 경우에 따라서는 당장은 쓰레기 값이 넘어올 뿐 정상동작하는 것처럼 보이다가 예상치 못한 경우에 크래쉬를 일으킬 수도 있음

```c
#include <stdio.h>
#include <stdlib.h>

struct example {
    int a;
    int b;
    char c;
};

int main() {
    struct example *ex;
    struct example *cloned;
    ex = malloc(sizeof(*ex));
    cloned = ex;

    ex->a = 1;
    ex->b = 2;
    ex->c = 'c';

    printf("[origin] a=%d b=%d c=%c\n", ex->a, ex->b, ex->c);
    printf("[cloned] a=%d b=%d c=%c\n",
            cloned->a, cloned->b, cloned->c);

    free(ex);
    ex = NULL;

    /*
     * 아래 라인은 Segfault를 일으킨다.
     */
    // printf("[origin] a=%d b=%d c=%c\n", ex->a, ex->b, ex->c);

    /*
     * 아래 라인에서 dangling pointer로 인한 이상한 값이 출력되었다.
     */
    printf("[dangling] a=%d b=%d c=%x\n",
            cloned->a, cloned->b, cloned->c);

    return 0;
}
```

- 위 코드를 실행하게 되면 동작에는 아무 문제가 없지만, `free()` 가 이뤄진 후에 출력되는 정보에는 쓰레기 값이 들어있음이 확인 가능함

```c
[origin] a=1 b=2 c=c
[cloned] a=1 b=2 c=c
[dangling] a=1633718123 b=5 c=10
```

### 💥  버퍼 오버플로우 Buffer Overflow

- 배열 혹은 동적으로 할당된 메모리 영역을 벗어나서 쓰기 작업을 수행하는 것

### 🚧  널포인터 익셉션 Null Pointer Exception

- Null 로 초기화한 메모리 영역에 접근하면 발생하는 에러
  - 여담으로 이건 같이 최종 프로젝트 했던 스프링 백엔드 팀원이 매일 회의 때 이야기하던 단어였는데, 그 때는 그냥 null 이 들어가면 안되는군.. 하고 치웠던 개념이었는데 이제야 조금 이해가 감ㅋㅋ

# 👩🏻‍💻  그래서.. JS 에서 메모리 누수를 어떻게 관리할거니?

---

이것만 보면 자바스크립트에서의 메모리 누수를 줄일 방법에 대한 조금의 답을 찾을 수 있을까 싶었는데 아직은 잘 모르겠다.. C언어에서는 어쨌든 메모리를 해제시키는 함수가 있지만 자바스크립트는 그럼 함수가 있지 않고 가비지 컬렉터에 의해 정리가 되는 것으로 언뜻 알고있는 편이라.. 자바스크립트를 이용해서 개발을 할 때 개발자가 어떤 부분을 더 신경을 써줘야할 것인가에 대한 답은 아마도 자바스크립트를 더 공부해야 찾을 수 있을 것 같다.

여기에 자바스크립트까지 파고들면 포스트가 너무 길어질 것 같아서 2편에서 따로 정리를 해봐야겠다 ㅠ\_ㅠ 그래도 조금은 힌트를 얻은 것 같은..! **더이상 사용하지 않는 데이터에 대해 클린업을 해준다는 부분과 포인터가 어떠한 부분을 참조하고 있다는 부분을 가져가서 공부를 해봐야겠다!**

출처 : [https://www.researchgate.net/figure/An-Example-of-Memory-Leak-Detection-and-Its-Result_fig1_321894773](https://www.researchgate.net/figure/An-Example-of-Memory-Leak-Detection-and-Its-Result_fig1_321894773)

[https://gomsik.tistory.com/63](https://gomsik.tistory.com/63)

[https://curryyou.tistory.com/277](https://curryyou.tistory.com/277)

[https://velog.io/@ragnarok_code/자바스크립트-메모리-관리](https://velog.io/@ragnarok_code/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC)
