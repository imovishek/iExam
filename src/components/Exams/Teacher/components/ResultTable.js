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
const ButtonStyled = styled(Button)`
  padding: 1px 1px;
  height: 25px;
`;
const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
`;

const BodyRow = styled.div`
  display: grid;
  grid-gap: 10px;
  height: 30px;
  grid-template-columns: ${props => props.columns || 'auto'};
  cursor: pointer;
  :hover {
    background: #e4e4e4;
  }
`;

const Body = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`
const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ dispatch, student, exam, updateExamParticipantOnUI, isBanNotShowing = false, papers }) => {
  const arr = _.filter(papers, paper => student._id === paper.student);
  const paper = arr[0];
  const banStudentButtonHandler = async (e) => {
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
    <BodyRow onClick={() => dispatch(push(`/exam/${exam._id}/paper/${student._id}`))} columns="repeat(2, 1fr) 1fr">
      <Wrapper>{student.registrationNo}</Wrapper>
      <Wrapper>{getName(student)}</Wrapper>
      <Wrapper>
        {paper && paper.totalMarks}
      </Wrapper>
    </BodyRow>
  );
};

const ResultTable = ({
  students, exam, updateExamParticipantOnUI, dispatch, papers
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
  return (
    <Container>
      <SearchStyled
       allowClear
       placeholder="Search"
       onChange={(e) => handleSearch(e.target.value)}
      />
      <Row columns="repeat(2, 1fr) 1fr">
        <HeaderLabel>Regi No.</HeaderLabel>
        <HeaderLabel>Name</HeaderLabel>
        <HeaderLabel>TotalMarks</HeaderLabel>
      </Row>
      <Body>
        {_.map(searchStudents, (student, index) => <Card papers={papers} dispatch={dispatch} key={`student_${index}`} student={student} exam = {exam} updateExamParticipantOnUI = {updateExamParticipantOnUI}/>)}
      </Body>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(null, mapDispatchToProps)(ResultTable);