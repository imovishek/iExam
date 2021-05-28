import styled from 'styled-components'
import _ from 'underscore'
import { smartLabel, getShortName } from '../../../../utitlities/common.functions'
import { AwesomeIcon, Box } from '../../../../utitlities/styles'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Popconfirm } from 'antd'
import api from '../../../../utitlities/api'
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
`

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background: ${p => p.header ? 'none' : '#e4e4e4'};
  }
`
const Body = styled.div`
  overflow: auto;
  /*height: calc(100% - 42px);*/
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const Card = ({ onUpdateExamUI, teachersObj = {}, question, dispatch, exam }) => (
  <TableRowStyled gridGap="10px" columns="2fr 1fr 60px 60px 30px" onClick={() => dispatch(push(`/exam/${exam._id}/question/${question._id}`))}>
    <Wrapper>{question.title}</Wrapper>
    <Wrapper>{smartLabel(question.type)}</Wrapper>
    <Wrapper>{getShortName(teachersObj[question.authorID])}</Wrapper>
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
  </TableRowStyled>
)

const Questions = ({
  questions,
  exam,
  dispatch,
  teachersObj,
  onUpdateExamUI
}) => (
  <Container>
    <Row header gridGap="10px" columns="2fr 1fr 60px 60px 30px">
      <HeaderLabel>Title</HeaderLabel>
      <HeaderLabel>Type</HeaderLabel>
      <HeaderLabel>Author</HeaderLabel>
      <HeaderLabel>Marks</HeaderLabel>
    </Row>
    <Body>
      {_.map(questions, (question, index) => <Card teachersObj={teachersObj} exam={exam} dispatch={dispatch} key={`question_${index}`} question={question} onUpdateExamUI={onUpdateExamUI}/>)}
      <Box height="800px"/>
    </Body>
  </Container>
)

const mapDispatchToProps = dispatch => ({ dispatch })
export default connect(null, mapDispatchToProps)(Questions)
