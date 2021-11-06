import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import courseValidator from '../course.validation'
import { Modal, Input, Select, DatePicker } from 'antd'
import moment from 'moment'
import _ from 'underscore'
import { joiObjectParser } from '../../../utitlities/common.functions'
import { allBatches } from '../../../utitlities/constants'
import api from '../../../utitlities/api'

const { Option } = Select

const InputWrapper = styled(Input)`
  height: 40px;
  border-radius: 5px;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'none'};
`

const ColumnWrapper = styled.div`
  margin-right: 20px;
  margin-bottom: 15px;
`

const LabelWrapper = styled.p`
  margin-bottom: 5px;
  color: #608794;
`

const ErrorWrapper = styled.p`
  font-size: 11px;
  color: #d40909;
  margin-left: 5px;
`

const SelectStyled = styled(Select)`
  width: 100%;
`
const getNameWithShort = obj => `${obj.firstName} ${obj.lastName} (${obj.shortName || ''})`

const CreateEditCourseModal = ({
  selectedCourse,
  visible,
  setVisibility,
  createCourse,
  updateCourse
}) => {
  const isEditing = !(!selectedCourse)
  const title = isEditing ? 'Edit Course' : 'Create Course'
  const defaultCourse = {
    title: '',
    courseCode: '',
    department: {
      departmentCode: 'CSE',
      departmentName: 'Computer Science and Engineering'
    },
    exams: [],
    enrolledStudents: [],
    pendingEnrollStudents: [],
    assignedTeacher: null,
    startDate: null,
    status: null
  }
  const [course, setCourse] = useState(isEditing ? selectedCourse : defaultCourse)
  const [teachers, setTeachers] = useState({})
  const [errors, setErrors] = useState({})

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setCourse(selectedCourse || defaultCourse)
    const { payload: fetchedTeachers = [] } = await api.getTeachers({})
    setTeachers(fetchedTeachers)
  }, [isEditing, selectedCourse])

  const setValue = (key, value) => {
    const newCourse = {
      ...course,
      [key]: value
    }
    const newErrors = {
      ...errors
    }
    delete newErrors[key]
    setCourse(newCourse)
    setErrors(newErrors)
  }

  const closeModal = () => {
    setVisibility(false)
    setCourse(defaultCourse)
    setErrors({})
  }

  const onSubmit = () => {
    const errors = joiObjectParser(course, courseValidator)
    setErrors(errors)
    if (!_.isEmpty(errors)) {
      return
    }
    if (isEditing) updateCourse(course)
    else createCourse(course)
    closeModal()
  }

  return (
    <Modal
      title={title}
      style={{ top: 20 }}
      visible={visible}
      width={800}
      height={800}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      okText={!isEditing ? 'Save' : 'Update'}
    >
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Title</LabelWrapper>
          <InputWrapper
            placeholder="Course Title"
            value={course.title}
            onChange={(e) => setValue('title', e.target.value)}
          />
          <ErrorWrapper> {errors.title} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Course Code</LabelWrapper>
          <InputWrapper
            placeholder="Course Code"
            value={course.courseCode}
            style={{ width: '100%' }}
            onChange={(e) => setValue('courseCode', e.target.value)}
          />
          <ErrorWrapper> {errors.courseCode} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Department</LabelWrapper>
          <SelectStyled
            defaultValue="CSE"
          >
            <Option value="CSE">Computer Science And Engineering</Option>
          </SelectStyled>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Assignee</LabelWrapper>
          <SelectStyled
            value={JSON.stringify(course.assignedTeacher)}
            onChange={(value) => setValue('assignedTeacher', JSON.parse(value))}
          >
            {_.map(teachers, (t) => <Option key={t._id} value={JSON.stringify(t)}>{getNameWithShort(t)}</Option>)}
            <Option key="unassigned" value={JSON.stringify(null)}> Unassigned </Option>
          </SelectStyled>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Batch</LabelWrapper>
          <SelectStyled
            placeholder="Please select a batch"
            value={course.batchCode}
            onChange={(value) => setValue('batchCode', value)}
          >
            {_.map(allBatches, (label, key) => <Option value={key}>{label}</Option> )}
          </SelectStyled>
          <ErrorWrapper> {errors.batchCode} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Start Date</LabelWrapper>
          <DatePicker
            allowClear
            placeholder="Start Date"
            style={{ width: '100%' }}
            value={!course.startDate ? '' : moment(course.startDate)}
            format="DD/MM/YYYY"
            onChange={(d) => setValue('startDate', d)}
          />
          <ErrorWrapper> {errors.startDate} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Status</LabelWrapper>
          <SelectStyled
            placeholder="Select a status"
            value={course.status}
            onChange={(value) => setValue('status', value)}
          >
            <Option value="upcoming">Upcoming</Option>
            <Option value="running">Running</Option>
            <Option value="ended">Ended</Option>
          </SelectStyled>
          <ErrorWrapper> {errors.status} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
    </Modal>
  )
}

export default CreateEditCourseModal
