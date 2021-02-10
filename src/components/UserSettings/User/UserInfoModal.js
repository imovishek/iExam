import styled from "styled-components";
import React, { useState, useEffect } from "react";
import userValidator from '../user.validation';
import { Modal, Input, Select, DatePicker, Button } from "antd";
import moment from "moment";
import _ from "underscore";
import { joiObjectParser } from "../../../utitlities/common.functions";
import api from "../../../utitlities/api";
import { hasPageAccess } from "../../../utitlities/constants";
import { faMendeley } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserEdit } from "@fortawesome/free-solid-svg-icons";


const { Option } = Select;

const InputWrapper = styled(Input)`
  height: 40px;
  border-radius: 5px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'none'};
`;

const ColumnWrapper = styled.div`
  margin-right: 20px;
  margin-bottom: 15px;
`;

const LabelWrapper = styled.p`
  margin-bottom: 5px;
  color: #608794;
`;

const ErrorWrapper = styled.p`
  font-size: 11px;
  color: #d40909;
  margin-left: 5px;
`;

const SelectStyled = styled(Select)`
  width: 100%;
`;

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  margin: auto;
  margin-right: 5px;
  height: 25px;
  width: 50px;
  cursor: pointer;
  :hover{
    color: #40a9aa;
  }
  float: right;
`;

const getNameWithShort = obj => `${obj.firstName} ${obj.lastName} (${obj.shortName || ''})`;

const UserInfoModal = ({
  selectedUser,
  visible,
  setVisibility,
  createUser,
  updateUser
}) => {
  const isEditing = !(!selectedUser);
  const title = isEditing ? 'Edit User' : 'Create User';
  const defaultUser = {
    firstName: '',
    lastName: '',
    department : {
      departmentCode : "CSE",
      departmentName : "Computer Science and Engineering"
    },
    credential : {
      email : '',
      password : "superuser",
      userType : "teacher"
    },
    userType: 'teacher'
  };
  const [user, setUser] = useState(isEditing ? selectedUser : defaultUser);
  const [teachers, setTeachers] = useState({});
  const [errors, setErrors] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setUser(selectedUser || defaultUser);
    const { payload: fetchedTeachers = [] } = await api.getTeachers({});
    setTeachers(fetchedTeachers);
  }, [isEditing, selectedUser]);

  const setValue = (key, value) => {
    const newUser = {
      ...user,
      [key]: value
    };
    const newErrors = {
      ...errors
    };
    delete newErrors[key];
    setUser(newUser);
    setErrors(newErrors);
  };

  const closeModal = () => {
    setVisibility(false);
    setUser(defaultUser);
    setErrors({});
    setUserEditing(false);
  };
  const checkCredentialOnChange = async (email) => {
    // if (!email) return;
    // if (previousEmail === email) return;
    // if (!isValidEmail(email)) {
    //   const newErrors = { ...errors, email: emailInvalidLabel};
    //   setErrors(newErrors);
    //   return;
    // }
    // const { payload } = await api.getCredentials({ email });
    // if (payload.length) {
    //   const newErrors = { ...errors, email: emailAlreadyExistLabel};
    //   setErrors(newErrors);
    // }
  };

  const checkCredentialOnChangeDebounced = _.debounce(checkCredentialOnChange, 300);
  const onSubmit = () => {
    const errors = joiObjectParser(user, userValidator);
    setErrors(errors);
    if (!_.isEmpty(errors)) {
      return;
    }
    if (isEditing) updateUser(user);
    else createUser(user);
    closeModal();
  };
  const [isUserEditing, setUserEditing] = useState(false);
  return (
    <Modal
      title={title}
      style={{ top: 20 }}
      visible={visible}
      width={800}
      height={800}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      okText={!isEditing ? "Save" : "Update"}
    >
      <FontAwesomeIconWrapper 
        onClick={() => {
        setUserEditing(true)
      }} icon={faUserEdit} />
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>First Name</LabelWrapper>
          <InputWrapper
            placeholder="First Name"
            value={selectedUser.firstName}
            style={{ width: 270 }}
            onChange={(e) => setValue('firstName', e.target.value)}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors['firstName']} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Last Name</LabelWrapper>
          <InputWrapper
            placeholder="Last Name"
            value={selectedUser.lastName}
            style={{ width: 270 }}
            onChange={(e) => setValue('lastName', e.target.value)}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors['lastName']} </ErrorWrapper>
        </ColumnWrapper>        
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Department</LabelWrapper>
          <Select
            defaultValue="CSE" 
            style={{ width: 270 }}
            disabled = {!isUserEditing}
          >
            <Option value="CSE">Computer Science And Engineering</Option>
          </Select>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Email</LabelWrapper>
          <InputWrapper
            placeholder="Email"
            value={selectedUser.credential.email}
            style={{ width: 270 }}
            onChange={(e) => {
            setValue('email', e.target.value);
              checkCredentialOnChangeDebounced(e.target.value);
            }}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors['email']} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
       { selectedUser.userType === 'student' &&
        <Row columns="1fr">
        <ColumnWrapper>
          <LabelWrapper>Registration No</LabelWrapper>
          <InputWrapper
            placeholder="Registration No"
            value={selectedUser.registrationNo}
            style={{ width: 270 }}
            onChange={(e) => {
            setValue('registrationNo', e.target.value);
            }}
            disabled = {!isUserEditing}
          />
          <ErrorWrapper> {errors['registrationNo']} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      }
    </Modal>
  )
};

export default UserInfoModal;