import styled from 'styled-components'
import _ from 'underscore'
import { getExamStatus } from '../../../../utitlities/common.functions'
import { Input } from 'antd'
import React, { useState, useEffect } from 'react'
import MCQBody from './MCQBody'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const BodyWrapper = styled.div`
  overflow: auto;
  padding: 10px;
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const TitleWrapper = styled.div`
  font-size: 20px;
  display: inline;
`

const AddPadding = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const HeaderWrapper = styled.div`
  font-weight: 600;
`

const QuestionWrapper = styled.div`
  margin-bottom: 20px;
  border: 1px solid #e6e2e2;
  padding-top: 10px;
  padding-left: 10px;
  border-radius: 3px;
`

const MarksWraper = styled.div`
  color: #1e961e;
`
const BroadBodyWrapper = styled.div`

`
const MCQBodyWrapper = styled.div`
  font-size: 18px;
`
export const RadioWrapper = styled.div`
  padding: 5px;
  width: 50%;
  margin-bottom: 10px;
  border: 1px solid #b3b3b3;
`

const SingleQuestion = ({
  disabled,
  question = {},
  index,
  answer,
  exam,
  setAnswerValue
}) => {
  const status = getExamStatus(exam)
  const isEditing = status === 'running'
  const isBroad = question.type === 'broad'
  const isMCQ = question.type === 'mcq'
  return (
    <QuestionWrapper>
      <HeaderWrapper>
        <TitleWrapper> {question.title} </TitleWrapper>
        <MarksWraper>
          Marks: {question.marks}
        </MarksWraper>

      </HeaderWrapper>

      <BodyWrapper>
        <AddPadding>
          { isBroad
            ? <BroadBodyWrapper dangerouslySetInnerHTML={{ __html: question.body }} />
            : <MCQBodyWrapper> { question.body }</MCQBodyWrapper>
          }

        </AddPadding>
      </BodyWrapper>
      {isMCQ && (
        <BodyWrapper>
          <AddPadding>
            <MCQBody disabled={disabled} answer={answer} options={question.options} setAnswerValue={(v) => setAnswerValue(index, 'answer', v)}/>
          </AddPadding>
        </BodyWrapper>
      )}
      {isBroad && (
        <BodyWrapper>
          <AddPadding>
            { isEditing &&
              <Input.TextArea disabled={disabled} style={{ width: '500px' }} value={answer} onChange={(e) => setAnswerValue(index, 'answer', e.target.value)} rows={4} />
            }
            { !isEditing &&
              <div dangerouslySetInnerHTML={{ __html: answer }} />
            }
          </AddPadding>
        </BodyWrapper>
      )}
    </QuestionWrapper>
  )
}

const QuestionPaper = ({
  disabled,
  exam,
  paper,
  questions
}) => {
  const [answers, setAnswers] = useState(paper.answers)
  const setAnswerValue = (index, key, value) => {
    const newAnswers = [...answers]
    newAnswers[index][key] = value
    setAnswers(newAnswers)
  }

  const [questionsObj, setQuestionsObj] = useState({})
  useEffect(() => {
    const newQuestionsObj = {}
    _.forEach(questions, question => {
      newQuestionsObj[question._id] = question
    })
    setQuestionsObj(newQuestionsObj)
  }, [questions])

  useEffect(() => {
    setAnswers(paper.answers)
  }, [paper.answers])

  return (
    <Container>
      {_.map(answers, (answer, index) => <SingleQuestion key={index} disabled={disabled} index={index} setAnswerValue={setAnswerValue} exam={exam} question={questionsObj[answer.questionID]} answer={answer.answer} />)}
    </Container>
  )
}

export default QuestionPaper
