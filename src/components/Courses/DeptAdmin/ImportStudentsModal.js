import styled from 'styled-components'
import React, { useState } from 'react'
import { Modal, Select, Input } from 'antd'
import _ from 'underscore'
import api from '../../../utitlities/api'


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
const BATCH = 'batch';
const REGNO = 'regNo';
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
  const [oddEven, setOddEven] = useState('all');
  const [regNo, setRegNo] = useState('');
  
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
      let ids = [];
      if (type === BATCH) {
        let { payload: students } = await api.getStudentsByBatch({ batch, departmentCode: user.department.departmentCode, oddEven })
        students = _.filter(students, student => !_.any(course.enrolledStudents, enst => enst._id === student._id))
        ids = _.map(students, student => student._id)
      } else if (type === REGNO) {
        const { payload: students } = await api.getStudents({ registrationNo: regNo });
        ids = _.map(students, student => student._id)
      }
      console.log(ids);
      await api.updateCourse(course, {
        $addToSet: {
          enrolledStudents: { $each: ids }
        }
      })
      await updateCourseOnUi()
    } catch (err) {

    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={'Import Students'}
      visible={visible}
      width={500}
      height={500}
      style={{ height: '600px' }}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      okText="Import"
    >
      <Row columns="auto auto auto">
        <ColumnWrapper>
          <LabelWrapper>By</LabelWrapper>
          <Select
            defaultValue={type}
            onChange={(v) => setType(v)}
          >
            <Option value={BATCH}>Batch</Option>
            <Option value={REGNO}>Reg No</Option>
          </Select>
        </ColumnWrapper>

        {type === BATCH && (
          <>
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
            <ColumnWrapper>
              <LabelWrapper>Batch</LabelWrapper>
              <Select
                style={{ width: '170px' }}
                defaultValue={oddEven}
                onChange={(v) => setOddEven(v)}
              >
                <Option value="all"> All </Option>
                <Option value="odd"> Odd (Section A) </Option>
                <Option value="even"> Even (Secton B) </Option>
              </Select>
            </ColumnWrapper>
          </>
        )}

        {type === REGNO && (
          <ColumnWrapper>
            <LabelWrapper> Reg No</LabelWrapper>
            <Input style={{height: "30px"}} value={regNo} onChange={(e) => setRegNo(e.target.value)} />
          </ColumnWrapper>
        )}
        {/* {type === 'csv' && (
          <ColumnWrapper>
            <LabelWrapper>CSV</LabelWrapper>
            <Upload {...draggerProps}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </ColumnWrapper>
        )} */}

      </Row>
    </Modal>
  )
}

export default ImportStudentsModal
