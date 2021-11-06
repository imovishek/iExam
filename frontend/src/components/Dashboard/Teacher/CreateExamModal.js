import "./SpinerColorFix.css";
import styled from "styled-components";
import React, { useState } from "react";
import { dashBoardCreateExamValidator } from "../../Exams/exam.validation";
import { Spin, Modal, Input, Select, DatePicker, TimePicker } from "antd";
import moment from "moment";
import _ from "underscore";
import {
  joiObjectParser,
  deepCopy,
} from "../../../utitlities/common.functions";
import api from "../../../utitlities/api";
import { push } from "connected-react-router";
import { setNavigaitonTabAction } from "../../NavBar/actions";

const { Option } = Select;

const InputWrapper = styled(Input)`
  height: 40px;
  border-radius: 5px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "none"};
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

const CreateExamModal = ({ visible, setVisibility, courses, dispatch }) => {
  const defaultExam = {
    title: "",
    examCode: "",
    course: courses.length === 0 ? "" : courses[0].id,
    department: {
      departmentCode: "CSE",
      departmentName: "Computer Science and Engineering",
    },
    startDate: null,
    startTime: "10:00 AM",
    duration: "00:30",
    totalMarks: 0,
    status: null,
  };

  const timeFormat = "hh:mm A";
  const durationFormat = "HH:mm";

  const [exam, setExam] = useState(deepCopy({ ...defaultExam }));
  const [selectedCourse, setCourse] = useState(
    courses.length === 0 ? "" : courses[0]
  );
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  const createExam = async (exam, course) => {
    setLoading(true);

    exam.participants = _.map(course.enrolledStudents, (enst) => enst._id);
    const { payload: newExam } = await api.createExam(exam);
    await api.updateCourse(
      { _id: course.id },
      { $push: { exams: newExam._id } }
    );

    setLoading(false);
    closeModal();
    dispatch(setNavigaitonTabAction("exams"));
    dispatch(push(`exam/${newExam.id}`));
  };

  const setValue = (key, value) => {
    const newExam = {
      ...exam,
      [key]: value,
    };
    const newErrors = {
      ...errors,
    };
    delete newErrors[key];
    setExam(newExam);
    setErrors(newErrors);
  };

  const closeModal = () => {
    setVisibility(false);
    setExam(deepCopy({ ...defaultExam }));
    setErrors({});
  };

  const onSubmit = () => {
    if (isLoading) return;
    const errors = joiObjectParser(exam, dashBoardCreateExamValidator);
    setErrors(errors);
    if (_.isEmpty(errors)) createExam(exam, selectedCourse);
  };

  return (
    <Modal
      className="modal"
      title="Create Exam"
      style={{ top: 20 }}
      visible={visible}
      width={800}
      height={800}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      okText={isLoading ? <Spin></Spin> : "Create"}
    >
      <Row columns="1fr 1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Title</LabelWrapper>
          <InputWrapper
            placeholder="Exam Title"
            value={exam.title}
            onChange={(e) => setValue("title", e.target.value)}
          />
          <ErrorWrapper> {errors.title} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Total marks</LabelWrapper>
          <InputWrapper
            placeholder="Total marks"
            value={exam.totalMarks}
            onChange={(e) => setValue("totalMarks", e.target.value)}
          />
          <ErrorWrapper> {errors.totalMarks} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Course</LabelWrapper>
          <Select
            showSearch
            style={{ width: "100%" }}
            value={selectedCourse === "" ? "" : selectedCourse.title}
            optionFilterProp="children"
            filterOption={true}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            onChange={(e) => {
              setValue("course", e);
              courses.forEach((element) => {
                if (element.id === e) {
                  setCourse(element);
                }
              });
            }}
          >
            {courses.map((course) => (
              <Option key={course.id}>{`${course.courseCode} ${course.batchCode} ${course.title}`}</Option>
            ))}
          </Select>
          <ErrorWrapper> {errors.course} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
      <Row columns="1fr 1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>Date</LabelWrapper>
          <DatePicker
            allowClear={false}
            placeholder="Start Date"
            value={!exam.startDate ? "" : moment(exam.startDate)}
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            onChange={(d) => setValue("startDate", d)}
          />
          <ErrorWrapper> {errors.startDate} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Start Time</LabelWrapper>
          <TimePicker
            allowClear={false}
            style={{ width: '100%' }}
            value={moment(exam.startTime, timeFormat)}
            format={timeFormat}
            onSelect={(v) => setValue("startTime", v.format(timeFormat))}
          />
          <ErrorWrapper> {errors.startTime} </ErrorWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <LabelWrapper>Duration</LabelWrapper>
          <TimePicker
            allowClear={false}
            showNow={false}
            style={{ width: '100%' }}
            value={moment(exam.duration, durationFormat)}
            format={durationFormat}
            onSelect={(v) => setValue("duration", v.format(durationFormat))}
          />
          <ErrorWrapper> {errors.duration} </ErrorWrapper>
        </ColumnWrapper>
      </Row>
    </Modal>
  );
};

export default CreateExamModal;
