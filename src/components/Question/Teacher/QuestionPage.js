import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { connect } from 'react-redux'
import { BodyWrapper, Container } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Input, Select, message } from 'antd'
import _ from 'underscore'
import QuestionBody from './components/QuestionBody'
import { Row, PageHeader, TileHeaderWrapper, RightButtonWrapper, HeaderRow, LabelWrapper } from '../../styles/pageStyles'
import { push, goBack } from 'connected-react-router'
import { deepCopy } from '../../../utitlities/common.functions'
import api from '../../../utitlities/api'
import { useParams } from 'react-router'
import MCQ from './components/MCQ'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../Common/Loading'

const { Option } = Select
const QuestionBodyRow = styled.div`
  padding: 10px;
  height: 500px;
  margin-bottom: 20px;
  margin-top: 30px;
  border: 1px solid rgba(10, 10, 10, 0.3);
`

const MCQRow = styled.div`
  padding: 10px;
  height: 500px;
  width: 800px;
  margin-bottom: 20px;
  margin-top: 30px;
  border: 1px solid rgba(10, 10, 10, 0.3);
`

const InputWrapper = styled(Input)`
  && {
    width: 100%;
  }
`

const ButtonStyled = styled(Button)`
  height: 30px;
  margin-right: 10px;
`

const getName = obj => `${obj.firstName} ${obj.lastName}`
const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`

const QuestionPage = ({ user, dispatch, hasBack = true }) => {
  const { examID, questionID } = useParams()
  if (!questionID) dispatch(goBack())
  const defaultQuestion = {
    title: '',
    authorID: user._id,
    type: 'mcq',
    marks: 10,
    department: user.department
  }
  const [question, setQuestion] = useState(deepCopy(defaultQuestion))
  const [errors, setErrors] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [teachersObj, setTeachersObj] = useState({})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { payload: teachers } = await api.getTeachers({})
    const obj = {}
    _.map(teachers, teacher => { obj[teacher._id] = getName(teacher) })
    setTeachersObj(obj)
  }, [question.authorID])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (questionID !== 'new') {
      try {
        const { payload: newQuestion } = await api.getQuestionByID(questionID)
        setQuestion({
          _id: newQuestion._id,
          title: newQuestion.title,
          authorID: newQuestion.authorID,
          type: newQuestion.type,
          marks: newQuestion.marks,
          department: newQuestion.department,
          options: newQuestion.options,
          answer: newQuestion.answer,
          body: newQuestion.body
        })
      } catch (err) {
        console.log(err)
        message.error('Cannot find the question')
        dispatch(push('/'))
      }
    }
  }, [questionID])

  const setValue = (key, value) => {
    const newQuestion = {
      ...question,
      [key]: value
    }
    const newErrors = {
      ...errors
    }
    delete newErrors[key]
    setQuestion(newQuestion)
    setErrors(newErrors)
  }

  const saveQuestionHandler = async () => {
    setLoading(true)
    const isCreate = questionID === 'new'
    try {
      if (questionID === 'new') {
        const { payload: newQuestion } = await api.createQuestion(question);
        setQuestion(newQuestion)
        if (examID) {
          await api.updateExam({ _id: examID }, { $push: { questions: newQuestion._id } })
          const { payload: exam } = await api.getExamByID(examID);
          const totalMarks = _.reduce(exam.questions, (sum, q) => (sum + q.marks), 0);
          await api.updateExam({ _id: examID }, { totalMarks });
        }
        await api.updateUserByID(user._id, { $push: { questionIDs: newQuestion._id } })
        message.success('Question Creation Successful!')
        dispatch(push(`${examID ? `/exam/${examID}` : ''}/question/${newQuestion._id}`))
      } else {
        await api.updateQuestion(question, question);
        if (examID) {
          const { payload: exam } = await api.getExamByID(examID);
          const totalMarks = _.reduce(exam.questions, (sum, q) => (sum + q.marks), 0);
          console.log(totalMarks, exam);
          await api.updateExam({ _id: examID }, { totalMarks });
        }
        message.success('Question Updated!')
      }
    } catch (err) {
      message.error(`Failed to ${isCreate ? 'create' : 'udpate'} this question please try again later!`)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
          {isLoading && <Loading isLoading={isLoading}/>}
          <TileHeaderWrapper>
            <div>
              {hasBack &&
                <FontAwesomeIconWrapper onClick={() => dispatch(goBack())}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </FontAwesomeIconWrapper>
              }
              <PageHeader>Question</PageHeader>
            </div>
            <RightButtonWrapper>
              <ButtonStyled type="primary" onClick={() => saveQuestionHandler()} disabled={isLoading}>
                Save
              </ButtonStyled>
              <ButtonStyled type="primary" onClick={() => dispatch(push('/question/new'))}>
                Create Another
              </ButtonStyled>
            </RightButtonWrapper>
          </TileHeaderWrapper>
          <Row columns="1fr 1fr 1fr 150px">
            <HeaderRow>
              <LabelWrapper>Title</LabelWrapper>
              <InputWrapper
                placeholder="Enter a title"
                value={question.title}
                onChange={(e) => setValue('title', e.target.value)}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Question Type</LabelWrapper>
              <Select
                style={{ width: '100%' }}
                placeholder="Select a status"
                value={question.type}
                onChange={(value) => setValue('type', value)}
              >
                <Option value="mcq">MCQ</Option>
                <Option value="broad">Broad</Option>
              </Select>
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Author</LabelWrapper>
              <InputWrapper
                disabled={true}
                value={ teachersObj[question.authorID] || 'Anonymous'}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Marks</LabelWrapper>
              <InputWrapper
                value={question.marks}
                onChange={(e) => setValue('marks', e.target.value)}
              />
            </HeaderRow>

          </Row>
          <Row columns="1fr">
            {question.type === 'broad' &&
              <QuestionBodyRow>
                <LabelWrapper>Body</LabelWrapper>
                <QuestionBody question={question} setQuestionValue={setValue} />
              </QuestionBodyRow>
            }
            {question.type === 'mcq' &&
              <MCQRow>
                <MCQ question={question} setQuestionValue={setValue} />
              </MCQRow>
            }
          </Row>
          <Row columns="1fr 1fr">
            {/* <BodyRow>
              <TileHeaderWrapper>
                <PageHeader>Access</PageHeader>
                <RightButtonWrapper>
                  <ButtonStyled type="primary">
                    Add Access
                  </ButtonStyled>
                </RightButtonWrapper>
              </TileHeaderWrapper>
              <QuestionAccess  />
            </BodyRow> */}
            {/* <BodyRow>
              <TileHeaderWrapper>
                <LabelWrapper>Exams</LabelWrapper>
                <RightButtonWrapper>
                  <ButtonStyled type="primary">
                    Create Exam
                  </ButtonStyled>
                </RightButtonWrapper>
              </TileHeaderWrapper>
              <Exams exams={exams} />
            </BodyRow> */}
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage)
