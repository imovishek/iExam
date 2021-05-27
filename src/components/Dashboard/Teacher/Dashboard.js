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
import AtAGlanceWrapper from "./AtaGlanceRow";
import { navKeys } from "../../NavBar/constants";
import { setNavigaitonTabAction } from "../../NavBar/actions";
import moment from "moment";

const SpinWrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  display: flex;
`;

export const examSorter = (examA, examB) => {
  const dateStringA = moment(examA.startDate).format("YYYY-MM-DD");
  const timeStringA = moment(examA.startTime, "hh:mm A").format("HH:mm:ss");
  const startDateWithTimeA = new Date(`${dateStringA} ${timeStringA}`);

  const dateStringB = moment(examB.startDate).format("YYYY-MM-DD");
  const timeStringB = moment(examB.startTime, "hh:mm A").format("HH:mm:ss");
  const startDateWithTimeB = new Date(`${dateStringB} ${timeStringB}`);
  console.log(examA, examB);
  console.log(startDateWithTimeA.getTime(), startDateWithTimeB.getTime());
  if (startDateWithTimeA < startDateWithTimeB) return -1;
  if (startDateWithTimeA > startDateWithTimeB) return 1;
  return 0;
};
const Dashboard = ({ dispatch, user }) => {
  const redirectTo = (path) => {
    dispatch(push(`/${path}`));
  };

  const [isLoading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState(null);
  const [examTakenCount, setExamTakenCount] = useState(null);
  const [haveSingleRunningExam, setSingleRunningExam] = useState(true);
  const [showMoreUpcomingExam, setShowMoreUpcomingExam] = useState(false);

  useEffect(async () => {
    try {
      dispatch(setNavigaitonTabAction(navKeys.DASHBOARD));
      setLoading(true);
      const { payload: mycourses = [] } = await api.getCourses({
        assignedTeacher: user._id,
      });
      mycourses.sort((a, b) => a.courseCode.localeCompare(b.courseCode));
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
      if (futureExams.length > 5) setShowMoreUpcomingExam(true);
      futureExams.splice(5);

      setCourses(mycourses);
      setExamTakenCount(exams.length - futureExams.length);
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
          {!isLoading && (
            <div>
              {exams.length !== 0 && (
                <NextExamCard
                  exam={exams[0]}
                  dispatch={dispatch}
                  haveSingleRunningExam={haveSingleRunningExam}
                ></NextExamCard>
              )}
              <AtAGlanceWrapper
                dispatch={dispatch}
                courses={courses}
                examsTaken={examTakenCount}
              ></AtAGlanceWrapper>

              {exams.length !== 0 && (
                <UpcommingExamTable
                  exams={exams}
                  dispatch={dispatch}
                  showMoreUpcomingExam={showMoreUpcomingExam}
                ></UpcommingExamTable>
              )}
            </div>
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
