import { Input, Button, message, Spin } from 'antd'
import React, { useState } from 'react'
import jwt from 'jsonwebtoken'
import styled from 'styled-components'
import { apiLogin } from '../../utitlities/api'
import { connect } from 'react-redux'
import { setUserAction } from './actions'
import { push } from 'connected-react-router'

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SubWrapper = styled.div`
  width: 360px;
  height: 300px;
  padding: 30px 30px;
  box-shadow: 3px 3px 30px 0px #e8eaec;
  border-radius: 14px;
  --antd-wave-shadow-color: none;
  .ant-input:hover {
    border-color: white;
    border-right-width: 0px !important;
  }
  .ant-input:focus {
    border-color: white;
    border-right-width: 0px !important;
  }

  input:-internal-autofill-selected {
    appearance: menulist-button;
    background-color: #f6f6f7;
    background-image: none !important;
    color: -internal-light-dark(black, white) !important;
  }
`

const InputWrapper = styled(Input)`
  margin-bottom: 14px;
  height: 44px;
  border-radius: 8px;
  font-size: 14px;
  border: 0px solid grey;
  background-color: #f6f6f7;
`

const ButtonWrapper = styled(Button)`
  width: 50%;
  height: 44px;
  border-radius: 8px;
`
const TextWrapper = styled.p`
  display: inline;
  margin-left: 14px;
`
const HeaderWrapper = styled.h1`
  font-weight: 100;
  font-family: system-ui;
`

const SpinWrapper = styled.div`
  text-align: center;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 1000;
  background: rgba(225, 223, 223, 0.53);
`

const setLocalStorage = (user, token) => {
  const { firstName, lastName, credential: { email, userType } } = user
  localStorage.setItem('firstName', firstName)
  localStorage.setItem('lastName', lastName)
  localStorage.setItem('email', email)
  localStorage.setItem('userType', userType)
  localStorage.setItem('token', token)
}
const Login = ({ setUser, dispatch }) => {
  const tryToLogin = async (email, password) => {
    const { data: res } = await apiLogin(email, password)
    setIsLoading(false)
    if (res.error) return message.error(res.message)
    localStorage.clear()
    const user = await jwt.decode(res.token)
    setUser(user)
    if (!user) return message.error('Something went wrong please try again later!')

    setLocalStorage(user, res.token)
    dispatch(push('/'))
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const onEnterLogin = () => {
    setIsLoading(true)
    tryToLogin(email, password)
  }

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      onEnterLogin()
    }
  }

  return (
    <BodyWrapper>
      <HeaderWrapper> Login </HeaderWrapper>
      <SubWrapper>
        <p>Email</p>
        <InputWrapper
          placeholder="Enter email"
          value={email}
          onKeyPress={handleKeypress}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <InputWrapper
          placeholder="Enter password"
          type='password'
          value={password}
          onKeyPress={handleKeypress}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <ButtonWrapper
            type="primary"
            onClick={onEnterLogin}
          >
            Enter
          </ButtonWrapper>
          <TextWrapper> <a href="/"> Forget Password </a> </TextWrapper>
        </div>
        {isLoading && (
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        )}
      </SubWrapper>
    </BodyWrapper>
  )
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  setUser: (user) => dispatch(setUserAction(user)),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
