import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication';
import NavBar from '../../NavBar/NavBar';
import { connect } from 'react-redux';
import { BodyWrapper, Container } from '../../../utitlities/styles';
import React, { useEffect, useState } from 'react';
import api from '../../../utitlities/api';
import { onUpdateCourses } from '../actions';
import styled from 'styled-components';
import CourseTable from './CourseTable';

const PageHeader = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #828b94;
  user-select: none;
`

const Courses = ({ courses, user, dispatch }) => {
  const [isCoursesChanged, setCourseChanged] = useState(true)
  const [isLoading, setLoading] = useState(true)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isCoursesChanged) {
      try {
        const { payload = [] } = await api.getCourses({ assignedTeacher: user._id })
        dispatch(onUpdateCourses(payload))
      } catch (err) {
        console.log(err)
      } finally {
        setCourseChanged(false)
        setLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCoursesChanged, user.courseIDs])

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 1fr">
          <PageHeader>Courses</PageHeader>
          <CourseTable
            courses={courses}
            isLoading={isLoading}
          />
        </Container>
      </BodyWrapper>

    </div>
  )
}
const mapStateToProps = state => ({
  user: state.login.user,
  courses: state.courseData.courses
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
