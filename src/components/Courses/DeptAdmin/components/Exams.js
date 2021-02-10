import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { stFormatDate, getDuration, splitStartTime, splitDuration, smartLabel, getExamStatus } from "../../../../utitlities/common.functions";

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
  user-select: none;
`;
const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ exam }) => {
  return (
    <Row columns="repeat(5, 1fr)">
      <Wrapper>{exam.title}</Wrapper>
      <Wrapper>{stFormatDate(exam.startDate)}</Wrapper>
      <Wrapper>{splitStartTime(exam.startTime)}</Wrapper>
      <Wrapper>{splitDuration(exam.duration)}</Wrapper>
      <Wrapper>{smartLabel(getExamStatus(exam))}</Wrapper>
    </Row>
  );
};

const Exams = ({
  exams
}) => {
  return (
    <Container>
      <Row columns="repeat(5, 1fr)">
        <HeaderLabel>Title</HeaderLabel>
        <HeaderLabel>Date</HeaderLabel>
        <HeaderLabel>Start Time</HeaderLabel>
        <HeaderLabel>Duration</HeaderLabel>
        <HeaderLabel>Status</HeaderLabel>
      </Row>
      {_.map(exams, (exam, index) => <Card key={`exam_${index}`} exam={exam} />)}
    </Container>
  );
};

export default Exams;