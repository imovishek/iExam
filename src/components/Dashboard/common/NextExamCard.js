import React from "react";
import rightArrow from "../../../images/proceed.png";
import styled from "styled-components";
import { getExamStatus } from "../../../utitlities/common.functions";
import { push } from "connected-react-router";
import { setNavigaitonTabAction } from "../../NavBar/actions";

const NextExamWrapper = styled.div`
  margin-left: 25px;
  display: flex;
  background: linear-gradient(
    180deg,
    rgba(17, 38, 77, 0.82) 0%,
    rgba(73, 0, 107, 0.82) 100%
  );
  min-height: 20vh;
  padding: 40px;
  border-radius: 20px;
  margin-bottom: 30px;
`;
const headerTextStyleObject = { padding: "0", margin: "0", color: "white" };

const StyledButton = styled.div`
  padding: 10px 15px 10px 15px;
  min-height: 30px;
  height: fit-content;
  margin: 10px 0px 10px 25px;
  font-size: large;
  background: #49006b;
  border-radius: 10px;
  color: white;
  :hover{
    cursor:pointer;
  }
`;

const NextExamCard = ({ exam, dispatch }) => {
  let examStatText;
  if (getExamStatus(exam).toLocaleLowerCase() === "running")
    examStatText = "Running Now";
  else examStatText = "Next Exam";
  return (
    <NextExamWrapper>
      <div style={{ marginLeft: "10px" }}>
        <h4 style={headerTextStyleObject}>{examStatText}</h4>
        <h1 style={headerTextStyleObject}>{exam.course.courseCode}{" "}{exam.title}</h1>
      </div>
      <div style={{ marginRight: "20px", marginLeft: "auto", display: "flex" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={headerTextStyleObject}>{exam.startTime}</h1>
          <h4 style={headerTextStyleObject}>Duration: {exam.duration}</h4>
        </div>

        <StyledButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(setNavigaitonTabAction("exams"));
            dispatch(push(`/exam/${exam._id}`));
          }}
        >
          Enter Now {" "}
          <img
            style={{ height: "23px", width: "23px", marginTop: "-2px" }}
            src={rightArrow}
            alt=""
          />
        </StyledButton>
      </div>
    </NextExamWrapper>
  );
};

export default NextExamCard;
