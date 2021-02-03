import { Input, Button, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBox, faAnchor } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setNavigaitonTabAction } from './actions';

const BodyWrapper = styled.div`
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 200px;
  background: #4b555d;
  box-shadow: 4px 0px 3px 0px rgba(0,0,0,0.36);
  `;

const SubWrapper = styled.div`
  padding: 30px 10px;
  margin-left: 20px;
  margin-right: 20px;
`;


const TextWrapper = styled.div`
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  padding: 10px 5px;
  justify-content: center;
  user-select: none;
`;

const LinkWrapper = styled(Link)`
  color: ${(props) => props.selected ? '#40a9ff' : '#ececec'};
  :hover{
    color: #40a9aa;
  }
  margin-bottom: 10px;
  height: 40px;
`;

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  margin: auto;
  margin-right: 4px;
  height: 18px;
  width: 50px;
`;

const NavBar = ({ setNavigationTab, tabKey = 'dashboard' }) => {

  return (
    <BodyWrapper>
      <SubWrapper>
        <LinkWrapper to="/dashboard" onClick={() => setNavigationTab('dashboard')} selected={tabKey === "dashboard"}>
          <TextWrapper>
            <FontAwesomeIconWrapper icon={faCoffee} />
            Dashboard
          </TextWrapper>
        </LinkWrapper>
        <LinkWrapper to="/courses" onClick={() => setNavigationTab('courses')} selected={tabKey === "courses"}>
          <TextWrapper>
            <FontAwesomeIconWrapper icon={faBox} />
            Courses
          </TextWrapper>
        </LinkWrapper>
        <LinkWrapper to="/teachers" onClick={() => setNavigationTab('teachers')} selected={tabKey === "teachers"}>
          <TextWrapper>
            <FontAwesomeIconWrapper icon={faAnchor} />
            Teachers
          </TextWrapper>
        </LinkWrapper>
      </SubWrapper>
    </BodyWrapper>
  )
};
const mapStateToProps = (state) => ({
  tabKey: state.navBar.tabKey
});
const mapDispatchToProps = (dispatch) => ({
  setNavigationTab: (key) => {
    localStorage.setItem('tabKey', key);
    dispatch(setNavigaitonTabAction(key));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);