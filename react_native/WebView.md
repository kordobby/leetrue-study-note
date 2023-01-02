
# react-native-webview

```javascript
const {width: screenWidth} = Dimensions.get('window');
interface ContentsProps {
  page: String;
  route: {
    params: {
      page?: string;
      amplitudeEvent?: TypeAmplitudeEvent;
    };
  };
}

const ScreenWebViewContents = ({route}: ContentsProps) => {
  const webviewRef = useRef<WebView>(); // WebView Type 찾아보기
  const navigation = useNavigation();

  const [focusItemId, setFocusItemId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    webviewRef.current.postMessage(JSON.stringify({data: user?.accessToken}));
  }, [user]);

  // 웹뷰에서 데이터를 받을 때 필요한 함수
  const onMessageReceive = (e: any) => {
    const data = JSON.parse(e.nativeEvent.data);
    switch (data?.key) {
      case 'DETAIL':
        break;
      case 'BACK':
        navigation.goBack();
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        onLoadEnd={handleEndLoading}
        onMessage={onMessageReceive}
        source={{
          uri:
            `${config.WEB_URL}/${page}`
        }}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        style={styles.web}
      />
    </SafeAreaView>
  );
};
```

#### Send Msg App(WebView) to Web
```javascript
webviewRef.current.postMessage(JSON.stringify({data: user?.accessToken}));
```


#### Send Msg Web to App
```javascript
```