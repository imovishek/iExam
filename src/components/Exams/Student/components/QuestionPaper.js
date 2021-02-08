import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { stFormatDate, getDuration } from "../../../../utitlities/common.functions";
import { LabelWrapper, RightButtonWrapper } from "../../../styles/pageStyles";
import { Button } from "antd";

const SearchStyled = styled(Search)`
  width: 100%;
`;

const Container = styled.div`
  border-radius: 8px;
  padding: 10px;
`;

const BodyWrapper = styled.div`
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
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
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const AnswerWrapper = styled.div`
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  max-height: 60px;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const getName = obj => `${obj.firstName} ${obj.lastName}`
const SingleQuestion = ({
  question,
  answer
}) => {
  return (
    <div>
      <div>
        <Button style={{marginRight: '10px'}}>Previous</Button> <Button>Next</Button>
        <div style={{height: '20px'}}></div>
        <TitleWrapper> {question.title} </TitleWrapper>
        <RightButtonWrapper> Marks: {question.marks}</RightButtonWrapper>
      </div>

      
      <BodyWrapper> 
        <AddPadding>
          <div dangerouslySetInnerHTML={{ __html: question.body }} />
        </AddPadding>
      </BodyWrapper>
      <LabelWrapper>
        Your answer:
      </LabelWrapper>
      <BodyWrapper> 
        <AddPadding>
          <div dangerouslySetInnerHTML={{ __html: answer.join(" ") }} />
        </AddPadding>
      </BodyWrapper>
    </div>
  );
};

const QuestionPaper = ({
  paper
}) => {
  const { answers } = paper;
  console.log(answers)
  return (
    <Container>
      {_.map(answers, answer => <SingleQuestion question={answer.question} answer={answer.answer} />)}
    </Container>
  );
};

export default QuestionPaper;
