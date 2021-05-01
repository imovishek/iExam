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

const TeacherTableWrapper = styled.div`
`

const Teachers = ({ teachers, user, dispatch }) => {
  const [isTeachersChanged, setTeacherChanged] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [showCreateEditModal, setShowCreateEditModal] = useState(false)

  useEffect(() => {
    if (isTeachersChanged) {
      const { teacherIDs = [] } = user
      api.getTeachers({ _id: { $in: teacherIDs } })
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
      const { payload: newTeacher } = await api.createTeacher(teacher)
      const { payload: newUser } = await api.updateUserByID(user._id, { $push: { teacherIDs: newTeacher._id } })
      dispatch(setUserAction(newUser))
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
    await api.updateUserByID(user._id, { $pull: { teacherIDs: teacher._id } });
    await api.deleteTeacher(teacher)
    setTeacherChanged(true)
  }

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 1fr">
          <Row columns="1fr 180px">
            <PageHeader>Teachers</PageHeader>
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
