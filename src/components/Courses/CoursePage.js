import CheckAuthentication from "../CheckAuthentication/CheckAuthentication";
import NavBar from "../NavBar/NavBar";
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../utitlities/api';
import { onUpdateCoursePage } from "./actions";
import styled from "styled-components";
import CourseTable from "./CourseTable";
import { Button, Input } from "antd";
import CreateEditCourseModal from "./CreateEditCourseModal";
import EnrolledStudents from "./components/EnrolledStudents";
import Exams from "./components/Exams";
import { students, exams, courses } from "../../utitlities/dummy";
import EnrollmentRequest from "./components/EnrollmentRequest";
import { getDuration, stFormatDate } from "../../utitlities/common.functions";

const Row = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: ${props => props.columns || 'auto'};
`;

const HeaderRow = styled.div`
  height: 90px;
`;

const BodyRow = styled.div`
  padding: 10px;
  height: calc(100vh - 240px);
  margin-bottom: 20px;
  margin-top: 30px;
  border: 1px solid rgba(10, 10, 10, 0.3);
`;

const LabelWrapper = styled.div`
  color: grey;
  margin-bottom: 10px;
`;
const ExamsHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  justify-content: space-between;
`;
const ExamButtonWrapper = styled.div`
  float: right;
`;

const PageHeader = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #828b94;
  user-select: none;
`;

const InputWrapper = styled(Input)`
  && {
    width: 100%;
  }
`;

const ButtonStyled = styled(Button)`
  height: 30px;
`;

const getName = obj => `${obj.firstName} ${obj.lastName}`;

const CoursePage = ({ course = courses[0] }) => {
  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
        <ExamsHeaderWrapper>
            <PageHeader>Course</PageHeader>
            <ExamButtonWrapper>
              <ButtonStyled type="primary">
                Update Course
              </ButtonStyled>
            </ExamButtonWrapper>
          </ExamsHeaderWrapper>
          <Row columns="1fr 1fr 150px">
            <HeaderRow>
              <LabelWrapper>Title</LabelWrapper>
              <InputWrapper
                value={course.title}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Department</LabelWrapper>
              <InputWrapper
                value={course.department && course.department.departmentName}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Course Code</LabelWrapper>
              <InputWrapper
                value={course.courseCode}
              />
            </HeaderRow>

          </Row>
          <Row columns="1fr 1fr 1fr 1fr">
            <HeaderRow>
              <LabelWrapper>Teacher</LabelWrapper>
              <InputWrapper
                value={ course.assignedTeacher ? getName(course.assignedTeacher) : 'Unassigned'}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Status</LabelWrapper>
              <InputWrapper
                value={course.status}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Start Date</LabelWrapper>
              <InputWrapper
                value={stFormatDate(course.startDate)}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Duration</LabelWrapper>
              <InputWrapper
                value={`${getDuration(course.startDate, course.endDate)} minutes`}
              />
            </HeaderRow>

          </Row>

          <Row columns=".7fr .7fr 1.2fr">
            <BodyRow>
              <LabelWrapper>Enrolled Students</LabelWrapper>
              <EnrolledStudents students={students} />
            </BodyRow>
            <BodyRow>
              <LabelWrapper>Enrollment Request</LabelWrapper>
              <EnrollmentRequest students={students} />
            </BodyRow>
            <BodyRow>
              <ExamsHeaderWrapper>
                <LabelWrapper>Exams</LabelWrapper>
                <ExamButtonWrapper>
                  <ButtonStyled type="primary">
                    Create Exam
                  </ButtonStyled>
                </ExamButtonWrapper>
              </ExamsHeaderWrapper>
              <Exams exams={exams} />
            </BodyRow>
          </Row>
        </Container>
      </BodyWrapper>
    </div>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    dispatch
});

  
export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);