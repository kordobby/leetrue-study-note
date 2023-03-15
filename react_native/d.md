# 1. React Native

# React Native Document

## Native

- Android : Kotlin, Java
- iOS : Swift, Objective-C

## React Native

- React 구성 요소를 사용해 Javascript로 뷰를 화출
- Runtime 에 React Native 는 해당 구성 요소에 해당하는 Android 및 iOS 보기를 생성
- 앱의 고유한 요구사항에 맞게 Android 및 iOS 용 고유 구성 요소 빌드 가능

## 핵심 구성요소

| 기본 UI      | Android View | iOS View       | web analog          |
| ------------ | ------------ | -------------- | ------------------- |
| <View>       | <ViewGroup>  | <UIView>       | <div> : non-scroll  |
| <Text>       | <TextView>   | <UITextView>   | <p>                 |
| <Image>      | <ImageView>  | <UIImageView>  | <img>               |
| <ScrollView> | <ScrollView> | <UIScrollView> | <div>               |
| <TextInput>  | <EditText>   | <UITextField>  | <input type="text"> |

- React Native 는 React 구성요소와 동일한 API 구조를 사용하므로, 시작하려면 React 구성 요소 API 를 이해해야 함

![스크린샷 2023-02-11 오전 11.57.48.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0591b544-3edf-446a-aeaa-2d1a74a8aea1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-02-11_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.57.48.png)

# React Basic

- `React Native` 는 `javascript` 로 User Interface 를 구축하기 위한 `React` 에서 실행됨

### React 핵심 개념

- Component
- JSX
- props
- state

### Let’s make Component

```jsx
// import React and React Native's "Text" core Component
import React from "react";
import { Text } from "react-native";

// starts as a function
const Dobby = () => {
  // render <Text> element
  return <Text>Hello, This is Dobby</Text>;
};

export default Dobby;
```

### JSX

- React and React Native use JSX

```jsx
import React from "react";
import { Text } from "react-native";

const Dobby = () => {
  const name = "dobby";
  return <Text>Hello, I am {name}!</Text>;
};

export default Dobby;
```

```jsx
import React from 'react';
import { Text } from 'react-native';

const getNames = (
	firstName: string,
	secondName: string,
	thirdName: string
) => {
	return firstName + ',' + secondName + ',' + thirdName'
}

const Hogwarts = () => {
	return <Text>Hello, This is {getNames('Harry', 'Ron', 'Hermione')}!</Text>
}
```

### Custom Components

```jsx
import React from "react";
import { Text, TextInput, View } from "react-native";

const Dobby = () => {
  return (
    <View>
      <Text>Hello, This is...</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
      ></TextInput>
    </View>
  );
};

export default Dobby;
```

### Multiple Components

- any component that renders other components is a **parent component**.

```jsx
import React from "react";
import { Text, View } from "react-native";

// child component
const Harry = () => {
  return (
    <View>
      <Text>I'm Harry.</Text>
    </View>
  );
};

// parent component
const Hogwart = () => {
  return (
    <View>
      <Text>Who r u?</Text>
      {/* each <Harry/> renders a unique element - can customize with props */}
      <Harry />
      <Harry />
      <Harry />
    </View>
  );
};

export default Hogwart;
```

### Props

- “properties”

```jsx
import React from "react";
import { Text, View } from "react-native";

type PersonProps = {
  name: string,
};

const Person = (props: PersonProps) => {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
};

const Hogwarts = () => {
  return (
    <View>
      <Person name="Harry" />
      <Person name="Ron" />
      <Person name="Hermione" />
    </View>
  );
};

export default Hogwarts;
```

- `<Image/>`
  - props : `source`

```jsx
import React from "react";
import { Text, View, Image } from "react-native";

const DobbyApp = () => {
  return (
    <View>
      <Image
        source={{ uri: "https://....png" }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Hello, I am Dobby!</Text>
    </View>
  );
};

export default DobbyApp;
```

### State

```tsx
import React, { useState } from "react";
import { Button, Text, View } from "react-native";

type DobbyProps = {
  name: string;
};

const Dobby = (props: DobbyProps) => {
  const [isFree, setIsFree] = useState(true);

  return (
    <View>
      <Text>I am {props.name},</Text>
      <Text>and I am {isFree ? "free" : "not free"} !</Text>
      <Button
        onPress={() => {
          setIsFree(false);
        }}
        disabled={!isFree}
        title={isFree ? "Harry Potter!" : "Help me...!"}
      ></Button>
    </View>
  );
};

const Hogwarts = () => {
  return (
    <>
      <Dobby name="Dobby" />
      <Dobby name="Harry" />
    </>
  );
};

export default Hogwarts;
```

## Handling Text Input
