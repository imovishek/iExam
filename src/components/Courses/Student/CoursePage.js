import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication';
import NavBar from '../../NavBar/NavBar';
import { connect } from 'react-redux';
import { BodyWrapper, Container } from '../../../utitlities/styles';
import React, { useEffect, useState } from 'react';
import api from '../../../utitlities/api';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { goBack } from 'connected-react-router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, PageHeader, TileHeaderWrapper, SecondHeader } from '../../styles/pageStyles';
import Exams from './components/Exams';


const FontAwesomeIconWrapper = styled.div`
  width: 30px;
  display: inline-block;
  cursor: pointer;
`

const CoursePage = ({ dispatch, user, hasBack = true }) => {
  const { id } = useParams()
  if (!id) dispatch(goBack())
  const [course, setCourse] = useState({})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const { payload = {} } = await api.getCourseByID(id)
      setCourse(payload)
    } catch (err) {
      console.log(err)
    }
  }, [id])

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 1fr" gridGap="20px">
          {/* <Header>{departmentName}</Header> */}
          <TileHeaderWrapper columns="1fr">
            <div>
              {hasBack &&
                <FontAwesomeIconWrapper onClick={() => dispatch(goBack())}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </FontAwesomeIconWrapper>
              }
              <PageHeader>Course</PageHeader>
            </div>
          </TileHeaderWrapper>
          <Row columns="1fr">
            <div>
              <SecondHeader>Exams</SecondHeader>
              <Exams exams={course.exams}/>
            </div>
          </Row>

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

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage)
