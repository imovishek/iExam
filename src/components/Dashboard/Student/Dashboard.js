import CheckAuthentication from "../../CheckAuthentication/CheckAuthentication";
import NavBar from "../../NavBar/NavBar";
import { BodyWrapper, Container } from "../../../utitlities/styles";
import { push } from "connected-react-router";
import _ from "underscore";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import api from "../../../utitlities/api";
import { getExamStatus } from "../../../utitlities/common.functions";
import { Spin } from "antd";
import styled from "styled-components";
import UpcommingExamTable from "../common/UpcommingExamTable";
import NextExamCard from "../common/NextExamCard";
import { setNavigaitonTabAction } from "../../NavBar/actions";
import { navKeys } from "../../NavBar/constants";
import { examSorter } from "../Teacher/Dashboard";

const SpinWrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  display: flex;
`;

const Dashboard = ({ dispatch, user }) => {
  const redirectTo = (path) => {
    dispatch(push(`/${path}`));
  };

  const [isLoading, setLoading] = useState(false);
  const [exams, setExams] = useState([]);
  const [haveSingleRunningExam, setSingleRunningExam] = useState(true);
  const [showMoreUpcomingExam, setShowMoreUpcomingExam] = useState(false);

  useEffect(async () => {
    try {
      dispatch(setNavigaitonTabAction(navKeys.DASHBOARD));
      setLoading(true);
      const { payload: mycourses } = await api.getCourses({
        enrolledStudents: user._id,
      });
      let exams = [];
      _.each(mycourses, (course) => {
        exams = exams.concat(course.exams);
      });
      const examIDs = _.map(exams, (exam) => exam._id);
      const { payload: loadExams } = await api.getExams({
        _id: { $in: examIDs },
      });

      const futureExams = [];
      let runningExamCount = 0;
      loadExams.forEach((exam) => {
        const stat = getExamStatus(exam).toLowerCase();
        if (stat === "running") runningExamCount++;
        if (stat === "running" || stat === "upcoming") futureExams.push(exam);
      });
      futureExams.sort((a, b) => examSorter(a, b));
      if(futureExams.length>10)setShowMoreUpcomingExam(true);
      futureExams.splice(10);
      setExams(futureExams);
      if (runningExamCount > 1) setSingleRunningExam(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 1fr">
          {isLoading && (
            <SpinWrapper>
              <Spin stylesize="large" tip="Loading.." />
            </SpinWrapper>
          )}
          {!isLoading && exams.length !== 0 && (
            <div>
              <NextExamCard
                exam={exams[0]}
                dispatch={dispatch}
                haveSingleRunningExam={haveSingleRunningExam}
              ></NextExamCard>
              <UpcommingExamTable
                exams={exams}
                dispatch={dispatch}
                showMoreUpcomingExam={showMoreUpcomingExam}
              ></UpcommingExamTable>
            </div>
          )}
          {!isLoading && exams.length === 0 && (
            <SpinWrapper>No exams for you!</SpinWrapper>
          )}
        </Container>
      </BodyWrapper>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
const mapStateToProps = (state) => ({
  user: state.login.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
