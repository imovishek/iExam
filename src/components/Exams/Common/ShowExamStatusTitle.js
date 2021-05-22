import { Progress } from "antd";
import 'antd/dist/antd.css';
import { useEffect, useState } from "react";
import { getExamStatus, getExamTimeDiffInFormat, getRemainingTimePercentage } from "../../../utitlities/common.functions";
import { CenterText, Col, Row } from "../../../utitlities/styles";
import { ExamTitleWrapper, TimeDiffWrapper } from "../styles";

const ShowExamStatusTitle = ({ exam }) => {
  const [timeDifference, setTimeDifference] = useState({});
  useEffect(() => {
    if (exam && exam._id) {
      const interval = setInterval(() => {
        const { status, timeString } = getExamTimeDiffInFormat(exam);
        setTimeDifference({
          status,
          timeString,
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [exam]);
  let examTitle = exam.title || '';
  if (examTitle.length > 25) examTitle = `${examTitle.slice(0, 22)  }...`;
  return <Col rows="1fr 1fr 1fr" gridGap="3px">
    <ExamTitleWrapper>{examTitle}</ExamTitleWrapper>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Row columns="1fr 1fr" gridGap="3px">
        <CenterText>{timeDifference.status}</CenterText>
        <CenterText>
          <TimeDiffWrapper>{timeDifference.timeString}</TimeDiffWrapper>
        </CenterText>
      </Row>
    </div>
    <Progress percent={getRemainingTimePercentage(getExamStatus(exam), timeDifference, exam.duration)} showInfo={false}/>
  </Col>
}

export default ShowExamStatusTitle;