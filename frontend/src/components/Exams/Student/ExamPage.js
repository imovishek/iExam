import CheckAuthentication from "../../CheckAuthentication/CheckAuthentication";
import NavBar from "../../NavBar/NavBar";
import { connect } from "react-redux";
import _ from "underscore";
import {
  BodyWrapper,
  Container,
  Col,
  FlexWrapAround,
} from "../../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from "../../../utitlities/api";
import styled from "styled-components";
import { Button, message, Switch } from "antd";
import {
  getExamStatus,
  meGotBanned,
} from "../../../utitlities/common.functions";
import { useParams } from "react-router";
import { goBack, push } from "connected-react-router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  PageHeader,
  TileHeaderWrapper,
  RightButtonWrapper,
} from "../../styles/pageStyles";
import QuestionPaper from "./components/QuestionPaper";
import Questions from "./components/Questions";
import Loading from "../../Common/Loading";
import { setUserAction } from "../../Login/actions";
import { MATCHING } from "../../../utitlities/constants";
import ShowExamStatusTitle from "../Common/ShowExamStatusTitle";
import ClarificationOrAnnouncement from "./components/ClarificationOrAnnouncement";

const ButtonStyled = styled(Button)`
  height: 30px;
`;

const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`;

const TileBodyWrapper = styled.div`
  background: #ffffff;
`;
const RedText = styled.span`
  margin-left: 10px;
  color: red;
`;

const virtualState = {};
const ExamPage = ({ dispatch, user, hasBack = true }) => {
  const { id } = useParams();
  const showingPaper = window.location.pathname.match(/\/answer$/);
  if (!id) dispatch(goBack());
  const [isLoading, setIsLoading] = useState(true);
  const [exam, setExam] = useState({});
  const [paper, setPaper] = useState({});
  const [switchLoading, setSwitchLoading] = useState(false);
  const [savedText, setSavedText] = useState("");
  const [clarifications, setClarifications] = useState([]);
  const [clarificationsUpdated, setClarificationsUpdated] = useState({});
  const getAnswerFromOptions = ({ leftSide, rightSide }) => {
    const arr = [];
    const len = Math.max(leftSide.length, rightSide.length);
    for (let i = 0; i < len; i++) {
      const subarray = [];
      if (leftSide[i] && leftSide[i].id) subarray.push(leftSide[i].id);
      else subarray.push("");
      if (rightSide[i] && rightSide[i].id) subarray.push(rightSide[i].id);
      else subarray.push("");
      arr.push(subarray);
    }
    return JSON.stringify(arr);
  };
  const createPaperForMe = (exam, newPaper) => {
    const answerObj = {};
    _.map(newPaper.answers, (answer) => {
      answerObj[answer.questionID] = {
        answer: answer.answer,
        marks: answer.marks,
      };
    });
    const getParsedAnswer = (a) => {
      let b = [];
      try {
        b = JSON.parse(a);
      } catch (e) {}
      return b;
    };
    newPaper.answers = _.map(exam.questions, (question) => {
      let answer = (answerObj[question._id] || {}).answer;
      if (question.type === MATCHING) {
        if (
          question.type === MATCHING &&
          (!answer || getParsedAnswer(answer).length === 0)
        ) {
          answer = "";
        }
      }
      return {
        questionID: question._id,
        answer: answer,
        marks: (answerObj[question._id] || {}).marks || 0,
      };
    });
    return newPaper;
  };
  const updateExamOnUI = async () => {
    const { payload = {} } = await api.getExamByIDWithPaper(id);
    const { exam: updatedExam, paper: updatedPaper } = payload;
    setExam(updatedExam);
    const newPaper = createPaperForMe(updatedExam, updatedPaper);
    setPaper(newPaper);
    virtualState.paper = newPaper;
    virtualState.exam = updatedExam;
  };

  const setPaperHandler = (newPaper) => {
    setPaper(newPaper);
    virtualState.paper = newPaper;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      await updateExamOnUI();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(async () => {
    if (!id) return;
    try {
      const { payload: claries } = await api.getClarifications({
        examID: id,
      });
      const userIDsObj = {};
      _.forEach(claries, (clarie) => {
        if (clarie.userID) userIDsObj[clarie.userID] = true;
      });
      const { payload: newUsers } = await api.getUsers({
        userType: "student",
        _id: { $in: Object.keys(userIDsObj) },
      });
      _.forEach(newUsers, (user) => (userIDsObj[user._id] = user));
      _.forEach(claries, (clarie) => {
        clarie.user = userIDsObj[clarie.userID];
      });
      setClarifications(claries);
    } catch (e) {}
  }, [id, clarificationsUpdated]);
  const submitPaperHandler = async () => {
    setIsLoading(true);
    const cleanPaper = {
      ...paper,
    };
    try {
      await api.updateExamPaperForStudent(id, cleanPaper);
      await updateExamOnUI();
      message.success("Submitted Successfully");
    } catch (err) {
      message.error(err.response.data.message);
      dispatch(push(`/exam/${id}`));
      try {
        await updateExamOnUI();
      } catch (error) {}
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitSilentPaperHandler = async () => {
  //   const showingPaper = window.location.pathname.match(/\/answer$/);
  //   if (!showingPaper) return;
  //   const cleanPaper = {
  //     ...virtualState.paper,
  //   };
  //   console.log("virtualState.paper", cleanPaper, id);
  //   try {
  //     await api.updateExamPaperForStudent(id, cleanPaper);
  //     await updateExamOnUI();
  //     setSavedText("Saved a few seconds ago");
  //   } catch (err) {
  //     message.error(err.response.data.message);
  //     dispatch(push(`/exam/${id}`));
  //     try {
  //       await updateExamOnUI();
  //     } catch (error) {}
  //     console.log(err);
  //   }
  };

  const autoSubmitUpdateHandler = async (checked) => {
    setSwitchLoading(true);
    const { payload: newUser } = await api.updateUserMe({
      autoSubmitPaper: checked,
    });
    dispatch(setUserAction(newUser));
    setSwitchLoading(false);
  };
  const AUTO_SAVE_TIME_INTERVAL = 5000;
  // useEffect(() => {
  //   if (user.autoSubmitPaper) {
  //     // console.log('Starting new one...........');
  //     const interval = setInterval(async () => {
  //       if (
  //         virtualState.exam &&
  //         (getExamStatus(virtualState.exam) === "ended" ||
  //           meGotBanned(virtualState.exam, user))
  //       ) {
  //         setSavedText("");
  //         return clearInterval(interval);
  //       }
  //       setSavedText("Saving...");
  //       await submitSilentPaperHandler();
  //     }, AUTO_SAVE_TIME_INTERVAL);
  //     return () => {
  //       // console.log('Killing prev one........');
  //       clearInterval(interval);
  //     };
  //   }
  // }, [user.autoSubmitPaper]);
  const isDisabled =
    getExamStatus(exam) !== "running" || meGotBanned(exam, user) || isLoading;
  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="100px 1fr" gridGap="20px">
          <TileHeaderWrapper columns="1fr 1fr 1fr">
            <div>
              {hasBack && (
                <FontAwesomeIconWrapper onClick={() => dispatch(goBack())}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </FontAwesomeIconWrapper>
              )}
              <PageHeader>Exam</PageHeader>
              {meGotBanned(exam, user) && <RedText>Banned</RedText>}
            </div>
            <ShowExamStatusTitle exam={exam} />

            <div>
              {showingPaper && (
                <RightButtonWrapper>
                  <Col rows="1fr 1fr" gridGap="3px" style={{ width: "170px" }}>
                    <div>
                      <span style={{ marginRight: "10px" }}>Auto submit: </span>
                      <Switch
                        loading={switchLoading}
                        disabled={true}
                        checked={false}
                        onChange={autoSubmitUpdateHandler}
                        style={{ marginRight: "10px" }}
                      />
                    </div>
                    {user.autoSubmitPaper && <div>{}</div>}
                  </Col>

                  <ButtonStyled
                    disabled={isDisabled}
                    type="primary"
                    onClick={() => submitPaperHandler()}
                  >
                    Submit
                  </ButtonStyled>
                </RightButtonWrapper>
              )}
            </div>
          </TileHeaderWrapper>
          <TileBodyWrapper>
            {showingPaper && (
              <div style={{ height: "100%" }}>
                <QuestionPaper
                  disabled={isDisabled}
                  exam={exam}
                  paper={paper}
                  setPaper={setPaperHandler}
                  questions={exam.questions}
                />
              </div>
            )}
            {!showingPaper && (
              <FlexWrapAround>
                <Questions
                  paper={paper}
                  exam={exam}
                  onShowingPaper={() => dispatch(push(`/exam/${id}/answer`))}
                  questions={exam.questions}
                  isLoading={isLoading}
                />
                <ClarificationOrAnnouncement
                  exam={exam}
                  clarifications={clarifications}
                  setClarificationsUpdated={setClarificationsUpdated}
                />
              </FlexWrapAround>
            )}
          </TileBodyWrapper>
        </Container>
      </BodyWrapper>
      {isLoading && <Loading isLoading={isLoading} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamPage);
