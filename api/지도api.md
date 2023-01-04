# 지도 api

- 지도 api 를 따로 공부한건 아니고, 수강생 분께서 무한렌더링이 되고있는 부분을 질문 주셔서 같이 보게되었다. 내가 항해를 할 때에 동기분께서 무한렌더링을 경험했다고 말했던 기억이 나서, 조만간 질문이 올거라 생각했는데 마침 가져오셔서 확인해봤다.

### 지도 api 구현 코드

- 해당 코드를 돌렸을 때, input 창에 검색어가 들어가면 지속적으로 렌더링되며 api 요청을 보내는 일이 발생했다.
- 검색 요청을 보내는 코드를 먼저 파악을 하고, 요청을 보내게하는 트리거를 확인해봤다.

```javascript
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
const { kakao } = window;
// 주소 입력후 검색 클릭 시 원하는 주소로 이동
const MapArea = () => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const [searchAddress, SetSearchAddress] = useState();
  const geocoder = new kakao.maps.services.Geocoder();

  let callback = useCallback(() => {
    (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setState({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      }
    };
  }, [searchAddress]);

  geocoder.addressSearch(`${searchAddress}`, callback);

  const handleSearchAddress = (e) => {
    SetSearchAddress(e.target.value);
  };
  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        isPanto={state.isPanto}
        style={{
          // 지도의 크기
          width: "1000px",
          height: "600px",
        }}
        level={3} // 지도의 확대 레벨
      ></Map>
      <div>
        <input onChange={handleSearchAddress}></input>
        <button onClick={MapArea}>클릭</button>
      </div>
    </>
  );
};
export default MapArea;
```

### 의심되는 코드

- 이 부분이 아마 서버로 요청을 보내는 코드 같았는데, 검색을 하면서 좌표값을 들고오는 순간부터 렌더링을 타는 구조같았다. 그래서 `useEffect`로 함수를 묶어주고, 검색에를 dependency로 넣어서 요청을 보낼 수 있도록 작성을 해봤다.

```javascript
let callback = (result, status) => {
  if (status === kakao.maps.services.Status.OK) {
    const newSearch = result[0];
    setState({
      center: { lat: newSearch.y, lng: newSearch.x },
    });
  }
};

geocoder.addressSearch(`${searchAddress}`, callback);
```

- 수정한 코드
  - 결과는 성공적이었다. 항해할 때는 남의 문제라고 생각해서 어떻게 해결하신건지 확인도 안해봤는데... 그때의 나 호기심 없던거 너무 창피스럽지만 이렇게라도 기회가 생겨서 작업해봐서 다행이네!

```javascript
let callback = (result, status) => {
  if (status === kakao.maps.services.Status.OK) {
    const newSearch = result[0];
    setState({
      center: { lat: newSearch.y, lng: newSearch.x },
    });
  }
};
const getGeoLocation = () => {
  geocoder.addressSearch(`${searchAddress}`, callback);
};

useEffect(() => {
  getGeoLocation();
}, [searchAddress]);
```
