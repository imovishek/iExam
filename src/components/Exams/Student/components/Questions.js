import styled from "styled-components";
import _ from "underscore";
import {
  getExamTimeStatus,
  getExamStatus,
} from "../../../../utitlities/common.functions";
import {
  RightButtonWrapper,
  TileHeaderWrapper,
} from "../../../styles/pageStyles";
import { AwesomeIcon, ButtonStyled } from "../../../../utitlities/styles";
import { isAnswered } from "../../../../utitlities/constants";
import { useEffect, useState } from "react";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { push } from "connected-react-router";
import { connect } from "react-redux";

const Container = styled.div`
  border-radius: 8px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  height: calc(100vh - 200px);
  min-height: 260px;
  min-width: 500px;
`;

const Body = styled.div`
  overflow: auto;
  height: calc(100vh - 300px);
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const HeaderLabel = styled.div`
  color: grey;
  padding: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  padding: 10px;
  text-overflow: ellipsis;
  height: 50px;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${(props) => props.columns || "auto"};
  user-select: none;
  border-radius: 6px;
  cursor: pointer;
  :hover {
    background: #96c1c1;
    color: black;
  }
`;

const HeaderRow = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${(props) => props.columns || "auto"};
  border-radius: 8px;
  user-select: none;
`;

const CenterTextWrapper = styled.h1`
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = ({ question, isAnswered, dispatch, examID }) => (
  <Row columns="repeat(2, 1fr) 100px 40px" onClick={() => dispatch(push(`/exam/${examID}/answer?top=${question._id}`))}>
    <Wrapper>{question.title}</Wrapper>
    <Wrapper>{question.type}</Wrapper>
    <Wrapper>{question.marks}</Wrapper>
    {isAnswered && <AwesomeIcon />}
  </Row>
);

const Questions = ({ exam, questions = [], onShowingPaper, paper, dispatch }) => {
  const answersObj = {};
  (paper.answers || []).map(answer => (answersObj[answer.questionID] = answer.answer));
  const status = getExamStatus(exam);
  const shouldRevealQuestions = (status || '').toLowerCase() === 'ended' || (status || '').toLowerCase() === 'running'
  if (!shouldRevealQuestions) {
    return(
      <Container rows="70px 70px 1fr 15px">
        <CenterTextWrapper>Exam will start soon</CenterTextWrapper>
      </Container>
    );
  }
  return (
    <Container rows="70px 70px 1fr 15px">
      <TileHeaderWrapper columns="1fr 1fr" gridGap="20px">
        <div>Total {questions.length} questions</div>

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
