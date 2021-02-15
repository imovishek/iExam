import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { connect } from 'react-redux'
import { BodyWrapper, Container, Col, ButtonStyled } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import styled from 'styled-components'
import { message, Menu, Dropdown, Button, Select } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Questions from './components/Questions'
import Students from './components/Students'
import { Row, PageHeader, TileHeaderWrapper, RightButtonWrapper, LabelWrapper, BodyRow } from '../../styles/pageStyles'
import { useParams } from 'react-router'
import { goBack, push } from 'connected-react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { getObjectByAddingID } from '../../../utitlities/common.functions'
import Loading from '../../Common/Loading'
import EditExamModal from './EditExamModal'

const { Option } = Select;

const StyledDropdown = styled(Dropdown)`
  width: 130px;
`

const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`
const ExamPage = ({ dispatch, user, hasBack = true }) => {
  const { id } = useParams()
  if (!id) dispatch(goBack())
  const [isLoading, setIsLoading] = useState(true)
  const [exam, setExam] = useState({})
  const [teachersObj, setTeachersObj] = useState({})
  const [showEditExam, setShowEditExam] = useState(false);
  const [showingStudentType, setShowingStudentType] = useState("participants")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      let { payload = {} } = await api.getExamByID(id)
      const { payload: teachers = [] } = await api.getTeachers({})
      const obj = {}
      teachers.map(teacher => { obj[teacher._id] = teacher })
      setTeachersObj(obj)
      if (!payload) payload = {}
      setExam(payload)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  const updateExamParticipantOnUI = async () => {
    try {
      setIsLoading(true)
      const { payload = {} } = await api.getExamByID(id)
      setExam(payload)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  const onExamUpdateHandler = async (exam) => {
    setIsLoading(true)
    try {
      const newExam = { ...exam }
      delete newExam.papers
      await api.updateExam(exam, getObjectByAddingID(newExam))
      await updateExamParticipantOnUI()
      message.success('Successfully Updated!')
    } catch (err) {
      message.error('Failed to update exam!')
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const StyledBodyRow = (props) => (
    <BodyRow>
      <Col rows="32px minmax(300px, calc(100vh - 320px))">
        {props.children}
      </Col>
    </BodyRow>
  );
  function handleMenuClick(e) {
    switch(e.key) {
      case 'result':
        dispatch(push(`/exam/${id}/result`));
        break;
      case 'course':
        dispatch(push(`/course/${exam.course && exam.course._id}`));
        break;
      case 'arena':
        dispatch(push(`/exam/${id}/paper/arena`));
        break;
      default:
        break;
    }
  }
  const gotoMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="result" icon={<UserOutlined />}>
        Results
      </Menu.Item>
      <Menu.Item key="arena" icon={<UserOutlined />}>
        Exam Arena
      </Menu.Item>
      <Menu.Item key="course" icon={<UserOutlined />}>
        Course
      </Menu.Item>
    </Menu>
  )
  
  return (
    <div>
      <CheckAuthentication />
      {isLoading && <Loading isLoading={isLoading}/>}
      <EditExamModal
        visible={showEditExam}
        setVisibility={setShowEditExam}
        selectedExam={exam}
        updateExam={onExamUpdateHandler}
      />
      <BodyWrapper>
        <NavBar />
        <Container rows="55px 60px 1fr" gridGap="20px">
          <TileHeaderWrapper columns="1fr 1fr">
            <div>
              {hasBack &&
                <FontAwesomeIconWrapper onClick={() => dispatch(goBack())}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </FontAwesomeIconWrapper>
              }
              <PageHeader>Exam</PageHeader>
            </div>
            <RightButtonWrapper>
              <ButtonStyled type="primary" onClick={() => setShowEditExam(true)}>
                Edit Exam
              </ButtonStyled>
            </RightButtonWrapper>
          </TileHeaderWrapper>
          <Row columns="1fr">
            <StyledDropdown overlay={gotoMenu} trigger={['click']}>
              <Button>
              Goto <DownOutlined />
              </Button>
            </StyledDropdown>
          </Row>
          <Row columns="3fr 2fr">
            <StyledBodyRow>
              <TileHeaderWrapper columns="1fr 1fr">
                <LabelWrapper>Questions</LabelWrapper>
                <RightButtonWrapper>
                  <ButtonStyled type="primary">
                      Import
                  </ButtonStyled>
                  <ButtonStyled type="primary" onClick={() => dispatch(push(`/exam/${id}/question/new`))}>
                      Create Question
                  </ButtonStyled>
                </RightButtonWrapper>
              </TileHeaderWrapper>              
              <Questions
                onUpdateExamUI={updateExamParticipantOnUI}
                teachersObj={teachersObj}
                exam={exam}
                questions={exam.questions}
              />

            </StyledBodyRow>
            <StyledBodyRow>
              <Select
                style={{ width: '200px' }}
                value={showingStudentType}
                onChange={v => setShowingStudentType(v)}
              >
                <Option key="participants" value="participants">Participants</Option>
                <Option key="banned" value="banned">Banned Students</Option>
              </Select>
              <Students
                showingStudentType={showingStudentType}
                participants={exam.participants}
                bannedParticipants={exam.bannedParticipants}
                exam={exam}
                updateExamOnUI={updateExamParticipantOnUI}
              />
            </StyledBodyRow>
            {/* <StyledBodyRow>
              <TileHeaderWrapper><LabelWrapper>Banned Participants</LabelWrapper></TileHeaderWrapper>
              <BannedParticipants students={exam.bannedParticipants} exam = {exam} updateExamParticipantOnUI = {updateExamParticipantOnUI}/>
            </StyledBodyRow> */}
          </Row>
        </Container>
      </BodyWrapper>
    </div>
  )
}
const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ExamPage)
