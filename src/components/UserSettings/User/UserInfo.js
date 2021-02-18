import React from 'react'
import { connect } from 'react-redux';
import api from '../../../utitlities/api';
import { setUserAction } from '../../Login/actions';
import DeptAdminInfoModal from './DeptAdminInfoModal';
import StudentInfoModal from './StudentInfoModal'
import TeacherInfoModal from './TeacherInfoModal';

const UserInfo = (
  { selectedUser, visible, setVisibility, dispatch }) => {
    
  const handleUpdateUser = async (user) => {
    await api.updateUserByID(user._id, user)
    const { payload: newUser } = await api.getUserByID(user._id)
    dispatch(setUserAction(newUser))
  }

  
  return (
    <div>
      {selectedUser.userType === 'student' &&
        <StudentInfoModal
          selectedUser={selectedUser}
          visible={visible}
          setVisibility={setVisibility}
          updateUser={handleUpdateUser}
        />
      }

      {selectedUser.userType === 'teacher' &&
        <TeacherInfoModal
          selectedUser={selectedUser}
          visible={visible}
          setVisibility={setVisibility}
          updateUser={handleUpdateUser}
        />
      }

      {selectedUser.userType === 'deptAdmin' &&
        <DeptAdminInfoModal
          selectedUser={selectedUser}
          visible={visible}
          setVisibility={setVisibility}
          updateUser={handleUpdateUser}
        />
      }
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(UserInfo)
