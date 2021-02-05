import CheckAuthentication from "../CheckAuthentication/CheckAuthentication";
import NavBar from "../NavBar/NavBar";
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../utitlities/api';
import styled from "styled-components";
import { Input } from "antd";
import { students, questions, exams, courses } from "../../utitlities/dummy";
import { stFormatDate, getDuration } from "../../utitlities/common.functions";
import Questions from "./components/Questions";
import Participants from "./components/Participants";
import BannedParticipants from "./components/BannedParticipants";

const Row = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: ${props => props.columns || 'auto'};
`;

const HeaderRow = styled.div`
  height: 100px;
`;

const BodyRow = styled.div`
  padding: 10px;
  height: calc(100vh - 340px);
  margin-bottom: 20px;
  border: 1px solid rgba(10, 10, 10, 0.3);
`;

const LabelWrapper = styled.div`
  color: grey;
  margin-bottom: 10px;
`;
const ExamsHeaderWrapper = styled.div`
  color: grey;
  margin-bottom: 10px;
  height: 30px;
  border-bottom: 1px solid rgba(10, 10, 10, 0.3);;
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

const ExamPage = ({ exam = exams[0], course = courses[0] }) => {
  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
          <PageHeader>Exam</PageHeader>
          <Row columns="auto auto auto">
            <HeaderRow>
              <LabelWrapper>Exam Title</LabelWrapper>
              <InputWrapper
                value={exam.title}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Course Title</LabelWrapper>
              <InputWrapper
                value={course.title}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Status</LabelWrapper>
              <InputWrapper
                value={exam.status}
              />
            </HeaderRow>
            <HeaderRow>
              <LabelWrapper>Start Date</LabelWrapper>
              <InputWrapper
                value={stFormatDate(exam.startDate)}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Duration</LabelWrapper>
              <InputWrapper
                value={`${getDuration(exam.startDate, exam.endDate)} minutes`}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Total Marks</LabelWrapper>
              <InputWrapper
                value={Number(exam.totalMarks).toFixed(0)}
              />
            </HeaderRow>
          </Row>

          <Row columns="1.2fr .7fr .7fr">
            <BodyRow>
              <LabelWrapper>Questions</LabelWrapper>
              <Questions questions={questions} />
            </BodyRow>
            <BodyRow>
              <LabelWrapper>Participants</LabelWrapper>
              <Participants students={students} />
            </BodyRow>
            <BodyRow>
              <ExamsHeaderWrapper>Banned Participants</ExamsHeaderWrapper>
              <BannedParticipants students={students} />
            </BodyRow>
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

  
export default connect(mapStateToProps, mapDispatchToProps)(ExamPage);