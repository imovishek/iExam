import styled from 'styled-components'
import React, { useState } from 'react'
import { Modal, Select, Button, message } from 'antd'
import api from '../../../../utitlities/api'

import TextArea from 'antd/lib/input/TextArea'
import { FontAwesomeIconWrapper } from '../../../styles/tableStyles'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const { Option } = Select

const Row = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'none'};
`

const QuestionWrapper = styled.div`
  margin-top: 30px;
`
const TextAreaWrapper = styled(TextArea)`
`
const StyledSelect = styled(Select)`
  .ant-select-arrow {
    top: 17px; 
  }
`;

const defaultForm = {
  question: '',
  questionID: null,
};

const AskClarificationModal = ({
  exam,
  user,
  visible,
  setVisibility,
  updateClarificationsOnUI
}) => {
  const [form, setForm] = useState(defaultForm)


  const closeModal = () => {
    setVisibility(false)
  }

  const onSubmit = () => {
    submitClarificationHandler();
    closeModal();
  }

  const submitClarificationHandler = async (e) => {
    try {
      await api.createClarification({
        ...form,
        userID: user._id,
        examID: exam._id,
      });
      updateClarificationsOnUI();
      setForm(defaultForm);
      message.success('Clarification successfully submited!');
    } catch (e) {
      message.error(e.response.data.message)
    }
  }
  const selectItems = [
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
  return (
    <Modal
      title={<div>Ask a clarification<FontAwesomeIconWrapper notPointer icon={faQuestionCircle} /></div>}
      visible={visible}
      width={500}
      style={{ height: '700px' }}
      onOk={() => closeModal()}
      onCancel={() => closeModal()}
      okText="Import"
      footer={[
        <Button key="clariButton" onClick={onSubmit}>Send</Button>
      ]}
    >
      <Row columns="1fr">
        <p>Select Topic</p>
        <StyledSelect
          onChange={(v) => setForm({ ...form, questionID: v })} value={form.questionID} >
          {selectItems.map((item, index) => (
            <Option key={index.toString()} value={item.key}>{item.display}</Option>
          ))}
        </StyledSelect>

        <QuestionWrapper>
          <p>Question</p>
          <TextAreaWrapper rows={8} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
        </QuestionWrapper>
      </Row>
    </Modal>
  )
}

export default AskClarificationModal
