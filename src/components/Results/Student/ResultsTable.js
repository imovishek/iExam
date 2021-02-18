
import styled from 'styled-components'
import _ from 'underscore'
import { Spin } from 'antd'
import Pagination from '../../Common/Pagination'
import React, { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import {TableRowChild, CenterNoData, TableHeader, TableHeaderChild, SpinWrapper } from '../../styles/tableStyles'

const TableBodyWrapper = styled.div`
  overflow: auto;
`
export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;
  background: #f3f3f3;
  margin-top: 5px;
  cursor: pointer;
  :hover {
    background: #dedede;
  }
`

const getName = obj => `${obj.firstName} ${obj.lastName}`

const ResultCard = ({ exam, user, dispatch }) => {
  const papers = _.filter(exam.papers, paper => paper.student === user._id);
  const paper = papers[0] || { answers: [] };
  return (
    <TableRow onClick={() => dispatch(push(`/exam/${exam._id}`))}>
      <TableRowChild> { exam.title } </TableRowChild>
      <TableRowChild> { exam.course.title } </TableRowChild>
      <TableRowChild> { exam.course.assignedTeacher ? getName(exam.course.assignedTeacher) : 'Unassigned'} </TableRowChild>
      <TableRowChild> { exam.department.departmentCode } </TableRowChild>
      <TableRowChild> { paper.answers.length } </TableRowChild>
      <TableRowChild>
        {`${paper.totalMarks || 'N/A'} / ${exam.totalMarks}`}
      </TableRowChild>
    </TableRow>
  )
}

const NoData = () => <CenterNoData>No Exams :)</CenterNoData>

const ResultsTable = ({
  exams = [],
  isLoading,
  dispatch,
  user
}) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(1)
  const paginatedExams = exams.slice((current - 1) * pageSize, current * pageSize)

  useEffect(() => {
    setTotal(exams.length)
    if (!paginatedExams.length) setCurrent(1)
  }, [exams, paginatedExams.length])
  const isNoData = exams.length === 0
  return (
    <div>
      <TableHeader>
        <TableHeaderChild> Exam Title </TableHeaderChild>
        <TableHeaderChild> Course </TableHeaderChild>
        <TableHeaderChild> Course Teacher </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild> Answered Questions </TableHeaderChild>
        <TableHeaderChild> Result </TableHeaderChild>
      </TableHeader>
      {(isNoData && !isLoading) && <NoData />}
      <TableBodyWrapper>
        { !isLoading && _.map(paginatedExams, (exam, index) => (
          <ResultCard
            key={`exams_${index}`}
            exam={exam}
            user={user}
            dispatch={dispatch}
          />
        ))}
      </TableBodyWrapper>

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
const mapStateToProps = state => ({
  user: state.login.user
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTable)