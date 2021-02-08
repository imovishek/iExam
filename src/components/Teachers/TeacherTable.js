
import styled from "styled-components";
import _ from 'underscore';
import { Spin, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Common/Pagination";
import React, { useState, useEffect } from "react";
import { deleteTeacher } from "../../utitlities/api";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { TableRow, TableRowChild, OperationWrapper, FontAwesomeIconWrapper, CenterNoData, TableHeader, TableHeaderChild, SpinWrapper } from "../styles/tableStyles";

const getName = obj => `${obj.firstName} ${obj.lastName}`;

const TeacherCard = ({ dispatch, teacher, setTeacherToEdit, showCreateEditModal, deleteTeacher }) => {
    return (
        <TableRow>
            <TableRowChild> { teacher.firstName } </TableRowChild>
            <TableRowChild> { teacher.lastName } </TableRowChild>
            <TableRowChild> { teacher.department.departmentCode } </TableRowChild>
            <TableRowChild>
                <OperationWrapper>
                  <Button onClick={() => {
                    setTeacherToEdit(_.create('', teacher));
                    showCreateEditModal(true);
                  }}>Edit</Button>
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => deleteTeacher(teacher)}
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

const TeacherTable = ({
  teachers = [],
  isLoading,
  setTeacherToEdit,
  showCreateEditModal,
  deleteTeacher,
  dispatch
}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    setTotal(teachers.length);
  }, [teachers]);
  const paginatedTeachers = teachers.slice((current-1)*pageSize, current*pageSize);
  return (
    <div>
      <TableHeader>
        <TableHeaderChild> First Name </TableHeaderChild>
        <TableHeaderChild> Last Name </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </TableHeader>
      { !isLoading && _.map(paginatedTeachers, (teacher, index) => (
          <TeacherCard
            key={`teachers_${index}`}
            teacher={teacher}
            setTeacherToEdit={setTeacherToEdit}
            showCreateEditModal={showCreateEditModal}
            deleteTeacher={deleteTeacher}
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


export default connect(null, mapDispatchToProps)(TeacherTable);