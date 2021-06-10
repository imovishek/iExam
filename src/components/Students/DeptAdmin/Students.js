import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { connect } from 'react-redux'
import { BodyWrapper, Container, Row } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import { onUpdateStudents } from '../actions'
import styled from 'styled-components'
import StudentTable from './StudentTable'
import { Button, message } from 'antd'
import CreateEditStudentModal from './CreateEditStudentModal'
import { setUserAction } from '../../Login/actions'
import { PageHeader } from '../../styles/pageStyles'
import ImportStudentsModal from './ImportStudentsModal'

const StudentTableWrapper = styled.div`
`

const ButtonStyled = styled(Button)`
  height: 30px;
  margin-right: 10px;
`

const Students = ({ students, user, dispatch }) => {
  const [isStudentsChanged, setStudentChanged] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showCreateEditModal, setShowCreateEditModal] = useState(false)
  const [showImportStudentsModal, setShowImportStudentsModal] = useState(false);

  useEffect(() => {
    if (isStudentsChanged) {
      api.getStudents({ 'department.departmentCode': user.department.departmentCode })
        .then(({ payload }) => {
          dispatch(onUpdateStudents(payload))
          setStudentChanged(false)
          setLoading(false)
        })
    }
  }, [isStudentsChanged])

  const createStudentHandler = async (student) => {
    try {
      setLoading(true)
      await api.createStudent(student)
      setStudentChanged(true)
    } catch (err) {
      message.error('Server Error Try again later!')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const updateStudentHandler = async (student) => {
    await api.updateStudent(student)
    setStudentChanged(true)
  }

  const deleteStudentHandler = async (student) => {
    setLoading(true);
    await api.deleteStudent(student)
    setStudentChanged(true)
  }

  return (
    <div>
      <ImportStudentsModal 
        visible={showImportStudentsModal}
        setVisibility={setShowImportStudentsModal}
        setStudentChanged={setStudentChanged}
        user={user}
      />
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 1fr">
          <Row columns="1fr 150px 170px">
            <PageHeader>Students</PageHeader>
            <ButtonStyled type="primary" onClick={() => setShowImportStudentsModal(true)}>
              Import Students
            </ButtonStyled>
            <Button
              onClick={() => {
                setShowCreateEditModal(true)
                setSelectedStudent(null)
              }}
              type="primary"
            >
              Create New Student
            </Button>
          </Row>
          <StudentTableWrapper>
            <StudentTable
              students={students}
              isLoading={isLoading}
              setStudentToEdit={(selectedStudent) => {
                setSelectedStudent(selectedStudent)
              }}
              showCreateEditModal={(value) => setShowCreateEditModal(value)}
              deleteStudent={deleteStudentHandler}
            />
          </StudentTableWrapper>
          <CreateEditStudentModal
            visible={showCreateEditModal}
            selectedStudent={selectedStudent}
            setVisibility={setShowCreateEditModal}
            createStudent={createStudentHandler}
            updateStudent={updateStudentHandler}
            previousEmail={selectedStudent ? selectedStudent.credential.email : null}
          />
        </Container>
      </BodyWrapper>

    </div>
  )
}
const mapStateToProps = state => ({
  user: state.login.user,
  students: state.studentData.students
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Students)
