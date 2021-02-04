import styled from "styled-components";
import React, { useState, useEffect } from "react";
import courseValidator from './course.validation';
import { Modal, Input, Select, DatePicker } from "antd";
import moment from "moment";
import _ from "underscore";
import { joiObjectParser } from "../../utitlities/common.functions";

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

const CreateEditCourseModal = ({
  selectedCourse,
  visible,
  setVisibility,
  createCourse,
  updateCourse
}) => {
  const isEditing = !(!selectedCourse);
  const title = isEditing ? 'Edit Course' : 'Create Course';
  const defaultCourse = {
    title: '',
    courseCode: '',
    department : {
      departmentCode : "CSE",
      departmentName : "Computer Science and Engineering"
    },
    exams: [],
    enrolledStudents: [],
    pendingEnrollStudents: [],
    assignedTeacher: null,
    startDate: null,
    status: null 
  };
  const [course, setCourse] = useState(isEditing ? selectedCourse : defaultCourse);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCourse(selectedCourse || defaultCourse);
  }, [isEditing, selectedCourse]);

  const setValue = (key, value) => {
    const newCourse = {
      ...course,
      [key]: value
    };
    const newErrors = {
      ...errors
    };
    delete newErrors[key];
    setCourse(newCourse);
    setErrors(newErrors);
  };

  const closeModal = () => {
    setVisibility(false);
    setCourse(defaultCourse);
    setErrors({});
  };

  const onSubmit = () => {
    const errors = joiObjectParser(course, courseValidator);
    setErrors(errors);
    if (!_.isEmpty(errors)) {
      return;
    }
    if (isEditing) updateCourse(course);
    else createCourse(course);
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
          <LabelWrapper>Title</LabelWrapper>
          <InputWrapper
            placeholder="Course Title"
            value={course.title}
            style={{ width: 270 }}
            onChange={(e) => setValue('title', e.target.value)}
          />
          <ErrorWrapper> {errors['title']} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Course Code</LabelWrapper>
          <InputWrapper
            placeholder="Course Code"
            value={course.courseCode}
            style={{ width: 270 }}
            onChange={(e) => setValue('courseCode', e.target.value)}
          />
          <ErrorWrapper> {errors['courseCode']} </ErrorWrapper>
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
          <LabelWrapper>Start Date</LabelWrapper>
          <DatePicker
            allowClear
            placeholder="Start Date"
            value={!course.startDate ? '' : moment(course.startDate)}
            style={{ width: 270 }}
            format="DD/MM/YYYY"
            onChange={(d) => setValue('startDate', d)}
          />
          <ErrorWrapper> {errors['startDate']} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Assignee</LabelWrapper>
          <Select
            showSearch
            style={{ width: 270 }}
            placeholder="Assign a teacher"
            optionFilterProp="children"
            onChange={()=>{}}
            onFocus={()=>{}}
            onBlur={()=>{}}
            onSearch={()=>{}}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="zzz">Saiful Islam</Option>
            <Option value="lucy">Enamul Hasan</Option>
            <Option value="tom">Arnam Sen Sharma</Option>
          </Select>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Status</LabelWrapper>
          <Select
            style={{ width: 270 }}
            placeholder="Select a status"
            value={course.status}
            onChange={(value) => setValue('status', value)}
          >
            <Option value="upcoming">Upcoming</Option>
            <Option value="running">Running</Option>
            <Option value="ended">Ended</Option>
          </Select>
          <ErrorWrapper> {errors['status']} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
    </Modal>
  )
};

export default CreateEditCourseModal;