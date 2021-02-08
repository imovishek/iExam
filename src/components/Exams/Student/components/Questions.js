import Search from "antd/lib/input/Search";
import styled from "styled-components";
import _ from 'underscore';
import { stFormatDate, getDuration } from "../../../../utitlities/common.functions";
import { RightButtonWrapper } from "../../../styles/pageStyles";
import { Button } from "antd";
import { push } from "connected-react-router";
import { questions } from "../../../../utitlities/dummy";

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
  height: 50px;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  user-select: none;
  cursor: pointer;
  :hover {
    background: #f1f1f1;
  }
  border-radius: 6px;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  border-radius: 8px;
  user-select: none;
`;

const getName = obj => `${obj.firstName} ${obj.lastName}`
const Card = ({ question, onShowingPaper }) => {
  return (
    <Row columns="repeat(2, 1fr) 100px" onClick={() => onShowingPaper()}>
      <Wrapper>{question.title}</Wrapper>
      <Wrapper>{question.type}</Wrapper>
      <Wrapper>
        <RightButtonWrapper>
          <Button onClick={() => onShowingPaper()} type="primary">View</Button>
        </RightButtonWrapper>
      </Wrapper>
    </Row>
  );
};

const Questions = ({
  questions,
  onShowingPaper,
}) => {
  return (
    <Container>
      <HeaderRow columns="repeat(2, 1fr) 100px">
        <HeaderLabel>Title</HeaderLabel>
        <HeaderLabel>Type</HeaderLabel>
        <HeaderLabel></HeaderLabel>
      </HeaderRow>
      <Body>
        {_.map(questions, (question, index) => <Card key={`question_${index}`} question={question} onShowingPaper={onShowingPaper}/>)}
      </Body>
    </Container>
  );
};

export default Questions;
