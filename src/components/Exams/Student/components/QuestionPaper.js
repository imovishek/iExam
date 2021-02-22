import styled from 'styled-components'
import _ from 'underscore'
import { getExamStatus } from '../../../../utitlities/common.functions'
import { Input, Select, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import MCQBody from './MCQBody'
import { sortArrayByMap } from '../../../../utitlities/constants'
import { LabelWrapper } from '../../../styles/pageStyles'
const { Option } = Select;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: calc(100% - 40px);
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

const SelectStyled = styled(Select)`
  margin-bottom: 20px;
  width: 250px;
  margin-right: 10px;
`
const BroadAnswer = styled.pre`
  border: 1px solid #888888;
  box-shadow: 0px 0px 3px 0px;
  margin: 3px;
  padding: 10px;
  font-size: 14px;
`;

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
            <MCQBody isEditing={isEditing} answer={answer} options={question.options} setAnswerValue={(v) => setAnswerValue(index, 'answer', `${v}`)}/>
          </AddPadding>
        </BodyWrapper>
      )}
      {isBroad && (
        <BodyWrapper>
          <LabelWrapper>Answer:</LabelWrapper>
          <AddPadding>
            { isEditing &&
              <Input.TextArea disabled={disabled} style={{ width: '500px' }} value={answer} onChange={(e) => setAnswerValue(index, 'answer', e.target.value)} rows={4} />
            }
            { !isEditing &&
              <BroadAnswer>{answer}</BroadAnswer>  
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
  setPaper,
  questions
}) => {
  const [answers, setAnswers] = useState(paper.answers)
  const [sortType, setSortType] = useState(null);

  const setAnswerValue = (index, key, value) => {
    const newAnswers = [...answers]
    newAnswers[index][key] = value
    setPaper({
      ...paper,
      answers: newAnswers,
    });
    setAnswers(newAnswers)
  }

  const [questionsObj, setQuestionsObj] = useState({})
  useEffect(() => {
    const newQuestionsObj = {}
    _.forEach(questions, question => {
      newQuestionsObj[question._id] = question
    })
    // if (sortType && sortArrayByMap[sortType]) {
    //   const newAnswers = [...paper.answers];
    //   const sortedAnswers = sortArrayByMap[sortType](newAnswers, newQuestionsObj);
    //   setAnswers(sortedAnswers);
    // }
    setQuestionsObj(newQuestionsObj)
  }, [questions])
  const sortingTypes = {
    random: "Shuffle",
    marksASC: "Marks Ascending",
    marksDESC: "Marks Descending",
    mcqFirst: "MCQ First",
    questionTitle: "Question Title",
    unAnsweredFirst: "Unanswered First",
    answeredFirst: "Answered First",
  };
  return (
    <>
      <SelectStyled
        placeholder="Sort By"
        value={sortType}
        onChange={(v) => {
          setSortType(v);
        }}
      >
        {
          _.map(sortingTypes, (v, type) =>
            <Option key={type} value={type}>{sortingTypes[type]}</Option>
          )
        }
      </SelectStyled>
      <Button
        onClick={() => {
          if (sortArrayByMap[sortType]) {
            const newAnswers = [...answers];
            const sortedAnswers = sortArrayByMap[sortType](newAnswers, questionsObj);
            setAnswers(sortedAnswers);
          }
        }}
      >
        Sort
      </Button>
      <Container>
        {_.map(answers, (answer, index) => <SingleQuestion key={index} disabled={disabled} index={index} setAnswerValue={setAnswerValue} exam={exam} question={questionsObj[answer.questionID]} answer={answer.answer} />)}
      </Container>
    </>
    
  )
}

export default QuestionPaper
