import React from "react";
import createExamIcon from "../../../images/createexamicon.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainRow = styled.div`
  margin-left: 25px;
  display: flex;
  width: 64vw;
`;

const BoxWrapper = styled.div`
  box-shadow: 1px 1px 10px rgb(214, 210, 210);
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0px;
  min-height: 180px;
  background-color: white;
  margin-bottom: 4vh;
  justify-content: between;
  align-items: center;
`;

const AtAGlanceWrapper = ({ courses, examsTaken }) => (
  <div>
    <h3 style={{ marginLeft: "2vw", marginBottom: "-5px" }}>At a glance</h3>
    <MainRow>
      <Link to="/" style={{ width: "33%", marginRight: "10px" }}>
        <BoxWrapper>
          <h2>Create Exam</h2>
          <img
            style={{
              marginBottom: "20px",
              height: "80px",
              width: "80px",
              float: "right",
              marginLeft: "auto",
              marginRight: "0px",
            }}
            src={createExamIcon}
            alt=""
          />
        </BoxWrapper>
      </Link>
      <Link
        to="/exams/ended"
        style={{ width: "33%", marginRight: "10px", marginLeft: "10px" }}
      >
        <BoxWrapper>
          <h2>Exam Taken</h2>
          <h1
            style={{
              marginTop: "-20px",
              marginBottom: "20px",
              paddingTop: "0px",
              fontSize: "80px",
              color: "#3daad9",
              float: "right",
            }}
          >
            {examsTaken}
          </h1>
        </BoxWrapper>
      </Link>
      <Link to="/courses" style={{ width: "33%", marginLeft: "10px" }}>
        <BoxWrapper>
          <h2>My Courses</h2>
          <h1
            style={{
              marginTop: "-20px",
              marginBottom: "20px",
              paddingTop: "0px",
              fontSize: "80px",
              color: "#0daa71",
              float: "right",
            }}
          >
            {courses.length}
          </h1>
        </BoxWrapper>
      </Link>
    </MainRow>
  </div>
);

export default AtAGlanceWrapper;
