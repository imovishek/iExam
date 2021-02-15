
import styled from 'styled-components'
import _ from 'underscore'
import { Spin, Button } from 'antd'
import Pagination from '../../Common/Pagination'
import React, { useState, useEffect } from 'react'
import api, { deleteCourse } from '../../../utitlities/api'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { smartLabel } from '../../../utitlities/common.functions'
import { TableRowChild, OperationWrapper, CenterNoData, TableHeaderChild, SpinWrapper } from '../../styles/tableStyles'
import { Row } from '../../styles/pageStyles'

const getName = obj => `${obj.firstName} ${obj.lastName}`
const ButtonSyled = styled(Button)`
  margin-left: 10px;
`

const CourseCard = ({
  user,
  dispatch,
  course,
  updateCoursesOnUI,
  setIsLoading
}) => {
  const [buttonText, setButtonText] = useState('Enroll')
  const [buttonStyle, setButtonStyle] = useState({ width: '84px', color: 'white' })

  useEffect(() => {
    const enrolledIDs = _.map(course.enrolledStudents, enst => enst._id)
    const pendingEnrolledIDs = _.map(course.pendingEnrollStudents, enst => enst._id)
    let btnText = 'Enroll'
    if (_.contains(enrolledIDs, user._id)) btnText = 'Enter'
    else if (_.contains(pendingEnrolledIDs, user._id)) btnText = 'Pending'
    const newStyle = { ...buttonStyle }
    switch (btnText) {
      case 'Enroll':
        newStyle.background = '#1e8efb'
        break
      case 'Enter':
        newStyle.background = 'rgb(71, 119, 71)'
        break
      case 'Pending':
        newStyle.background = 'rgb(111, 56, 58)'
        break
      default:
        break
    }
    setButtonText(btnText)
    setButtonStyle(newStyle)
  }, [course])

  const enrollRequestHandler = async (e) => {
    try {
      setIsLoading(true);
      await api.updateCourse(course, {
        $push: {
          pendingEnrollStudents: user._id
        }
      })
      await updateCoursesOnUI()
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Row columns="repeat(5, 1fr) 240px">
      <TableRowChild> { course.title } </TableRowChild>
      <TableRowChild> { course.courseCode } </TableRowChild>
      <TableRowChild> { course.assignedTeacher ? getName(course.assignedTeacher) : 'Unassigned'} </TableRowChild>
      <TableRowChild> { course.department.departmentCode } </TableRowChild>
      <TableRowChild> { smartLabel(course.status) } </TableRowChild>
      <TableRowChild>
        <OperationWrapper>
          <ButtonSyled
            type="primary"
            disabled={buttonText === 'Pending'}
            style={buttonStyle}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              buttonText === "Enter" ? dispatch(push(`/course/${course._id}`)) : enrollRequestHandler()
            }}>{buttonText}
          </ButtonSyled>
        </OperationWrapper>
      </TableRowChild>
    </Row>
  )
}

const NoData = () => <CenterNoData>No Courses</CenterNoData>

const CourseTable = ({
  user,
  courses = [],
  isLoading,
  setIsLoading,
  updateCoursesOnUI,
  dispatch
}) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(1)
  const paginatedCourses = courses.slice((current - 1) * pageSize, current * pageSize)

  useEffect(() => {
    setTotal(courses.length)
    if (!paginatedCourses.length) setCurrent(1)
  }, [courses, paginatedCourses.length])
  const isNoData = courses.length === 0
  return (
    <div>
      <Row columns="repeat(5, 1fr) 240px">
        <TableHeaderChild> Course Title </TableHeaderChild>
        <TableHeaderChild> Course Code </TableHeaderChild>
        <TableHeaderChild> Assigned Teacher </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild> Status </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </Row>
      {(isNoData && !isLoading) && <NoData />}
      { !isLoading && _.map(paginatedCourses, (course, index) => (
        <CourseCard
          user={user}
          key={`courses_${index}`}
          course={course}
          deleteCourse={deleteCourse}
          dispatch={dispatch}
          updateCoursesOnUI={updateCoursesOnUI}
          setIsLoading={setIsLoading}
        />
      ))}
      { (!isLoading && !isNoData) &&
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={(page, pageSize) => {
            setCurrent(page)
            setPageSize(pageSize)
          }}
        />
      }
      { isLoading &&
        <SpinWrapper>
          <Spin size="large" />
        </SpinWrapper>
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(CourseTable)
