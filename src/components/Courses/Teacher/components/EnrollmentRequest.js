import Search from 'antd/lib/input/Search'
import styled from 'styled-components'
import _ from 'underscore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import api from '../../../../utitlities/api'
import { useEffect, useState } from 'react'

const SearchStyled = styled(Search)`
  width: 100%;
  margin-bottom: 10px;
`

const Container = styled.div`
`

const HeaderLabel = styled.div`
  color: grey;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
`

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: auto;
  margin-left: 5px;
  width: 15px;
  height: 15px;
`
const Body = styled.div`
  overflow: auto;
  height: calc(100% - 74px);
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ student, course, updateCourseOnUi }) => {
  const approveEnrollRequestHandler = async (e) => {
    const update = {
      $push: {
        enrolledStudents: student._id
      }
    }
    if (_.any(course.enrolledStudents, enst => enst._id === student._id)) delete update.$push
    await api.updateCourse(course, {
      ...update,
      $pull: {
        pendingEnrollStudents: student._id
      }
    })
    await updateCourseOnUi()
  }

  return (
    <Row columns="repeat(2, 1fr) 20px">
      <Wrapper>{student.registrationNo}</Wrapper>
      <Wrapper>{getName(student)}</Wrapper>
      <Wrapper>
        <FontAwesomeIconWrapper
          icon={faCheckCircle}
          color="green"
          onClick={approveEnrollRequestHandler}
        />
      </Wrapper>
    </Row>
  )
}

const EnrollmentRequest = ({
  students, course, updateCourseOnUi
}) => {
  const [searchStudents, setSearchStudents] = useState(students)
  useEffect(() => {
    setSearchStudents(students)
  }, [students])
  const handleSearch = (value) => {
    const pattern = value
      .trim()
      .replace(/ +/g, '')
      .toLowerCase()

    const afterSearchStudents = _.filter(students, student =>
      `${student.firstName}${student.lastName}${student.registrationNo}`
        .trim()
        .replace(/ +/g, '')
        .toLowerCase()
        .includes(pattern)
    )
    setSearchStudents(afterSearchStudents)
  }
  return (
    <Container>
      <SearchStyled
        allowClear
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Row columns="repeat(2, 1fr) 20px">
        <HeaderLabel>Regi No.</HeaderLabel>
        <HeaderLabel>Name</HeaderLabel>
        <HeaderLabel></HeaderLabel>
      </Row>
      <Body>
        {_.map(searchStudents, (student, index) => <Card
          key={`student_${index}`}
          student={student} course={course} updateCourseOnUi={updateCourseOnUi} />)}
      </Body>

    </Container>
  )
}

export default EnrollmentRequest
