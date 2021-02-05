
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

const TeacherCard = ({ dispatch, teacher, setTeacherToEdit, showCreateEditModal, deleteTeacher }) => {
    return (
        <FlexBox>
            <FlexChild> { teacher.firstName } </FlexChild>
            <FlexChild> { teacher.lastName } </FlexChild>
            <FlexChild> { teacher.department.departmentCode } </FlexChild>
            <FlexChild>
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
                    color="#a02f2f"
                  />
                </Popconfirm>
              </OperationWrapper>
            </FlexChild>
        </FlexBox>
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
      <FlexBoxHeader>
        <FlexChildHeader> First Name </FlexChildHeader>
        <FlexChildHeader> Last Name </FlexChildHeader>
        <FlexChildHeader> Department </FlexChildHeader>
        <FlexChildHeader></FlexChildHeader>
      </FlexBoxHeader>
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