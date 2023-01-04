# switch-case 문을 돌아보며

- 회사에서 만들어가고있는 앱은 하나의 페이지, 하나의 컴포넌트 내에서 분리처리가 되는 부분이 굉장히 많다. 그래서 우리는 보통 switch-case 문으로 작업을 하고 있는데, 매번 이 조건문을 한바퀴씩 돌아야한다고 하니, 과연 이것은 성능적으로 괜찮을까? 라는 의문이 생겼다.
- 관련해서 찾아보던 중 switch-case문을 key-value 로 바꾸면 어떨까라는 이야기가 나와서 만들어봤다.

### 적용 사례

- 웹뷰 메세지를 받는 handler. 매번 어떤 메세지가 올지 모르기 떄문에 여러가지 상황에 따른 key 들을 모두 설정해야했다.

- <b>switch-case문</b>

```javascript
const handleReceiveMessage = (event: WebViewMessageEvent) => {
        const data = JSON.parse(event.nativeEvent.data);
        switch (data?.key as WebViewReceiveMessageTypes) {
            case 'DETAIL':
                setFocusItemId(data?.id);
                (
                  navigation as typeof navigation & {
                    push: (a: EnumScreenNames, b: Record<string, string>) => void;
                  }
                ).push(
                  EnumScreenNames.ScreenProductDetail as never,
                  {
                    id: data?.id,
                    item: {...data},
                    isBuyer: user?.id !== data?.seller?.id
                  } as never,
                );
                break;
            case 'POPUPLIST':
                navigate(EnumScreenNames.ScreenPopupstoreList, {
                    listKey: 'CAMPAIGN',
                    listId: data?.id,
                    amplitudeEvent: {
                      event_id: EnumAmplitudeEventIds.TapHomeMenu,
                      list_id: data?.id,
                    },
                  });
                break;
            case 'LIKE':
                if (!user) {
                    pushOntoModalStack({
                      category: EnumSheetViewCategory.Login,
                      viewOnly: true,
                    });
                    return;
                  }
                  const {itemId, isFollow} = data;
                  handleFollow(itemId, isFollow);
                break;
            case 'LOGIN':
                pushOntoModalStack({
                    category: EnumSheetViewCategory.Login,
                    viewOnly: true,
                  });
                break;
            case 'BACK':
                handleGoBack();
                break;
            default :
                break;
        }
    }
```

- <b>key-value</b>

```javascript
const getReceiveMessage = (event:WebViewMessageEvent) => {
        const data = JSON.parse(event.nativeEvent.data);
        const mapper = {
            ['DETAIL'] : () => {
                setFocusItemId(data?.id);
                (
                  navigation as typeof navigation & {
                    push: (a: EnumScreenNames, b: Record<string, string>) => void;
                  }
                ).push(
                  EnumScreenNames.ScreenProductDetail as never,
                  {
                    id: data?.id,
                    item: {...data},
                    isBuyer: user?.id !== data?.seller?.id
                  } as never,
                );
            },
            ['POPUPLIST'] : () => {
                navigate(EnumScreenNames.ScreenPopupstoreList, {
                    listKey: 'CAMPAIGN',
                    listId: data?.id,
                    amplitudeEvent: {
                      event_id: EnumAmplitudeEventIds.TapHomeMenu,
                      list_id: data?.id,
                    },
                  });
            },
            ['LIKE'] : () => {
                console.log("이게 된다고?")
                if (!user) {
                    pushOntoModalStack({
                      category: EnumSheetViewCategory.Login,
                      viewOnly: true,
                    });
                    return;
                  }
                  const {itemId, isFollow} = data;
                  handleFollow(itemId, isFollow);
            },
            ['LOGIN'] : () => {
                pushOntoModalStack({
                    category: EnumSheetViewCategory.Login,
                    viewOnly: true,
                  });
            },
            ['BACK']: () => {
                handleGoBack();
            }
        } as {[key in WebViewReceiveMessageTypes]: () => void}
        const messageHandler = mapper?.[data?.key as WebViewReceiveMessageTypes];
        messageHandler();
    }
```

## 결과

- 아직 성능적인 부분에 대한 체크는 못했지만, 이런식으로 접근하면 모든 케이스를 도는게 아니라 직접적으로 key에만 바로 접근해서 훨씬 좋다고 한다.
- 변환은 했지만 한번 체크를 해볼 예정!
