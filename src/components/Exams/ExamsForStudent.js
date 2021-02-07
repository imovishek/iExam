import CheckAuthentication from "../CheckAuthentication/CheckAuthentication";
import NavBar from "../NavBar/NavBar";
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../utitlities/api';
import { onUpdateCourses } from "./actions";
import styled from "styled-components";
import { Button } from "antd";
import { setUserAction } from "../Login/actions";
import { Row } from "../styles/pageStyles";

const PageHeader = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #828b94;
  user-select: none;
`;

const ExamsForStudent = ({ courses = [], user, dispatch }) => {
    return (
        <div>
            <CheckAuthentication />
            <BodyWrapper>
                <NavBar />
                <Container>
                  <PageHeader>Exams</PageHeader>
                  <Row>
                    
                  </Row>
                </Container>
            </BodyWrapper>
            
        </div>
    )
};
const mapStateToProps = state => ({
    user: state.login.user,
    courses: state.courseData.courses
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

  
export default connect(mapStateToProps, mapDispatchToProps)(ExamsForStudent);