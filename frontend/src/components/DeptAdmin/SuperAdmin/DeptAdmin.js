import CheckAuthentication from '../../CheckAuthentication/CheckAuthentication'
import NavBar from '../../NavBar/NavBar'
import { connect } from 'react-redux'
import { BodyWrapper, Container, Row } from '../../../utitlities/styles'
import React, { useEffect, useState } from 'react'
import api from '../../../utitlities/api'
import { onUpdateDeptAdmins } from '../actions'
import styled from 'styled-components'
import DeptAdminTable from './DeptAdminTable'
import { Button, message } from 'antd'
import CreateEditDeptAdminModal from './CreateEditDeptAdminModal'
import { setUserAction } from '../../Login/actions'
import { PageHeader } from '../../styles/pageStyles'

const DeptAdminTableWrapper = styled.div`
`

const ButtonStyled = styled(Button)`
  height: 30px;
  margin-right: 10px;
`

const DeptAdmins = ({ user, dispatch }) => {
  const [isDeptAdminsChanged, setDeptAdminChanged] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [selectedDeptAdmin, setSelectedDeptAdmin] = useState(null)
  const [showCreateEditModal, setShowCreateEditModal] = useState(false)
  const [deptAdmins, setDeptAdmins] = useState([])
  const [depts,setDepts]=useState([])

  useEffect(() => {
    if (isDeptAdminsChanged) {
      api.getDeptAdmins()
        .then(({ payload }) => {
          dispatch(onUpdateDeptAdmins(payload))
          setDeptAdmins(payload)
          setDeptAdminChanged(false)
          setLoading(false)
        })
      api.getDepts().then(({payload})=>{
        setDepts(payload)
      })
    }
  }, [isDeptAdminsChanged])

  const createDeptAdminHandler = async (deptAdmin) => {
    try {
      setLoading(true)
      await api.createDeptAdmin(deptAdmin)
      setDeptAdminChanged(true)
    } catch (err) {
      message.error('Server Error Try again later!')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const updateDeptAdminHandler = async (deptAdmin) => {
    await api.updateDeptAdmin(deptAdmin)
    setDeptAdminChanged(true)
  }

  const deleteDeptAdminHandler = async (deptAdmin) => {
    setLoading(true);
    await api.deleteDeptAdmin(deptAdmin)
    setDeptAdminChanged(true)
  }

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container rows="80px 1fr">
          <Row columns="1fr 150px 170px">
            <PageHeader>Department Admins</PageHeader>
            <div></div>
            <Button
              onClick={() => {
                setShowCreateEditModal(true)
                setSelectedDeptAdmin(null)
              }}
              type="primary"
            >
              +New
            </Button>
          </Row>
          <DeptAdminTableWrapper>
            <DeptAdminTable
              deptAdmins={deptAdmins}
              isLoading={isLoading}
              setDeptAdminToEdit={(selectedDeptAdmin) => {
                setSelectedDeptAdmin(selectedDeptAdmin)
              }}
              showCreateEditModal={(value) => setShowCreateEditModal(value)}
              deleteDeptAdmin={deleteDeptAdminHandler}
            />
          </DeptAdminTableWrapper>
          <CreateEditDeptAdminModal
            visible={showCreateEditModal}
            selectedDeptAdmin={selectedDeptAdmin}
            setVisibility={setShowCreateEditModal}
            createDeptAdmin={createDeptAdminHandler}
            updateDeptAdmin={updateDeptAdminHandler}
            depts={depts}
            previousEmail={selectedDeptAdmin ? selectedDeptAdmin.credential.email : null}
          />
        </Container>
      </BodyWrapper>

    </div>
  )
}
const mapStateToProps = state => ({
  user: state.login.user,
  // deptAdmins: state.deptAdminData.deptAdmins
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(DeptAdmins)
