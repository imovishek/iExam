import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Input, Select } from 'antd'
import _ from 'underscore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { mapDesignations } from '../../../utitlities/constants'
import UpdatePassword from './UpdatePassword'
import { ViewInput, ViewSelect } from './styles'

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


const TeacherInfoModal = ({
  user,
  errors,
  setValue,
}) => {
  const [isUserEditing, setUserEditing] = useState(false);
  useEffect(() => {
    setUserEditing(false);
  }, [user.credential]);
  const WrapperInput = !isUserEditing ? ViewInput : InputWrapper;
  const WrapperSelect = !isUserEditing ? ViewSelect : Select;

  return (
    <>
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
          <WrapperInput
            placeholder="First Name"
            value={user.firstName}
            style={{ width: 270 }}
            onChange={(e) => setValue('firstName', e.target.value)}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors.firstName} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Last Name</LabelWrapper>
          <WrapperInput
            placeholder="Last Name"
            value={user.lastName}
            style={{ width: 270 }}
            onChange={(e) => setValue('lastName', e.target.value)}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors.lastName} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Short Name</LabelWrapper>
          <WrapperInput
            placeholder="Short Name"
            value={user.shortName}
            style={{ width: 270 }}
            onChange={(e) => {
              setValue('shortName', e.target.value)
            }}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors.shortName} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Designation</LabelWrapper>
          <WrapperSelect
            placeholder="Choose Designation"
            style={{ width: 270 }}
            value={user.designation}
            onChange={(v) => setValue('designation', v)}
            disabled = {!isUserEditing}
            mapper={mapDesignations}
          >
            {_.map(mapDesignations, (value, key) => <Option value={key}>{value}</Option>)}
          </WrapperSelect>
          <ErrorWrapper> {errors.designation} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Phone Number</LabelWrapper>
          <WrapperInput
            placeholder="Phone Number"
            value={user.phoneNumber}
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
          <WrapperInput
            placeholder="Email"
            value={user.credential.email}
            style={{ width: 270 }}
            onChange={(e) => {
              setValue('email', e.target.value)
            }}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors.email} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr">
        <ColumnWrapper>
          <LabelWrapper>Department</LabelWrapper>
          <WrapperSelect
            defaultValue="CSE"
            style={{ width: 270 }}
            disabled={!isUserEditing}
            mapper={{ CSE: "Computer Science And Engineering" }}
          >
            <Option value="CSE">Computer Science And Engineering</Option>
          </WrapperSelect>
        </ColumnWrapper>
      </Row>
      {isUserEditing && <UpdatePassword user={user} setValue={setValue} errors={errors}/>}
    </>
  )
}

export default TeacherInfoModal
