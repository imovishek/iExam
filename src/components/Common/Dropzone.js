import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message } from 'antd';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styled from 'styled-components';
import { CenterText } from '../../utitlities/styles';
import { primaryColor } from '../../utitlities/global.config';

const FontAwesomeIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  padding: 20px;
`;

const Dropper = styled.div`
  cursor: pointer;
  box-shadow: 0px 2px 5px #bbbbbb;
`;

const Dropzone = ({ onSubmit }) => {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles, rejectedFiles);
    if (acceptedFiles.length) {
      onSubmit(acceptedFiles[0]);
    } else if (rejectedFiles.length) {
      if (rejectedFiles[0].file.type !== "text/csv")
        message.error('Please upload csv only.');
      else message.error('This file is too large.');
    } else {
      message.error("Error on uploading file");
    }
    
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "",
    maxFiles: 1,
    maxSize: 10485760, // 10 mb
  })

  return (
    <div>
      <Dropper {...getRootProps()}>
        <input {...getInputProps()} />
        <FontAwesomeIconWrapper>
          <FontAwesomeIcon icon={faCloudUploadAlt} size="7x" color={primaryColor} />
        </FontAwesomeIconWrapper>
      </Dropper>
      <CenterText>Drag {'&'} drop the csv file here, or click to select file</CenterText>
    </div>
    
  )
};

export default Dropzone;