import React, { useEffect } from "react";
import rightArrow from "../../../images/proceed.png";
import styled from "styled-components";
import {
  getExamStatus,
  getExamTimeDiffInFormat,
  stFormatDate,
} from "../../../utitlities/common.functions";
import { push } from "connected-react-router";
import { setNavigaitonTabAction } from "../../NavBar/actions";
import { useState } from "react/cjs/react.development";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onUpdateCurrentTab } from "../../Exams/actions";
import { RUNNING } from "../../../utitlities/constants";

const NextExamWrapper = styled.div`
  margin-left: 25px;
  background: linear-gradient(
    180deg,
    rgba(17, 38, 77, 0.82) 0%,
    rgba(73, 0, 107, 0.82) 100%
  );
  min-height: 20vh;
  min-width: max-content;
  padding: 20px 20px 0px 20px;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  min-width: max-content;
  justify-content: space-between;
  align-items: center;
`;
const headerTextStyleObject = { padding: "0", margin: "0", color: "white" };

const StyledButton = styled.div`
  padding: 10px 15px 10px 15px;
  min-height: 30px;
  height: fit-content;
  font-size: large;
  background: #49006b;
  border-radius: 10px;
  color: white;
  :hover {
    cursor: pointer;
  }
`;
const ExamRemainingTime = ({ exam, statusText }) => {
  const [{ timeString }, setTimeDifference] = useState(
    getExamTimeDiffInFormat(exam)
  );
  useEffect(() => {
    if (exam && exam._id) {
      const interval = setInterval(() => {
        const { timeString } = getExamTimeDiffInFormat(exam);
        setTimeDifference({ timeString });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);
  return (
    <div style={{ justifyContent: "center", textAlign: "center" }}>
      <h4 style={{...headerTextStyleObject, color: 'rgb(204 136 121)'}}>{statusText}</h4>
      <h1 style={{ ...headerTextStyleObject, color: "orange" }}>
        {timeString === "Running" ? "00 : 00 : 00" : timeString}
      </h1>
    </div>
  );
};

const NextExamCard = ({ exam, dispatch, haveSingleRunningExam }) => {
  let examStatText;
  const isRunning = getExamStatus(exam).toLocaleLowerCase() === RUNNING;
  if (isRunning)
    examStatText = "Running Now";
  else examStatText = "Next Exam";
  return (
    <NextExamWrapper
      style={
        haveSingleRunningExam
          ? { padding: "20px 20px 20px 20px" }
          : { padding: "20px 20px 5px 20px" }
      }
    >
      <MainWrapper>
        <div style={{ margin: "20px" }}>
          <h4 style={headerTextStyleObject}>{examStatText}</h4>
          <h1 style={{...headerTextStyleObject,width:"290px"}}>
            {exam.course.courseCode} {exam.title}
          </h1>
        </div>
        <ExamRemainingTime statusText={isRunning ? 'Ends in' : 'Starts in'} exam={exam} />
        <div
          style={{
            margin: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginLeft: "20px",
              marginRight: "30px",
            }}
          >
            <h2 style={headerTextStyleObject}>
              {stFormatDate(exam.startDate)}
            </h2>
            <h2 style={headerTextStyleObject}>{exam.startTime}</h2>
            <h5 style={headerTextStyleObject}>Duration: {exam.duration}</h5>
          </div>

          <StyledButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(setNavigaitonTabAction("exams"));
              dispatch(push(`/exam/${exam._id}`));
            }}
          >
            Enter Now{" "}
            <img
              style={{ height: "23px", width: "23px", margin: "1px" }}
              src={rightArrow}
              alt=""
            />
          </StyledButton>
        </div>
      </MainWrapper>
      {!haveSingleRunningExam && (
        <div
          style={{
            ...headerTextStyleObject,
            width: "100%",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <a
            style={{ cursor: "pointer",color:"white", borderRadius: '5px', padding: '10px', border: '1px solid #bbbbbb' }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(onUpdateCurrentTab("running"));
              dispatch(setNavigaitonTabAction("exams"));
              dispatch(push("exams"));
            }}
          >
            See more{" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ marginBottom: "-2px" }}
            />
          </a>
        </div>
      )}
    </NextExamWrapper>
  );
};

export default NextExamCard;
