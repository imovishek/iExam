import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import deptAdminValidator from '../deptAdmin.validation'
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

const CreateEditDeptAdminModal = ({
  selectedDeptAdmin,
  visible,
  setVisibility,
  createDeptAdmin,
  updateDeptAdmin,
  previousEmail,
  depts
}) => {
  const isEditing = !(!selectedDeptAdmin)
  const title = isEditing ? 'Edit Department Admin' : 'Create Department Admin'
  const defaultDeptAdmin = {
    firstName: '',
    lastName: '',
    registrationNo: '',
    phoneNumber: '',
    department: {
      departmentCode: 'CSE',
      departmentName: 'Computer Science and Engineering'
    },
    credential: {
      email: '',
      password: 'superuser',
      userType: 'deptAdmin',
      // userType: 'superUser'
    },
    userType: 'deptAdmin'
    // userType: 'superUser'
  }

  const [deptAdmin, setDeptAdmin] = useState(defaultDeptAdmin)

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const editDeptAdmin = selectedDeptAdmin ? {
      ...JSON.parse(JSON.stringify(selectedDeptAdmin)),
      email: selectedDeptAdmin.credential.email
    } : null
    setDeptAdmin(editDeptAdmin || defaultDeptAdmin)
  }, [isEditing, selectedDeptAdmin])
  useEffect(()=>{
    console.log(depts)
  },[depts])

  const setValue = (key, value) => {
    const newDeptAdmin = {
      ...deptAdmin,
      [key]: value
    }
    if (key === 'email') {
      newDeptAdmin.credential.email = value
    }
    const newErrors = {
      ...errors
    }
    delete newErrors[key]

    setDeptAdmin(newDeptAdmin)
    setErrors(newErrors)
  }

  const closeModal = () => {
    setVisibility(false)
    setDeptAdmin(defaultDeptAdmin)
    setErrors({})
  }

  const emailInvalidLabel = 'Email is invalid'
  const emailAlreadyExistLabel = 'Email Already Exists'

  const checkCredentialOnChange = async (email) => {
    if (!email) return
    if (previousEmail === email) return
    if (!isValidEmail(email)) {
      const newErrors = { ...errors, email: emailInvalidLabel }
      setErrors(newErrors)
      return
    }
    const { payload } = await api.getCredentials({ email })
    if (payload.length) {
      const newErrors = { ...errors, email: emailAlreadyExistLabel }
      setErrors(newErrors)
    }
  }

  const getErrorCheckingCredentials = async () => {
    const email = deptAdmin.email
    if (!email) return {}
    if (previousEmail === email) return {}
    if (!isValidEmail(email)) {
      return { email: emailInvalidLabel }
    }
    const { payload } = await api.getCredentials({ email })
    if (payload.length) {
      return { email: emailAlreadyExistLabel }
    }
  }

  const checkCredentialOnChangeDebounced = checkCredentialOnChange

  const onSubmit = async () => {
    let newErrors = joiObjectParser(deptAdmin, deptAdminValidator)
    if (deptAdmin.email && !isValidEmail(deptAdmin.email)) {
      newErrors.email = 'Email is invalid'
    }
    const credError = await getErrorCheckingCredentials(deptAdmin.email)
    newErrors = { ...credError, ...newErrors }
    setErrors(newErrors)
    if (!_.isEmpty(newErrors)) {
      return
    }

    if (isEditing) { updateDeptAdmin(deptAdmin) } else {
      console.log(deptAdmin)
      createDeptAdmin(deptAdmin)
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
          <LabelWrapper>First Name</LabelWrapper>
          <InputWrapper
            placeholder="First Name"
            value={deptAdmin.firstName}
            style={{ width: 270 }}
            onChange={(e) => setValue('firstName', e.target.value)}
          />
          <ErrorWrapper> {errors.firstName} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Last Name</LabelWrapper>
          <InputWrapper
            placeholder="Last Name"
            value={deptAdmin.lastName}
            style={{ width: 270 }}
            onChange={(e) => setValue('lastName', e.target.value)}
          />
          <ErrorWrapper> {errors.lastName} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Phone Number</LabelWrapper>
          <InputWrapper
            placeholder="Phone Number"
            value={deptAdmin.phoneNumber}
            style={{ width: 270 }}
            onChange={(e) => setValue('phoneNumber', e.target.value)}
          />
          <ErrorWrapper> {errors.phoneNumber} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Email</LabelWrapper>
          <InputWrapper
            placeholder="Email"
            value={deptAdmin.credential.email}
            style={{ width: 270 }}
            onChange={(e) => {
              setValue('email', e.target.value)
              checkCredentialOnChangeDebounced(e.target.value)
            }}
          />
          <ErrorWrapper> {errors.email} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr">

        <ColumnWrapper>
          <LabelWrapper>Department</LabelWrapper>
          <select
            defaultValue="CSE"
            style={{ width: 300 }}
          >
            {depts.map(((dept,index)=><option 
              key={index}
              value={dept.departmentCode}
              onClick={()=>{setValue('department',{ 
                departmentCode: dept.departmentCode,
                departmentName: dept.departmentName
              })}}
            >{dept.departmentName}</option>))}
          </select>
        </ColumnWrapper>
      </Row>
    </Modal>
  )
}

export default CreateEditDeptAdminModal
