import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { connect } from 'react-redux'
import _ from 'underscore'
import { BodyWrapper, Container } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import styled from 'styled-components'
import { Button } from 'antd'
import { useParams } from 'react-router'
import { goBack, push } from 'connected-react-router'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PageHeader, TileHeaderWrapper, RightButtonWrapper } from '../../styles/pageStyles'
import QuestionPaper from './components/QuestionPaper'
import Loading from '../../Common/Loading'

const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`


const EvaluatePaper = ({ dispatch, user, hasBack = true }) => {
  const { examID, questionID } = useParams();
  if (!questionID || !examID) dispatch(push('/404'));
  const [isLoading, setIsLoading] = useState(true)
  const [exam, setExam] = useState({})
  const [viewQuestions, setViewQuestions] = useState([])

  const updateExamOnUI = async () => {
    let { payload = {} } = await api.getExamByID(examID)
    if (!payload) payload = {}
    setExam(payload);
    const newViewQuestions = _.filter(payload.questions, question =>
      questionID === 'all' ? true : question._id === questionID
    );
    setViewQuestions(newViewQuestions);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setIsLoading(true)
    try {
      await updateExamOnUI()
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [examID, questionID])

  return (
    <div>
      <CheckAuthentication />
      { isLoading && <Loading isLoading={isLoading} /> }
      <BodyWrapper>
        <NavBar />
        <Container rows="55px 1fr">
          <TileHeaderWrapper columns="1fr 1fr">
            <div>
              {hasBack &&
                <FontAwesomeIconWrapper
                  onClick={() => {
                    dispatch(goBack())
                  }}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </FontAwesomeIconWrapper>
              }
              <PageHeader>View Questions</PageHeader>
            </div>
          </TileHeaderWrapper>
          <QuestionPaper
            isLoading={isLoading}
            exam={exam}
            paper={{}}
            questions={viewQuestions}
            viewQuestions={true}
          />
        </Container>
      </BodyWrapper>
    </div>
  )
}
const mapStateToProps = state => ({
  user: state.login.user
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(EvaluatePaper)
