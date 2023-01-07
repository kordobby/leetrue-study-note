const GeoLocatoin = () => {
  /* 반응형 기준에 따라서 객체 return 시키면 될 것 같습니다. */
  const styleController = () => {
    if (browserWidth < 1800) {
      return {
        width: "100vw",
        height: "100vh",
      };
    }
  };

  /* 이거 보니까 쟤네가 API 로 만들어놓은게 다 컴포넌트 모양으로 만들었네요 props 만 잘 가지고놀면 될듯? */
  return (
    <>
      <MarkerWithCustomOverlayStyle />
      <Map
        // 지금 보는 페이지가 여기에다가 박아서 옵션으로 설정해주는 친구들입니다.
        center={{
          // 지도의 중심좌표
          lat: 37.54699,
          lng: 127.09598,
        }}
        style={{
          // 지도의 크기
          ...styleController(),
        }}
        level={4} // 지도의 확대 레벨
      ></Map>
      {/* 마커를 생성하는 친구 */}
      <MapMarker // 마커를 생성합니다
        position={{ lat: 37.54699, lng: 127.09598 }}
        // 마커 커스텀은 이 이미지만 바꾸면 될 것 같은뎅
        image={{
          src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
          size: {
            width: 64,
            height: 69,
          }, // 마커이미지의 크기입니다
          options: {
            offset: {
              x: 27,
              y: 69,
            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          },
        }}
      />
      {/* 그럼 위치 찍었을 때 상탯값 박으면 되는겨? */}
      <CustomOverlayMap
        position={{ lat: 37.54699, lng: 127.09598 }}
        yAnchor={1}
      >
        <div className="customoverlay">
          <a
            href="https://map.kakao.com/link/map/11394059"
            target="_blank"
            rel="noreferrer"
          >
            <span className="title">구의야구공원</span>
          </a>
        </div>
      </CustomOverlayMap>
    </>
  );
};
