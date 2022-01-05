import CheckAuthentication from "../../CheckAuthentication/CheckAuthentication";
import NavBar from "../../NavBar/NavBar";
import { connect } from "react-redux";
import {
  BodyWrapper,
  Container,
  Col,
  ButtonStyled,
  CenterText,
  Center,
} from "../../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from "../../../utitlities/api";
import styled from "styled-components";
import _ from "underscore";
import { message, Menu, Dropdown, Button, Tabs } from "antd";
import {
  DownOutlined,
  UserOutlined,
  ImportOutlined,
  FileOutlined,
  EyeOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Questions from "./components/Questions";
import Students from "./components/Students";
import {
  Row,
  PageHeader,
  TileHeaderWrapper,
  RightButtonWrapper,
  BodyRow,
  SecondHeader,
} from "../../styles/pageStyles";
import { useParams } from "react-router";
import { goBack, push } from "connected-react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getObjectByAddingID } from "../../../utitlities/common.functions";
import Loading from "../../Common/Loading";
import EditExamModal from "./EditExamModal";
import ImportQuestionsModal from "./ImportQuestionModal";
import NewAnnouncementModal from "./NewAnnouncementModal";
import ShowAnnouncementModal from "./ShowAnnouncementModla";
import ShowExamStatusTitle from "../Common/ShowExamStatusTitle";
import Clarifications from "./components/Clarifications";
import LogModal from "../../LogView/LogModal";
const { TabPane } = Tabs;

const StyledDropdown = styled(Dropdown)`
  display: flex;
  align-items: center;
`;

const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`;
const QuestionsBodyRow = styled(BodyRow)`
  box-shadow: none;
  border-radius: 0px;
`;

const StyledRow = styled(Row)`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;

const ExamPage = ({ dispatch, user, hasBack = true }) => {
  const { id } = useParams();
  if (!id) dispatch(goBack());
  const [isLoading, setIsLoading] = useState(true);
  const [exam, setExam] = useState({});
  const [teachersObj, setTeachersObj] = useState({});
  const [showEditExam, setShowEditExam] = useState(false);
  const [showImportQuestions, setShowImportQuestions] = useState(false);
  const [showNewAnnouncementModal, setShowNewAnnouncementModal] =
    useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [clarifications, setClarifications] = useState([]);
  useEffect(async () => {
    console.log("hi------------------");
    try {
      const { payload: claries } = await api.getClarifications({ examID: id });
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
  }, [id]);

  useEffect(async () => {
    try {
      let { payload = {} } = await api.getExamByID(id);
      const { payload: teachers = [] } = await api.getTeachers({});
      const obj = {};
      teachers.map((teacher) => {
        obj[teacher._id] = teacher;
      });
      setTeachersObj(obj);
      if (!payload) payload = {};
      setExam(payload);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const updateExamParticipantOnUI = async () => {
    try {
      setIsLoading(true);
      const { payload = {} } = await api.getExamByID(id);
      setExam(payload);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const onExamUpdateHandler = async (exam) => {
    setIsLoading(true);
    try {
      const newExam = { ...exam };
      delete newExam.papers;
      delete newExam.announcements;
      await api.updateExam(exam, getObjectByAddingID(newExam));
      await updateExamParticipantOnUI();
      message.success("Successfully Updated!");
    } catch (err) {
      message.error("Failed to update exam!");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const StyledBodyRow = (props) => (
    <QuestionsBodyRow style={{ paddingLeft: "0px" }}>
      <Col rows="32px minmax(300px, 100vh)" style={{ paddingTop: "23px" }}>
        {props.children}
      </Col>
    </QuestionsBodyRow>
  );

  const QuestionsWrapper = (props) => (
    <QuestionsBodyRow style={{ borderRight: "1px solid #bbbbbb" }}>
      <Col rows="32px minmax(300px, 100vh)">{props.children}</Col>
    </QuestionsBodyRow>
  );

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "result":
        dispatch(push(`/exam/${id}/result`));
        break;
      case "course":
        dispatch(push(`/course/${exam.course && exam.course._id}`));
        break;
      case "arena":
        dispatch(push(`/exam/${id}/paper/arena`));
        break;
      default:
        break;
    }
  };

  const NEW_QUESTION = "new-question";
  const IMPORT_QUESTIONS = "import-questions";
  const VIEW_QUESTIONS = "view-questions";

  const handleQuestionActionClick = (e) => {
    switch (e.key) {
      case NEW_QUESTION:
        dispatch(push(`/exam/${id}/question/new`));
        break;
      case IMPORT_QUESTIONS:
        setShowImportQuestions(true);
        break;
      case VIEW_QUESTIONS:
        dispatch(push(`/exam/${id}/question/view/all`));
        break;
      default:
        break;
    }
  };

  const gotoMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="result" icon={<ProfileOutlined />}>
        Results
      </Menu.Item>
      <Menu.Item key="arena" icon={<UserOutlined />}>
        Exam Arena
      </Menu.Item>
      <Menu.Item key="course" icon={<ProfileOutlined />}>
        Course
      </Menu.Item>
    </Menu>
  );

  const questionActionMenu = (
    <Menu onClick={handleQuestionActionClick}>
      <Menu.Item key={NEW_QUESTION} icon={<FileOutlined />}>
        New Question
      </Menu.Item>
      <Menu.Item key={IMPORT_QUESTIONS} icon={<ImportOutlined />}>
        Import Questions
      </Menu.Item>
      <Menu.Item key={VIEW_QUESTIONS} icon={<EyeOutlined />}>
        View Questions
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <CheckAuthentication />
      {isLoading && <Loading isLoading={isLoading} />}
      {showEditExam && (
        <EditExamModal
          visible={showEditExam}
          setVisibility={setShowEditExam}
          selectedExam={exam}
          updateExam={onExamUpdateHandler}
        />
      )}
      <ImportQuestionsModal
        user={user}
        visible={showImportQuestions}
        setVisibility={setShowImportQuestions}
        exam={exam}
        updateExamOnUI={updateExamParticipantOnUI}
      />
      <NewAnnouncementModal
        user={user}
        visible={showNewAnnouncementModal}
        setVisibility={setShowNewAnnouncementModal}
        exam={exam}
        updateExamOnUI={updateExamParticipantOnUI}
      />
      <ShowAnnouncementModal
        user={user}
        visible={showAnnouncementModal}
        setVisibility={setShowAnnouncementModal}
        exam={exam}
        updateExamOnUI={updateExamParticipantOnUI}
      />
      <BodyWrapper>
        <NavBar />
        <Container rows="100px 30px 1fr" gridGap="20px">
          <LogModal />
          <TileHeaderWrapper columns="1fr 1fr 1fr">
            <div>
              {hasBack && (
                <FontAwesomeIconWrapper onClick={() => dispatch(goBack())}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </FontAwesomeIconWrapper>
              )}
              <PageHeader>Exam</PageHeader>
            </div>
            <ShowExamStatusTitle exam={exam} />
            <RightButtonWrapper>
              <ButtonStyled
                type="primary"
                onClick={() => setShowEditExam(true)}
              >
                Edit Exam
              </ButtonStyled>
            </RightButtonWrapper>
          </TileHeaderWrapper>
          <Row columns="216px 216px 216px">
            <StyledDropdown overlay={gotoMenu} trigger={["click"]}>
              <Button>
                Goto <DownOutlined />
              </Button>
            </StyledDropdown>

            <ButtonStyled
              style={{ marginLeft: "0px" }}
              type="primary"
              onClick={() => setShowNewAnnouncementModal(true)}
            >
              Create new announcement
            </ButtonStyled>

            <Button onClick={() => setShowAnnouncementModal(true)}>
              {" "}
              View Announcements
            </Button>
          </Row>
          <StyledRow columns="2.5fr 2.3fr">
            <Tabs onChange={() => {}} type="card">
              <TabPane tab="Questions" key="1">
                <QuestionsWrapper>
                  <TileHeaderWrapper columns="1fr 1fr">
                    <SecondHeader>
                      Questions ({(exam.questions || []).length})
                    </SecondHeader>
                    <RightButtonWrapper>
                      <CenterText style={{ marginRight: "10px" }}>
                        Total Marks: {exam.totalMarks}{" "}
                      </CenterText>
                      <Center>
                        <StyledDropdown
                          overlay={questionActionMenu}
                          trigger={["click"]}
                        >
                          <Button>
                            Select Action <DownOutlined />
                          </Button>
                        </StyledDropdown>
                      </Center>
                    </RightButtonWrapper>
                  </TileHeaderWrapper>
                  <Questions
                    onUpdateExamUI={updateExamParticipantOnUI}
                    teachersObj={teachersObj}
                    exam={exam}
                    questions={exam.questions}
                  />
                </QuestionsWrapper>
              </TabPane>
              <TabPane tab="Clarifications" key="2">
                <QuestionsWrapper>
                  <Clarifications exam={exam} clarifications={clarifications} />
                </QuestionsWrapper>
              </TabPane>
            </Tabs>
            <Col rows="10px 1fr">
              <div></div>
              <StyledBodyRow>
                <Students
                  participants={exam.participants}
                  bannedParticipants={exam.bannedParticipants}
                  exam={exam}
                  updateExamOnUI={updateExamParticipantOnUI}
                />
              </StyledBodyRow>
            </Col>
          </StyledRow>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExamPage);
