import styled from 'styled-components'
import React, { useState } from 'react'
import { Button, message, Select, Tooltip } from 'antd'
import api from '../../../../utitlities/api'
import { connect } from 'react-redux'
import { getName, getTimeDiff, NoDataComponent } from '../../../../utitlities/common.functions'
import { Box, Col } from '../../../../utitlities/styles'
import { Row } from '../../../styles/pageStyles'
import TextArea from 'antd/lib/input/TextArea'
import _ from 'underscore'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAsia, faLock } from '@fortawesome/free-solid-svg-icons'
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
  font-size: 16px;
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
  font-size: 16px;
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
  padding-top: 20px;
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
  .ant-select-arrow {
    top: 17px; 
  }
  width: 100%;
  margin-bottom: 20px;
`;

const TextAreaStyled = styled(TextArea)`
  padding: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;
const StyledCheckbox = styled(Checkbox)`
  padding: 10px;
`
const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;
const PENDING = 'pending';
const IGNORED = "ignored";
const ANSWERED = "answered";

const Card = ({ exam, clarification }) => {
  const question = (exam.questions || []).filter(question => question._id === clarification.questionID)[0];
  const [form, setForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const getValue = (key) => {
    if (_.contains(Object.keys(form), key)) return form[key];
    return clarification[key];
  }
  const ignoreClarification = async () => {
    setForm({ ...form, status: IGNORED });
    try {
      await api.updateClarification(clarification, { status: IGNORED });
    } catch (e) {
      message.error('Failed to update! Please try again!');
      setForm({ ...form, status: PENDING });
    }
  }

  const unIgnoreClarification = async () => {
    setForm({ ...form, status: PENDING });
    try {
      await api.updateClarification(clarification, { status: PENDING });
    } catch (e) {
      message.error('Failed to update! Please try again!');
      setForm({ ...form, status: IGNORED });
    }
  }

  const onSaveAnswer = async () => {
    try {
      setForm({ ...form, answer: getValue('answer'), status: ANSWERED });
      await api.updateClarification(clarification, {
        answer: getValue('answer'),
        status: ANSWERED,
        isPublic: getValue('isPublic')
      });
    } catch (e) {
      message.error('Failed to update! Please try again!');
      delete form.answer;
      delete form.status;
      delete form.isPublic;
      setForm({ ...form });
    }
    setIsEditing(false);
  }

  const status = getValue('status') || clarification.status;
  return (
    <CardContainer>
      <AboutQuestion>
        {!question ? 'General' : `Topic: ${question.title}`}
        { status === IGNORED && (
          <>
            <IgnoreWrappper>IGNORED</IgnoreWrappper>
            <div style={{float: 'right'}}>
              <Button type="primary" onClick={() => unIgnoreClarification()}>
                Undo
              </Button>
            </div>
            
          </>
        )}
        { status === PENDING && <PendingWrapper>PENDING</PendingWrapper>}
        { status === ANSWERED && <AnsweredWrapper>ANSWERED</AnsweredWrapper>}
        <div style={{float: 'right'}}>
          { status === PENDING && (
            <Button onClick={() => ignoreClarification()}>
              Ignore
            </Button>
          )}
          { (status === ANSWERED || status === PENDING) && (
            <>
              <Button type="primary" style={{marginLeft: '10px'}} onClick={() => setIsEditing(true)}>
                {status === ANSWERED ? 'Edit' : 'Reply'}
              </Button>
            </>
          )}
        </div>
      </AboutQuestion>
     
      <BodyWrapper>{clarification.question}</BodyWrapper>
      <TimeWrappper>
        <Tooltip title={getValue('isPublic') === true ? 'Public' : 'Private'}>
          <FontAwesomeIconWrapper size="1x" color="black" icon={getValue('isPublic') ? faGlobeAsia : faLock} />
        </Tooltip>
        Asked by <i style={{color: 'black'}}>{getName(clarification.user)}</i>  {getTimeDiff(clarification.askTime, Date.now())} ago
      </TimeWrappper>
      
      {!isEditing && (
        <div>
          { status === ANSWERED &&  <AnswerWrapper>Answer: <AnswerBody>{getValue('answer')}</AnswerBody></AnswerWrapper>}
        </div>
      )}
      {isEditing && (
        <>
          <StyledCheckbox
            checked={getValue('isPublic')}
            onChange={(e) => setForm({...form, isPublic: e.target.checked})}
          >
            Make public
          </StyledCheckbox>
          <Row columns="1fr 80px 10px">
            <TextAreaStyled rows={4} value={getValue('answer')} onChange={(e) => setForm({ ...form, answer: e.target.value })}></TextAreaStyled>
            <Col rows="40px 1fr" gridGap="0px">
              <Button type="primary" onClick={() => onSaveAnswer()}>
                {status === ANSWERED ? 'Save' : 'Send'}
              </Button>
              <Button
                type="danger"
                onClick={() => {
                  setIsEditing(false);
                  delete form.answer;
                  delete form.isPublic;
                  setForm({ ...form });
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </>
       
      )}
    </CardContainer>
  );
}
const Clarifications = ({ exam, user, clarifications = [], clarificationsUpdated }) => {
  const [topic, setTopic] = useState(-1);
  const virtualState = {
    clarifications,
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
      clarification => (topic === -1 || (topic ? topic === clarification.questionID : !clarification.questionID))
    );
  return (
    <Body>
      <Row columns="1fr 1fr">
        <p>Select Topic</p>
        <StyledSelect
          onChange={(v) => setTopic(v)} value={topic} >
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
      <Box height="500px"/>
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
