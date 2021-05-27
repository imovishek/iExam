import React from "react";
import createExamIcon from "../../../images/createexamicon.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CreateExamModal from "./CreateExamModal";
import { useState } from "react/cjs/react.development";
import { onUpdateCurrentTab } from "../../Exams/actions";
import { push } from "connected-react-router";
import { setNavigaitonTabAction } from "../../NavBar/actions";
const MainRow = styled.div`
  margin-left: 25px;
  display: flex;
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

// const fakeCourseForTestingSelect=[

//   {courseCode:"CSE 103D",id:12},
//   {courseCode:"EEE 1wwD",id:13},
//   {courseCode:"MAT 10wE",id:14},
//   {courseCode:"CEP 103D",id:132},
//   {courseCode:"CHE 103D",id:1332},
//   {courseCode:"MME 153D",id:13332},
//   {courseCode:"PHY 103D",id:1222},
//   {courseCode:"SSS w03D",id:112},
//   {courseCode:"WWW w03D",id:122},
// ]

const AtAGlanceWrapper = ({ dispatch, courses, examsTaken }) => {
  const [modalVisibility, setModalVisibility] = useState(false);

  return (
    <div>
      <h3 style={{ marginLeft: "35px", marginBottom: "-5px" }}>At a glance</h3>
      <MainRow>
        <CreateExamModal
          dispatch={dispatch}
          courses={courses}
          visible={modalVisibility}
          setVisibility={setModalVisibility}
        ></CreateExamModal>
        <a
          onClick={() => setModalVisibility(!modalVisibility)}
          style={{ width: "33%", marginRight: "10px" }}
        >
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
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            dispatch(setNavigaitonTabAction("exams"));
            dispatch(onUpdateCurrentTab("ended"));
            dispatch(push("/exams"));
          }}
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
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            dispatch(setNavigaitonTabAction("courses"));
            dispatch(onUpdateCurrentTab("courses"));
            dispatch(push("/courses"));
          }}
          style={{ width: "33%", marginLeft: "10px" }}
        >
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
        </a>
      </MainRow>
    </div>
  );
};

export default AtAGlanceWrapper;
