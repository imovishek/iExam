import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { stFormatDate, getDuration, smartLabel, getName } from "../../../../utitlities/common.functions";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Button, Popconfirm } from "antd";
import api from "../../../../utitlities/api";

const SearchStyled = styled(Search)`
  width: 100%;
`;

const Container = styled.div`
  
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

const Body = styled.div`
  overflow: auto;
  height: calc(100vh - 340px);
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
`;

const BodyRow = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  cursor: pointer;
  :hover {
    background: #e4e4e4;
  }
`;

const Card = ({ onUpdateExamUI, teachersObj = {}, question, dispatch, exam }) => {
  return (
    <BodyRow columns="repeat(5, 1fr)" onClick={() => dispatch(push(`/exam/${exam._id}/question/${question._id}`))}>
      <Wrapper>{question.title}</Wrapper>
      <Wrapper>{getName(teachersObj[question.authorID])}</Wrapper>
      <Wrapper>{smartLabel(question.type)}</Wrapper>
      <Wrapper>{question.marks}</Wrapper>
      <Wrapper>
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onConfirm={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await api.updateExam(exam, { $pull: { questions: question._id } });
            await onUpdateExamUI();
          }}
        >
          <Button danger style={{padding: '3px', height: '25px'}}>Remove</Button>
        </Popconfirm>
      </Wrapper>
    </BodyRow>
  );
};

const Questions = ({
  questions,
  exam,
  dispatch,
  teachersObj,
  onUpdateExamUI
}) => {
  return (
    <Container>
      <Row columns="repeat(5, 1fr)">
        <HeaderLabel>Title</HeaderLabel>
        <HeaderLabel>Author</HeaderLabel>
        <HeaderLabel>Type</HeaderLabel>
        <HeaderLabel>Marks</HeaderLabel>
      </Row>
      <Body>
        {_.map(questions, (question, index) => <Card teachersObj={teachersObj} exam={exam} dispatch={dispatch} key={`question_${index}`} question={question} onUpdateExamUI={onUpdateExamUI}/>)}
      </Body>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(null, mapDispatchToProps)(Questions);