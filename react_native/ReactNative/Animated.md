# Animated

### Animated.Value()

- 메모리에 보간값 (0 - 1)을 저장하기 위한 클래스
- 애니메이션 효과를 주기 위해서 보간값을 사용해야함
- 보간값
  - 매우 작은 단위로 변화하는 값
  - `0 - 0.0001 - 0.0002 - ... - 0.9999 - 1`

### Animated.CompositeAnimation

- 하나의 애니메이션 동작을 담고있는 객체

### 하나의 애니메이션을 관리하는 메서드

```javascript
Animated.timing(); // delay 지정 가능
Animated.spring();
```

### 여러개의 애니메이션을 관리하는 메서드

```javascript
Animated.sequence(CompositeAnimation[]);
 // 일정 딜레이로 여러개의 애니메이션 관리

Animated.stagger(delay.CompositeAnimation[]);
 // 딜레이를 직접 설정하여 여러개의 애니메이션 관리
```

### 애니메이션 지연시간을 주기위한 메서드

```javascript
Animated.delay();
// sequence메서드 내부에서만 사용가능, 지연시간 동안 애니메이션
```

### 애니메이션 스타일

- `Animated.Value()` 로 만든 보간값을 이용해, 어떤 요소를 변화시킬지 정하는 작업
- 스타일 후 실제 컴포넌트에 적용

```javascript
{
  // 보간값 객체 생성
  const animValue = useRef(new Animated.Value(0)).current;

  // 보간값 사용하여, 애니메이션 스타일 생성
  const animationStyle = { opacity: animValue };

  // 애니메이션 객체를 만들고, 실행(보간값 변경)하는 함수 생성
  const start = () =>
    Animated.timing({
      useNativeDriver: true,
      toValue: 1,
    }).start();

  // 애니메이션을 적용할 전용 컴포넌트 만들고, 애니메이션 적용시켜 주기
  return (
    <Animated.View style={[animationStyle]}>
      <TouchableOpacity onPress={start}>View</TouchableOpacity>
      <Text>Hello</Text>
    </Animated.View>
  );
}
```

### 컴포넌트가 새로 만들어질 때, 애니메이션 실행하기 (Enter)

```javascript
// 렌더링시 애니메이션 실행
useEffect(enterAnimation, []);
```

### 컴포넌트가 파괴될때, 애니메이션 실행하기 ( Exit )

```javascript
// 애니메이션 실행후, 컴포넌트 삭제
exitAnimation();
deleteComponents();
```
