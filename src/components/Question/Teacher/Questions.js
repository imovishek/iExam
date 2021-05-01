import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication';
import NavBar from '../../NavBar/NavBar';
import { connect } from 'react-redux';
import { BodyWrapper, Container } from '../../../utitlities/styles';
import React, { useEffect, useState } from 'react';
import api from '../../../utitlities/api';
import { onUpdateQuestions } from '../actions';
import QuestionTable from './QuestionsTable';
import { TileHeaderWrapper, RightButtonWrapper, PageHeader } from '../../styles/pageStyles';
import { Button, message } from 'antd';
import { push } from 'connected-react-router';

const Questions = ({ questions, user, dispatch }) => {
  const [isQuestionsChanged, setQuestionChanged] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const onDeleteHandler = async (question) => {
    try {
      await api.updateUserByID(user._id, { $pull: { questionIDs: question._id } });
      await api.deleteQuestion(question);
      message.success("Successfully Deleted!");
      setQuestionChanged(true);
    } catch (err) {
      message.error("Error occurred! try again later!")
      console.log(err);
    }
    
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isQuestionsChanged) {
      try {
        const { payload = [] } = await api.getQuestions({ authorID: user._id })
        dispatch(onUpdateQuestions(payload))
      } catch (err) {
        console.log(err)
      } finally {
        setQuestionChanged(false)
        setLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQuestionsChanged, user.questionIDs])

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 1fr">
          <TileHeaderWrapper columns="1fr 1fr">
            <PageHeader>Questions</PageHeader>
            <RightButtonWrapper>
              <Button
                type="primary"
                onClick={() => dispatch(push(`/question/new`))}
              >
                Create New Question
              </Button>
            </RightButtonWrapper>
          </TileHeaderWrapper>
          <QuestionTable
            questions={questions}
            isLoading={isLoading}
            deleteQuestion={onDeleteHandler}
          />
        </Container>
      </BodyWrapper>

    </div>
  )
}
const mapStateToProps = state => ({
  user: state.login.user,
  questions: state.questionData.questions
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)
