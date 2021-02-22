
import styled from 'styled-components';
import _ from 'underscore';
import { Spin, Popconfirm } from 'antd';
import Pagination from '../../Common/Pagination';
import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { TableRowChild, CenterNoData, TableHeaderChild, SpinWrapper } from '../../styles/tableStyles';
import api from '../../../utitlities/api';
import { AwesomeIcon } from '../../../utitlities/styles';
import { RightButtonWrapper, Row } from '../../styles/pageStyles';

const TableRowStyled = styled(Row)`
  cursor: pointer;
  :hover {
    background: #e4e4e4;
  }
`

const getName = obj => `${obj.firstName} ${obj.lastName}`

const QuestionCard = ({ dispatch, question, setQuestionToEdit, showCreateEditModal, deleteQuestion, authorName }) => (
  <TableRowStyled columns="repeat(4, 1fr) 60px" onClick={() => dispatch(push(`/question/${question._id}`))}>
    <TableRowChild> { question.title } </TableRowChild>
    <TableRowChild> { (question.type || '').toUpperCase() } </TableRowChild>
    <TableRowChild> { question.marks } </TableRowChild>
    <TableRowChild> { authorName } </TableRowChild>
    <TableRowChild>
      <RightButtonWrapper style={{ height: '100%' }}>
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onConfirm={(e) => {
            e.preventDefault()
            e.stopPropagation()
            deleteQuestion(question)
          }}
          onCancel={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <AwesomeIcon type="delete" />
        </Popconfirm>
      </RightButtonWrapper>
    </TableRowChild>
  </TableRowStyled>
)

const NoData = () => <CenterNoData>No Questions</CenterNoData>

const QuestionTable = ({
  questions = [],
  isLoading,
  setQuestionToEdit,
  showCreateEditModal,
  deleteQuestion,
  dispatch
}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(1);
  const [teachersObj, setTeachersObj] = useState({});
  const paginatedQuestions = questions.slice((current - 1) * pageSize, current * pageSize);
  useEffect(async () => {
    const { payload: teachers } = await api.getTeachers({})
    const obj = {}
    _.map(teachers, teacher => { obj[teacher._id] = getName(teacher) })
    setTeachersObj(obj)
  }, [])
  useEffect(() => {
    setTotal(questions.length)
    if (!paginatedQuestions.length) setCurrent(1)
  }, [questions, paginatedQuestions.length])
  const isNoData = questions.length === 0
  return (
    <div>
      <Row columns="repeat(4, 1fr) 60px">
        <TableHeaderChild> Question Title </TableHeaderChild>
        <TableHeaderChild> Question Type </TableHeaderChild>
        <TableHeaderChild> Marks </TableHeaderChild>
        <TableHeaderChild> Author </TableHeaderChild>
        <TableHeaderChild> </TableHeaderChild>
      </Row>
      {(isNoData && !isLoading) && <NoData />}
      { !isLoading && _.map(paginatedQuestions, (question, index) => (
        <QuestionCard
          key={`questions_${index}`}
          question={question}
          authorName={teachersObj[question.authorID] || 'Annonymous'}
          setQuestionToEdit={setQuestionToEdit}
          showCreateEditModal={showCreateEditModal}
          deleteQuestion={deleteQuestion}
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

export default connect(null, mapDispatchToProps)(QuestionTable)
