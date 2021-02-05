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

const Row = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: ${props => props.columns || 'auto'};
`;

const HeaderRow = styled.div`
  height: 100px;
`;

const BodyRow = styled.div`
  padding: 10px;
  height: calc(100vh - 240px);
  margin-bottom: 20px;
  border: 1px solid rgba(10, 10, 10, 0.3);
`;

const LabelWrapper = styled.div`
  color: grey;
  margin-bottom: 10px;
`;
const ExamsHeaderWrapper = styled.div`
  color: grey;
  margin-bottom: 10px;
  height: 30px;
  border-bottom: 1px solid rgba(10, 10, 10, 0.3);;
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

const CoursePage = ({ course = courses[0] }) => {
  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
          <PageHeader>Course</PageHeader>
          <Row columns="1fr 1fr 1fr">
            <HeaderRow>
              <LabelWrapper>Title</LabelWrapper>
              <InputWrapper
                value={course.title}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Course Code</LabelWrapper>
              <InputWrapper
                value={course.courseCode}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Department</LabelWrapper>
              <InputWrapper
                value={course.department && course.department.departmentName}
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
              <ExamsHeaderWrapper>Exams</ExamsHeaderWrapper>
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