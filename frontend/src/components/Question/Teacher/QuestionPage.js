import CheckAuthentication from "../../CheckAuthentication/CheckAuthentication";
import NavBar from "../../NavBar/NavBar";
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../../utitlities/styles";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, Select, message } from "antd";
import _ from "underscore";
import QuestionBody from "./QuestionBody";
import {
  Row,
  PageHeader,
  TileHeaderWrapper,
  RightButtonWrapper,
  HeaderRow,
  LabelWrapper,
} from "../../styles/pageStyles";
import { push, goBack } from "connected-react-router";
import { deepCopy } from "../../../utitlities/common.functions";
import api from "../../../utitlities/api";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Common/Loading";
import { questionTypes } from "../constants";
import QuestionAccess from "./components/QuestionAccess";
import Modal from "antd/lib/modal/Modal";
import { ANSWER_TYPES, BROAD } from "../../../utitlities/constants";
const { Option } = Select;
const QuestionBodyRow = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  margin-top: 30px;
  height: 100%;
  border: 1px solid rgba(10, 10, 10, 0.3);
`;

const InputWrapper = styled(Input)`
  && {
    width: 100%;
  }
`;

const ButtonStyled = styled(Button)`
  height: 30px;
`;

const getName = (obj) => `${obj.firstName} ${obj.lastName}`;
const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`;

const QuestionPage = ({ user, dispatch, hasBack = true }) => {
  const { examID, questionID } = useParams();
  if (!questionID) dispatch(goBack());
  const defaultQuestion = {
    title: "",
    authorID: user._id,
    type: "mcq",
    marks: 10,
    department: user.department,
    body: "",
    matchingOptions: {
      leftSide: [],
      rightSide: [],
    },
  };
  const [question, setQuestion] = useState(deepCopy(defaultQuestion));
  const [questionBody, setQuestionBody] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [teachersObj, setTeachersObj] = useState({});
  const [accessTeachers, setAccessTeachers] = useState([]);
  const [showAccessModal, setShowAcccessModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let obj = {};
    if (_.isEmpty(teachersObj)) {
      const { payload: teachers } = await api.getTeachers({});
      _.map(teachers, (teacher) => {
        obj[teacher._id] = teacher;
      });
      setTeachersObj(obj);
    } else {
      obj = teachersObj;
    }
    const accessTeachers = [];
    _.forEach(question.teacherAccess, (teacherID) =>
      accessTeachers.push(obj[teacherID])
    );
    setAccessTeachers(accessTeachers);
    console.log(obj);
  }, [question.authorID, question.teacherAccess]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (questionID !== "new") {
      setLoading(true);
      try {
        const { payload: newQuestion } = await api.getQuestionByID(questionID);
        setQuestion({ ...newQuestion });
        setQuestionBody(newQuestion.body);
        console.log("question", newQuestion);
      } catch (err) {
        console.log(err);
        message.error("Cannot find the question");
        dispatch(push("/"));
      }
      setLoading(false);
    } else {
      setQuestion({ ...defaultQuestion });
    }
  }, [questionID]);

  const setValue = (key, value) => {
    const newQuestion = {
      ...question,
      [key]: value,
    };
    if (key === "body") {
      setQuestion(newQuestion);
      return setQuestionBody(value);
    }
    const newErrors = {
      ...errors,
    };
    delete newErrors[key];
    setQuestion(newQuestion);
    setErrors(newErrors);
  };

  const saveQuestionHandler = async () => {
    setLoading(true);
    const isCreate = questionID === "new";
    try {
      if (questionID === "new") {
        question.teacherAccess = _.map(
          accessTeachers,
          (teacher) => teacher._id
        );
        question.body = questionBody;
        const { payload: newQuestion } = await api.createQuestion(question);
        setQuestion(newQuestion);
        if (examID) {
          await api.updateExam(
            { _id: examID },
            { $push: { questions: newQuestion._id } }
          );
          const { payload: exam } = await api.getExamByID(examID);
          const totalMarks = _.reduce(
            exam.questions,
            (sum, q) => sum + q.marks,
            0
          );
          await api.updateExam({ _id: examID }, { totalMarks });
        }
        await api.updateUserMe({
          $push: { questionIDs: newQuestion._id },
        });
        message.success("Question Creation Successful!");
        dispatch(
          push(`${examID ? `/exam/${examID}` : ""}/question/${newQuestion._id}`)
        );
      } else {
        question.teacherAccess = _.map(
          accessTeachers,
          (teacher) => teacher._id
        );
        question.body = questionBody;
        await api.updateQuestion(question, question);
        if (examID) {
          const { payload: exam } = await api.getExamByID(examID);
          const totalMarks = _.reduce(
            exam.questions,
            (sum, q) => sum + q.marks,
            0
          );
          await api.updateExam({ _id: examID }, { totalMarks });
        }
        message.success("Question Updated!");
      }
    } catch (err) {
      message.error(
        `Failed to ${
          isCreate ? "create" : "udpate"
        } this question please try again later!`
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const propQuestion = { ...question };
  console.log("propQuestion", propQuestion);
  const isBroad = question.type === BROAD;
  const filteredTeachers = Object.values(teachersObj).filter(
    (t) => !_.any(accessTeachers, (aT) => aT._id === t._id)
  );
  return (
    <div>
      <CheckAuthentication />
      {isLoading && <Loading isLoading={isLoading} />}
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 70px minmax(700px, 1fr) 1fr">
          <TileHeaderWrapper columns="1fr 1fr">
            <div>
              {hasBack && (
                <FontAwesomeIconWrapper onClick={() => dispatch(goBack())}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </FontAwesomeIconWrapper>
              )}
              <PageHeader>Question</PageHeader>
            </div>
            <RightButtonWrapper>
              <ButtonStyled
                type="primary"
                onClick={() => saveQuestionHandler()}
                disabled={isLoading}
              >
                Save
              </ButtonStyled>
              <ButtonStyled
                type="primary"
                onClick={() =>
                  dispatch(
                    push(
                      examID ? `/exam/${examID}/question/new` : "/question/new"
                    )
                  )
                }
              >
                Create Another
              </ButtonStyled>
            </RightButtonWrapper>
          </TileHeaderWrapper>
          <Row
            columns={`minmax(220px, 1fr) 220px ${
              isBroad ? "220px" : ""
            } 220px 70px`}
          >
            <HeaderRow>
              <LabelWrapper>Title</LabelWrapper>
              <InputWrapper
                placeholder="Enter a title"
                value={question.title}
                onChange={(e) => setValue("title", e.target.value)}
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Question Type</LabelWrapper>
              <Select
                style={{ width: "100%" }}
                placeholder="Select a type"
                value={question.type}
                onChange={(value) => setValue("type", value)}
              >
                {_.map(questionTypes, (val, key) => (
                  <Option value={key}>{val}</Option>
                ))}
              </Select>
            </HeaderRow>
            {isBroad && (
              <HeaderRow>
                <LabelWrapper>Answer Type</LabelWrapper>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select a answer type"
                  value={question.answerType}
                  onChange={(value) => setValue("answerType", value)}
                >
                  {_.map(ANSWER_TYPES, (val, key) => (
                    <Option value={key}>{val}</Option>
                  ))}
                </Select>
              </HeaderRow>
            )}

            <HeaderRow>
              <LabelWrapper>Author</LabelWrapper>
              <InputWrapper
                disabled={true}
                value={
                  getName(teachersObj[question.authorID] || {}) || "Anonymous"
                }
              />
            </HeaderRow>

            <HeaderRow>
              <LabelWrapper>Marks</LabelWrapper>
              <InputWrapper
                value={question.marks}
                onChange={(e) => setValue("marks", e.target.value)}
              />
            </HeaderRow>
          </Row>
          {!isLoading && (
            <>
              <Row columns="1fr">
                <QuestionBodyRow>
                  <LabelWrapper>Question</LabelWrapper>
                  <QuestionBody
                    question={propQuestion}
                    setQuestionValue={setValue}
                  />
                </QuestionBodyRow>
              </Row>
              {user._id === question.authorID && (
                <Row columns="1fr 1fr" style={{ marginTop: "70px" }}>
                  <div>
                    <Row columns="1fr 1fr">
                      <PageHeader>Access</PageHeader>
                      <RightButtonWrapper>
                        <ButtonStyled
                          type="primary"
                          onClick={setShowAcccessModal}
                        >
                          Add Access
                        </ButtonStyled>
                      </RightButtonWrapper>
                    </Row>
                    <QuestionAccess
                      teachers={accessTeachers}
                      setAccessTeachers={setAccessTeachers}
                    />
                  </div>
                </Row>
              )}

              <Modal
                title="Give Access"
                visible={showAccessModal}
                width={500}
                style={{ height: "700px" }}
                onOk={() => setShowAcccessModal(false)}
                onCancel={() => setShowAcccessModal(false)}
                okText="Import"
                footer={[
                  <Button
                    key="add-access"
                    type="primary"
                    onClick={() => {
                      if (!selectedTeacher)
                        return message.error("Please select anyone");
                      const newTeachers = [
                        ...accessTeachers,
                        teachersObj[selectedTeacher.split("#")[0]],
                      ];
                      setAccessTeachers(newTeachers);
                      setSelectedTeacher(null);
                      setShowAcccessModal(false);
                    }}
                  >
                    Share
                  </Button>,
                ]}
              >
                <Select
                  placeholder="Select a teacher"
                  filterOption={(searchParam, v) => {
                    const val = v.value.split("#")[1];
                    return val
                      .trim()
                      .toLowerCase()
                      .includes(searchParam.toLowerCase());
                  }}
                  showSearch
                  onChange={(v) => setSelectedTeacher(v)}
                  value={selectedTeacher}
                  style={{ width: "50%" }}
                >
                  {filteredTeachers.map((teacher) => (
                    <Option
                      key={Math.random()}
                      value={`${teacher._id}#${getName(teacher)} ${
                        teacher.department.departmentCode
                      }`}
                    >
                      {" "}
                      {`${getName(teacher)} ${
                        teacher.department.departmentCode
                      }`}{" "}
                    </Option>
                  ))}
                </Select>
              </Modal>
            </>
          )}
        </Container>
      </BodyWrapper>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
