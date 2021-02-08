import styled from "styled-components";
import React, { useState, useEffect } from "react";
import teacherValidator from '../teacher.validation';
import { Modal, Input, Select, DatePicker } from "antd";
import moment from "moment";
import _ from "underscore";
import { joiObjectParser } from "../../../utitlities/common.functions";

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

const CreateEditTeacherModal = ({
  selectedTeacher,
  visible,
  setVisibility,
  createTeacher,
  updateTeacher
}) => {
  const isEditing = !(!selectedTeacher);
  const title = isEditing ? 'Edit Teacher' : 'Create Teacher';
  const defaultTeacher = {
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
    questions: []
  };
  const [teacher, setTeacher] = useState(isEditing ? selectedTeacher : defaultTeacher);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTeacher(selectedTeacher || defaultTeacher);
  }, [isEditing, selectedTeacher]);

  const setValue = (key, value) => {
    const newTeacher = {
      ...teacher,
      [key]: value
    };
    if(key === 'email'){
      newTeacher.credential.email = value;
    }
    const newErrors = {
      ...errors
    };
    delete newErrors[key];
    setTeacher(newTeacher);
    setErrors(newErrors);
  };

  const closeModal = () => {
    setVisibility(false);
    setTeacher(defaultTeacher);
    setErrors({});
  };

  const onSubmit = () => {
    const errors = joiObjectParser(teacher, teacherValidator);
    setErrors(errors);
    if (!_.isEmpty(errors)) {
      return;
    }
    if (isEditing) updateTeacher(teacher);
    else createTeacher(teacher);
    closeModal();
  };

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
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>First Name</LabelWrapper>
          <InputWrapper
            placeholder="First Name"
            value={teacher.firstName}
            style={{ width: 270 }}
            onChange={(e) => setValue('firstName', e.target.value)}
          />
          <ErrorWrapper> {errors['firstName']} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Last Name</LabelWrapper>
          <InputWrapper
            placeholder="Last Name"
            value={teacher.lastName}
            style={{ width: 270 }}
            onChange={(e) => setValue('lastName', e.target.value)}
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
          >
            <Option value="CSE">Computer Science And Engineering</Option>
          </Select>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Email</LabelWrapper>
          <InputWrapper
            placeholder="Email"
            value={teacher.credential.email}
            style={{ width: 270 }}
            onChange={(e) => setValue('email', e.target.value)}
          />
          <ErrorWrapper> {errors['email']} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      </Modal>
  )
};

export default CreateEditTeacherModal;