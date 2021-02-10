import CheckAuthentication from "../../CheckAuthentication/CheckAuthentication";
import NavBar from "../../NavBar/NavBar";
import { connect } from "react-redux";
import _ from 'underscore';
import { BodyWrapper, Container } from "../../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../../utitlities/api';
import styled from "styled-components";
import moment from 'moment';
import { Button, Input, Select, DatePicker } from "antd";
import EnrolledStudents from "./components/EnrolledStudents";
import Exams from "./components/Exams";
import EnrollmentRequest from "./components/EnrollmentRequest";
import { getDuration, getObjectByAddingID } from "../../../utitlities/common.functions";
import { useParams } from "react-router";
import Loading from '../../Common/Loading';
import { goBack } from "connected-react-router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, PageHeader, TileHeaderWrapper, RightButtonWrapper, HeaderRow, LabelWrapper, BodyRow } from "../../styles/pageStyles";
import ImportStudentsModal from "./ImportStudentsModal";
import CreateExamModal from "./CreateExamModal";
import { courses } from "../../../utitlities/dummy";
const { Option } = Select;

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
  const [isLoading, setLoading] = useState(false);
  const [course, setCourse] = useState({});
  const [teachers, setTeachers] = useState({});
  const [showImportStudentModal, setShowImportStudentModal] = useState(false);
  const [showCreateExamModal, setShowCreateExam] = useState(false);
  const { departmentName } = user.department || {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      setLoading(true);
      const { payload = {} } = await api.getCourseByID(id);
      const { payload: fetchedTeachers = [] } = await api.getTeachers({});
      setCourse(payload);
      setTeachers(fetchedTeachers);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const updateCourseOnUi = async() => {
    try {
      setLoading(true);
      const { payload = {} } = await api.getCourseByID(id);
      setCourse(payload);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const setValue = (key, value) => {
    const newCourse = {
      ...course,
      [key]: value
    };
    setCourse(newCourse);
  };

  const handleUpdateCourse = async (course) => {
    setLoading(true);
    const newCourse = getObjectByAddingID(course);
    console.log(newCourse);
    await api.updateCourse(newCourse);
    const { payload = {} } = await api.getCourseByID(id);
    setLoading(false);
    setCourse(payload);
  }

  const createExamHandler = async (exam) => {
    setLoading(true);
    exam.participants = _.map(course.enrolledStudents, enst => enst._id);
    const { payload: newExam } = await api.createExam(exam);
    const { payload: newCourse } = await api.updateCourse({_id: id}, { $push: { exams: newExam._id } });
    const { payload = {} } = await api.getCourseByID(id);
    setCourse(payload);
    setLoading(false);
  }

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
          <ImportStudentsModal
            visible={showImportStudentModal}
            setVisibility={setShowImportStudentModal}
            course={course}
            updateCourseOnUi={updateCourseOnUi}
            user={user}
          />
          {isLoading && <Loading isLoading={isLoading}/>}
          {/* <Header>{departmentName}</Header> */}
          <TileHeaderWrapper>
            <div>
              {hasBack &&
                <FontAwesomeIconWrapper onClick={() => dispatch(goBack())}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </FontAwesomeIconWrapper>
              }
              <PageHeader>Course</PageHeader>
            </div>
            
            <RightButtonWrapper>
              {/* <ButtonStyled
                type="primary"
                onClick={() => handleUpdateCourse(course)}
              >
                Update Course
              </ButtonStyled> */}
            </RightButtonWrapper>
          </TileHeaderWrapper>
          <Row columns="1fr 1fr">
            <HeaderRow>
              <LabelWrapper>Title</LabelWrapper>
              <InputWrapper
                disabled={true}
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

          </Row>
          <Row columns="1fr 1fr 1fr 1fr">
          <HeaderRow>
              <LabelWrapper>Course Code</LabelWrapper>
              <InputWrapper
                disabled={true}
                value={course.courseCode}
                onChange={(e) => setValue('courseCode', e.target.value)}
              />
            </HeaderRow>
            
            <HeaderRow>
              <LabelWrapper>Teacher</LabelWrapper>
              <SelectStyled
                disabled={true}
                value={course.assignedTeacher ? course.assignedTeacher._id : null}
                onChange={(value) => setValue('assignedTeacher', value ? { _id: value } : null)}
              >
                {_.map(teachers, (t) => <Option key={t._id} value={t._id}>{getNameWithShort(t)}</Option>)}
                <Option key="unassigned" value={null}> Unassigned </Option>
              </SelectStyled>
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Status</LabelWrapper>
              <SelectStyled
                disabled={true}
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
                disabled={true}
                allowClear
                placeholder="Start Date"
                value={!course.startDate ? '' : moment(course.startDate)}
                style={{ width: 270 }}
                format="DD/MM/YYYY"
                onChange={(d) => setValue('startDate', d)}
              />
            </HeaderRow>
          </Row>

          <Row columns=".7fr .7fr 1.2fr">
            <BodyRow>
              <TileHeaderWrapper>
                <LabelWrapper>Enrolled Students</LabelWrapper>
                <RightButtonWrapper>
                  <ButtonStyled type="primary" onClick={() => setShowImportStudentModal(true)}>
                    Import
                  </ButtonStyled>
                </RightButtonWrapper>
              </TileHeaderWrapper>
              <EnrolledStudents students={course.enrolledStudents} 
              course = {course} updateCourseOnUi = {updateCourseOnUi}/>
            </BodyRow>
            <BodyRow>
              <TileHeaderWrapper>
                <LabelWrapper>Enrollment Request</LabelWrapper>
              </TileHeaderWrapper>
              <EnrollmentRequest
                students={course.pendingEnrollStudents}
                course={course}
                updateCourseOnUi={updateCourseOnUi}
              />
            </BodyRow>
            <BodyRow>
              <TileHeaderWrapper>
                <LabelWrapper>Exams</LabelWrapper>
                <RightButtonWrapper>
                  <ButtonStyled type="primary" onClick={() => setShowCreateExam(true)}>
                    Create Exam
                  </ButtonStyled>
                </RightButtonWrapper>
              </TileHeaderWrapper>
              <Exams exams={course.exams} />
            </BodyRow>
          </Row>
          <CreateExamModal
            visible={showCreateExamModal}
            setVisibility={setShowCreateExam}
            createExam={createExamHandler}
            courseId = {id}
          />
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