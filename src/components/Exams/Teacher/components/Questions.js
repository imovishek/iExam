import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { stFormatDate, getDuration } from "../../../../utitlities/common.functions";
import { connect } from "react-redux";
import { push } from "connected-react-router";

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
  cursor: pointer;
  :hover {
    background: #e4e4e4;
  }
`;

const Card = ({ question, dispatch, exam }) => {
  return (
    <Row columns="repeat(4, 1fr)" onClick={() => dispatch(push(`/exam/${exam._id}/question/${question._id}`))}>
      <Wrapper>{question.title}</Wrapper>
      <Wrapper>{question.authorID}</Wrapper>
      <Wrapper>{question.type}</Wrapper>
      <Wrapper>{question.marks}</Wrapper>
    </Row>
  );
};

const Questions = ({
  questions,
  exam,
  dispatch
}) => {
  return (
    <Container>
      <Row columns="repeat(4, 1fr)">
        <HeaderLabel>Title</HeaderLabel>
        <HeaderLabel>Author</HeaderLabel>
        <HeaderLabel>Type</HeaderLabel>
        <HeaderLabel>Marks</HeaderLabel>
      </Row>
      {_.map(questions, (question, index) => <Card exam={exam} dispatch={dispatch} key={`question_${index}`} question={question} />)}
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(null, mapDispatchToProps)(Questions);