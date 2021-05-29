import React, { useEffect } from "react";
import styled from "styled-components";
import { push } from "connected-react-router";
import {
  formatDateAndTime,
  getExamTimeDiffInFormat,
} from "../../../utitlities/common.functions";
import { setNavigaitonTabAction } from "../../NavBar/actions";
import { useState } from "react/cjs/react.development";
import moment from "moment";
import { navKeys, navLinks } from "../../NavBar/constants";
import { onUpdateCurrentTab } from "../../Exams/actions";
import { RightButtonWrapper } from "../../styles/pageStyles";
import { CenterText } from "../../../utitlities/styles";

const UpcomingItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  box-shadow: 1px 1px 10px rgb(218, 213, 213);
  margin: 15px;
  padding: 10px 20px;
  border-radius: 14px;
  background-color: #ffffff;
  :hover {
    cursor: pointer;
  }
  justify-content: space-between;
  align-items: center;
`;

const DateTimeBlock = styled.button`
  background-color: rgb(92, 21, 143);
  color: white;
  width: 170px;
  padding: 10px 15px;
  border-radius: 10px;
  :hover {
    cursor: pointer;
  }
`;
const headerTextStyleObject = { padding: "0", margin: "0", color: "white" };

export const getRemainingTime = (exam) => {
  const dateString = moment(exam.startDate).format("YYYY-MM-DD");
  const timeString = moment(exam.startTime, "hh:mm A").format("HH:mm:ss");
  const startDateTime = new Date(`${dateString} ${timeString}`);

  let seconds = Math.abs(moment(moment.now()).diff(startDateTime, "seconds"));
  const dayInSecond = 24 * 3600;
  const hourInSecond = 3600;
  const minuteInSecond = 60;

  const days = Math.floor(seconds / dayInSecond);
  seconds %= dayInSecond;
  const hours = Math.floor(seconds / hourInSecond);
  seconds %= hourInSecond;
  const minutes = Math.floor(seconds / minuteInSecond);

  const format = (number) => (number < 10 ? `0${number}` : number);

  if (days) return `${format(days)} days ${format(hours)} hours`;
  if (hours) return `${format(hours)} hours ${format(minutes)} minutes`;
  if (minutes) return `${format(minutes)} minutes`;
  return "In a few seconds";
};

const ExamRemainingTime = ({ exam }) => {
  const [timeString, setTimeDifference] = useState(getRemainingTime(exam));
  useEffect(() => {
    if (exam && exam._id) {
      const interval = setInterval(() => {
        const timeString = getRemainingTime(exam);
        setTimeDifference(timeString);
      }, 60000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);
  return (
    <div>
      <h3 style={{ ...headerTextStyleObject, color: "rgb(92, 21, 143)" }}>
        {timeString} later
      </h3>
    </div>
  );
};

const UpcommingExamTable = ({ exams = [], dispatch, showMoreUpcomingExam }) => (
  <div style={{ margin: "20px", paddingBottom: "20px" }}>
    <h3 style={{ marginLeft: "12px", marginBottom: "-5px" }}>
      Upcomming Exams
      {showMoreUpcomingExam && (
        <a
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(onUpdateCurrentTab("upcoming"));
            dispatch(setNavigaitonTabAction("exams"));
            dispatch(push("exams"));
          }}
        >
          {" "}
          (Show all)
        </a>
      )}
    </h3>
    {exams.map((ex) => (
      <UpcomingItemWrapper
        key={ex._id}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(setNavigaitonTabAction("exams"));
          dispatch(push(`/exam/${ex._id}`));
        }}
      >
        <h2>
          {ex.course.courseCode} {ex.title}
        </h2>
        <CenterText>
          <ExamRemainingTime exam={ex} />
        </CenterText>
        <RightButtonWrapper>
          <DateTimeBlock>
            {formatDateAndTime(ex.startDate, ` ${ex.startTime}`)}
          </DateTimeBlock>
        </RightButtonWrapper>
        
      </UpcomingItemWrapper>
    ))}
  </div>
);

export default UpcommingExamTable;
