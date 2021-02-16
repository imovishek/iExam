import React from 'react'
import DeptAdminInfoModal from './DeptAdminInfoModal';
import StudentInfoModal from './StudentInfoModal'
import TeacherInfoModal from './TeacherInfoModal';

const UserInfo = (
  { selectedUser, visible, setVisibility}) => {
  const handleUpdateUser = async (user) => {

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

export default UserInfo
