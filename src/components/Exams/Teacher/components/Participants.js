import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../../../utitlities/api";

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
const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ student, exam, updateExamParticipantOnUI}) => {

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
    <Row columns="repeat(2, 1fr) 50px">
      <Wrapper>{student.registrationNo}</Wrapper>
      <Wrapper>{getName(student)}</Wrapper>
      <Wrapper>
      <Popconfirm
        title="Are you sure？"
        okText="Yes"
        cancelText="No"
        onConfirm={banStudentButtonHandler}
      >
        <ButtonStyled danger> Ban </ButtonStyled>
      </Popconfirm>
      </Wrapper>
    </Row>
  );
};

const Participants = ({
  students, exam, updateExamParticipantOnUI
}) => {
  return (
    <Container>
      <SearchStyled placeholder="Search" />
      <Row columns="repeat(2, 1fr) 50px">
        <HeaderLabel>Regi No.</HeaderLabel>
        <HeaderLabel>Name</HeaderLabel>
        <HeaderLabel></HeaderLabel>
      </Row>
      {_.map(students, (student, index) => <Card key={`student_${index}`} student={student} exam = {exam} updateExamParticipantOnUI = {updateExamParticipantOnUI}/>)}
    </Container>
  );
};

export default Participants;