import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import api, { updateCourse } from "../../../../utitlities/api";
import { useState } from "react";

const SearchStyled = styled(Search)`
  width: 100%;
  margin-bottom: 10px;
`;

const Container = styled.div`
  overflow: auto;
`;

const HeaderLabel = styled.div`
  color: grey;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
`;

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: auto;
  margin-left: 5px;
  width: 15px;
  height: 15px;
`;


const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ student, course, updateCourseOnUi }) => {
  const approveEnrollRequestHandler = async (e) => {
    const update = {
      $push: {
        enrolledStudents: student._id
      }
    };
    if (_.any(course.enrolledStudents, enst => enst._id === student._id)) delete update.$push;
    await api.updateCourse(course, {
      ...update,
      $pull: {
        pendingEnrollStudents: student._id
      }
    });
    await updateCourseOnUi();
  }

  return (
    <Row columns="repeat(2, 1fr) 20px">
      <Wrapper>{student.registrationNo}</Wrapper>
      <Wrapper>{getName(student)}</Wrapper>
      <Wrapper>
      <FontAwesomeIconWrapper
        icon={faCheckCircle}
        color="green"
        onClick={approveEnrollRequestHandler}
      />
      </Wrapper>
    </Row>
  );
};

const EnrollmentRequest = ({
  students, course, updateCourseOnUi
}) => {
  return (
    <Container>
      <SearchStyled placeholder="Search" />
      <Row columns="repeat(2, 1fr) 20px">
        <HeaderLabel>Regi No.</HeaderLabel>
        <HeaderLabel>Name</HeaderLabel>
        <HeaderLabel></HeaderLabel>
      </Row>
      {_.map(students, (student, index) => <Card key={`student_${index}`} 
      student={student} course={course} updateCourseOnUi={updateCourseOnUi} />)}
    </Container>
  );
};

export default EnrollmentRequest;