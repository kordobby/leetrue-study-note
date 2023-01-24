## Animated.Value()

### Methods

#### `interpolate()` : 보간

```typescript
interpolate(config : InterpolationConigType);
```

- Example

```typescript
value.interpolate({
  inputRange: [0, 1],
  outputRange: ["0%", "100%"],
});
```

- Example in use

```typescript
const opacity = useRef(new Animated.Value(0)).current;

<Animated.View
  style={{
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    top: windowHeight,
    display: "flex",
    flexDirection: "column",
    transform: [
      {
        translateY: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(windowHeight + topActive)],
        }),
      },
    ],
  }}
/>;
```

- Interpolates the value before updating the property, e.g. mapping 0-1 to 0-10.

##### Parameters

- NAME : config
- TYPE : object
- REQUIRED : Yes

###### config

- `inputRange` : an array of numbers.
  - 애니메이션 값의 범위
- `outputRange` : an array of numbers or strings.
  - 보간된 값이 inputRage 에 맵핑된 결과
- `easing` : (optional) a function that returns a number, given an input number.
- `extrapolate` (optional) a string such as 'extend', 'identity', or 'clamp'
- `extrapolateLeft` : (optional) a string such as 'extend', 'identity', or 'clamp'
- `extrapolateRight` : (optional) a string such as 'extend', 'identity', or 'clamp'
