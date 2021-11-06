import styled from 'styled-components'
import _ from 'underscore'

const Container = styled.div`
  overflow: auto;
`

const HeaderLabel = styled.div`
  color: grey;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
`

const Card = ({ question }) => (
  <Row columns="repeat(4, 1fr)">
    <Wrapper>{question.title}</Wrapper>
    <Wrapper>{question.authorID}</Wrapper>
    <Wrapper>{question.type}</Wrapper>
    <Wrapper>{question.marks}</Wrapper>
  </Row>
)

const Questions = ({
  questions
}) => (
  <Container>
    <Row columns="repeat(4, 1fr)">
      <HeaderLabel>Title</HeaderLabel>
      <HeaderLabel>Author</HeaderLabel>
      <HeaderLabel>Type</HeaderLabel>
      <HeaderLabel>Marks</HeaderLabel>
    </Row>
    {_.map(questions, (question, index) => <Card key={`question_${index}`} question={question} />)}
  </Container>
)

export default Questions
