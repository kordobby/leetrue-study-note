
const MyReview = () => {

  return (
      <StMyReviewWrap>
        <StMyReviewBox>
          <StReviewBoxTitle>내가 남긴 리뷰</StReviewBoxTitle>
                <StMyReview>
                  <div key={`myreview_${reviews.id}`}>
                    <div className="time"></div>
                    <div className="address">{reviews.address}</div>
                    <img
                      className="star"
                      src={require("../images/Star 165.png")}
                      alt="star"
                    />
                    <div className="startPoint"></div>
                  </div>
                </StMyReview>
        </StMyReviewBox>
      </StMyReviewWrap>
  )
};
export default MyReview;
const StMyReviewWrap = styled.div`
  max-width: 1920px;
  background-color: #F3F5F5;
`;
const StMyReviewBox = styled.div`
  width: 1254px;
  height: 650px;
  background-color: #FFFFFF;
  margin: auto;
`;
const StReviewBoxTitle = styled.div`
  padding-top: 50px;
  padding-left: 110px;
  padding-bottom: 30px;
  font-size: 16px;
  font-weight: 800;
`;
const StMyReview = styled.div`
  border: 1px solid red;
  background-color: #F0F0F0;
  width: 1000px;
  height: 8vh;
  /* padding: 1%; */
  margin: auto;
  margin-bottom: 15px;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  .time {
    /* padding-top: 100px;
    padding-left: 10px; */
  }
  .address {
    padding-left: 270px;
    font-size: 20px;
    font-weight: 600;
  }
  .star {
    /* padding-left: 850px; */
  }
  .starPoint {
    padding-left: 900px;
    font-size: 23px;
    font-weight: 600;
    color: #AEC90A;
  }
`;











이희승(10기)에 메시지 보내기



