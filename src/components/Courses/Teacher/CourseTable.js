
import styled from 'styled-components';
import _ from 'underscore';
import { Spin } from 'antd';
import Pagination from '../../Common/Pagination';
import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { NoDataComponent, smartLabel } from '../../../utitlities/common.functions';
import { TableRow, TableRowChild, TableHeader, TableHeaderChild, SpinWrapper } from '../../styles/tableStyles';

const TableRowStyled = styled(TableRow)`
  cursor: pointer;
  :hover {
    background: #e4e4e4;
  }
`

const getName = obj => `${obj.firstName} ${obj.lastName}`

const CourseCard = ({ dispatch, course, setCourseToEdit, showCreateEditModal, deleteCourse }) => (
  <TableRowStyled onClick={() => dispatch(push(`/course/${course._id}`))}>
    <TableRowChild> { course.title } </TableRowChild>
    <TableRowChild> { course.courseCode } </TableRowChild>
    <TableRowChild> { course.assignedTeacher ? getName(course.assignedTeacher) : 'Unassigned'} </TableRowChild>
    <TableRowChild> { course.department.departmentCode } </TableRowChild>
    <TableRowChild> { smartLabel(course.status) } </TableRowChild>
  </TableRowStyled>
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
      <TableHeader>
        <TableHeaderChild> Course Title </TableHeaderChild>
        <TableHeaderChild> Course Code </TableHeaderChild>
        <TableHeaderChild> Assigned Teacher </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild> Status </TableHeaderChild>
      </TableHeader>
      {(isNoData && !isLoading) && <NoDataComponent title="No Courses Added" />}
      { !isLoading && _.map(paginatedCourses, (course, index) => (
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
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(CourseTable)
