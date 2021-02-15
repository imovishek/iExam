import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { connect } from 'react-redux'
import _ from 'underscore'
import { BodyWrapper, Container } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import styled from 'styled-components'
import { Button, message } from 'antd'
import { getExamStatus } from '../../../utitlities/common.functions'
import { useParams } from 'react-router'
import { goBack } from 'connected-react-router'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PageHeader, TileHeaderWrapper, RightButtonWrapper } from '../../styles/pageStyles'
import QuestionPaper from './components/QuestionPaper'
import Loading from '../../Common/Loading'
import Students from './components/Students'

const ButtonStyled = styled(Button)`
  height: 30px;
  margin-left: 10px;
`

const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`


const TileBodyWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 300px 1fr;
  height: calc(100vh - 120px);
  background: #f9f9f9;
`

const EvaluatePaper = ({ dispatch, user, hasBack = true }) => {
  const { examID, studentID } = useParams()
  if (!studentID || !examID) dispatch(goBack())
  const [isLoading, setIsLoading] = useState(true)
  const [exam, setExam] = useState({})
  const [paper, setPaper] = useState({})

  const updateExamOnUI = async () => {
    if (studentID === 'arena') {
      setPaper({ questions: [] })
      let { payload = {} } = await api.getExamByID(examID)
      if (!payload) payload = {}
      setExam(payload)
      return
    }
    const { payload = {} } = await api.getExamByIDWithPaper(examID, studentID)
    const { exam, paper } = payload
    setExam(exam)
    setPaper(paper ? { ...paper } : { answers: [] })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setIsLoading(true)
    try {
      await updateExamOnUI()
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [examID, studentID])

  const submitPaperEvaluationHandler = async () => {
    setIsLoading(true)
    const totalMarks = _.reduce(paper.answers, (sum, answer) => sum + Number(answer.marks || '0'), 0)

    const cleanPaper = {
      ...paper,
      totalMarks
    }
    try {
      await api.updateExamPaperForTeacher(examID, cleanPaper)
      await updateExamOnUI()
      message.success('Submitted Successfully')
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <CheckAuthentication />
      { isLoading && <Loading isLoading={isLoading} /> }
      <BodyWrapper>
        <NavBar />
        <Container rows="55px 1fr">
          <TileHeaderWrapper columns="1fr 1fr">
            <div>
              {hasBack &&
                <FontAwesomeIconWrapper
                  onClick={() => {
                    dispatch(goBack())
                  }}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </FontAwesomeIconWrapper>
              }
              <PageHeader>Exam</PageHeader>
            </div>
            <RightButtonWrapper>
              {(paper.answers && paper.answers.length !== 0) && <span>Total Marks {paper.totalMarks} </span>}
              <ButtonStyled
                disabled={!(paper.answers && paper.answers.length !== 0)}
                type="primary" onClick={submitPaperEvaluationHandler}>
                Submit Evaluation
              </ButtonStyled>
            </RightButtonWrapper>
          </TileHeaderWrapper>
          <TileBodyWrapper>
            <Students
              participants={exam.participants}
              exam={exam}
              showingStudentType="participants"
              updateExamOnUI={updateExamOnUI}
            />
            <QuestionPaper
              isLoading={isLoading}
              setPaper={setPaper}
              disabled={getExamStatus(exam) === 'ended'}
              exam={exam}
              paper={paper}
              questions={exam.questions}
            />
          </TileBodyWrapper>

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

export default connect(mapStateToProps, mapDispatchToProps)(EvaluatePaper)
