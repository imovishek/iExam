import React from "react";
import styled from "styled-components";
import { push } from "connected-react-router";
import { formatDateAndTime } from "../../../utitlities/common.functions";
import { setNavigaitonTabAction } from "../../NavBar/actions";
const ItemWrapper = styled.div`
  display: flex;
  box-shadow: 1px 1px 10px rgb(218, 213, 213);
  margin: 15px;
  padding: 10px 20px;
  border-radius: 14px;
  background-color: #ffffff;
  :hover {
    cursor: pointer;
  }
`;

const DateTimeBlock = styled.button`
  background-color: rgb(92, 21, 143);
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: auto;
  :hover {
    cursor: pointer;
  }
`;

const UpcommingExamTable = ({ exams = [], dispatch }) => (
  <div style={{ margin: "20px", paddingBottom: "20px" }}>
    <h3 style={{ marginLeft: "25px", marginBottom: "-5px" }}>Upcomming Exams</h3>
    {exams.map((ex) => (
      <ItemWrapper
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
        <DateTimeBlock>
          {formatDateAndTime(ex.startDate, ` ${ex.startTime}`)}
        </DateTimeBlock>
      </ItemWrapper>
    ))}
  </div>
);

export default UpcommingExamTable;
