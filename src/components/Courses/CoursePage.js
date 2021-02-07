import CheckAuthentication from "../CheckAuthentication/CheckAuthentication";
import NavBar from "../NavBar/NavBar";
import { connect } from "react-redux";
import _ from 'underscore';
import { BodyWrapper, Container } from "../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../utitlities/api';
import styled from "styled-components";
import moment from 'moment';
import { Button, Input, Select, DatePicker } from "antd";
import EnrolledStudents from "./components/EnrolledStudents";
import Exams from "./components/Exams";
import EnrollmentRequest from "./components/EnrollmentRequest";
import { getDuration } from "../../utitlities/common.functions";
import { useParams } from "react-router";
import { goBack } from "connected-react-router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Option } = Select;
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
  display: inline;
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

const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`;

const SelectStyled = styled(Select)`
  width: 100%;
`;

const getNameWithShort = obj => `${obj.firstName} ${obj.lastName} (${obj.shortName || ''})`;

const CoursePage = ({ dispatch, user, hasBack = true }) => {
  const { id } = useParams();
  if (!id) dispatch(goBack());
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [teachers, setTeachers] = useState({});
  const { departmentName } = user.department || {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const { payload = {} } = await api.getCourseByID(id);
      const { payload: fetchedTeachers = [] } = await api.getTeachers({});
      setCourse(payload);
      setTeachers(fetchedTeachers);
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const setValue = (key, value) => {
    const newCourse = {
      ...course,
      [key]: value
    };
    setCourse(newCourse);
  };

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
          {/* <Header>{departmentName}</Header> */}
          <ExamsHeaderWrapper>
            <div>
              {hasBack &&
                <FontAwesomeIconWrapper onClick={() => dispatch(goBack())}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </FontAwesomeIconWrapper>
              }
              <PageHeader>Course</PageHeader>
            </div>
            
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
                onChange={(e) => setValue('title', e.target.value)}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Department</LabelWrapper>
              <SelectStyled
                disabled={true}
                value={course.department && course.department.departmentName}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Course Code</LabelWrapper>
              <InputWrapper
                value={course.courseCode}
                onChange={(e) => setValue('courseCode', e.target.value)}
              />
            </HeaderRow>

          </Row>
          <Row columns="1fr 1fr 1fr 1fr">
            <HeaderRow>
              <LabelWrapper>Teacher</LabelWrapper>
              <SelectStyled
                value={JSON.stringify(course.assignedTeacher)}
                onChange={(value) => setValue('assignedTeacher', JSON.parse(value))}
              >
                {_.map(teachers, (t) => <Option key={t._id} value={JSON.stringify(t)}>{getNameWithShort(t)}</Option>)}
                <Option key="unassigned" value={JSON.stringify(null)}> Unassigned </Option>
              </SelectStyled>
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Status</LabelWrapper>
              <SelectStyled
                value={course.status ? course.status.toLowerCase() : ''}
                onChange={(value) => setValue('status', value)}
              >
                <Option key="upcoming" value="upcoming"> Upcoming </Option>
                <Option key="running" value="running"> Running </Option>
                <Option key="ended" value="ended"> Ended </Option>
              </SelectStyled>
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Start Date</LabelWrapper>
              <DatePicker
                allowClear
                placeholder="Start Date"
                value={!course.startDate ? '' : moment(course.startDate)}
                style={{ width: 270 }}
                format="DD/MM/YYYY"
                onChange={(d) => setValue('startDate', d)}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Duration</LabelWrapper>
              <InputWrapper
                value={getDuration(course.startDate, course.endDate)}
              />
            </HeaderRow>

          </Row>

          <Row columns=".7fr .7fr 1.2fr">
            <BodyRow>
              <LabelWrapper>Enrolled Students</LabelWrapper>
              <EnrolledStudents students={course.enrolledStudents} />
            </BodyRow>
            <BodyRow>
              <LabelWrapper>Enrollment Request</LabelWrapper>
              <EnrollmentRequest students={course.pendingEnrollStudents} />
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
              <Exams exams={course.exams} />
            </BodyRow>
          </Row>
        </Container>
      </BodyWrapper>
    </div>
  );
};
const mapStateToProps = state => ({
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

  
export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);