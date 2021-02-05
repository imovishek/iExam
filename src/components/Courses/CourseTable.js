
import styled from "styled-components";
import _ from 'underscore';
import { Spin, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Common/Pagination";
import React, { useState, useEffect } from "react";
import { deleteCourse } from "../../utitlities/api";
import { push } from "connected-react-router";
import { connect } from "react-redux";

const FlexBoxHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;
  background: #cecece;
  margin-top: 5px;
`;

const FlexChildHeader = styled.div`
  flex: 1;
  font-weight: 600;
  padding: 10px;
  text-align: center;
  height: 60px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;


const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;
  background: #e6e6e6;
  margin-top: 5px;
  cursor: pointer;
`;

const FlexChild = styled.div`
  flex: 1;
  font-weight: 400;
  padding: 10px;
  text-align: center;
  height: 60px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;

const SpinWrapper = styled.div`
  text-align: center;
  margin-top: 50px;;
  height: 100%;
  width: 100%;
  z-index: 1000;
`;
const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: auto;
  margin-left: 5px;
`;

const OperationWrapper = styled.div`
  float: right;
`;

const getName = obj => `${obj.firstName} ${obj.lastName}`;

const CourseCard = ({ dispatch, course, setCourseToEdit, showCreateEditModal, deleteCourse }) => {
    return (
        <FlexBox onClick={() => dispatch(push(`/course/${course._id}`))}>
            <FlexChild> { course.title } </FlexChild>
            <FlexChild> { course.courseCode } </FlexChild>
            <FlexChild> { course.assignedTeacher ? getName(course.assignedTeacher) : 'Unassigned'} </FlexChild>
            <FlexChild> { course.department.departmentCode } </FlexChild>
            <FlexChild> { course.status } </FlexChild>
            <FlexChild>
                <OperationWrapper>
                  <Button onClick={() => {
                    setCourseToEdit(_.create('', course));
                    showCreateEditModal(true);
                  }}>Edit</Button>
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => deleteCourse(course)}
                >
                  <FontAwesomeIconWrapper
                    icon={faTrash}
                    color="#a02f2f"
                  />
                </Popconfirm>
              </OperationWrapper>
            </FlexChild>
        </FlexBox>
    )
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

  useEffect(() => {
    setTotal(courses.length);
  }, [courses]);
  const paginatedCourses = courses.slice((current-1)*pageSize, current*pageSize);
  return (
    <div>
      <FlexBoxHeader>
        <FlexChildHeader> Course Title </FlexChildHeader>
        <FlexChildHeader> Course Code </FlexChildHeader>
        <FlexChildHeader> Assigned Teacher </FlexChildHeader>
        <FlexChildHeader> Department </FlexChildHeader>
        <FlexChildHeader> Status </FlexChildHeader>
        <FlexChildHeader></FlexChildHeader>
      </FlexBoxHeader>
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
      { !isLoading &&
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