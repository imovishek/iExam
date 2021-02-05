import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { Button, Popconfirm } from "antd";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: auto;
  margin-left: 5px;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
`;
const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ student }) => {
  return (
    <Row columns="repeat(2, 1fr) 20px">
      <Wrapper>{getName(student)}</Wrapper>
      <Wrapper>{student.registrationNo}</Wrapper>
      <Wrapper>
      <Popconfirm
        title="Are you sure？"
        okText="Yes"
        cancelText="No"
        onConfirm={() => {}}
      >
        <FontAwesomeIconWrapper
          icon={faTrash}
          color="#a02f2f"
        />
      </Popconfirm>
      </Wrapper>
    </Row>
  );
};

const EnrolledStudents = ({
  students
}) => {
  return (
    <Container>
      <SearchStyled placeholder="Search" />
      <Row columns="repeat(2, 1fr) 20px">
        <HeaderLabel>Name</HeaderLabel>
        <HeaderLabel>Regi No.</HeaderLabel>
        <HeaderLabel></HeaderLabel>
      </Row>
      {_.map(students, (student, index) => <Card key={`student_${index}`} student={student} />)}
    </Container>
  );
};

export default EnrolledStudents;