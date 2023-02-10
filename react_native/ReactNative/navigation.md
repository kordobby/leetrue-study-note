## 스크린 스택 2개 앞으로 이동하기

```javascript
    navigation.reset({
       index: 0,
       routes: [{name: EnumScreenNames.ScreenHome as never}],
     });
     navigate(EnumScreenNames.StackHome, null);
```

```javascript
    (
      navigation as typeof navigation & {
        popToTop: () => void;
      }
    ).popToTop();
```
