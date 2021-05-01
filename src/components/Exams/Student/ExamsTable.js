
import styled from 'styled-components'
import _ from 'underscore'
import { Spin, Button } from 'antd'
import Pagination from '../../Common/Pagination'
import React, { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import moment from 'moment';
import { connect } from 'react-redux'
import { formatDateAndTime, NoDataComponent } from '../../../utitlities/common.functions'
import { TableRowFlex, TableRowChild, OperationWrapper, TableHeader, TableHeaderChild, SpinWrapper, TableWrapper } from '../../styles/tableStyles'

const TableBodyWrapper = styled.div`
  overflow: auto;
`

const getName = obj => `${obj.firstName} ${obj.lastName}`

const ExamCard = ({ dispatch, exam }) => {
  const shouldEnter = true;
  return (
    <TableRowFlex>
      <TableRowChild> { exam.title } </TableRowChild>
      <TableRowChild> { exam.course.title } </TableRowChild>
      <TableRowChild> { exam.course.courseCode } </TableRowChild>
      <TableRowChild> { exam.course.assignedTeacher ? getName(exam.course.assignedTeacher) : 'Unassigned'} </TableRowChild>
      <TableRowChild> { formatDateAndTime(exam.startDate, exam.startTime) } </TableRowChild>
      <TableRowChild> { exam.duration } </TableRowChild>
      <TableRowChild>
        <OperationWrapper>
          { shouldEnter &&
              <Button
                type="primary"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  dispatch(push(`/exam/${exam._id}`))
                  // setExamToEdit(_.create('', exam));
                  // showCreateEditModal(true);
                }}>Enter</Button>
          }
        </OperationWrapper>
      </TableRowChild>
    </TableRowFlex>
  )
}


const ExamTable = ({
  exams = [],
  isLoading,
  setExamToEdit,
  showCreateEditModal,
  deleteExam,
  dispatch
}) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(1)
  const paginatedExams = exams.slice((current - 1) * pageSize, current * pageSize)

  useEffect(() => {
    setTotal(exams.length)
    if (!paginatedExams.length) setCurrent(1)
  }, [exams, paginatedExams.length])
  const isNoData = exams.length === 0
  return (
    <TableWrapper>
      <TableHeader>
        <TableHeaderChild> </TableHeaderChild>
        <TableHeaderChild> Course </TableHeaderChild>
        <TableHeaderChild> Course Code </TableHeaderChild>
        <TableHeaderChild> Course Teacher </TableHeaderChild>
        <TableHeaderChild> Start Time </TableHeaderChild>
        <TableHeaderChild> Duration </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </TableHeader>
      {(isNoData && !isLoading) && <NoDataComponent title="No Exams" />}
      <TableBodyWrapper>
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
    </TableWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(ExamTable)
