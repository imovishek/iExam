import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { connect } from 'react-redux'
import { BodyWrapper, Container, Row } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import { onUpdateCourses } from '../actions'
import styled from 'styled-components'
import CourseTable from './CourseTable'
import { Button } from 'antd'
import CreateEditCourseModal from './CreateEditCourseModal'
import { setUserAction } from '../../Login/actions'
import _ from 'underscore';
import { PageHeader } from '../../styles/pageStyles'
import ImportCoursesModal from './ImportCoursesModal'

const CourseTableWrapper = styled.div`

`

const ButtonStyled = styled(Button)`
  height: 30px;
  margin-right: 10px;
`

const Courses = ({ courses, user, dispatch }) => {
  const [isCoursesChanged, setCourseChanged] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [showImportCoursesModal, setShowImportCoursesModal] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isCoursesChanged) {
      try {
        const { payload = [] } = await api.getCourses({ 'department.departmentCode': user.department.departmentCode })
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

  const createCourseHandler = async (course) => {
    setLoading(true)
    course.assignedTeacher = course.assignedTeacher ? course.assignedTeacher._id : null;
    const { payload: newCourse } = await api.createCourse(course)
    if (course.batchCode !== "others") {
      const { payload: students } = await api.getStudentsByBatch({ batch: course.batchCode, departmentCode: user.department.departmentCode })
      const ids = _.map(students, student => student._id)
      await api.updateCourse(newCourse, {
        $push: {
          enrolledStudents: { $each: ids }
        }
      })
    }
    setCourseChanged(true)
  }

  const updateCourseHandler = async (course) => {
    await api.updateCourse(course)
    setCourseChanged(true)
  }

  const deleteCourseHandler = async (course) => {
    setLoading(true)
    await api.deleteCourse(course)
    setCourseChanged(true)
  }

  return (
    <div>
      <ImportCoursesModal
        visible={showImportCoursesModal}
        setVisibility={setShowImportCoursesModal}
        setCourseChanged={setCourseChanged}
        user={user}
      />
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 1fr">
          <Row columns="1fr 150px 170px">
            <PageHeader>Courses</PageHeader>
            <ButtonStyled type="primary" onClick={() => setShowImportCoursesModal(true)}>
              Import Courses
            </ButtonStyled>
            <ButtonStyled
              onClick={() => {
                setShowCreateEditModal(true)
                setSelectedCourse(null)
              }}
              type="primary"
            >
                Create New Course
            </ButtonStyled>
          </Row>
          <CourseTableWrapper>
            <CourseTable
              courses={courses}
              isLoading={isLoading}
              setCourseToEdit={(selectedCourse) => {
                setSelectedCourse(selectedCourse)
              }}
              showCreateEditModal={(value) => setShowCreateEditModal(value)}
              deleteCourse={deleteCourseHandler}
            />
          </CourseTableWrapper>
          <CreateEditCourseModal
            visible={showCreateEditModal}
            selectedCourse={selectedCourse}
            setVisibility={setShowCreateEditModal}
            createCourse={createCourseHandler}
            updateCourse={updateCourseHandler}
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
