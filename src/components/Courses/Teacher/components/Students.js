import Search from 'antd/lib/input/Search'
import styled from 'styled-components'
import _ from 'underscore'
import { Popconfirm } from 'antd'
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../../../../utitlities/api'
import { useEffect, useState } from 'react'

const SearchStyled = styled(Search)`
  width: 100%;
  margin-bottom: 10px;
`

const Container = styled.div`
`

const Body = styled.div`
  overflow: auto;
  height: calc(100% - 85px);
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const HeaderLabel = styled.div`
  color: grey;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: auto;
  margin-left: 5px;
`

const Row = styled.div`
  padding: 10px;
  border-radius: 5px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
`
const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ student, course, updateCourseOnUi, showingStudentType }) => {
  const deleteFromEnrolledStudentHandler = async (e) => {
    await api.updateCourse(course, {
      $pull: {
        enrolledStudents: student._id
      }
    })
    await updateCourseOnUi();
  }

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
    await updateCourseOnUi();
  }
  const isEnrolled = showingStudentType === "enrolled";
  return (
    <Row columns="repeat(2, 1fr) 20px">
      <Wrapper>{student.registrationNo}</Wrapper>
      <Wrapper>{getName(student)}</Wrapper>
      <Wrapper>
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={
            isEnrolled ?
              deleteFromEnrolledStudentHandler :
              approveEnrollRequestHandler
          }
        >
          <FontAwesomeIconWrapper
            icon={isEnrolled ? faTrash : faCheckCircle}
            color={isEnrolled ? "#a02f2f" : "green"}
          />
        </Popconfirm>
      </Wrapper>
    </Row>
  )
}

const Students = ({
  enrolledStudents,
  pendingEnrollStudents,
  updateCourseOnUi,
  showingStudentType,
  course,
}) => {
  const [students, setStudents] = useState(
    showingStudentType === "enrolled" ?
      enrolledStudents :
      pendingEnrollStudents
  );

  const [searchStudents, setSearchStudents] = useState(students)
  useEffect(() => {
    const newStudents =
      showingStudentType === "enrolled" ?
        enrolledStudents :
        pendingEnrollStudents;
    setStudents(newStudents);
    setSearchStudents(newStudents);
  }, [showingStudentType])
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
          student={student}
          course={course}
          updateCourseOnUi={updateCourseOnUi}
          showingStudentType={showingStudentType}
        />)}
      </Body>

    </Container>
  )
}

export default Students
