import CheckAuthentication from "../CheckAuthentication/CheckAuthentication";
import NavBar from "../NavBar/NavBar";
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../utitlities/api';
import { onUpdateQuestionPage } from "./actions";
import styled from "styled-components";
import QuestionTable from "./QuestionTable";
import { Button, Input } from "antd";
import CreateEditQuestionModal from "./CreateEditQuestionModal";
import Exams from "./components/Exams";
import { students, exams, questions } from "../../utitlities/dummy";
import { getDuration, stFormatDate } from "../../utitlities/common.functions";
import QuestionBody from "./components/QuestionBody";
import QuestionAccess from "./components/QuestionAccess";

const Row = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: ${props => props.columns || 'auto'};
`;

const HeaderRow = styled.div`
  height: 90px;
`;

const BodyRow = styled.div`
  padding: 10px;
  height: calc(100vh - 240px);
  margin-bottom: 20px;
  margin-top: 30px;
  border: 1px solid rgba(10, 10, 10, 0.3);
`;

const QuestionBodyRow = styled.div`
  padding: 10px;
  height: 500px;
  margin-bottom: 20px;
  margin-top: 30px;
  border: 1px solid rgba(10, 10, 10, 0.3);
`;

const LabelWrapper = styled.div`
  color: grey;
  margin-bottom: 10px;
`;
const ExamsHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  justify-content: space-between;
`;
const ExamButtonWrapper = styled.div`
  float: right;
`;

const PageHeader = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #828b94;
  user-select: none;
`;

const InputWrapper = styled(Input)`
  && {
    width: 100%;
  }
`;

const ButtonStyled = styled(Button)`
  height: 30px;
`;

const getName = obj => `${obj.firstName} ${obj.lastName}`;

const QuestionPage = ({ question = questions[0] }) => {
  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
          <ExamsHeaderWrapper>
            <PageHeader>Question</PageHeader>
            <ExamButtonWrapper>
              <ButtonStyled type="primary">
                Update Question
              </ButtonStyled>
            </ExamButtonWrapper>
          </ExamsHeaderWrapper>
          <Row columns="1fr 1fr 1fr 150px">
            <HeaderRow>
              <LabelWrapper>Title</LabelWrapper>
              <InputWrapper
                value={question.title}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Question Type</LabelWrapper>
              <InputWrapper
                value={question.type}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Author</LabelWrapper>
              <InputWrapper
                value={ question.authorID || 'Anonymous'}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Marks</LabelWrapper>
              <InputWrapper
                value={question.marks}
              />
            </HeaderRow>

          </Row>
          <Row columns="1fr">
            <QuestionBodyRow>
              <LabelWrapper>Body</LabelWrapper>
              <QuestionBody question={question} />
            </QuestionBodyRow>
          </Row>
          <Row columns="1fr 1fr">
            <BodyRow>
              <ExamsHeaderWrapper>
                <PageHeader>Access</PageHeader>
                <ExamButtonWrapper>
                  <ButtonStyled type="primary">
                    Add Access
                  </ButtonStyled>
                </ExamButtonWrapper>
              </ExamsHeaderWrapper>
              <QuestionAccess  />
            </BodyRow>
            {/* <BodyRow>
              <ExamsHeaderWrapper>
                <LabelWrapper>Exams</LabelWrapper>
                <ExamButtonWrapper>
                  <ButtonStyled type="primary">
                    Create Exam
                  </ButtonStyled>
                </ExamButtonWrapper>
              </ExamsHeaderWrapper>
              <Exams exams={exams} />
            </BodyRow> */}
          </Row>
        </Container>
      </BodyWrapper>
    </div>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    dispatch
});

  
export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);