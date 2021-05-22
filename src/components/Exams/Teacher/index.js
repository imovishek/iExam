import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import _ from 'underscore'
import { connect } from 'react-redux'
import { BodyWrapper, Container } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import { Tabs } from 'antd'
import ExamsTable from './ExamsTable'
import { smartLabel, getExamStatus } from '../../../utitlities/common.functions'
import { PageHeader } from '../../styles/pageStyles'
import { onUpdateCurrentTab } from '../actions'
const { TabPane } = Tabs

const ExamsForStudent = ({ courses = [], user, dispatch, currentTab, isCollapsed }) => {
  const [isLoading, setLoading] = useState(false)
  const [isExamsChanged, setExamsChanged] = useState(true)
  const [examsObj, setExamsObj] = useState({})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isExamsChanged) {
      try {
        setLoading(true)
        const { payload: mycourses = [] } = await api.getCourses({ assignedTeacher: user._id })
        let exams = []
        _.each(mycourses, course => {
          exams = exams.concat(course.exams)
        })
        const examIDs = _.map(exams, (exam) => exam._id);
        const { payload: loadExams } = await api.getExams({
          _id: { $in: examIDs },
        });

        setExamsObj(
          _.groupBy(loadExams, (exam) => getExamStatus(exam).toLowerCase())
        );
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
        <Container rows="80px 1fr">
          <PageHeader>Exams</PageHeader>
          <Tabs
            activeKey={currentTab}
            onChange={(activeKey => dispatch(onUpdateCurrentTab(activeKey)))}
            tabPosition={isCollapsed ? "top" : "left"}
          >
            {_.map(['upcoming', 'running', 'ended'], (v, i) => (
              <TabPane tab={<h3>{smartLabel(v)}</h3>} key={v}>
                <ExamsTable exams={examsObj[v]} isLoading={isLoading} />
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
  courses: state.courseData.courses,
  currentTab: state.examData.currentTab,
  isCollapsed: state.navBar.isCollapsed,
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ExamsForStudent)
