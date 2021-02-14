import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { connect } from 'react-redux'
import { BodyWrapper, Container, Col, ButtonStyled } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import styled from 'styled-components'
import { message, Menu, Dropdown, Button } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Questions from './components/Questions'
import Participants from './components/Participants'
import BannedParticipants from './components/BannedParticipants'
import { Row, PageHeader, TileHeaderWrapper, RightButtonWrapper, HeaderRow, LabelWrapper, BodyRow } from '../../styles/pageStyles'
import { useParams } from 'react-router'
import { goBack, push } from 'connected-react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { getObjectByAddingID } from '../../../utitlities/common.functions'
import Loading from '../../Common/Loading'
import EditExamModal from './EditExamModal'


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
      <Col rows="32px minmax(300px, calc(100vh - 380px))">
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
            <StyledDropdown overlay={gotoMenu}>
              <Button>
              Goto <DownOutlined />
              </Button>
            </StyledDropdown>
          </Row>
          <Row columns="1.2fr .7fr .7fr">
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
              <TileHeaderWrapper><LabelWrapper>Participants</LabelWrapper></TileHeaderWrapper>
              <Participants students={exam.participants} exam = {exam} updateExamParticipantOnUI = {updateExamParticipantOnUI}/>
            </StyledBodyRow>
            <StyledBodyRow>
              <TileHeaderWrapper><LabelWrapper>Banned Participants</LabelWrapper></TileHeaderWrapper>
              <BannedParticipants students={exam.bannedParticipants} exam = {exam} updateExamParticipantOnUI = {updateExamParticipantOnUI}/>
            </StyledBodyRow>
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
