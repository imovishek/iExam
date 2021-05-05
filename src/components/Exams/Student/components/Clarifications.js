import styled from 'styled-components'
import React, { useState } from 'react'
import { Select, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { getName, getTimeDiff, NoDataComponent } from '../../../../utitlities/common.functions'
import { Box } from '../../../../utitlities/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAsia, faLock } from '@fortawesome/free-solid-svg-icons'
import { Row } from '../../../styles/pageStyles'
const { Option } = Select;

const CardContainer = styled.div`
  border: 1px solid #bbbbbb;
  border-radius: 3px;
  box-shadow: 1px 1px 5px #bbbbbb;
  margin-bottom: 20px;
`

const BodyWrapper = styled.div`
  padding: 10px;
  overflow: auto;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  -webkit-box-orient: vertical;
`

const IgnoreWrappper = styled.div`
  display: inline;
  color: white;
  margin-left: 10px;
  border-top: 1px solid #bbbbbb;
  padding-top: 3px;
  border: 1px solid #dedbda;
  background: #827e7e;
  border-radius: 7px;
  width: 53px;
  font-size: 12px;
  padding: 5px;
  box-shadow: 1px 1px 5px #e2dede;
`

const PendingWrapper = styled.div`
  display: inline;
  color: white;
  margin-left: 10px;
  padding-top: 3px;
  background: #ff8d00;
  border-radius: 3px;
  width: 53px;
  font-size: 12px;
  padding: 5px;
  box-shadow: 1px 1px 5px red;
`

const AnsweredWrapper = styled.div`
  display: inline;
  color: white;
  margin-left: 10px;
  padding-top: 3px;
  background: green;
  border-radius: 3px;
  width: 53px;
  font-size: 12px;
  padding: 5px;
  box-shadow: 1px 1px 5px green;
`

const TimeWrappper = styled.p`
  color: grey;
  padding-top: 3px;
  font-size: 12px;
  padding-left: 10px;
`

const AnswerBody = styled.div`
  font-size: 14px;
  color: #d40909;
  overflow: auto;
  text-overflow: ellipsis;
  display: inline;
`

const AboutQuestion = styled.div`
  padding: 10px;
  font-size: 18px;
  overflow: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: #efefef;
`

const AnswerWrapper = styled.div`
  margin-left: 30px;
  border-top: 1px solid #bbbbbb;
  padding-top: 3px;
  padding-bottom: 10px;
`;

const Body = styled.div`
  overflow: auto;
  height: 100vh;
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const StyledSelect = styled(Select)`
  width: 100%;
  margin-bottom: 20px;
`;

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const PENDING = 'pending';
const IGNORED = "ignored";
const ANSWERED = "answered";

const Card = ({ exam, clarification }) => {
  const question = (exam.questions || []).filter(question => question._id === clarification.questionID)[0];
  const { answer, status } = clarification;
  return (
    <CardContainer>
      <AboutQuestion>
        {!question ? 'General' : `Topic: ${question.title}`}
        { status === IGNORED && <IgnoreWrappper>IGNORED</IgnoreWrappper>}
        { status === PENDING && <PendingWrapper>PENDING</PendingWrapper>}
        { status === ANSWERED && <AnsweredWrapper>ANSWERED</AnsweredWrapper>}
      </AboutQuestion>
      <BodyWrapper>{clarification.question}</BodyWrapper>
      <TimeWrappper>
        <Tooltip title={clarification.isPublic === true ? 'Public' : 'Private'}>
          <FontAwesomeIconWrapper size="1x" color="black" icon={clarification.isPublic ? faGlobeAsia : faLock} />
        </Tooltip>
        Asked by <i style={{color: 'black'}}>{getName(clarification.user)}</i>  {getTimeDiff(clarification.askTime, Date.now())} ago
      </TimeWrappper>
      { status === ANSWERED &&  <AnswerWrapper>Answer: <AnswerBody>{answer}</AnswerBody></AnswerWrapper>}
    </CardContainer>
  );
}
const Clarifications = ({ exam, user, clarifications }) => {
  const [topic, setTopic] = useState(-1);
  const virtualState = {
    clarifications: [],
  };
  // useEffect(() => {
  //   if (exam && exam._id) {
  //     const interval = setInterval(async () => {
  //       let { payload: claries = [] } = await api.getExamUsingFilterByID(exam._id, { clarifications: 1 });
  //       if (!claries) claries = [];
  //       if (!virtualState.clarifications) virtualState.clarifications = [];
        
  //       // if (virtualState.clarifications.length !== claries.length) {
  //       virtualState.clarifications = claries;
  //       setClarifications(claries);
  //       // }
  //     }, 5000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [exam]);
  const selectItems = [
    {
      key: -1,
      display: 'All',
    },
    {
      key: null,
      display: 'General',
    }
  ];
  (exam.questions || [])
    .forEach(question => {
      selectItems.push({
        key: question._id,
        display: question.title,
      })
    })
  
  const filteredClaries = clarifications
    .filter(
      clarification => (clarification.isPublic || clarification.userID === user._id) &&
      (topic === -1 || (topic ? topic === clarification.questionID : !clarification.questionID))
    );
  return (
    <Body>
      <Row columns="1fr 1fr">
        <p>Select Topic</p>
        <StyledSelect
          onChange={(v) => setTopic(v)} defaultValue={topic} >
          {selectItems.map((item, index) => (
            <Option key={index.toString()} value={item.key}>{item.display}</Option>
          ))}
        </StyledSelect>
      </Row>
      {!filteredClaries.length && <NoDataComponent title="No clarifications"/>}
      {
        filteredClaries.map(clarification => (
          <Card key={clarification._id} clarification={clarification} exam={exam} />
        ))
      }
      <Box height="300px"/>
    </Body>
  )
}

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Clarifications);
