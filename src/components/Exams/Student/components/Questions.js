import styled from "styled-components";
import _ from "underscore";
import {
  getExamStatus,
} from "../../../../utitlities/common.functions";
import {
  PageHeader,
  RightButtonWrapper,
  TileHeaderWrapper,
} from "../../../styles/pageStyles";
import { AwesomeIcon, ButtonStyled } from "../../../../utitlities/styles";
import { isAnswered } from "../../../../utitlities/constants";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { TableRowStyled } from "../../../styles/tableStyles";

const Container = styled.div`
  border-radius: 8px;
  padding: 20px;
  box-shadow: 3px 3px 15px #bbbbbb;
  height: calc(100vh - 160px);
  min-height: 460px;
  min-width: 436px;
  flex: 1;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const Body = styled.div`
  overflow: auto;
  height: calc(100vh - 300px);
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const HeaderLabel = styled.h2`
  padding: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  padding: 10px;
  text-overflow: ellipsis;
  height: 50px;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: ${(props) => props.columns || "auto"};
  border-radius: 8px;
  
`;

const CenterTextWrapper = styled.h1`
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = ({ question, isAnswered, dispatch, examID }) => (
  <TableRowStyled columns="repeat(2, 1fr) 100px 40px" onClick={() => dispatch(push(`/exam/${examID}/answer?top=${question._id}`))}>
    <Wrapper>{question.title}</Wrapper>
    <Wrapper>{question.type}</Wrapper>
    <Wrapper>{question.marks}</Wrapper>
    {isAnswered && <AwesomeIcon />}
  </TableRowStyled>
);

const Questions = ({ exam, questions = [], onShowingPaper, paper, dispatch, isLoading }) => {
  const answersObj = {};
  (paper.answers || []).map(answer => (answersObj[answer.questionID] = answer.answer));
  const status = getExamStatus(exam);
  const shouldRevealQuestions = (status || '').toLowerCase() === 'ended' || (status || '').toLowerCase() === 'running'
  if (!shouldRevealQuestions && !isLoading) {
    return(
      <Container rows="70px 70px 1fr 15px">
        <CenterTextWrapper>Exam will start soon</CenterTextWrapper>
      </Container>
    );
  }
  return (
    <Container rows="70px 70px 1fr 15px">
      <TileHeaderWrapper columns="1fr 1fr" gridGap="20px">
        <PageHeader>Total {questions.length} questions</PageHeader>

        <RightButtonWrapper>
          {getExamStatus(exam) !== "upcoming" && (
            <ButtonStyled
              disabled={questions.length === 0}
              onClick={() => onShowingPaper()}
              type="primary"
            >
              {getExamStatus(exam) === "ended"
                ? "View Questions"
                : "Answer Questions"}
            </ButtonStyled>
          )}
        </RightButtonWrapper>
      </TileHeaderWrapper>
      {getExamStatus(exam) !== "upcoming" && (
        <>
          <HeaderRow columns="repeat(2, 1fr) 100px 40px">
            <HeaderLabel>Title</HeaderLabel>
            <HeaderLabel>Type</HeaderLabel>
            <HeaderLabel>Marks</HeaderLabel>
          </HeaderRow>
          <Body>
            {_.map(questions, (question, index) => (
              <Card
                key={`question_${index}`}
                question={question}
                isAnswered={!!isAnswered(answersObj[question._id])}
                dispatch={dispatch}
                examID={exam._id}
              />
            ))}
          </Body>
        </>
      )}
    </Container>
  );
}
const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(null, mapDispatchToProps)(Questions);
