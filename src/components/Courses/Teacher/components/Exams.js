import styled from 'styled-components'
import _ from 'underscore'
import { stFormatDate, splitDuration, splitStartTime, getExamStatus, smartLabel, NoDataComponent, getStatusColor } from '../../../../utitlities/common.functions'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { TableRowStyled } from '../../../styles/tableStyles'

const Container = styled.div`
`

const HeaderLabel = styled.h3`
  
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.color || 'inherit'};
`

const Row = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: ${props => props.columns || 'auto'};
  user-select: none;
  border-radius: 5px;
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
  <TableRowStyled columns="repeat(5, 1fr)" onClick={() => dispatch(push(`/exam/${exam._id}`))}>
    <Wrapper>{exam.title}</Wrapper>
    <Wrapper>{stFormatDate(exam.startDate)}</Wrapper>
    <Wrapper>{splitStartTime(exam.startTime)}</Wrapper>
    <Wrapper>{splitDuration(exam.duration)}</Wrapper>
    <Wrapper color={getStatusColor(getExamStatus(exam))}>{smartLabel(getExamStatus(exam))}</Wrapper>
  </TableRowStyled>
)

const Exams = ({
  exams, dispatch
}) => {
  const isNoData = !exams || exams.length === 0
  return (
    <Container>
      <Row header columns="repeat(5, 1fr)">
        <HeaderLabel>Title</HeaderLabel>
        <HeaderLabel>Date</HeaderLabel>
        <HeaderLabel>Start Time</HeaderLabel>
        <HeaderLabel>Duration</HeaderLabel>
        <HeaderLabel>Status</HeaderLabel>
      </Row>
      <Body>
        { isNoData && <NoDataComponent title="No exams created for this course" />}
        { !isNoData && _.map(exams, (exam, index) => <Card dispatch={dispatch} key={`exam_${index}`} exam={exam} />)}
      </Body>
      
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(null, mapDispatchToProps)(Exams)
