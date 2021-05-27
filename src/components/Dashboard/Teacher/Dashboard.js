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

  const [isLoading, setLoading] = useState(true);
  const [isExamsChanged, setExamsChanged] = useState(true);
  const [data, setData] = useState({});

  useEffect(async () => {
    try {
      dispatch(setNavigaitonTabAction(navKeys.DASHBOARD))
      setLoading(true);
      const { payload: mycourses = [] } = await api.getCourses({
        assignedTeacher: user._id,
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
      loadExams.forEach((exam) => {
        const stat = getExamStatus(exam).toLowerCase();
        if (stat === "running" || stat === "upcoming") futureExams.push(exam);
      });
      const futureExamsLength = futureExams.length;
      futureExams.sort((a, b) => a.startDate.localeCompare(b.startDate));
      futureExams.splice(5);
      mycourses.sort((a, b) => a.courseCode.localeCompare(b.courseCode));

      setData({
        exams: futureExams,
        examsTaken: exams.length - futureExamsLength,
        courses: mycourses,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setExamsChanged(false);
      setLoading(false);
    }
  }, [isExamsChanged]);

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
              {data.exams.length !== 0 && (
                <NextExamCard
                  exam={data.exams[0]}
                  dispatch={dispatch}
                ></NextExamCard>
              )}
              <AtAGlanceWrapper
                dispatch={dispatch}
                courses={data.courses}
                examsTaken={data.examsTaken}
              ></AtAGlanceWrapper>

              {data.exams.length !== 0 && (
                <UpcommingExamTable
                  exams={data.exams}
                  dispatch={dispatch}
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
