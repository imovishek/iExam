
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
import { Row } from '../../../utitlities/styles'

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const DeptCard = ({ dept, setDeptToEdit, showCreateEditModal, deleteDept, onResetPassword }) => (
  <TableRowStyled columns="repeat(3, 3fr) 80px 270px">
    <TableRowChild> { dept.departmentName } </TableRowChild>
    <TableRowChild>  </TableRowChild>
    <TableRowChild> { dept.departmentCode } </TableRowChild>
    <TableRowChild>  </TableRowChild>
    <TableRowChild>
      <OperationWrapper>
        <Button
          type="primary"
          onClick={() => {
            setDeptToEdit(_.create('', dept))
            showCreateEditModal(true)
          }}>Edit</Button>
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteDept(dept)}
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

const DeptTable = ({
  depts = [],
  isLoading,
  setDeptToEdit,
  showCreateEditModal,
  deleteDept,
  dispatch
}) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(1)
  const [selectedDept, setSelectedDept] = useState({});

  useEffect(() => {
    setTotal(depts.length)
  }, [depts])

  const paginatedDepts = depts.slice((current - 1) * pageSize, current * pageSize)
  const isNoData = depts.length === 0
  return (
    <TableWrapper>
      <Row columns="repeat(3, 1fr) 80px 270px">
        <TableHeaderChild> Department Name </TableHeaderChild>
        <TableRowChild>  </TableRowChild>
        <TableHeaderChild> Department Code </TableHeaderChild>
        <TableHeaderChild></TableHeaderChild>
      </Row>
      {(isNoData && !isLoading) && <NoDataComponent title="No Depts Added" />}
      { !isLoading && _.map(paginatedDepts, (dept, index) => (
        <DeptCard
          key={`depts_${index}`}
          dept={dept}
          setDeptToEdit={setDeptToEdit}
          showCreateEditModal={showCreateEditModal}
          deleteDept={deleteDept}
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
      <Loading isLoading={isLoading} style={{left: '58vw', top: '30vh'}}/>
    </TableWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(DeptTable)
