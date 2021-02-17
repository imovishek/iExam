import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { connect } from 'react-redux'
import _ from 'underscore'
import { BodyWrapper, Container, Col } from '../../../utitlities/styles'
import React, { useEffect, useState, useCallback } from 'react'
import api from '../../../utitlities/api'
import styled from 'styled-components'
import { Button, message, Switch } from 'antd'
import { getExamStatus, meGotBanned } from '../../../utitlities/common.functions'
import { useParams } from 'react-router'
import { goBack } from 'connected-react-router'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, PageHeader, TileHeaderWrapper, RightButtonWrapper } from '../../styles/pageStyles'
import { announcements } from '../../../utitlities/dummy'
import QuestionPaper from './components/QuestionPaper'
import Questions from './components/Questions'
import Announcements from './components/Announcements'
import Loading from '../../Common/Loading'
import { setUserAction } from '../../Login/actions'


const ButtonStyled = styled(Button)`
  height: 30px;
`

const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`

const TileBodyWrapper = styled.div`
  overflow: auto;
  height: calc(100vh - 120px);
  background: #f9f9f9;
`
const RedText = styled.span`
  margin-left: 10px;
  color: red;
`

const ExamPage = ({ dispatch, user, hasBack = true }) => {
  const { id } = useParams()
  if (!id) dispatch(goBack())
  const [isLoading, setIsLoading] = useState(true)
  const [exam, setExam] = useState({})
  const [showingPaper, setShowingPaper] = useState(false)
  const [paper, setPaper] = useState({})
  const [switchLoading, setSwitchLoading] = useState(false);
  const [savedText, setSavedText] = useState("");
  const virtualState = {};

  const createPaperForMe = (exam, newPaper) => {
    const answerObj = {}
    _.map(newPaper.answers, answer => {
      answerObj[answer.questionID] = {
        answer: answer.answer,
        marks: answer.marks
      }
    })
    newPaper.answers = _.map(exam.questions, question => ({
      questionID: question._id,
      answer: (answerObj[question._id] || {}).answer || '',
      marks: (answerObj[question._id] || {}).marks || 0
    })
    )
    return newPaper
  }
  const updateExamOnUI = async () => {
    const { payload = {} } = await api.getExamByIDWithPaper(id)
    const { exam: updatedExam, paper: updatedPaper } = payload;
    setExam(updatedExam)
    const newPaper = createPaperForMe(updatedExam, updatedPaper);
    setPaper(newPaper);
    virtualState.paper = newPaper;
    virtualState.exam = updatedExam;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      await updateExamOnUI()
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  const submitPaperHandler = async () => {
    setIsLoading(true)
    const cleanPaper = {
      ...paper
    }
    try {
      const { payload: nowExam } = await api.getExamByID(id)
      if (getExamStatus(nowExam) === 'ended') {
        message.error("Sorry exam ended you can't submit now")
        setSavedText("");
        return await updateExamOnUI();
      } else if(meGotBanned(nowExam, user)) {
        message.error("You got banned from this exam");
        setSavedText("");
        return await updateExamOnUI();
      }
      await api.updateExamPaperForStudent(id, cleanPaper)
      await updateExamOnUI()
      message.success('Submitted Successfully')
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const submitSilentPaperHandler = async () => {
    const cleanPaper = {
      ...virtualState.paper
    }
    try {
      const { payload: nowExam } = await api.getExamByID(id)
      if (getExamStatus(nowExam) === 'ended') {
        message.info("Exam ended");
        setSavedText("");
        await updateExamOnUI();
        return;
      } else if(meGotBanned(nowExam, user)) {
        message.error("You got banned from this exam");
        setSavedText("");
        await updateExamOnUI();
        return;
      }
      await api.updateExamPaperForStudent(id, cleanPaper)
      setSavedText('Saved a few seconds ago');
    } catch (err) {
      console.log(err)
      setSavedText('Error saving');
    }
  }

  const autoSubmitUpdateHandler = async (checked) => {
    setSwitchLoading(true);
    const { payload: newUser } = await api.updateUserByID(user._id, { autoSubmitPaper: checked });
    dispatch(setUserAction(newUser));
    setSwitchLoading(false);
  }

  useEffect(() => {
    if (user.autoSubmitPaper) {
      // console.log('Starting new one...........');
      updateExamOnUI();
      const interval = setInterval(async () => {
        if (
          virtualState.exam &&
          (
            getExamStatus(virtualState.exam) === 'ended' ||
            meGotBanned(virtualState.exam, user)
          )
        ) {
          setSavedText('');
          return clearInterval(interval);
        }
        setSavedText('Saving...');
        await submitSilentPaperHandler();
      }, 5000);
      return () => {
        // console.log('Killing prev one........');
        clearInterval(interval);
      }
    }
  }, [user.autoSubmitPaper])
  const isDisabled = getExamStatus(exam) !== 'running' || meGotBanned(exam, user) || isLoading;
  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="55px 1fr" gridGap="20px">
          <TileHeaderWrapper columns="1fr 1fr">
            <div>
              {hasBack &&
                <FontAwesomeIconWrapper
                  onClick={() => {
                    if (showingPaper) setShowingPaper(false)
                    else dispatch(goBack())
                  }}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </FontAwesomeIconWrapper>
              }
              <PageHeader>Exam</PageHeader>
              {meGotBanned(exam, user) && <RedText>Banned</RedText>}
            </div>
            {showingPaper &&
              <RightButtonWrapper>
                <Col rows="1fr 1fr" gridGap="3px" style={{width: "170px"}}>
                  <div>
                    <span style={{marginRight: '10px'}}>Auto submit: </span>
                    <Switch loading={switchLoading} disabled={isDisabled} checked={user.autoSubmitPaper} onChange={autoSubmitUpdateHandler} style={{ marginRight: '10px' }}/>
                  </div>
                  {user.autoSubmitPaper && <div>{savedText}</div>}
                </Col>
                
                <ButtonStyled disabled={isDisabled} type="primary" onClick={() => submitPaperHandler()}>
                  Submit
                </ButtonStyled>
              </RightButtonWrapper>
            }
          </TileHeaderWrapper>
          <TileBodyWrapper>
            {showingPaper && (
              <div>
                <QuestionPaper disabled={isDisabled} exam={exam} paper={paper} questions={exam.questions}/>
              </div>
            )}
            {!showingPaper && (
              <Row columns=".7fr .3fr">
                <Questions exam={exam} onShowingPaper={() => setShowingPaper(true)} questions={exam.questions}/>
                <Announcements announcements={announcements} />
              </Row>
            )}
          </TileBodyWrapper>

        </Container>
      </BodyWrapper>
      { isLoading && <Loading isLoading={isLoading} /> }
    </div>
  )
}
const mapStateToProps = state => ({
  user: state.login.user
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ExamPage)
