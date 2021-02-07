import CheckAuthentication from "../CheckAuthentication/CheckAuthentication";
import NavBar from "../NavBar/NavBar";
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../utitlities/api';
import { onUpdateQuestions } from "./actions";
import styled from "styled-components";
import QuestionTable from "./QuestionTable";
import { Button } from "antd";
import CreateEditQuestionModal from "./CreateEditQuestionModal";


const QuestionTableWrapper = styled.div`
  margin-top: 50px;
`;
const PageHeader = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #828b94;
  user-select: none;
`;

const CreateNewQuestionWrapper = styled.div`
  float: right;
`;

const Questions = ({ questions, user, dispatch }) => {
    const [isQuestionsChanged, setQuestionChanged] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showCreateEditModal, setShowCreateEditModal] = useState(false);

    useEffect(() => {
      if (isQuestionsChanged) {
        const { questionIDs = [] } = user;
        api.getQuestions(questionIDs)
        .then(({ payload }) => {
            console.log(payload);
            dispatch(onUpdateQuestions(payload));
            setQuestionChanged(false);
            setLoading(false);
        });
      }
    }, [isQuestionsChanged]);

    const createQuestionHandler = async (question) => {
      setLoading(true);
      await api.createQuestion(question);
      // await api.updateDeptAdmin(user._id, { questionIDs: { $push: question._id } });
      setQuestionChanged(true);
    };

    const updateQuestionHandler = async (question) => {
      await api.updateQuestion(question);
      setQuestionChanged(true);
    };

    const deleteQuestionHandler = async (question) => {
      setLoading(true);
      await api.deleteQuestion(question);
      setQuestionChanged(true);
    };

    return (
        <div>
            <CheckAuthentication />
            <BodyWrapper>
                <NavBar />
                <Container>
                    <PageHeader>Questions</PageHeader>
                    <CreateNewQuestionWrapper>
                      <Button
                        onClick={() => {
                          setShowCreateEditModal(true);
                          setSelectedQuestion(null);
                        }}
                        type="primary"
                      >
                          Create New Question
                      </Button>
                    </CreateNewQuestionWrapper>
                    <QuestionTableWrapper>
                      <QuestionTable
                        questions={questions}
                        isLoading={isLoading}
                        setQuestionToEdit={(selectedQuestion) => {
                          setSelectedQuestion(selectedQuestion);
                        }}
                        showCreateEditModal={(value) => setShowCreateEditModal(value)}
                        deleteQuestion={deleteQuestionHandler}
                      />
                    </QuestionTableWrapper>
                    {/* <CreateEditQuestionModal
                      visible={showCreateEditModal}
                      selectedQuestion={selectedQuestion}
                      setVisibility={setShowCreateEditModal}
                      createQuestion={createQuestionHandler}
                      updateQuestion={updateQuestionHandler}
                    /> */}
                </Container>
            </BodyWrapper>
            
        </div>
    )
};
const mapStateToProps = state => ({
    user: state.login.user,
    questions: state.questionData.questions
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

  
export default connect(mapStateToProps, mapDispatchToProps)(Questions);