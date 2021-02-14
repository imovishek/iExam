import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import studentValidator from '../student.validation'
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

const CreateEditStudentModal = ({
  selectedStudent,
  visible,
  setVisibility,
  createStudent,
  updateStudent,
  previousEmail
}) => {
  const isEditing = !(!selectedStudent)
  const title = isEditing ? 'Edit Student' : 'Create Student'
  const defaultStudent = {
    firstName: '',
    lastName: '',
    registrationNo: '',
    department: {
      departmentCode: 'CSE',
      departmentName: 'Computer Science and Engineering'
    },
    credential: {
      email: '',
      password: 'superuser',
      userType: 'student'
    },
    userType: 'student'
  }

  const [student, setStudent] = useState(isEditing
    ? { ...selectedStudent, email: selectedStudent.credential.email }
    : defaultStudent)

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const editStudent = selectedStudent ? { ...selectedStudent, email: selectedStudent.credential.email } : null
    setStudent(editStudent || defaultStudent)
  }, [isEditing, selectedStudent])

  const setValue = (key, value) => {
    const newStudent = {
      ...student,
      [key]: value
    }
    if (key === 'email') {
      newStudent.credential.email = value
    }
    const newErrors = {
      ...errors
    }
    delete newErrors[key]

    setStudent(newStudent)
    setErrors(newErrors)
  }

  const closeModal = () => {
    setVisibility(false)
    setStudent(defaultStudent)
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
    const email = student.email
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
    let newErrors = joiObjectParser(student, studentValidator)
    if (student.email && !isValidEmail(student.email)) {
      newErrors.email = 'Email is invalid'
    }
    const credError = await getErrorCheckingCredentials(student.email)
    newErrors = { ...credError, ...newErrors }
    setErrors(newErrors)
    if (!_.isEmpty(newErrors)) {
      return
    }

    if (isEditing) { updateStudent(student) } else {
      createStudent(student)
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
            value={student.firstName}
            style={{ width: 270 }}
            onChange={(e) => setValue('firstName', e.target.value)}
          />
          <ErrorWrapper> {errors.firstName} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Last Name</LabelWrapper>
          <InputWrapper
            placeholder="Last Name"
            value={student.lastName}
            style={{ width: 270 }}
            onChange={(e) => setValue('lastName', e.target.value)}
          />
          <ErrorWrapper> {errors.lastName} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Registration Number</LabelWrapper>
          <InputWrapper
            placeholder="Registration Number"
            value={student.registrationNo}
            style={{ width: 270 }}
            onChange={(e) => setValue('registrationNo', e.target.value)}
          />
          <ErrorWrapper> {errors.registrationNo} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Email</LabelWrapper>
          <InputWrapper
            placeholder="Email"
            value={student.credential.email}
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
            style={{ width: 300 }}
          >
            <Option value="CSE">Computer Science And Engineering</Option>
          </Select>
        </ColumnWrapper>
      </Row>
    </Modal>
  )
}

export default CreateEditStudentModal
