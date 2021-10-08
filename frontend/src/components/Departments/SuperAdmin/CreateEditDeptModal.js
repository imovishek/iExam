import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import deptValidator from '../dept.validation'
import { Modal, Input, Select } from 'antd'
import _ from 'underscore'
import { joiObjectParser, isValidEmail } from '../../../utitlities/common.functions'
import api from '../../../utitlities/api'

const { Option } = Select

const InputWrapper = styled(Input)`
  height: 40px;
  border-radius: 5px;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'none'};
`

const ColumnWrapper = styled.div`
  margin-right: 20px;
  margin-bottom: 15px;
`

const LabelWrapper = styled.p`
  margin-bottom: 5px;
  color: #608794;
`

const ErrorWrapper = styled.p`
  font-size: 11px;
  color: #d40909;
  margin-left: 5px;
  height: 20px;
`

const CreateEditModal = ({
  selectedDept,
  visible,
  setVisibility,
  createDept,
  updateDept,
}) => {
  const isEditing = !(!selectedDept)
  const title = isEditing ? 'Edit Department' : 'Create Department'
  const defaultDept = {
    departmentCode: 'CSE',
    departmentName: 'Computer Science and Engineering',
  }

  const [dept, setDept] = useState(defaultDept)

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const editDept = selectedDept ? {
      ...JSON.parse(JSON.stringify(selectedDept)),
      departmentCode: selectedDept.departmentCode
    } : null
    setDept(editDept || defaultDept)
  }, [isEditing, selectedDept])

  const setValue = (key, value) => {
    const newDept = {
      ...dept,
      [key]: value
    }
    if (key === 'departmentCode') {
      newDept.departmentCode = value
    }
    const newErrors = {
      ...errors
    }
    delete newErrors[key]

    setDept(newDept)
    setErrors(newErrors)
  }

  const closeModal = () => {
    setVisibility(false)
    setDept(defaultDept)
    setErrors({})
  }


  const onSubmit = async () => {
    const newErrors = joiObjectParser(dept, deptValidator)
    setErrors(newErrors)
    if (!_.isEmpty(newErrors)) {
      return
    }

    if (isEditing) { updateDept(dept) } else {
      createDept(dept)
    }
    closeModal()
  }

  return (
    <Modal
      title={title}
      style={{ top: 20 }}
      visible={visible}
      width={800}
      height={800}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      okText={!isEditing ? 'Save' : 'Update'}
    >
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Department Name</LabelWrapper>
          <InputWrapper
            placeholder="Department Name"
            value={dept.departmentName}
            style={{ width: 270 }}
            onChange={(e) => setValue('departmentName', e.target.value)}
          />
          <ErrorWrapper> {errors.departmentName} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Department Code</LabelWrapper>
          <InputWrapper
            placeholder="Department Code"
            value={dept.departmentCode}
            style={{ width: 270 }}
            onChange={(e) => setValue('departmentCode', e.target.value)}
          />
          <ErrorWrapper> {errors.departmentCode} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
    </Modal>
  )
}

export default CreateEditModal
