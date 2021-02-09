
import styled from "styled-components";
import _ from 'underscore';
import { Spin, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../Common/Pagination";
import React, { useState, useEffect } from "react";
import { deleteCourse } from "../../../utitlities/api";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { smartLabel } from "../../../utitlities/common.functions";
import { TableRow, TableRowChild, OperationWrapper, FontAwesomeIconWrapper, CenterNoData, TableHeader, TableHeaderChild, SpinWrapper } from "../../styles/tableStyles";

const getName = obj => `${obj.firstName} ${obj.lastName}`;

const CourseCard = ({ dispatch, course, setCourseToEdit, showCreateEditModal, deleteCourse }) => {
    return (
        <TableRow>
            <TableRowChild> { course.title } </TableRowChild>
            <TableRowChild> { course.courseCode } </TableRowChild>
            <TableRowChild> { course.assignedTeacher ? getName(course.assignedTeacher) : 'Unassigned'} </TableRowChild>
            <TableRowChild> { course.department.departmentCode } </TableRowChild>
            <TableRowChild> { smartLabel(course.status) } </TableRowChild>
            <TableRowChild>
              <OperationWrapper>
                <Button onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(push(`/course/${course._id}`));
                  // setCourseToEdit(_.create('', course));
                  // showCreateEditModal(true);
                }}>Edit</Button>
                
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onConfirm={(e) => {
                    deleteCourse(course);
                  }}
                >
                  <FontAwesomeIconWrapper
                    icon={faTrash}
                    color="#e85120"
                  />
                </Popconfirm>
              
            </OperationWrapper>
          </TableRowChild>
        </TableRow>
    )
};

const NoData = () => {
  return <CenterNoData>No Data</CenterNoData>
};

const CourseTable = ({
  courses = [],
  isLoading,
  setCourseToEdit,
  showCreateEditModal,
  deleteCourse,
  dispatch
}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(1);
  const paginatedCourses = courses.slice((current-1)*pageSize, current*pageSize);

  useEffect(() => {
    setTotal(courses.length);
    if (!paginatedCourses.length) setCurrent(1);
  }, [courses, paginatedCourses.length]);
  const isNoData = courses.length === 0;
  return (
    <div>
      <TableHeader>
        <TableHeaderChild> Course Title </TableHeaderChild>
        <TableHeaderChild> Course Code </TableHeaderChild>
        <TableHeaderChild> Assigned Teacher </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild> Status </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </TableHeader>
      {(isNoData && !isLoading) && <NoData />}
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
            setCurrent(page);
            setPageSize(pageSize);
          }}
        />
      }
      { isLoading &&
        <SpinWrapper>
          <Spin size="large" />
        </SpinWrapper>
      }
    </div> 
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch
});


export default connect(null, mapDispatchToProps)(CourseTable);