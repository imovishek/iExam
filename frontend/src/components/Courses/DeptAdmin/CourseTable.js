import _ from 'underscore';
import { Button, Popconfirm } from 'antd';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../Common/Pagination';
import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { NoDataComponent, smartLabel } from '../../../utitlities/common.functions';
import { TableWrapper, TableRowFlex, TableRowChild, OperationWrapper, FontAwesomeIconWrapper, TableHeader, TableHeaderChild, SearchStyled } from '../../styles/tableStyles'
import { RightButtonWrapper } from '../../styles/pageStyles';
import Loading from '../../Common/Loading';

const getName = obj => `${obj.firstName} ${obj.lastName}`

const CourseCard = ({ dispatch, course, setCourseToEdit, showCreateEditModal, deleteCourse }) => (
  <TableRowFlex>
    <TableRowChild> { course.title } </TableRowChild>
    <TableRowChild> { course.courseCode } </TableRowChild>
    <TableRowChild> { course.assignedTeacher ? getName(course.assignedTeacher) : 'Unassigned'} </TableRowChild>
    <TableRowChild> { course.batchCode || "Other" } </TableRowChild>
    <TableRowChild> { course.department.departmentCode } </TableRowChild>
    <TableRowChild> { smartLabel(course.status) } </TableRowChild>
    <TableRowChild>
      <OperationWrapper>
        <Button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            dispatch(push(`/course/${course._id}`))
          // setCourseToEdit(_.create('', course));
          // showCreateEditModal(true);
          }}>Edit</Button>

        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onConfirm={(e) => {
            deleteCourse(course)
          }}
        >
          <FontAwesomeIconWrapper
            icon={faTrash}
            color="#e85120"
          />
        </Popconfirm>

      </OperationWrapper>
    </TableRowChild>
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
        <TableHeaderChild> Batch </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild> Status </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </TableHeader>
      {(isNoData && !isLoading) && <NoDataComponent title="No Courses Found" />}
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
      <Loading isLoading={isLoading} style={{top: '35vh', left: '58vw'}}/>
    </TableWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(CourseTable)
