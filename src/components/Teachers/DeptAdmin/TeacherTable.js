import _ from 'underscore'
import { Button, Popconfirm } from 'antd'
import styled from 'styled-components'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Pagination from '../../Common/Pagination'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { TableRowChild, OperationWrapper, FontAwesomeIconWrapper, TableHeaderChild, TableWrapper, TableRowStyled } from '../../styles/tableStyles'
import { mapDesignations } from '../../../utitlities/constants'
import { NoDataComponent } from '../../../utitlities/common.functions'
import Loading from '../../Common/Loading'
import { Row } from '../../../utitlities/styles'
import ResetPasswordModal from '../../Students/ResetPasswordModal'

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const TeacherCard = ({ onResetPassword, teacher, setTeacherToEdit, showCreateEditModal, deleteTeacher }) => (
  <TableRowStyled columns="repeat(4, 1fr) 80px 270px">
    <TableRowChild> { `${teacher.firstName} ${teacher.lastName}` } </TableRowChild>
    <TableRowChild> { mapDesignations[teacher.designation] } </TableRowChild>
    <TableRowChild> { teacher.phoneNumber } </TableRowChild>
    <TableRowChild> { teacher.credential.email } </TableRowChild>
    <TableRowChild> { teacher.department.departmentCode } </TableRowChild>
    <TableRowChild>
      <OperationWrapper>
        <StyledButton onClick={() => onResetPassword(teacher)}>Reset Password</StyledButton>
        <Button
          type="primary"
          onClick={() => {
            setTeacherToEdit(_.create('', teacher))
            showCreateEditModal(true)
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
  </TableRowStyled>
)

const TeacherTable = ({
  teachers = [],
  isLoading,
  setTeacherToEdit,
  showCreateEditModal,
  deleteTeacher,
  dispatch
}) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(1)
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  useEffect(() => {
    setTotal(teachers.length)
  }, [teachers])

  const onResetPassword = (student) => {
    setSelectedTeacher(student);
    setShowResetPasswordModal(true);
  }
  
  const paginatedTeachers = teachers.slice((current - 1) * pageSize, current * pageSize)
  const isNoData = teachers.length === 0;
  return (
    <TableWrapper>
      <Row columns="repeat(4, 1fr) 80px 270px">
        <TableHeaderChild> Name </TableHeaderChild>
        <TableHeaderChild> Designation </TableHeaderChild>
        <TableHeaderChild> Phone No </TableHeaderChild>
        <TableHeaderChild> Email </TableHeaderChild>
        <TableHeaderChild> Dept </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </Row>
      {isNoData && !isLoading && <NoDataComponent title="No Teachers Added" />}
      { !isLoading && _.map(paginatedTeachers, (teacher, index) => (
        <TeacherCard
          key={`teachers_${index}`}
          teacher={teacher}
          setTeacherToEdit={setTeacherToEdit}
          showCreateEditModal={showCreateEditModal}
          deleteTeacher={deleteTeacher}
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
      <Loading isLoading={isLoading} style={{top: '30vh', left: '58vw'}}/>
      <ResetPasswordModal
        visible={showResetPasswordModal}
        setVisibility={setShowResetPasswordModal}
        selectedUser={selectedTeacher}
      />
    </TableWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(TeacherTable)
