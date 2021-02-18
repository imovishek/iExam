import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import UpdatePassword from './UpdatePassword'
import { ViewInput } from './styles'


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
const DeptAdminInfoModal = ({
  user,
  errors,
  setValue
}) => {
  const [isUserEditing, setUserEditing] = useState(false);
  const WrapperInput = !isUserEditing ? ViewInput : InputWrapper;
  useEffect(() => {
    setUserEditing(false);
  }, [user.credential]);
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
      <Row columns="1fr">
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
      {isUserEditing && <UpdatePassword user={user} setValue={setValue} errors={errors}/>}
    </>
  )
}

export default DeptAdminInfoModal
