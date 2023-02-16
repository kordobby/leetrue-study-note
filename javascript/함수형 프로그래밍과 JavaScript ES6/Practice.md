```javascript
const report = {
  title: "신고하시겠어요?",
  subTitle:
    "신고 및 차단 시 서로의 게시글을 볼 수 없고, 채팅도 보낼 수 없습니다.",
  function: onSendReport,
};

const review = {
  title: "어떤 점이 아쉬웠나요?",
  subTitle: "아쉬운 점을 개선할 수 있도록 의견 부탁드려요.",
  function: onSendReview,
};

const source = new Map([
  ["report", report],
  ["review", review],
]);
```

```javascript
const PopUpReport: FC<PopUpReportInterface> = ({
  type,
  setter,
  open,
  itemId,
  userId,
}) => {
  const { input, setInput, onSendReport, source } = usePopUpReport(
    setter,
    itemId,
    userId,
    open
  );

  if (!source) return <></>;
  return (
    <PopUpPortal open={open} setter={setter}>
      <KeyboardAvoidingWrapper>
        <PopUpContent>
          <PopUpTitle>{source.get(type)?.title ?? ""}</PopUpTitle>
          <PopUpSubTitle>{source.get(type)?.subTitle ?? ""}</PopUpSubTitle>
          <PopUpReportInput setInput={setInput} inputValue={input} />
          <PopUpDoubleTrigger
            setter={setter}
            onPress={source.get(type)?.function ?? onSendReport}
          />
        </PopUpContent>
      </KeyboardAvoidingWrapper>
    </PopUpPortal>
  );
};
```
