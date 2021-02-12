import CheckAuthentication from "../../CheckAuthentication/CheckAuthentication";
import NavBar from "../../NavBar/NavBar";
import _ from 'underscore';
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../../utitlities/api';
import { onUpdateCourses } from "../actions";
import styled from "styled-components";
import { Button, Tabs } from "antd";
import { setUserAction } from "../../Login/actions";
import { Row, BodyRow, LabelWrapper } from "../../styles/pageStyles";
import ExamsTable from "./ExamsTable";
import { exams } from "../../../utitlities/dummy";
import { smartLabel, getExamStatus } from "../../../utitlities/common.functions";
const { TabPane } = Tabs;
const PageHeader = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #828b94;
  user-select: none;
  margin-bottom: 20px;
`;

const ExamsForStudent = ({ courses = [], user, dispatch }) => {
    const [exams, setExams] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isExamsChanged, setExamsChanged] = useState(true);
    const [examsObj, setExamsObj] = useState({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if (isExamsChanged) {
          try {
            setLoading(true);
            const { payload: mycourses = [] } = await api.getCourses({assignedTeacher:user._id});
            let exams = []
            _.each(mycourses, course => {
              exams = exams.concat(course.exams)
            })
            setExamsObj(
              _.groupBy(exams, exam => getExamStatus(exam).toLowerCase())
            )
            setExams(exams);
          } catch (err) {
            console.log(err);
          } finally {
            setExamsChanged(false);
            setLoading(false);
          }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isExamsChanged]);
    return (
        <div>
            <CheckAuthentication />
            <BodyWrapper>
                <NavBar />
                <Container>
                  <PageHeader>Exams</PageHeader>

                  <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 500 }}>
                    {_.map(['upcoming', 'running', 'ended'], (v, i) => (
                      <TabPane tab={smartLabel(v)} key={i}>
                        <ExamsTable exams={examsObj[v]} isLoading={isLoading} />
                      </TabPane>
                    ))}
                  </Tabs>
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