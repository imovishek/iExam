import React from "react";
import UpcommingExamItem from "./UpcommingExamItem";
import rightArrow from "../../../images/proceed.png";
import styled from "styled-components";
import { getExamStatus } from "../../../utitlities/common.functions";
import { push } from "connected-react-router";

const NextExamWrapper = styled.div`
  margin-left: 25px;
  display: flex;
  background: linear-gradient(
    180deg,
    rgba(17, 38, 77, 0.82) 0%,
    rgba(73, 0, 107, 0.82) 100%
  );
  width: 65vw;
  min-height: 20vh;
  padding: 40px;
  border-radius: 20px;
  margin-bottom: 30px;
`;
const headerTextStyleObject = { padding: "0", margin: "0", color: "white" };

const StyledButton = styled.button`
  padding: 5px 10px;
  min-height: 30px;
  margin: 10px 0px 10px 25px;
  font-size: large;
  background: #49006b;
  border-radius: 10px;
  color: white;
`;



const StudentDashboard = ({ exams = [], dispatch }) => {
  let examStatText;
  if (getExamStatus(exams[0]).toLocaleLowerCase() === "running")
    examStatText = "Running Now";
  else examStatText = "Next Exam";

  return (
    <div>
      <NextExamWrapper>
        <div style={{ marginLeft: "10px" }}>
          <h4 style={headerTextStyleObject}>{examStatText}</h4>
          <h1 style={headerTextStyleObject}>{exams[0].title}</h1>
        </div>
        <div
          style={{ marginRight: "20px", marginLeft: "auto", display: "flex" }}
        >
          <div style={{ textAlign: "center" }}>
            <h1 style={headerTextStyleObject}>{exams[0].startTime}</h1>
            <h4 style={headerTextStyleObject}>Duration: {exams[0].duration}</h4>
          </div>

          <StyledButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(push(`/exam/${exams[0]._id}`));
            }}
          >
            Enter Now{" "}
            <img
              style={{ height: "23px", width: "23px", marginTop: "-2px" }}
              src={rightArrow}
              alt=""
            />
          </StyledButton>
        </div>
      </NextExamWrapper>

      <div style={{ margin: "25px" }}>
        <h3>Upcomming Exams</h3>
        {exams.map((ex) => (
          <UpcommingExamItem
            key={ex._id}
            exam={ex}
            dispatch={dispatch}
          ></UpcommingExamItem>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
