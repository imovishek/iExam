import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { stFormatDate, getDuration, getExamStatus } from "../../../../utitlities/common.functions";
import { LabelWrapper, RightButtonWrapper, Row } from "../../../styles/pageStyles";
import { Button, Input, Radio, Tooltip } from "antd";
import { useState, useEffect } from "react";
import MCQBody from "./MCQBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { questions } from "../../../../utitlities/dummy";

const SearchStyled = styled(Search)`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow: auto;
`;

const BodyWrapper = styled.div`
  overflow: auto;
  padding: 10px;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const TitleWrapper = styled.div`
  font-size: 20px;
  display: inline;
`;

const AddPadding = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const AnswerWrapper = styled.div`
  overflow: auto;
  max-height: 60px;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const HeaderWrapper = styled.div`
  font-weight: 600;
`

const QuestionWrapper = styled.div`
  margin-bottom: 20px;
  border: 1px solid #e6e2e2;
  padding-top: 10px;
  padding-left: 10px;
  border-radius: 3px;
`;

const MarksWraper = styled.div`
  color: #1e961e;
`;
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
`;
const InlineBlock = styled.div`
  margin-left: 10px;
  margin-bottom: 30px;
`
const getName = obj => `${obj.firstName} ${obj.lastName}`
const SingleQuestion = ({
  disabled,
  question,
  index,
  answer,
  exam,
  setAnswerValue,
  marks,
}) => {
  const status = getExamStatus(exam);
  const isEditing = status === "running";
  const isBroad = question.type === "broad";
  const isMCQ = question.type === "mcq";
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
          { isBroad ? 
            <BroadBodyWrapper dangerouslySetInnerHTML={{ __html: question.body }} /> :
            <MCQBodyWrapper> { question.body }</MCQBodyWrapper>
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
              <Input.TextArea disabled={disabled} style={{width: '500px'}} value={answer} onChange={(e) => {}} rows={4} />
            }
            { !isEditing &&
              <div dangerouslySetInnerHTML={{ __html: answer }} />
            }
          </AddPadding>
        </BodyWrapper>
      )}
      <InlineBlock>
        <Input
          style={{ width: 100 }}
          value={marks}
          onChange={(e) => setAnswerValue(index, 'marks', e.target.value)}
          placeholder="Set Marks"
        /> {
          isMCQ && <Tooltip title="Evaluate">
            <FontAwesomeIcon style={{display: 'inline', cursor: 'pointer', marginLeft: '10px'}} icon={faSyncAlt} size="lg" color="green"
              onClick={() => {
                if (question.options[Number(answer)].isAnswer) {
                  setAnswerValue(index, 'marks', question.marks);
                } else {
                  setAnswerValue(index, 'marks', 0);
                }
              }}
            />
          </Tooltip>
        }
      </InlineBlock>
    </QuestionWrapper>
  );
};
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
  setPaper
}) => {
  const [answers, setAnswers] = useState(paper.answers);
  const setAnswerValue = (index, key, value) => {
    const newAnswers = [...answers];
    newAnswers[index][key] = value;
    if (key === 'marks') {
      const totalMarks = _.reduce(paper.answers, (sum, answer) => sum+Number(answer.marks || '0'), 0);
      console.log('hi', totalMarks);
      setPaper({ ...paper, totalMarks });
    }
    setAnswers(newAnswers);
  }
  useEffect(() => {
    setAnswers(paper.answers)
  }, [paper])
  console.log('here', paper);
  if (paper && paper.questions && paper.questions.length === 0) {
    return <NoData>Did not answer any questions :( </NoData>
  }
  return (
    <Container>
      {_.map(answers, (answer, index) => <SingleQuestion disabled={disabled} index={index} setAnswerValue={setAnswerValue} exam={exam} question={answer.question} answer={answer.answer} marks={answer.marks} />)}
    </Container>
  );
};

export default QuestionPaper;
