import CheckAuthentication from "../CheckAuthentication/CheckAuthentication";
import NavBar from "../NavBar/NavBar";
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../utitlities/api';
import styled from "styled-components";
import { Button, Input } from "antd";
import { students, questions, exams, courses } from "../../utitlities/dummy";
import { stFormatDate, getDuration } from "../../utitlities/common.functions";
import Questions from "./components/Questions";
import Participants from "./components/Participants";
import BannedParticipants from "./components/BannedParticipants";
import { Row, PageHeader, TileHeaderWrapper, RightButtonWrapper, HeaderRow, LabelWrapper, BodyRow } from "../styles/pageStyles";

const InputWrapper = styled(Input)`
  && {
    width: 100%;
  }
`;

const ButtonStyled = styled(Button)`
  height: 30px;
  margin-right: 10px;
`;

const ExamPage = ({ exam = exams[0], course = courses[0] }) => {
  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
          <TileHeaderWrapper>
            <PageHeader>Exam</PageHeader>
            <RightButtonWrapper>
              <ButtonStyled type="primary">
                Update Exam
              </ButtonStyled>
            </RightButtonWrapper>
          </TileHeaderWrapper>
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
                value={getDuration(exam.startDate, exam.endDate)}
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
              <TileHeaderWrapper>
                <LabelWrapper>Questions</LabelWrapper>
                <RightButtonWrapper>
                  <ButtonStyled type="primary">
                      Import
                    </ButtonStyled>
                    <ButtonStyled type="primary">
                      Create Question
                    </ButtonStyled>
                  </RightButtonWrapper>
                </TileHeaderWrapper>
              <Questions questions={questions} />
            </BodyRow>
            <BodyRow>
              <TileHeaderWrapper><LabelWrapper>Participants</LabelWrapper></TileHeaderWrapper>
              <Participants students={students} />
            </BodyRow>
            <BodyRow>
              <TileHeaderWrapper><LabelWrapper>Banned Participants</LabelWrapper></TileHeaderWrapper>
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