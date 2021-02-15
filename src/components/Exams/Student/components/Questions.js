import styled from 'styled-components'
import _ from 'underscore'
import { getExamStatus, getTimeDifferenceExam } from '../../../../utitlities/common.functions'
import { RightButtonWrapper, TileHeaderWrapper } from '../../../styles/pageStyles'
import { Button } from 'antd'

const Container = styled.div`
  border-radius: 8px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  height: calc(100vh - 150px);
`

const Body = styled.div`
  overflow: auto;
  height: calc(100vh - 270px);
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const HeaderLabel = styled.div`
  color: grey;
  padding: 10px;
`

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
`

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  user-select: none;
  border-radius: 6px;
`

const HeaderRow = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  border-radius: 8px;
  user-select: none;
`

const Card = ({ question, onShowingPaper }) => (
  <Row columns="repeat(2, 1fr) 100px">
    <Wrapper>{question.title}</Wrapper>
    <Wrapper>{question.type}</Wrapper>
    <Wrapper>{question.marks}</Wrapper>
  </Row>
)

const Questions = ({
  exam,
  questions = [],
  onShowingPaper
}) => (
  <Container>
    <Wrapper>
      <TileHeaderWrapper>
          Total {questions.length} questions
        <div>{getExamStatus(exam) === 'ended' ? `Ended ${getTimeDifferenceExam(exam, -1)} ago` : ''}</div>
        <RightButtonWrapper>
          <Button disabled={questions.length === 0} onClick={() => onShowingPaper()} type="primary">{getExamStatus(exam) === 'ended' ? 'View Questions' : 'Answer Questions'}</Button>
        </RightButtonWrapper>
      </TileHeaderWrapper>

    </Wrapper>
    <HeaderRow columns="repeat(2, 1fr) 100px">
      <HeaderLabel>Title</HeaderLabel>
      <HeaderLabel>Type</HeaderLabel>
      <HeaderLabel>Marks</HeaderLabel>
    </HeaderRow>
    <Body>
      {_.map(questions, (question, index) => <Card key={`question_${index}`} question={question} onShowingPaper={onShowingPaper}/>)}
    </Body>
  </Container>
)

export default Questions
