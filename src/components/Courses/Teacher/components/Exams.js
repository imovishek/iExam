import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { stFormatDate, getDuration, splitDuration, splitStartTime, getExamStatus, smartLabel } from "../../../../utitlities/common.functions";
import { push } from "connected-react-router";
import { connect } from "react-redux";

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
  cursor: pointer;
  :hover {
    background: #e4e4e4;
  }
`;
const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ exam, dispatch }) => {
  return (
    <Row columns="repeat(5, 1fr)" onClick={() => dispatch(push(`/exam/${exam._id}`))}>
      <Wrapper>{exam.title}</Wrapper>
      <Wrapper>{stFormatDate(exam.startDate)}</Wrapper>
      <Wrapper>{splitStartTime(exam.startTime)}</Wrapper>
      <Wrapper>{splitDuration(exam.duration)}</Wrapper>
      <Wrapper>{smartLabel(getExamStatus(exam))}</Wrapper>
    </Row>
  );
};

const Exams = ({
  exams, dispatch
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
      {_.map(exams, (exam, index) => <Card dispatch={dispatch} key={`exam_${index}`} exam={exam} />)}
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(null, mapDispatchToProps)(Exams);