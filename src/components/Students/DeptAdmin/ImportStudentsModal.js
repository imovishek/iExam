import styled from 'styled-components';
import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import Dropzone from '../../Common/Dropzone';
import api from '../../../utitlities/api';
import { CenterText, LinkStyled } from '../../../utitlities/styles';
import { FontAwesomeIconWrapper } from '../../styles/tableStyles';
import { faFile, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const CenterTextWrapper = styled(CenterText)`
  margin-bottom: 20px;
`;
const FileNameWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px;
`;
const ImportStudentsModal = ({
  visible,
  setVisibility,
  setStudentChanged,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState({});
  const closeModal = () => {
    setFile({});
    setVisibility(false)
  };
  const onSubmitHandler = async () => {
    if (!file.name) return message.error('Please select a file!');
    try {
      setIsLoading(true);
      const { payload: StudentIDs } = await api.uploadStudentsFile(file);
      setStudentChanged(true);
      message.success('Successfully uploaded the file!');
    } catch (e) {
      console.log(e);
      message.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
    closeModal();
  }
  return (
    <Modal
      title={'Import Students'}
      visible={visible}
      width={500}
      height={800}
      style={{ height: '800px' }}
      onOk={() => closeModal()}
      onCancel={() => closeModal()}
      
      footer={[
        <Button key="back" onClick={() => onSubmitHandler()} loading={isLoading}>
          Upload
        </Button>
      ]}
    >
      <CenterTextWrapper>
        <LinkStyled href="/files/sampleStudentUpload.csv" download>Download Sample File</LinkStyled>
      </CenterTextWrapper>
      <Dropzone onSubmit={(file) => setFile(file)}/>
      {file.name && <FileNameWrapper><FontAwesomeIconWrapper icon={faFile} color="#40A9FF"/>{file.name}</FileNameWrapper>}
    </Modal>
  )
}

export default ImportStudentsModal
