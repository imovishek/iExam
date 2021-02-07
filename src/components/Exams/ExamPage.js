import CheckAuthentication from "../CheckAuthentication/CheckAuthentication";
import NavBar from "../NavBar/NavBar";
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../utitlities/api';
import styled from "styled-components";
import { Button, DatePicker, Input, Select } from "antd";
import { students, questions, exams, courses } from "../../utitlities/dummy";
import { stFormatDate, getDuration } from "../../utitlities/common.functions";
import Questions from "./components/Questions";
import Participants from "./components/Participants";
import BannedParticipants from "./components/BannedParticipants";
import { Row, PageHeader, TileHeaderWrapper, RightButtonWrapper, HeaderRow, LabelWrapper, BodyRow } from "../styles/pageStyles";
import { useParams } from "react-router";
import { goBack } from "connected-react-router";
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

const InputWrapper = styled(Input)`
  && {
    width: 100%;
  }
`;

const ButtonStyled = styled(Button)`
  height: 30px;
  margin-right: 10px;
`;
const SelectStyled = styled(Select)`
  width: 100%;
`;

const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`;
const ExamPage = ({ dispatch, user, hasBack = true }) => {
  const { id } = useParams();
  if (!id) dispatch(goBack());
  const [isLoading, setIsLoading] = useState(true);
  const [exam, setExam] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const { payload = {} } = await api.getExamByID(id);
      setExam(payload);
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const setValue = (key, value) => {
    const newExam = {
      ...exam,
      [key]: value
    };
    setExam(newExam);
  };
  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
          <TileHeaderWrapper>
            <div>
              {hasBack &&
                <FontAwesomeIconWrapper onClick={() => dispatch(goBack())}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </FontAwesomeIconWrapper>
              }
              <PageHeader>Exam</PageHeader>
            </div>
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
                onChange={(e) => setValue('title', e.target.value)}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Course Title</LabelWrapper>
              <InputWrapper
                value={exam.course ? exam.course.title : ''}
                disabled="true"
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Status</LabelWrapper>
              <SelectStyled
                value={exam.status ? exam.status.toLowerCase() : ''}
                onChange={(value) => setValue('status', value)}
              >
                <Option key="upcoming" value="upcoming"> Upcoming </Option>
                <Option key="running" value="running"> Running </Option>
                <Option key="ended" value="ended"> Ended </Option>
              </SelectStyled>
            </HeaderRow>
            <HeaderRow>
              <LabelWrapper>Start Date</LabelWrapper>
              <DatePicker
                allowClear
                placeholder="Start Date"
                value={!exam.startDate ? '' : moment(exam.startDate)}
                style={{ width: 270 }}
                format="DD/MM/YYYY"
                onChange={(d) => setValue('startDate', d)}
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
                onChange={(e) => setValue('totalMarks', e.target.value)}
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
              <Questions questions={exam.questions} />
            </BodyRow>
            <BodyRow>
              <LabelWrapper>Participants</LabelWrapper>
              <Participants students={exam.participants} />
            </BodyRow>
            <BodyRow>
              <TileHeaderWrapper>Banned Participants</TileHeaderWrapper>
              <BannedParticipants students={exam.bannedParticipants} />
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