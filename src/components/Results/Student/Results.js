import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import _ from 'underscore'
import moment from 'moment';
import { connect } from 'react-redux'
import { BodyWrapper, Container } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import ResultsTable from './ResultsTable'
import { PageHeader } from '../../styles/pageStyles';

const Results = ({ courses = [], user, dispatch }) => {
  const [isLoading, setLoading] = useState(false)
  const [isExamsChanged, setExamsChanged] = useState(true)
  const [exams, setExams] = useState([])
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
        const { payload: loadExams } = await api.getExams({ _id: { $in: examIDs }})
        exams = _.filter(loadExams, exam => exam.resultPublished);
        exams.sort((a, b) => {
          if (moment(a).isAfter(b)) return -1;
          if (moment(b).isAfter(a)) return 1;
          return 0;
        })
        setExams(exams);
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
          <PageHeader>Results</PageHeader>
          <ResultsTable exams={exams} isLoading={isLoading} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Results)
