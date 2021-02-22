import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Modal, Select, Button, Upload } from 'antd';
import _ from 'underscore';
import api from '../../../utitlities/api';

import { UploadOutlined } from '@ant-design/icons';
import { options } from '@hapi/joi';


const { Option } = Select

const Row = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'none'};
`

const ColumnWrapper = styled.div`
  margin-right: 20px;
  margin-bottom: 15px;
`

const LabelWrapper = styled.p`
  margin-bottom: 5px;
  color: #608794;
`

const ImportQuestionsModal = ({
  user,
  visible,
  setVisibility,
  exam,
  updateExamOnUI
}) => {
  const [type, setType] = useState('fromQuestions')
  const [questions, setQuestions] = useState([])
  const [questionID, setQuestionID] = useState(null);
  useEffect(async () => {
    try {
      let { payload = [] } = await api.getQuestions({ authorID: user._id });
      payload = _.filter(payload, q => !_.any(exam.questions, eque => eque._id === q._id));
      setQuestions(payload);
    } catch (err) {
      console.log(err)
    }
  }, [exam.questions])

  const closeModal = () => {
    setVisibility(false)
  }

  const onSubmit = () => {
    importQuestionsHandler()
    closeModal()
  }

  const importQuestionsHandler = async (e) => {
    if (type !== "fromQuestions") return;
    try {
      await api.updateExam({ _id: exam._id }, {
        $push: {
          questions: questionID
        }
      })
      await updateExamOnUI()
    } catch (err) {

    }
  }

  const draggerProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    beforeUpload (file) {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const img = document.createElement('img')
          img.src = reader.result
          img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            ctx.fillStyle = 'red'
            ctx.textBaseline = 'middle'
            ctx.font = '33px Arial'
            ctx.fillText('Ant Design', 20, 20)
            canvas.toBlob(resolve)
          }
        }
      })
    }
  }

  return (
    <Modal
      title={'Import Questions'}
      visible={visible}
      width={520}
      height={500}
      style={{ height: '600px' }}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      okText="Import"
    >
      <Row columns="140px 320px">
        <ColumnWrapper>
          <LabelWrapper>From</LabelWrapper>
          <Select
            defaultValue={type}
            onChange={(v) => setType(v)}
          >
            <Option value="fromQuestions">My Questions</Option>
            <Option value="csv">CSV</Option>
          </Select>
        </ColumnWrapper>

        {type === 'fromQuestions' && (
          <ColumnWrapper>
            <LabelWrapper>Search</LabelWrapper>
            <Select
              allowClear
              showSearch
              placeholder="Search by title"
              style={{ width: '320px' }}
              filterOption={(keyword, option) =>
                option
                  .data
                  .trim()
                  .replace(/ +/g, '')
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
              }
              onChange={(v) => setQuestionID(v)}
            >
              {_.map(questions, q => <Option value={q._id} data={`${q.title} ${q.type}`}> {`${q.title}`} </Option>)}
              {/* <Option value="2019"> 2019 </Option>
              <Option value="2018"> 2018 </Option>
              <Option value="2017"> 2017 </Option>
              <Option value="2016"> 2016 </Option>
              <Option value="2015"> 2015 </Option>
              <Option value="2014"> 2014 </Option> */}
            </Select>
          </ColumnWrapper>
        )}
        {type === 'csv' && (
          <ColumnWrapper>
            <LabelWrapper>CSV</LabelWrapper>
            <Upload {...draggerProps}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </ColumnWrapper>
        )}

      </Row>
    </Modal>
  )
}

export default ImportQuestionsModal;
