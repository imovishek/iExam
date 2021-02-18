import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import _ from 'underscore';
import { connect } from 'react-redux';
import api from '../../../utitlities/api';
import { setUserAction } from '../../Login/actions';
import DeptAdminInfo from './DeptAdminInfo';
import StudentInfo from './StudentInfo';
import TeacherInfo from './TeacherInfo';
import { message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { joiObjectParser, isValidEmail } from '../../../utitlities/common.functions';
import userValidator from '../user.validation';

const UserInfo = ({ selectedUser, visible, setVisibility, dispatch }) => {
  const [isLoading, setLoading] = useState(false);
  const title = 'My Info'
  const [user, setUser] = useState({ credential: {} })
  const [errors, setErrors] = useState({});

  const getUserByPassword = async (user) => {
    const isValid = await bcrypt.compare(user.oldPassword, user.credential.password);
    if (isValid) {
      const salt = await bcrypt.genSalt(10);
      user.credential.password = await bcrypt.hash(user.newPassword, salt);
      return user;
    }
    throw new Error("");
  }
  const handleUpdateUser = async (user) => {
    let update = user;
    setLoading(true);
    if (user.wantedToChangePassword) {
      try {
        update = await getUserByPassword(user);
      } catch (err) {
        setLoading(false);
        return message.error("Password is not correct!");
      }
    }
    try {
      await api.updateUserByID(user._id, update)
      const { payload: newUser } = await api.getUserByID(user._id)
      dispatch(setUserAction(newUser));
      message.success("Successfully updated your info!");
    } catch (err) {
      message.error("Something went wrong! (Please try again later)")
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  const setValue = (key, value) => {
    const newUser = {
      ...user,
      [key]: value
    }
    const newErrors = {
      ...errors
    }
    if (key === 'email') {
      newUser.credential.email = value;
    }
    delete newErrors[key]
    setUser(newUser)
    setErrors(newErrors)
  }

  useEffect(() => {
    setUser({ ...JSON.parse(JSON.stringify(selectedUser)) });
  }, [visible])

  const checkCredentialIsOnDb = async (email) => {
    if (email === selectedUser.credential.email) return false;
    const { payload } = await api.getCredentials({ email });
    return payload && payload.length !== 0;
  }
  const closeModal = () => {
    setVisibility(false)
    setErrors({})
    setUser({ credential: {} })
  }

  const onSubmit = async () => {
    const errors = joiObjectParser(user, userValidator(user));
    const isEmailExists = await checkCredentialIsOnDb(user.credential.email);
    if (isEmailExists) errors.email = 'Email Already Exists!';
    else if (!isValidEmail(user.credential.email)) {
      errors.email = 'Not a valid email!';
    }
    setErrors(errors)
    if (!_.isEmpty(errors)) {
      return
    }
    handleUpdateUser(user)
    closeModal()
  }

  return (
    <Modal
      title={title}
      style={{ top: 20 }}
      visible={visible}
      width={800}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      okText="Update"
    >
      {selectedUser.userType === 'student' &&
        <StudentInfo setValue={setValue} user={user} errors={errors} />
      }

      {selectedUser.userType === 'teacher' &&
        <TeacherInfo setValue={setValue} user={user} errors={errors} />
      }

      {selectedUser.userType === 'deptAdmin' &&
        <DeptAdminInfo setValue={setValue} user={user} errors={errors} />
      }
    </Modal>
  );
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(UserInfo)
