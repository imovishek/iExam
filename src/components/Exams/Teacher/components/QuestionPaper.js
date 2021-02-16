import styled from 'styled-components'
import _ from 'underscore'
import { getExamStatus } from '../../../../utitlities/common.functions'
import { Input, Tooltip, Button } from 'antd'
import { useState, useEffect } from 'react'
import MCQBody from './MCQBody'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../../Common/Loading'
import { RightButtonWrapper } from '../../../styles/pageStyles'
import { push } from 'connected-react-router'
import { Row } from '../../../../utitlities/styles'
import { connect } from 'react-redux'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow: auto;
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
const InlineBlock = styled.div`
  margin-left: 10px;
  margin-bottom: 30px;
`;

const SingleQuestion = ({
  disabled,
  question = {},
  index,
  answer,
  exam,
  setAnswerValue,
  marks,
  noMarks = false,
  isShowingEditButton,
  dispatch
}) => {
  const status = getExamStatus(exam)
  const isEditing = status === 'running'
  const isBroad = question.type === 'broad'
  const isMCQ = question.type === 'mcq'
  return (
    <QuestionWrapper>
      <HeaderWrapper>
        <Row columns="1fr 1fr">
          <TitleWrapper> {question.title} </TitleWrapper>
          {isShowingEditButton &&
            <RightButtonWrapper>
              <Button
                onClick={() =>
                  dispatch(push(`/exam/${exam._id}/question/${question._id}`))
                }
                style={{ marginRight: '10px' }}
              >
                Edit
              </Button>
            </RightButtonWrapper>
          }
        </Row>
        
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
            <Input.TextArea disabled={!isEditing || disabled} style={{ width: '500px' }} value={answer} onChange={(e) => {}} rows={4} />
          </AddPadding>
        </BodyWrapper>
      )}

      {!noMarks &&
        <InlineBlock>
          <Input
            style={{ width: 100 }}
            value={marks}
            onChange={(e) => setAnswerValue(index, 'marks', e.target.value)}
            placeholder="Set Marks"
          /> {
            isMCQ && <Tooltip title="Evaluate">
              <FontAwesomeIcon
                style={{ display: 'inline', cursor: 'pointer', marginLeft: '10px' }} icon={faSyncAlt} size="lg" color="green"
                onClick={() => {
                  if (question.options[Number(answer)].isAnswer) {
                    setAnswerValue(index, 'marks', question.marks)
                  } else {
                    setAnswerValue(index, 'marks', 0)
                  }
                }}
              />
            </Tooltip>
          }
        </InlineBlock>
      }
    </QuestionWrapper>
  )
}
const NoData = styled.div`
  font-size: 24px;
  color: #9a9a9a;
  display: flex;
  justify-content: center;
  align-items: center;
`
const QuestionPaper = ({
  disabled = true,
  exam,
  paper,
  setPaper,
  isLoading,
  questions,
  viewQuestions = false,
  dispatch
}) => {
  const [answers, setAnswers] = useState(paper.answers)
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
  }, [paper, paper.answers])

  const setAnswerValue = (index, key, value) => {
    const newAnswers = [...answers]
    newAnswers[index][key] = value
    if (key === 'marks') {
      const totalMarks = _.reduce(paper.answers, (sum, answer) => sum + Number(answer.marks || '0'), 0)
      setPaper({ ...paper, totalMarks })
    }
    setAnswers(newAnswers)
  }
  const didNotAnswer = 'Did not answer any questions :(';
  const noQuestions = 'No questions set';
  if (!isLoading && paper && paper.answers && paper.answers.length === 0) {
    return <NoData>{ viewQuestions ? noQuestions : didNotAnswer }</NoData>
  }
  if (viewQuestions)
    return (
      <Container>
        {isLoading && <Loading isLoading={isLoading}/>}
        {_.map(questions, (question, index) => (
          <SingleQuestion
            disabled={disabled}
            index={index}
            setAnswerValue={() => {}}
            exam={exam}
            question={question}
            answer=''
            marks=''
            noMarks={true}
            isShowingEditButton={viewQuestions}
            dispatch={dispatch}
          />
        ))}
      </Container>
    );
  
  return (
    <Container>
      {isLoading && <Loading isLoading={isLoading}/>}
      {_.map(answers, (answer, index) => (
        <SingleQuestion
          disabled={disabled}
          index={index}
          setAnswerValue={setAnswerValue}
          exam={exam}
          question={questionsObj[answer.questionID]}
          answer={answer.answer}
          marks={answer.marks}
          dispatch={dispatch}
        />
      ))}
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(null, mapDispatchToProps)(QuestionPaper);
