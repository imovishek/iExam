import styled from 'styled-components'
import React, { useState } from 'react'
import userValidator from '../user.validation'
import { Modal, Input, Select } from 'antd'
import _ from 'underscore'
import { joiObjectParser } from '../../../utitlities/common.functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import UpdatePassword from './UpdatePassword'

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
`
const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  margin: auto;
  margin-right: 5px;
  height: 25px;
  width: 50px;
  cursor: pointer;
  :hover{
    color: #40a9aa;
  }
  float: right;
`
const StudentInfoModal = ({
  selectedUser,
  visible,
  setVisibility,
  updateUser
}) => {
  const title = 'My Info'
  const [user, setUser] = useState(selectedUser)
  const [errors, setErrors] = useState({})

  const setValue = (key, value) => {
    const newUser = {
      ...user,
      [key]: value
    }
    const newErrors = {
      ...errors
    }
    delete newErrors[key]
    setUser(newUser)
    setErrors(newErrors)
  }

  const checkCredentialOnChange = async (email) => {

  }
  const closeModal = () => {
    setVisibility(false)
    setErrors({})
    setUserEditing(false)
  }

  const checkCredentialOnChangeDebounced = _.debounce(checkCredentialOnChange, 300)
  const onSubmit = () => {
    const errors = joiObjectParser(user, userValidator)
    setErrors(errors)
    if (!_.isEmpty(errors)) {
      return
    }
    updateUser(user)
    closeModal()
  }
  const [isUserEditing, setUserEditing] = useState(false)
  
  return (
    <Modal
      title={title}
      style={{ top: 20 }}
      visible={visible}
      width={800}
      height={800}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      okText="Update"
    >
      <Row columns="1fr">
        <FontAwesomeIconWrapper
          onClick={() => {
            setUserEditing(!isUserEditing)
          }}
          icon={faUserEdit}
        />
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>First Name</LabelWrapper>
          <InputWrapper
            placeholder="First Name"
            value={selectedUser.firstName}
            style={{ width: 270 }}
            onChange={(e) => setValue('firstName', e.target.value)}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors.firstName} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Last Name</LabelWrapper>
          <InputWrapper
            placeholder="Last Name"
            value={selectedUser.lastName}
            style={{ width: 270 }}
            onChange={(e) => setValue('lastName', e.target.value)}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors.lastName} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Phone Number</LabelWrapper>
          <InputWrapper
            placeholder="Phone Number"
            value={selectedUser.phoneNumber}
            style={{ width: 270 }}
            onChange={(e) => {
              setValue('phoneNumber', e.target.value)
            }}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors.phoneNumber} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Email</LabelWrapper>
          <InputWrapper
            placeholder="Email"
            value={selectedUser.credential.email}
            style={{ width: 270 }}
            onChange={(e) => {
              setValue('email', e.target.value)
              checkCredentialOnChangeDebounced(e.target.value)
            }}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors.email} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Registration No</LabelWrapper>
          <InputWrapper
            placeholder="Registration No"
            value={selectedUser.registrationNo}
            style={{ width: 270 }}
            onChange={(e) => {
              setValue('registrationNo', e.target.value)
            }}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors.registrationNo} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Auto save</LabelWrapper>
          <InputWrapper
            style={{ width: 270 }}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors.registrationNo} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr">
        <ColumnWrapper>
          <LabelWrapper>Department</LabelWrapper>
          <Select
            defaultValue="CSE"
            style={{ width: 270 }}
            disabled = {!isUserEditing}
          >
            <Option value="CSE">Computer Science And Engineering</Option>
          </Select>
        </ColumnWrapper>
      </Row>
      {isUserEditing && <UpdatePassword user={user} setValue={setValue} errors={errors}/>}
    </Modal>
  )
}

export default StudentInfoModal
