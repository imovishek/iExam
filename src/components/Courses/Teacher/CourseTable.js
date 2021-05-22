
import _ from 'underscore';
import { Spin } from 'antd';
import Pagination from '../../Common/Pagination';
import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { NoDataComponent, smartLabel, getStatusColor } from '../../../utitlities/common.functions';
import { TableRowChild, TableHeader, TableHeaderChild, SpinWrapper, TableRowFlex, TableWrapper, SearchStyled } from '../../styles/tableStyles';
import { RightButtonWrapper } from '../../styles/pageStyles';

const getName = obj => `${obj.firstName} ${obj.lastName}`

const CourseCard = ({ dispatch, course, setCourseToEdit, showCreateEditModal, deleteCourse }) => (
  <TableRowFlex onClick={() => dispatch(push(`/course/${course._id}`))}>
    <TableRowChild> { course.title } </TableRowChild>
    <TableRowChild> { course.courseCode } </TableRowChild>
    <TableRowChild> { course.assignedTeacher ? getName(course.assignedTeacher) : 'Unassigned'} </TableRowChild>
    <TableRowChild> { course.department.departmentCode } </TableRowChild>
    <TableRowChild> { course.batchCode || 'Others' } </TableRowChild>
    <TableRowChild color={getStatusColor(course.status)}> { smartLabel(course.status) } </TableRowChild>
  </TableRowFlex>
)

const CourseTable = ({
  courses = [],
  isLoading,
  setCourseToEdit,
  showCreateEditModal,
  deleteCourse,
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
      <TableHeader>
        <TableHeaderChild> Title </TableHeaderChild>
        <TableHeaderChild> Code </TableHeaderChild>
        <TableHeaderChild> Teacher </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild> Batch </TableHeaderChild>
        <TableHeaderChild> Status </TableHeaderChild>
      </TableHeader>
      {(isNoData && !isLoading) && <NoDataComponent title="No Courses Added" />}
      { !isLoading && _.map(searchPaginatedCourses, (course, index) => (
        <CourseCard
          key={`courses_${index}`}
          course={course}
          setCourseToEdit={setCourseToEdit}
          showCreateEditModal={showCreateEditModal}
          deleteCourse={deleteCourse}
          dispatch={dispatch}
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
