
import _ from 'underscore'
import { Spin, Button, Popconfirm } from 'antd'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Pagination from '../../Common/Pagination'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { TableRow, TableRowChild, OperationWrapper, FontAwesomeIconWrapper, TableHeader, TableHeaderChild, SpinWrapper } from '../../styles/tableStyles'
import { NoDataComponent } from '../../../utitlities/common.functions'

const StudentCard = ({ dispatch, student, setStudentToEdit, showCreateEditModal, deleteStudent }) => (
  <TableRow>
    <TableRowChild> { `${student.firstName} ${student.lastName}` } </TableRowChild>
    <TableRowChild> { student.registrationNo } </TableRowChild>
    <TableRowChild> { student.phoneNumber } </TableRowChild>
    <TableRowChild> { student.credential.email } </TableRowChild>
    <TableRowChild> { student.department.departmentCode } </TableRowChild>
    <TableRowChild>
      <OperationWrapper>
        <Button
          onClick={() => {
            setStudentToEdit(_.create('', student))
            showCreateEditModal(true)
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

const StudentTable = ({
  students = [],
  isLoading,
  setStudentToEdit,
  showCreateEditModal,
  deleteStudent,
  dispatch
}) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(1)

  useEffect(() => {
    setTotal(students.length)
  }, [students])
  const paginatedStudents = students.slice((current - 1) * pageSize, current * pageSize)
  const isNoData = students.length === 0
  return (
    <div>
      <TableHeader>
        <TableHeaderChild> Name </TableHeaderChild>
        <TableHeaderChild> Registration No </TableHeaderChild>
        <TableHeaderChild> Phone No </TableHeaderChild>
        <TableHeaderChild> Email ID </TableHeaderChild>
        <TableHeaderChild> Department </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </TableHeader>
      {(isNoData && !isLoading) && <NoDataComponent title="No Students Added" />}
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
      { !isLoading && !isNoData &&
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

export default connect(null, mapDispatchToProps)(StudentTable)
