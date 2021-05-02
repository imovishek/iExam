import styled from 'styled-components';
import React, { useState } from 'react';
import { Modal, Button, message, Spin } from 'antd';
import Dropzone from '../../Common/Dropzone';
import api from '../../../utitlities/api';
import { CenterText, LinkStyled } from '../../../utitlities/styles';

const CenterTextWrapper = styled(CenterText)`
  margin-bottom: 20px;
`

const ImportStudentsModal = ({
  visible,
  setVisibility,
  setCourseChanged,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setVisibility(false)
  };
  const onSubmitHandler = async (file) => {
    try {
      setIsLoading(true);
      const { payload: courseIDs } = await api.uploadCoursesFile(file);
      setCourseChanged(true);
      message.success('Successfully uploaded the file!');
    } catch (e) {
      console.log(e);
      message.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Modal
      title={'Import Courses'}
      visible={visible}
      width={500}
      height={800}
      style={{ height: '800px' }}
      onOk={() => closeModal()}
      onCancel={() => closeModal()}
      
      footer={[
        <Button key="back" onClick={() => closeModal()}>
          Ok
        </Button>
      ]}
    >
      <CenterTextWrapper>
        <LinkStyled href="/files/sampleCourseUpload.csv" download>Download Sample File</LinkStyled>
      </CenterTextWrapper>
      <Dropzone onSubmit={onSubmitHandler}/>
      {isLoading && <Spin style={{display: 'flex', justifyContent: 'center'}} spinning={true}/>}
    </Modal>
  )
}

export default ImportStudentsModal
