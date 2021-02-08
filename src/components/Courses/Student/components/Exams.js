import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { stFormatDate, getDuration } from "../../../../utitlities/common.functions";

const SearchStyled = styled(Search)`
  width: 100%;
`;

const Container = styled.div`
  border-radius: 8px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const Body = styled.div`
  overflow: auto;
  max-height: 120px;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const HeaderLabel = styled.div`
  color: grey;
  padding: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  padding: 10px;
  text-overflow: ellipsis;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  user-select: none;
`;

const HeaderRow = styled.div`
  background: #d8d8d8;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  border-radius: 8px;
  user-select: none;
`;

const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ exam }) => {
  return (
    <Row columns="repeat(4, 1fr)">
      <Wrapper>{exam.title}</Wrapper>
      <Wrapper>{stFormatDate(exam.startDate)}</Wrapper>
      <Wrapper>{getDuration(exam.startDate, exam.endDate)}</Wrapper>
      <Wrapper>{exam.status}</Wrapper>
    </Row>
  );
};

const Exams = ({
  exams
}) => {
  return (
    <Container>
      <HeaderRow columns="repeat(4, 1fr)">
        <HeaderLabel>Title</HeaderLabel>
        <HeaderLabel>Start Date</HeaderLabel>
        <HeaderLabel>Duration</HeaderLabel>
        <HeaderLabel>Status</HeaderLabel>
      </HeaderRow>
      <Body>
        {_.map(exams, (exam, index) => <Card key={`exam_${index}`} exam={exam} />)}
      </Body>
    </Container>
  );
};

export default Exams;