
import styled from 'styled-components'
import _ from 'underscore'
import { Spin, Button, message } from 'antd'
import Pagination from '../../Common/Pagination'
import React, { useState, useEffect } from 'react'
import api, { deleteCourse } from '../../../utitlities/api'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { NoDataComponent, smartLabel } from '../../../utitlities/common.functions'
import { TableRowChild, OperationWrapper, TableHeaderChild, SpinWrapper, TableRowStyled, TableWrapper, SearchStyled } from '../../styles/tableStyles'
import { RightButtonWrapper, Row } from '../../styles/pageStyles'

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
        newStyle.background = 'rgb(2 148 2)'
        break
      case 'Pending':
        newStyle.background = 'rgb(234 97 0 / 86%)'
        break
      default:
        break
    }
    setButtonText(btnText)
    setButtonStyle(newStyle)
  }, [course])

  const enrollRequestHandler = async (e) => {
    try {
      await api.updateCourse(course, {
        $push: {
          pendingEnrollStudents: user._id
        }
      });
      message.success('Enrollment request sent!');
      await updateCoursesOnUI(course._id)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TableRowStyled columns="repeat(6, 1fr) 240px">
      <TableRowChild> { course.title } </TableRowChild>
      <TableRowChild> { course.courseCode } </TableRowChild>
      <TableRowChild> { course.assignedTeacher ? getName(course.assignedTeacher) : 'Unassigned'} </TableRowChild>
      <TableRowChild> { course.department.departmentCode } </TableRowChild>
      <TableRowChild> { course.batchCode || 'Others' } </TableRowChild>
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
    </TableRowStyled>
  )
}

const CourseTable = ({
  user,
  courses = [],
  isLoading,
  setIsLoading,
  updateCoursesOnUI,
  dispatch
}) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(1)
  const [searchCourses, setSearchCourses] = useState([])
  const searchPaginatedCourses = searchCourses.slice((current - 1) * pageSize, current * pageSize)

  useEffect(() => {
    setTotal(courses.length)
    setSearchCourses(courses)
  }, [courses])

  useEffect(() => {
    setTotal(searchCourses.length)
    if (!searchPaginatedCourses.length) setCurrent(1)
  }, [searchPaginatedCourses.length, searchCourses.length])

  const handleSearch = (value) => {
    const pattern = value
      .trim()
      .replace(/ +/g, '')
      .toLowerCase()

    const afterSearchCourses = _.filter(courses, course =>
      `${course.title}${course.courseCode}${course.batchCode}${course.status}`
        .trim()
        .replace(/ +/g, '')
        .toLowerCase()
        .includes(pattern)
    )
    setCurrent(1)
    setSearchCourses([...afterSearchCourses])
  }

  const isNoData = searchCourses.length === 0
  return (
    <TableWrapper>
      <RightButtonWrapper>
        <SearchStyled 
          allowClear
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </RightButtonWrapper>
      <Row columns="repeat(6, 1fr) 240px">
        <TableHeaderChild> Course Title </TableHeaderChild>
        <TableHeaderChild> Course Code </TableHeaderChild>
        <TableHeaderChild> Assigned Teacher </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild> Batch </TableHeaderChild>
        <TableHeaderChild> Status </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </Row>
      {(isNoData && !isLoading) && <NoDataComponent title="No Courses Found" />}
      { !isLoading && _.map(searchPaginatedCourses, (course, index) => (
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
    </TableWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(CourseTable)
