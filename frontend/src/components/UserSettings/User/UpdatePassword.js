import { Input } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row } from '../../../utitlities/styles';

const InputWrapper = styled(Input)`
  height: 40px;
  border-radius: 5px;
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

const UpdatePassword = ({user, setValue, errors}) => {
  const [isChangePassword, setIsChangePassword] = useState(false)

  return (
    <div>
      {!isChangePassword &&
        <Row>
          <Link
            onClick = {() => {
              setIsChangePassword(true);
              setValue('wantedToChangePassword', true)
            }}
          >
            Change Password?
          </Link>
        </Row>
      }
      {isChangePassword &&
        <div>
          <Row columns="1fr">
            <ColumnWrapper>
              <LabelWrapper>Old Password</LabelWrapper>
              <InputWrapper
                type="password"
                placeholder="Old Password"
                style={{ width: 270 }}
                value={user.oldPassword}
                onChange={(e) => {
                  setValue('oldPassword', e.target.value)
                }}
              />
              <ErrorWrapper> {errors.oldPassword} </ErrorWrapper>
            </ColumnWrapper>
          </Row>
          <Row columns="1fr 1fr">
            <ColumnWrapper>
              <LabelWrapper>New Password</LabelWrapper>
              <InputWrapper
                type="password"
                placeholder="New Password"
                style={{ width: 270 }}
                value={user.newPassword}
                onChange={(e) => {
                  setValue('newPassword', e.target.value)
                }}
              />
              <ErrorWrapper> {errors.newPassword} </ErrorWrapper>
            </ColumnWrapper>
            <ColumnWrapper>
              <LabelWrapper>Retype New Password</LabelWrapper>
              <InputWrapper
                type="password"
                placeholder="Retype New Password"
                style={{ width: 270 }}
                value={user.confirmPassword}
                onChange={(e) => {
                  setValue('confirmPassword', e.target.value)
                }}
              />
              <ErrorWrapper> {errors.confirmPasswordError} </ErrorWrapper>
            </ColumnWrapper>
          </Row>
        </div>
      }
    </div>
  );
}

export default UpdatePassword
