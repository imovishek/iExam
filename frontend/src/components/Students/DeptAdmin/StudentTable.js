
import _ from 'underscore'
import { Button, Popconfirm } from 'antd'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Pagination from '../../Common/Pagination'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { TableRowChild, OperationWrapper, FontAwesomeIconWrapper, TableHeaderChild, TableWrapper, TableRowStyled } from '../../styles/tableStyles'
import { NoDataComponent } from '../../../utitlities/common.functions'
import Loading from '../../Common/Loading'
import ResetPasswordModal from '../ResetPasswordModal';
import { Row } from '../../../utitlities/styles'

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const StudentCard = ({ student, setStudentToEdit, showCreateEditModal, deleteStudent, onResetPassword }) => (
  <TableRowStyled columns="repeat(4, 1fr) 80px 270px">
    <TableRowChild> { `${student.firstName} ${student.lastName}` } </TableRowChild>
    <TableRowChild> { student.registrationNo } </TableRowChild>
    <TableRowChild> { student.phoneNumber } </TableRowChild>
    <TableRowChild> { student.credential.email } </TableRowChild>
    <TableRowChild> { student.department.departmentCode } </TableRowChild>
    <TableRowChild>
      <OperationWrapper>
        <StyledButton onClick={() => onResetPassword(student)}>Reset Password</StyledButton>
        <Button
          type="primary"
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
  </TableRowStyled>
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
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState({});
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  useEffect(() => {
    setTotal(students.length)
  }, [students])

  const onResetPassword = (student) => {
    setSelectedStudent(student);
    setShowResetPasswordModal(true);
  }

  const paginatedStudents = students.slice((current - 1) * pageSize, current * pageSize)
  const isNoData = students.length === 0
  return (
    <TableWrapper>
      <Row columns="repeat(4, 1fr) 80px 270px">
        <TableHeaderChild> Name </TableHeaderChild>
        <TableHeaderChild> Registration No </TableHeaderChild>
        <TableHeaderChild> Phone No </TableHeaderChild>
        <TableHeaderChild> Email ID </TableHeaderChild>
        <TableHeaderChild> Dept </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </Row>
      {(isNoData && !isLoading) && <NoDataComponent title="No Students Added" />}
      { !isLoading && _.map(paginatedStudents, (student, index) => (
        <StudentCard
          key={`students_${index}`}
          student={student}
          setStudentToEdit={setStudentToEdit}
          showCreateEditModal={showCreateEditModal}
          deleteStudent={deleteStudent}
          dispatch={dispatch}
          onResetPassword={onResetPassword}
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
      <Loading isLoading={isLoading} style={{left: '58vw', top: '30vh'}}/>
      <ResetPasswordModal
        visible={showResetPasswordModal}
        setVisibility={setShowResetPasswordModal}
        selectedUser={selectedStudent}
      />
    </TableWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(StudentTable)
