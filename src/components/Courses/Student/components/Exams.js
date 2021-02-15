import styled from 'styled-components'
import _ from 'underscore'
import { stFormatDate, getTimeDifferenceExam, splitDuration, getExamStatus, smartLabel } from '../../../../utitlities/common.functions'
import { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'


const Container = styled.div`
  border-radius: 8px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`

const Body = styled.div`
  overflow: auto;
  max-height: 450px;
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
`

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  user-select: none;
  :hover {
    background: #d2e3e8;
  }
  cursor: pointer;
`

const HeaderRow = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  border-radius: 8px;
  user-select: none;
`
const Card = ({ exam, onClick }) => {
  const [detailDuration, setDetailDuration] = useState(getTimeDifferenceExam(exam))
  useEffect(() => {
    setInterval(() => {
      setDetailDuration(getTimeDifferenceExam(exam))
    }, 1000)
  }, [])

  return (
    <Row columns="repeat(4, 1fr) 200px" onClick={onClick}>
      <Wrapper>{exam.title}</Wrapper>
      <Wrapper>{stFormatDate(exam.startDate)}</Wrapper>
      <Wrapper>{splitDuration(exam.duration)}</Wrapper>
      <Wrapper>{smartLabel(getExamStatus(exam))}</Wrapper>
      <Wrapper>{detailDuration}</Wrapper>
    </Row>
  )
}

const Exams = ({
  exams, dispatch
}) => (
  <Container rows="55px 1fr">
    <HeaderRow columns="repeat(4, 1fr) 200px">
      <HeaderLabel>Title</HeaderLabel>
      <HeaderLabel>Start Date</HeaderLabel>
      <HeaderLabel>Duration</HeaderLabel>
      <HeaderLabel>Status</HeaderLabel>
      <HeaderLabel>Start In</HeaderLabel>
    </HeaderRow>
    <Body>
      {_.map(exams, (exam, index) => <Card key={`exam_${index}`} exam={exam} onClick={() => dispatch(push(`/exam/${exam._id}`))}/>)}
    </Body>
  </Container>
)

const mapStateToProps = state => ({
  user: state.login.user
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Exams)
