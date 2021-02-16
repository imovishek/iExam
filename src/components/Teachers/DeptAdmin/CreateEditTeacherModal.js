import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import teacherValidator from '../teacher.validation'
import { Modal, Input, Select } from 'antd'
import _ from 'underscore'
import { joiObjectParser, isValidEmail } from '../../../utitlities/common.functions'
import api from '../../../utitlities/api'
import { mapDesignations } from '../../../utitlities/constants'

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

const CreateEditTeacherModal = ({
  selectedTeacher,
  visible,
  setVisibility,
  createTeacher,
  updateTeacher,
  previousEmail
}) => {
  const isEditing = !(!selectedTeacher)
  const title = isEditing ? 'Edit Teacher' : 'Create Teacher'
  const defaultTeacher = {
    firstName: '',
    lastName: '',
    shortName: '',
    designation: null,
    phoneNumber: '',
    department: {
      departmentCode: 'CSE',
      departmentName: 'Computer Science and Engineering'
    },
    credential: {
      email: '',
      password: 'superuser',
      userType: 'teacher'
    },
    userType: 'teacher',
    questions: []
  }

  const [teacher, setTeacher] = useState(isEditing
    ? { ...selectedTeacher, email: selectedTeacher.credential.email }
    : defaultTeacher)

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const editTeacher = selectedTeacher ? { ...selectedTeacher, email: selectedTeacher.credential.email } : null
    setTeacher(editTeacher || defaultTeacher)
  }, [isEditing, selectedTeacher])

  const setValue = (key, value) => {
    const newTeacher = {
      ...teacher,
      [key]: value
    }
    if (key === 'email') {
      newTeacher.credential.email = value
    }
    const newErrors = {
      ...errors
    }
    delete newErrors[key]

    setTeacher(newTeacher)
    setErrors(newErrors)
  }

  const closeModal = () => {
    setVisibility(false)
    setTeacher(defaultTeacher)
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
    const email = teacher.email
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

  const checkCredentialOnChangeDebounced = _.debounce(checkCredentialOnChange, 300)

  const onSubmit = async () => {
    let newErrors = joiObjectParser(teacher, teacherValidator)
    if (teacher.email && !isValidEmail(teacher.email)) {
      newErrors.email = 'Email is invalid'
    }
    const credError = await getErrorCheckingCredentials(teacher.email)
    newErrors = { ...credError, ...newErrors }
    setErrors(newErrors)
    if (!_.isEmpty(newErrors)) {
      return
    }

    if (isEditing) updateTeacher(teacher)
    else {
      createTeacher(teacher)
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
            value={teacher.firstName}
            style={{ width: 270 }}
            onChange={(e) => setValue('firstName', e.target.value)}
          />
          <ErrorWrapper> {errors.firstName} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Last Name</LabelWrapper>
          <InputWrapper
            placeholder="Last Name"
            value={teacher.lastName}
            style={{ width: 270 }}
            onChange={(e) => setValue('lastName', e.target.value)}
          />
          <ErrorWrapper> {errors.lastName} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Short Name</LabelWrapper>
          <InputWrapper
            placeholder="Short Name"
            value={teacher.shortName}
            style={{ width: 270 }}
            onChange={(e) => setValue('shortName', e.target.value)}
          />
          <ErrorWrapper> {errors.shortName} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Designation</LabelWrapper>
          <Select
            placeholder="Choose Designation"
            style={{ width: 270 }}
            value={teacher.designation}
            onChange={(v) => setValue('designation', v)}
          >
            {_.map(mapDesignations, (value, key) => <Option value={key}>{value}</Option>)}
          </Select>
          <ErrorWrapper> {errors.designation} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Phone Number</LabelWrapper>
          <InputWrapper
            placeholder="Phone Number"
            value={teacher.phoneNumber}
            style={{ width: 270 }}
            onChange={(e) => setValue('phoneNumber', e.target.value)}
          />
          <ErrorWrapper> {errors.phoneNumber} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Email</LabelWrapper>
          <InputWrapper
            placeholder="Email"
            value={teacher.credential.email}
            style={{ width: 270 }}
            onChange={(e) => {
              setValue('email', e.target.value)
              checkCredentialOnChangeDebounced(e.target.value)
            }}
          />
          <ErrorWrapper> {errors.email} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr">
        <ColumnWrapper>
          <LabelWrapper>Department</LabelWrapper>
          <Select
            defaultValue="CSE"
            style={{ width: 270 }}
          >
            <Option value="CSE">Computer Science And Engineering</Option>
          </Select>
        </ColumnWrapper>
      </Row>
    </Modal>
  )
}

export default CreateEditTeacherModal
