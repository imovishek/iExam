
import styled from "styled-components";
import _ from 'underscore';
import { Spin, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../Common/Pagination";
import React, { useState, useEffect } from "react";
import { deleteExam } from "../../../utitlities/api";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { smartLabel, getExamStatus } from "../../../utitlities/common.functions";
import { TableRow, TableRowChild, OperationWrapper, CenterNoData, TableHeader, TableHeaderChild, SpinWrapper } from "../../styles/tableStyles";


const getName = obj => `${obj.firstName} ${obj.lastName}`;

const ExamCard = ({ dispatch, exam, setExamToEdit, showCreateEditModal, deleteExam }) => {
    const status = getExamStatus(exam);
    const shouldEnter = (status || '').toLowerCase() === "ended" || (status || '').toLowerCase() === "running";
    return (
        <TableRow>
          <TableRowChild> { exam.title } </TableRowChild>
          <TableRowChild> { exam.course.title } </TableRowChild>
          <TableRowChild> { exam.course.courseCode } </TableRowChild>
          <TableRowChild> { exam.assignedTeacher ? getName(exam.assignedTeacher) : 'Unassigned'} </TableRowChild>
          <TableRowChild> { exam.department.departmentCode } </TableRowChild>
          <TableRowChild>
            <OperationWrapper>
              <Button
                type="primary"
                disabled={!shouldEnter}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(push(`/exam/${exam._id}`));
                  // setExamToEdit(_.create('', exam));
                  // showCreateEditModal(true);
                }}>Enter</Button>
            </OperationWrapper>
          </TableRowChild>
        </TableRow>
    )
};

const NoData = () => {
  return <CenterNoData>No Exams :)</CenterNoData>
};

const ExamTable = ({
  exams = [],
  isLoading,
  setExamToEdit,
  showCreateEditModal,
  deleteExam,
  dispatch
}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(1);
  const paginatedExams = exams.slice((current-1)*pageSize, current*pageSize);

  useEffect(() => {
    setTotal(exams.length);
    if (!paginatedExams.length) setCurrent(1);
  }, [exams, paginatedExams.length]);
  const isNoData = exams.length === 0;
  return (
    <div>
      <TableHeader>
        <TableHeaderChild> </TableHeaderChild>
        <TableHeaderChild> Course </TableHeaderChild>
        <TableHeaderChild> Course Code </TableHeaderChild>
        <TableHeaderChild> Course Teacher </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </TableHeader>
      {(isNoData && !isLoading) && <NoData />}
      { !isLoading && _.map(paginatedExams, (exam, index) => (
          <ExamCard
            key={`exams_${index}`}
            exam={exam}
            setExamToEdit={setExamToEdit}
            showCreateEditModal={showCreateEditModal}
            deleteExam={deleteExam}
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


export default connect(null, mapDispatchToProps)(ExamTable);