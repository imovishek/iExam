import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { connect } from 'react-redux'
import { BodyWrapper, Container } from '../../../utitlities/styles'
import { deepCopy } from '../../../utitlities/common.functions'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import { onUpdateTeachers } from '../actions'
import styled from 'styled-components'
import TeacherTable from './TeacherTable'
import { Button, message } from 'antd'
import CreateEditTeacherModal from './CreateEditTeacherModal'
import { setUserAction } from '../../Login/actions'
import { PageHeader, Row } from '../../styles/pageStyles'
import ImportTeachersModal from './ImportTeachersModal'

const TeacherTableWrapper = styled.div`
`

const ButtonStyled = styled(Button)`
  height: 30px;
  margin-right: 10px;
`

const Teachers = ({ teachers, user, dispatch }) => {
  const [isTeachersChanged, setTeacherChanged] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [showCreateEditModal, setShowCreateEditModal] = useState(false)
  const [showImportTeachersModal, setShowImportTeachersModal] = useState(false);

  useEffect(() => {
    if (isTeachersChanged) {
      api.getTeachers({ 'department.departmentCode': user.department.departmentCode })
        .then(({ payload }) => {
          dispatch(onUpdateTeachers(payload))
          setTeacherChanged(false)
          setLoading(false)
        })
    }
  }, [isTeachersChanged])

  const createTeacherHandler = async (teacher) => {
    try {
      setLoading(true)
      await api.createTeacher(teacher)
      setTeacherChanged(true)
    } catch (err) {
      message.error('Server Error Try again later!')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const updateTeacherHandler = async (teacher) => {
    await api.updateTeacher(teacher)
    setTeacherChanged(true)
  }

  const deleteTeacherHandler = async (teacher) => {
    setLoading(true)
    await api.deleteTeacher(teacher)
    setTeacherChanged(true)
  }

  return (
    <div>
      <ImportTeachersModal 
        visible={showImportTeachersModal}
        setVisibility={setShowImportTeachersModal}
        setTeacherChanged={setTeacherChanged}
        user={user}
      />
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 1fr">
          <Row columns="1fr 150px 170px">
            <PageHeader>Teachers</PageHeader>
            <ButtonStyled type="primary" onClick={() => setShowImportTeachersModal(true)}>
              Import Teachers
            </ButtonStyled>
            <Button
              onClick={() => {
                setShowCreateEditModal(true)
                setSelectedTeacher(null)
              }}
              type="primary"
            >
              Create New Teacher
            </Button>
          </Row>
          <TeacherTableWrapper>
            <TeacherTable
              teachers={teachers}
              isLoading={isLoading}
              setTeacherToEdit={(selectedTeacher) => {
                setSelectedTeacher(deepCopy(selectedTeacher))
              }}
              showCreateEditModal={(value) => setShowCreateEditModal(value)}
              deleteTeacher={deleteTeacherHandler}
            />
          </TeacherTableWrapper>
          <CreateEditTeacherModal
            visible={showCreateEditModal}
            selectedTeacher={selectedTeacher}
            setVisibility={setShowCreateEditModal}
            createTeacher={createTeacherHandler}
            updateTeacher={updateTeacherHandler}
            previousEmail={selectedTeacher ? selectedTeacher.credential.email : null}
            user={user}
          />
        </Container>
      </BodyWrapper>

    </div>
  )
}
const mapStateToProps = state => ({
  user: state.login.user,
  teachers: state.teacherData.teachers
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Teachers)
