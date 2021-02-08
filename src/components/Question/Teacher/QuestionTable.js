
import styled from "styled-components";
import _ from 'underscore';
import { Spin, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Common/Pagination";
import React, { useState, useEffect } from "react";
import { deleteQuestion } from "../../utitlities/api";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { TableRow, TableRowChild, OperationWrapper, FontAwesomeIconWrapper, CenterNoData, TableHeader, TableHeaderChild, SpinWrapper } from "../styles/tableStyles";

const QuestionCard = ({ dispatch, question, setQuestionToEdit, showCreateEditModal, deleteQuestion }) => {
    return (
        <TableRow>
            <TableRowChild> { question.firstName } </TableRowChild>
            <TableRowChild> { question.lastName } </TableRowChild>
            <TableRowChild> { question.department.departmentCode } </TableRowChild>
            <TableRowChild>
                <OperationWrapper>
                  <Button onClick={() => {
                    setQuestionToEdit(_.create('', question));
                    showCreateEditModal(true);
                  }}>Edit</Button>
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => deleteQuestion(question)}
                >
                  <FontAwesomeIconWrapper
                    icon={faTrash}
                    color="#a02f2f"
                  />
                </Popconfirm>
              </OperationWrapper>
            </TableRowChild>
        </TableRow>
    )
};

const QuestionTable = ({
  questions = [],
  isLoading,
  setQuestionToEdit,
  showCreateEditModal,
  deleteQuestion,
  dispatch
}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    setTotal(questions.length);
  }, [questions]);
  const paginatedQuestions = questions.slice((current-1)*pageSize, current*pageSize);
  return (
    <div>
      <TableHeader>
        <TableHeaderChild> First Name </TableHeaderChild>
        <TableHeaderChild> Last Name </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </TableHeader>
      { !isLoading && _.map(paginatedQuestions, (question, index) => (
          <QuestionCard
            key={`questions_${index}`}
            question={question}
            setQuestionToEdit={setQuestionToEdit}
            showCreateEditModal={showCreateEditModal}
            deleteQuestion={deleteQuestion}
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


export default connect(null, mapDispatchToProps)(QuestionTable);