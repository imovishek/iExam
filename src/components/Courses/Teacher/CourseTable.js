
import _ from 'underscore';
import { Spin } from 'antd';
import Pagination from '../../Common/Pagination';
import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { NoDataComponent, smartLabel, getStatusColor } from '../../../utitlities/common.functions';
import { TableRowChild, TableHeader, TableHeaderChild, SpinWrapper, TableRowFlex, TableWrapper } from '../../styles/tableStyles';

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
  const paginatedCourses = courses.slice((current - 1) * pageSize, current * pageSize)

  useEffect(() => {
    setTotal(courses.length)
    if (!paginatedCourses.length) setCurrent(1)
  }, [courses, paginatedCourses.length])
  const isNoData = courses.length === 0
  return (
    <TableWrapper>
      <TableHeader>
        <TableHeaderChild> Course Title </TableHeaderChild>
        <TableHeaderChild> Course Code </TableHeaderChild>
        <TableHeaderChild> Assigned Teacher </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild> Batch </TableHeaderChild>
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
    </TableWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(CourseTable)
