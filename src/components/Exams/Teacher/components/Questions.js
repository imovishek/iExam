import styled from 'styled-components'
import _ from 'underscore'
import { smartLabel, getName } from '../../../../utitlities/common.functions'
import { AwesomeIcon } from '../../../../utitlities/styles'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Popconfirm } from 'antd'
import api from '../../../../utitlities/api'

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
`
const Body = styled.div`
  overflow: auto;
  height: calc(100% - 42px);
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const Card = ({ onUpdateExamUI, teachersObj = {}, question, dispatch, exam }) => (
  <Row columns="repeat(4, 1fr) 30px" onClick={() => dispatch(push(`/exam/${exam._id}/question/${question._id}`))}>
    <Wrapper>{question.title}</Wrapper>
    <Wrapper>{getName(teachersObj[question.authorID])}</Wrapper>
    <Wrapper>{smartLabel(question.type)}</Wrapper>
    <Wrapper>{question.marks}</Wrapper>
    <Wrapper>
      <Popconfirm
        title="Are you sure？"
        okText="Yes"
        cancelText="No"
        onCancel={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onConfirm={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          await api.updateExam(exam, { $pull: { questions: question._id } })
          await onUpdateExamUI()
        }}
      >
        <AwesomeIcon
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          type="delete"
        />
      </Popconfirm>
    </Wrapper>
  </Row>
)

const Questions = ({
  questions,
  exam,
  dispatch,
  teachersObj,
  onUpdateExamUI
}) => (
  <Container>
    <Row header columns="repeat(4, 1fr) 30px">
      <HeaderLabel>Title</HeaderLabel>
      <HeaderLabel>Author</HeaderLabel>
      <HeaderLabel>Type</HeaderLabel>
      <HeaderLabel>Marks</HeaderLabel>
    </Row>
    <Body>
      {_.map(questions, (question, index) => <Card teachersObj={teachersObj} exam={exam} dispatch={dispatch} key={`question_${index}`} question={question} onUpdateExamUI={onUpdateExamUI}/>)}
    </Body>
  </Container>
)

const mapDispatchToProps = dispatch => ({ dispatch })
export default connect(null, mapDispatchToProps)(Questions)
