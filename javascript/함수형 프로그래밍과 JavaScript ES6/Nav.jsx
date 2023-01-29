const Nav = () => {
  const navigate = useNavigation();
  const location = useLocation();
  // 이런 함수들이 각 내비게이션 아이템들에 붙어있겠죠?
  // 일단 보셈
  const movePage = () => {
    switch (path) {
      case "HOME":
        navigate("/home");
        return;
      case "MAP":
        navigate("/map");
        return;
      case "POST":
        navigate("/post");
        return;
      case "SETTING":
        navigate("/setting");
        return;
      default:
        return;
    }
  };
  // 저런식으로 주면 되지 않을까요?
  // 일단 제일 먼저 해봐야하는건
  // 네비게이터에서ㅇㅋㅇㅋ
  const path = location.pathName;
  console.log(path === "/home");
  console.log(path === "/map");
  console.log(path === "/post");
  console.log(path === "/setting");

  // 질문 받습니다.

  return (
    <>
      <div onClick={() => movePage("HOME")} selected={path === "/home"}>
        {path === "/home" ? <BlueIcon /> : <NormalIcon />}
        1번탭
      </div>
      <div onClick={() => movePage("MAP")} selected={path === "/map"}>
        {path === "/map" ? <BlueIcon /> : <NormalIcon />}
        2번탭
      </div>
      <div onClick={() => movePage("POST")} selected={path === "/post"}>
        {path === "/post" ? <BlueIcon /> : <NormalIcon />}
        3번탭
      </div>
      <div onClick={() => movePage("SETTING")} selected={path === "/setting"}>
        {path === "/setting" ? <BlueIcon /> : <NormalIcon />}
        4번탭
      </div>
    </>
  );
};

const NavigationTab = styled.div`
  color: ${({ selected }) =>
    selected ? "blue" : "black"}; // selected 가 true 일 때 다른 색
`;
