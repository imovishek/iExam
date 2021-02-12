import CheckAuthentication from "../../CheckAuthentication/CheckAuthentication";
import NavBar from "../../NavBar/NavBar";
import { connect } from "react-redux";
import _ from 'underscore';
import { BodyWrapper, Container } from "../../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../../utitlities/api';
import styled from "styled-components";
import moment from 'moment';
import { Button, Input, Select, DatePicker, message } from "antd";
import { getDuration, deepCopy, getObjectByAddingID, getExamStatus } from "../../../utitlities/common.functions";
import { useParams } from "react-router";
import { goBack } from "connected-react-router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, PageHeader, TileHeaderWrapper, RightButtonWrapper, HeaderRow, LabelWrapper, BodyRow } from "../../styles/pageStyles";
import { exams, announcements, questions } from "../../../utitlities/dummy";
import QuestionPaper from "./components/QuestionPaper";
import Questions from "./components/Questions";
import Announcements from "./components/Announcements";
import Loading from "../../Common/Loading";
const { Option } = Select;

const InputWrapper = styled(Input)`
  && {
    width: 100%;
  }
`;

const ButtonStyled = styled(Button)`
  height: 30px;
`;

const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`;

const SelectStyled = styled(Select)`
  width: 100%;
`;

const TileBodyWrapper = styled.div`
  overflow: auto;
  height: calc(100vh - 120px);
  background: #f9f9f9;
`

const getNameWithShort = obj => `${obj.firstName} ${obj.lastName} (${obj.shortName || ''})`;

const ExamPage = ({ dispatch, user, hasBack = true }) => {
  
  const { id } = useParams();
  if (!id) dispatch(goBack());
  const [isLoading, setIsLoading] = useState(true);
  const [exam, setExam] = useState({});
  const [teachers, setTeachers] = useState({});
  const [showingPaper, setShowingPaper] = useState(false);
  const [paper, setPaper] = useState({})
  const { departmentName } = user.department || {};
  
  const createPaperForMe = (exam, newPaper) => {
    const answerObj = {};
    _.map(newPaper.answers, answer => {
      answerObj[answer.questionID] = {
        answer: answer.answer,
        marks: answer.marks,
      }
    });
    newPaper.answers = _.map(exam.questions, question => ({
        questionID: question._id,
        answer: (answerObj[question._id] || {}).answer || '',
        marks: (answerObj[question._id] || {}).marks || 0,
      })
    );
    return newPaper;
  };
  const updateExamOnUI = async () => {
      const { payload = {} } = await api.getExamByIDWithPaper(id);
      const { exam: updatedExam, paper: updatedPaper } = payload;
      const { payload: fetchedTeachers = [] } = await api.getTeachers({});
      setExam(updatedExam);
      setPaper(createPaperForMe(updatedExam, updatedPaper))
      setTeachers(fetchedTeachers);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      await updateExamOnUI();
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const submitPaperHandler = async () => {
    setIsLoading(true);
    const cleanPaper = {
      ...paper
    };
    try {
      const { payload: nowExam } = await api.getExamByID(id);
      if (getExamStatus(nowExam) === "ended") {
        await updateExamOnUI();
        return message.error("Sorry exam ended you can't submit now")
      }
      await api.updateExamPaperForStudent(id, cleanPaper);
      await updateExamOnUI();
      message.success('Submitted Successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
          { isLoading && <Loading isLoading={isLoading} /> }
          <TileHeaderWrapper>
            <div>
              {hasBack &&
                <FontAwesomeIconWrapper onClick={() => {
                  if (showingPaper) setShowingPaper(false);
                  else dispatch(goBack());
                }}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </FontAwesomeIconWrapper>
              }
              <PageHeader>Exam</PageHeader>
            </div>
              {showingPaper &&
                <RightButtonWrapper>
                  <ButtonStyled disabled={getExamStatus(exam) === "ended" || isLoading} type="primary" onClick={() => submitPaperHandler()}>
                    Submit
                  </ButtonStyled>
                </RightButtonWrapper>
              }
          </TileHeaderWrapper>
          <TileBodyWrapper>
            {showingPaper && (
              <div>
                <QuestionPaper disabled={getExamStatus(exam) === "ended"} exam={exam} paper={paper} questions={exam.questions}/>
              </div>
            )}
            {!showingPaper && (
              <Row columns=".7fr .3fr">
                <Questions exam={exam} onShowingPaper={() => setShowingPaper(true)} questions={exam.questions}/>
                <Announcements announcements={announcements} />
              </Row>
            )}
          </TileBodyWrapper>
          
          
        </Container>
      </BodyWrapper>
    </div>
  );
};
const mapStateToProps = state => ({
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

  
export default connect(mapStateToProps, mapDispatchToProps)(ExamPage);