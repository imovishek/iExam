import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { connect } from 'react-redux'
import { BodyWrapper, Container, Row } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import { onUpdateDepts } from '../actions'
import styled from 'styled-components'
import DeptTable from './DeptTable'
import { Button, message } from 'antd'
import CreateEditModal from './CreateEditDeptModal'
import { setUserAction } from '../../Login/actions'
import { PageHeader } from '../../styles/pageStyles'

const DeptTableWrapper = styled.div`
`

const ButtonStyled = styled(Button)`
  height: 30px;
  margin-right: 10px;
`

const Depts = ({ user, dispatch }) => {
  const [isDeptsChanged, setDeptChanged] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [selectedDept, setSelectedDept] = useState(null)
  const [showCreateEditModal, setShowCreateEditModal] = useState(false)
  const [depts, setDepts] = useState([])

  useEffect(() => {
    if (isDeptsChanged) {
      api.getDepts()
        .then(({ payload }) => {
          dispatch(onUpdateDepts(payload))
          setDepts(payload)
          setDeptChanged(false)
          setLoading(false)
        })
    }
  }, [isDeptsChanged])

  const createDeptHandler = async (dept) => {
    try {
      setLoading(true)
      await api.createDept(dept)
      setDeptChanged(true)
    } catch (err) {
      message.error('Server Error Try again later!')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const updateDeptHandler = async (dept) => {
    await api.updateDept(dept)
    setDeptChanged(true)
  }

  const deleteDeptHandler = async (dept) => {
    setLoading(true);
    await api.deleteDept(dept)
    setDeptChanged(true)
  }

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 1fr">
          <Row columns="1fr 150px 170px">
            <PageHeader>Departments</PageHeader>
            <div></div>
            <Button
              onClick={() => {
                setShowCreateEditModal(true)
                setSelectedDept(null)
              }}
              type="primary"
            >
              +New
            </Button>
          </Row>
          <DeptTableWrapper>
            <DeptTable
              depts={depts}
              isLoading={isLoading}
              setDeptToEdit={(selectedDept) => {
                setSelectedDept(selectedDept)
              }}
              showCreateEditModal={(value) => setShowCreateEditModal(value)}
              deleteDept={deleteDeptHandler}
            />
          </DeptTableWrapper>
          <CreateEditModal
            visible={showCreateEditModal}
            selectedDept={selectedDept}
            setVisibility={setShowCreateEditModal}
            createDept={createDeptHandler}
            updateDept={updateDeptHandler}
            depts={depts}
          />
        </Container>
      </BodyWrapper>

    </div>
  )
}
const mapStateToProps = state => ({
  user: state.login.user,
  // depts: state.deptData.depts
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Depts)
