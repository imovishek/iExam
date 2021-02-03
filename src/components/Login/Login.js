import { Input, Button, message } from 'antd';
import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import styled from 'styled-components';
import { apiLogin } from '../../utitlities/api';
import { connect } from 'react-redux';
import { setUserAction } from './actions';
import Logout from '../Logout/Logout';
import { useHistory } from 'react-router-dom';

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  `;

const SubWrapper = styled.div`
  width: 350px;
  height: 270px;
  padding: 30px 20px;
  box-shadow: 5px 4px 15px -4px #000000;
  border-radius: 5px;
`;

const InputWrapper = styled(Input)`
  margin-bottom: 15px;
  height: 40px;
  border-radius: 5px;
`;

const ButtonWrapper = styled(Button)`
  width: 50%;
`;
const TextWrapper = styled.p`
  display: inline;
  margin-left: 20px;
`;
const HeaderWrapper = styled.h1`
  font-weight: 100;
`;
const setLocalStorage = (user, token) => {
  const { firstName, lastName, credential: { email, userType } } = user;
  localStorage.setItem('firstName', firstName);
  localStorage.setItem('lastName', lastName);
  localStorage.setItem('email', email);
  localStorage.setItem('userType', userType);
  localStorage.setItem('token', token);
};
const Login = ({ setUser, dispatch }) => {
  const history = useHistory();
  localStorage.clear();
  const tryToLogin = async (email, password) => {
    const { data: res } = await apiLogin(email, password);
    if (res.error) return message.error(res.message);
    const user = await jwt.decode(res.token);
    console.log(user);
    setUser(user);
    if (!user) return message.error('Something went wrong please try again later!');
    
    setLocalStorage(user, res.token);
    history.push('/');
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <BodyWrapper>
      <HeaderWrapper> Login </HeaderWrapper>
      <SubWrapper>
        <p>Email</p>
        <InputWrapper
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <InputWrapper
          placeholder="Enter password"
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <ButtonWrapper
            type="primary"
            onClick={() => {
              tryToLogin(email, password);
            }}
          >
            Enter
          </ButtonWrapper>
          <TextWrapper> <a href="/"> Forget Password </a> </TextWrapper>
        </div>
        
      </SubWrapper>
    </BodyWrapper>
  )
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => dispatch(setUserAction(user)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
