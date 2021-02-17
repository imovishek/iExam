import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import _ from 'underscore'
import { connect } from 'react-redux'
import { BodyWrapper, Container } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import styled from 'styled-components'
import { Tabs } from 'antd'
import ExamsTable from './ExamsTable'
import { smartLabel, getExamStatus } from '../../../utitlities/common.functions'
const { TabPane } = Tabs
const PageHeader = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #828b94;
  user-select: none;
  margin-bottom: 20px;
`

const ExamsForStudent = ({ courses = [], user, dispatch }) => {
  const [isLoading, setLoading] = useState(false)
  const [isExamsChanged, setExamsChanged] = useState(true)
  const [examsObj, setExamsObj] = useState({})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isExamsChanged) {
      try {
        setLoading(true)
        const { payload: mycourses } = await api.getCourses({ enrolledStudents: user._id })
        let exams = []
        _.each(mycourses, course => {
          exams = exams.concat(course.exams)
        })
        const examIDs = _.map(exams, exam => exam._id);
        const { payload: loadExams } = await api.getExams({ _id: { $in: examIDs } });

        setExamsObj(
          _.groupBy(loadExams, exam => getExamStatus(exam).toLowerCase())
        )
      } catch (err) {
        console.log(err)
      } finally {
        setExamsChanged(false)
        setLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExamsChanged])
  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
          <PageHeader>Exams</PageHeader>

          <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 450 }}>
            {_.map(['upcoming', 'running', 'ended'], (v, i) => (
              <TabPane tab={smartLabel(v)} key={i}>
                <ExamsTable noEnterButton={v === 'upcoming'} exams={examsObj[v]} isLoading={isLoading} />
              </TabPane>
            ))}
          </Tabs>
        </Container>
      </BodyWrapper>

    </div>
  )
}
const mapStateToProps = state => ({
  user: state.login.user,
  courses: state.courseData.courses
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ExamsForStudent)
