import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { teachers } from '../../../../utitlities/dummy';

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


const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ teacher }) => {
  return (
    <Row columns="repeat(2, 1fr) 20px">
      <Wrapper>{getName(teacher)}</Wrapper>
      <Wrapper>{teacher.department.departmentCode}</Wrapper>
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
const dummyTeachers = teachers;
const QuestionAccess = ({
  teachers = dummyTeachers
}) => {
  return (
    <Container>
      <SearchStyled placeholder="Search" />
      <Row columns="repeat(2, 1fr) 20px">
        <HeaderLabel>Name</HeaderLabel>
        <HeaderLabel>Department</HeaderLabel>
        <HeaderLabel></HeaderLabel>
      </Row>
      {_.map(teachers, (teacher, index) => <Card key={`teacher_${index}`} teacher={teacher} />)}
    </Container>
  );
};

export default QuestionAccess;