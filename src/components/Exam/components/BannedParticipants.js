import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { Popconfirm, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const SearchStyled = styled(Search)`
  width: 100%;
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
const ButtonStyled = styled(Button)`
  padding: 1px 1px;
  height: 25px;
  background: green;
`;

const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ student }) => {
  return (
    <Row columns="repeat(2, 1fr) 70px">
      <Wrapper>{getName(student)}</Wrapper>
      <Wrapper>{student.registrationNo}</Wrapper>
      <Wrapper>
        <ButtonStyled type="primary"> Unban </ButtonStyled>
      </Wrapper>
    </Row>
  );
};

const BannedParticipants = ({
  students
}) => {
  return (
    <Container>
      <SearchStyled placeholder="Search" />
      <Row columns="repeat(2, 1fr) 70px">
        <HeaderLabel>Name</HeaderLabel>
        <HeaderLabel>Regi No.</HeaderLabel>
        <HeaderLabel></HeaderLabel>
      </Row>
      {_.map(students, student => <Card student={student} />)}
    </Container>
  );
};

export default BannedParticipants;