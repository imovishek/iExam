import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../../../utitlities/api";
import { useEffect, useState } from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { students } from "../../../../utitlities/dummy";
import { useParams } from "react-router";


const SearchStyled = styled(Search)`
  width: 100%;
  margin-bottom: 10px;
`;

const Container = styled.div`
  overflow: auto;
  height: 100%;
  position: relative;
`;

const HeaderLabel = styled.div`
  color: grey;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ButtonStyled = styled(Button)`
  padding: 1px 1px;
  height: 25px;
`;
const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 3px;
  border-radius: 5px;
  grid-template-columns: ${props => props.columns || 'auto'};
`;

const BodyRow = styled.div`
  padding: 3px;
  border-radius: 5px;
  user-select: none;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  background: ${props => props.isSelected ? '#a3b1bd' : 'none'};
  cursor: pointer;
  :hover {
    background: ${props => props.isSelected ? '#a3b1bd' : '#e4e4e4'};
  }
`;

const Body = styled.div`
  overflow: auto;
  position: absolute;
  height: calc(100% - 140px);
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const TextCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ dispatch, student, totalMarks, exam, updateExamParticipantOnUI, isBanNotShowing = false }) => {
  const { examID, studentID } = useParams();
  const banStudentButtonHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const update = {
      $push: {
        bannedParticipants: student._id
      }
    };
    if (_.any(exam.bannedParticipants, enst => enst._id === student._id)) delete update.$push;
    await api.updateExam(exam, {
      ...update,
      $pull: {
        participants: student._id
      }
    });
    await updateExamParticipantOnUI();
  }

  return (
    <BodyRow isSelected={studentID === student._id} onClick={() => dispatch(push(`/exam/${exam._id}/paper/${student._id}`))} columns="repeat(2, 1fr) 80px">
      <Wrapper>{student.registrationNo}</Wrapper>
      <Wrapper>{getName(student)}</Wrapper>
      <Wrapper> <TextCenter>{totalMarks || 0} </TextCenter> </Wrapper>
    </BodyRow>
  );
};

const Participants = ({
  students, exam, updateExamParticipantOnUI, dispatch, paper
}) => {
  const [ searchStudents, setSearchStudents ] = useState(students);
  useEffect(() => {
    setSearchStudents(students);
  }, [students]);
  const handleSearch = (value) => {
    const pattern = value
      .trim()
      .replace(/ +/g, "")
      .toLowerCase();

    const afterSearchStudents = _.filter(students, student =>
      `${student.firstName}${student.lastName}${student.registrationNo}`
        .trim()
        .replace(/ +/g, "")
        .toLowerCase()
        .includes(pattern)
    );
    setSearchStudents(afterSearchStudents);
  }
  const [marksObj, setMarksObj] = useState({});

  useEffect(() => {
    const newMarksObj = {};
    _.each(exam.papers, paper => {
      newMarksObj[paper.student] = paper.totalMarks;
    });
    setMarksObj(newMarksObj);
  }, [exam.papers])
  return (
    <Container>
      <SearchStyled
       allowClear
       placeholder="Search"
       onChange={(e) => handleSearch(e.target.value)}
      />
      <Row columns="repeat(2, 1fr) 80px">
        <HeaderLabel>Regi No.</HeaderLabel>
        <HeaderLabel>Name</HeaderLabel>
        <HeaderLabel><TextCenter> Total Marks </TextCenter></HeaderLabel>
      </Row>
      <Body>
        {_.map(searchStudents, (student, index) => <Card dispatch={dispatch} totalMarks={marksObj[student._id]} key={`student_${index}`} student={student} exam = {exam} updateExamParticipantOnUI = {updateExamParticipantOnUI}/>)}
      </Body>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(null, mapDispatchToProps)(Participants);