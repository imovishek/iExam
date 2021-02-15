import styled from 'styled-components'
import _ from 'underscore'
import { stFormatDate, splitDuration, splitStartTime, getExamStatus, smartLabel } from '../../../../utitlities/common.functions'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

const Container = styled.div`
`

const HeaderLabel = styled.div`
  color: grey;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Row = styled.div`
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  user-select: none;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background: ${p => p.header ? 'none' : '#e4e4e4'};
  }
`;

const Body = styled.div`
  overflow: auto;
  height: calc(100% - 42px);
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const Card = ({ exam, dispatch }) => (
  <Row columns="repeat(5, 1fr)" onClick={() => dispatch(push(`/exam/${exam._id}`))}>
    <Wrapper>{exam.title}</Wrapper>
    <Wrapper>{stFormatDate(exam.startDate)}</Wrapper>
    <Wrapper>{splitStartTime(exam.startTime)}</Wrapper>
    <Wrapper>{splitDuration(exam.duration)}</Wrapper>
    <Wrapper>{smartLabel(getExamStatus(exam))}</Wrapper>
  </Row>
)

const Exams = ({
  exams, dispatch
}) => (
  <Container>
    <Row header columns="repeat(5, 1fr)">
      <HeaderLabel>Title</HeaderLabel>
      <HeaderLabel>Date</HeaderLabel>
      <HeaderLabel>Start Time</HeaderLabel>
      <HeaderLabel>Duration</HeaderLabel>
      <HeaderLabel>Status</HeaderLabel>
    </Row>
    <Body>
      {_.map(exams, (exam, index) => <Card dispatch={dispatch} key={`exam_${index}`} exam={exam} />)}
    </Body>
    
  </Container>
)

const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(null, mapDispatchToProps)(Exams)
