import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import {EnumScreenNames} from '../../types/EnumScreenNames';
import {useReactiveVar} from '@apollo/client';
import {
  needUdpateFollowIdVar,
  pushOntoModalStack,
  userVar,
} from '../../graphql/store';
import {useTypeCastedNavigate} from '../../hooks';
import {EnumAmplitudeEventIds} from '../../types/EnumAmplitudeEventIds';
import {TypeAmplitudeEvent} from '../../types/TypeAmplitudeEvent';
import config from '../../../config';
import {useWebViewFollow} from '../../hooks/follow/useWebViewFollow';
import {EnumSheetViewCategory} from '../../types/EnumSheetViewCategory';
import { runCheckCodePushVersion } from '../../utilities/UtilCodePushVersion';

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
  const {page} = route?.params;
  const webviewRef = useRef<any>();
  const user = useReactiveVar(userVar);
  const needUpdateInfo = useReactiveVar(needUdpateFollowIdVar);
  const navigate = useTypeCastedNavigate();
  const {handleFollow} = useWebViewFollow();
  const navigation = useNavigation();

  const [focusItemId, setFocusItemId] = useState<string | null>(null);

  useEffect(() => {
    if (focusItemId !== needUpdateInfo?.id) {
      return;
    }
    webviewRef.current.postMessage(
      JSON.stringify({
        key: 'follow',
        itemId: focusItemId,
        needUpdate: needUpdateInfo?.status,
      }),
    );
  }, [needUpdateInfo]);

  useEffect(() => {
    if (!user) {
      return;
    }
    webviewRef.current.postMessage(JSON.stringify({data: user?.accessToken}));
  }, [user]);

  const handleEndLoading = () => {
    if (!page) {
      return;
    }
    if (!(page?.indexOf('contents') > -1)) {
      return;
    }
    if (user) {
      webviewRef.current.postMessage(JSON.stringify({data: user?.accessToken}));
      return;
    }
  };
  // 웹뷰에서 데이터를 받을 때 필요한 함수
  const onMessageReceive = (e: any) => {
    const data = JSON.parse(e.nativeEvent.data);
    switch (data?.key) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  web: {
    width: screenWidth,
  },
});
export default ScreenWebViewContents;