import styled from 'styled-components'
import React, { useState } from 'react'
import { Modal, Select, Button, Upload } from 'antd'
import _ from 'underscore'
import api from '../../../utitlities/api'

import { UploadOutlined } from '@ant-design/icons'

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

const ImportStudentsModal = ({
  user,
  visible,
  setVisibility,
  course,
  updateCourseOnUi
}) => {
  const [type, setType] = useState('batch')
  const [batch, setBatch] = useState('2015')
  const [isLoading, setLoading] = useState(false)


  const closeModal = () => {
    setVisibility(false)
  }

  const onSubmit = () => {
    importStudentsHandler()
    closeModal()
  }

  const importStudentsHandler = async (e) => {
    try {
      setLoading(true)
      let { payload: students } = await api.getStudentsByBatch({ batch, departmentCode: user.department.departmentCode })
      students = _.filter(students, student => !_.any(course.enrolledStudents, enst => enst._id === student._id))
      const ids = _.map(students, student => student._id)
      await api.updateCourse(course, {
        $push: {
          enrolledStudents: { $each: ids }
        }
      })
      await updateCourseOnUi()
    } catch (err) {

    } finally {
      setLoading(false)
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
      title={'Import Students'}
      visible={visible}
      width={400}
      height={500}
      style={{ height: '600px' }}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      okText="Import"
    >
      <Row columns="1fr 1fr">
        <ColumnWrapper>
          <LabelWrapper>By</LabelWrapper>
          <Select
            defaultValue={type}
            onChange={(v) => setType(v)}
          >
            <Option value="batch">Batch</Option>
            <Option value="csv">CSV</Option>
          </Select>
        </ColumnWrapper>

        {type === 'batch' && (
          <ColumnWrapper>
            <LabelWrapper>Batch</LabelWrapper>
            <Select
              defaultValue={batch}
              onChange={(v) => setBatch(v)}
            >
              <Option value="2019"> 2019 </Option>
              <Option value="2018"> 2018 </Option>
              <Option value="2017"> 2017 </Option>
              <Option value="2016"> 2016 </Option>
              <Option value="2015"> 2015 </Option>
              <Option value="2014"> 2014 </Option>
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

export default ImportStudentsModal
