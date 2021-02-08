
import styled from "styled-components";
import _ from 'underscore';
import { Spin, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../Common/Pagination";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TableRow, TableRowChild, OperationWrapper, FontAwesomeIconWrapper, CenterNoData, TableHeader, TableHeaderChild, SpinWrapper } from "../../styles/tableStyles";

const getName = obj => `${obj.firstName} ${obj.lastName}`;

const StudentCard = ({ dispatch, student, setStudentToEdit, showCreateEditModal, deleteStudent }) => {
    return (
        <TableRow>
            <TableRowChild> { student.firstName } </TableRowChild>
            <TableRowChild> { student.lastName } </TableRowChild>
            <TableRowChild> { student.department.departmentCode } </TableRowChild>
            <TableRowChild>
                <OperationWrapper>
                  <Button onClick={() => {
                    setStudentToEdit(_.create('', student));
                    showCreateEditModal(true);
                  }}>Edit</Button>
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => deleteStudent(student)}
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

const StudentTable = ({
  students = [],
  isLoading,
  setStudentToEdit,
  showCreateEditModal,
  deleteStudent,
  dispatch
}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    setTotal(students.length);
  }, [students]);
  const paginatedStudents = students.slice((current-1)*pageSize, current*pageSize);
  return (
    <div>
      <TableHeader>
        <TableHeaderChild> First Name </TableHeaderChild>
        <TableHeaderChild> Last Name </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </TableHeader>
      { !isLoading && _.map(paginatedStudents, (student, index) => (
          <StudentCard
            key={`students_${index}`}
            student={student}
            setStudentToEdit={setStudentToEdit}
            showCreateEditModal={showCreateEditModal}
            deleteStudent={deleteStudent}
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


export default connect(null, mapDispatchToProps)(StudentTable);