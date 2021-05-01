import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication';
import NavBar from '../../NavBar/NavBar';
import { connect } from 'react-redux';
import _ from 'underscore';
import { BodyWrapper, Container, Col, ButtonStyled } from '../../../utitlities/styles';
import React, { useEffect, useState } from 'react';
import api from '../../../utitlities/api';
import styled from 'styled-components';
import { Select, } from 'antd';
import Students from './components/Students';
import Exams from './components/Exams';
import { useParams } from 'react-router';
import Loading from '../../Common/Loading';
import { goBack } from 'connected-react-router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, PageHeader, TileHeaderWrapper, RightButtonWrapper, LabelWrapper, BodyRow, SecondHeader } from '../../styles/pageStyles';
import ImportStudentsModal from './ImportStudentsModal';
import CreateExamModal from './CreateExamModal';
const { Option } = Select

const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`
const CoursePage = ({ dispatch, user, hasBack = true }) => {
  const { id } = useParams()
  if (!id) dispatch(goBack())
  const [isLoading, setLoading] = useState(false)
  const [course, setCourse] = useState({
    enrolledStudents: [],
    pendingEnrollStudents: []
  })
  const [showingStudentType, setShowingStudentType] = useState("enrolled")
  const [showImportStudentModal, setShowImportStudentModal] = useState(false)
  const [showCreateExamModal, setShowCreateExam] = useState(false)

  useEffect(async () => {
    try {
      setLoading(true)
      const { payload = {} } = await api.getCourseByID(id)
      setCourse(payload)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [id])

  const updateCourseOnUi = async () => {
    try {
      setLoading(true)
      const { payload = {} } = await api.getCourseByID(id)
      setCourse(payload)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const createExamHandler = async (exam) => {
    setLoading(true)
    exam.participants = _.map(course.enrolledStudents, enst => enst._id)
    const { payload: newExam } = await api.createExam(exam)
    await api.updateCourse({ _id: id }, { $push: { exams: newExam._id } })
    const { payload = {} } = await api.getCourseByID(id)
    setCourse(payload)
    setLoading(false)
  }

  const StyledBodyRow = (props) => (
    <BodyRow>
      <Col rows="32px minmax(280px, calc(100vh - 380px))">
        {props.children}
      </Col>
    </BodyRow>
  );

  return (
    <div>
      <CheckAuthentication />
      {isLoading && <Loading isLoading={isLoading}/>}
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 1fr 1fr" gridGap="20px">
          <ImportStudentsModal
            visible={showImportStudentModal}
            setVisibility={setShowImportStudentModal}
            course={course}
            updateCourseOnUi={updateCourseOnUi}
            user={user}
          />
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
          </TileHeaderWrapper>
          <Row columns="7fr 5fr">
            <StyledBodyRow>
              <Row columns="1fr 1fr">
                <SecondHeader>Exams</SecondHeader>
                <RightButtonWrapper>
                  <ButtonStyled type="primary" onClick={() => setShowCreateExam(true)}>
                    Create Exam
                  </ButtonStyled>
                </RightButtonWrapper>
              </Row>
              <Exams exams={course.exams} />
            </StyledBodyRow>
            <StyledBodyRow>
              <Row columns="1fr 70px">
                <Select
                  style={{ width: '200px' }}
                  value={showingStudentType}
                  onChange={v => setShowingStudentType(v)}
                >
                  <Option key="enrolled" value="enrolled">Enrolled Students</Option>
                  <Option key="requested" value="requested">Enrollment Requests</Option>
                </Select>
                { showingStudentType === "enrolled" &&
                  <RightButtonWrapper>
                    <ButtonStyled
                      type="primary"
                      onClick={() => setShowImportStudentModal(true)}
                    >
                      Import
                    </ButtonStyled>
                  </RightButtonWrapper>
                }
              </Row>
              <Students
                showingStudentType={showingStudentType}
                enrolledStudents={course.enrolledStudents}
                pendingEnrollStudents={course.pendingEnrollStudents}
                course = {course} updateCourseOnUi = {updateCourseOnUi}
              />
            </StyledBodyRow>
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
  )
}
const mapStateToProps = state => ({
  user: state.login.user
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage)
