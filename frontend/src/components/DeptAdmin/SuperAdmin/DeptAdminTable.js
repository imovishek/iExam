
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

const DeptAdminCard = ({ deptAdmin, setDeptAdminToEdit, showCreateEditModal, deleteDeptAdmin, onResetPassword }) => (
  <TableRowStyled columns="repeat(3, 1fr) 80px 270px">
    <TableRowChild> { `${deptAdmin.firstName} ${deptAdmin.lastName}` } </TableRowChild>
    <TableRowChild> { deptAdmin.phoneNumber } </TableRowChild>
    <TableRowChild> { deptAdmin.credential.email } </TableRowChild>
    <TableRowChild> { deptAdmin.department.departmentCode } </TableRowChild>
    <TableRowChild>
      <OperationWrapper>
        <StyledButton onClick={() => onResetPassword(deptAdmin)}>Reset Password</StyledButton>
        <Button
          type="primary"
          onClick={() => {
            setDeptAdminToEdit(_.create('', deptAdmin))
            showCreateEditModal(true)
          }}>Edit</Button>
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteDeptAdmin(deptAdmin)}
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

const DeptAdminTable = ({
  deptAdmins = [],
  isLoading,
  setDeptAdminToEdit,
  showCreateEditModal,
  deleteDeptAdmin,
  dispatch
}) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(1)
  const [selectedDeptAdmin, setSelectedDeptAdmin] = useState({});
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  useEffect(() => {
    setTotal(deptAdmins.length)
  }, [deptAdmins])

  const onResetPassword = (deptAdmin) => {
    setSelectedDeptAdmin(deptAdmin);
    setShowResetPasswordModal(true);
  }

  const paginatedDeptAdmins = deptAdmins.slice((current - 1) * pageSize, current * pageSize)
  const isNoData = deptAdmins.length === 0
  return (
    <TableWrapper>
      <Row columns="repeat(3, 1fr) 80px 270px">
        <TableHeaderChild> Name </TableHeaderChild>
        <TableHeaderChild> Phone No </TableHeaderChild>
        <TableHeaderChild> Email ID </TableHeaderChild>
        <TableHeaderChild> Dept </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </Row>
      {(isNoData && !isLoading) && <NoDataComponent title="No DeptAdmins Added" />}
      { !isLoading && _.map(paginatedDeptAdmins, (deptAdmin, index) => (
        <DeptAdminCard
          key={`deptAdmins_${index}`}
          deptAdmin={deptAdmin}
          setDeptAdminToEdit={setDeptAdminToEdit}
          showCreateEditModal={showCreateEditModal}
          deleteDeptAdmin={deleteDeptAdmin}
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
        selectedUser={selectedDeptAdmin}
      />
    </TableWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(DeptAdminTable)
