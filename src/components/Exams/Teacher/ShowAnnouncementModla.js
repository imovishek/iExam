import styled from 'styled-components';
import React, { memo } from 'react';
import { Modal, Popconfirm, Tooltip } from 'antd';
import moment from 'moment';
import api from '../../../utitlities/api';
import { PUBLIC } from '../../../utitlities/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAsia, faLock } from '@fortawesome/free-solid-svg-icons';
import { Row } from '../../../utitlities/styles';
import { useEffect } from 'react/cjs/react.development';
import { smartLabel } from '../../../utitlities/common.functions';

const BodyWrapper = styled.div`
  font-size: 16px;
  color: #000000;
  overflow: hidden;
  text-overflow: elipsis;
  white-space: nowrap;
`

const TimeWrapper = styled.div`
  margin-top: 5px;
  font-size: 11px;
  color: grey;
  display: inline;
  margin-left: 10px;
`

const AnnouncementWrapper = styled.div`
  font-size: 14px;
  color: #608794;
  margin-bottom: 10px;
  height: 60px;
  background: #ffeb00;
  padding: 10px;
  border-radius: 5px;
`
const DeleteButton = styled.div`
  border-radius: 3px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  color: red;
  cursor: pointer;
  user-select: none;
  :hover {
    border: 1px solid black;
  }
`;
const getTimeDiff = (a, b) => {
  let seconds = moment(b).diff(a, 'seconds');
  const days = Math.floor(seconds / (3600*24));
  seconds %= (3600 * 24);
  const hh = Math.floor(seconds / 3600);
  seconds %= (3600);
  const mm = Math.floor(seconds / 60);
  if (!days && !hh && !mm) return 'a few seconds ago';
  if (!days && !hh && mm) return `${Math.floor(seconds/60)}m ago`;
  if (!days && hh) return `${hh}h ${mm}m ago`;
  if (days) return `${days}d ${hh}h ${mm}m ago`;
  return '';
};

const ShowAnnouncementModal = ({
  user,
  visible,
  setVisibility,
  exam,
  updateExamOnUI
}) => {
  
  const createAnnouncementHandler = async (e) => {
    
  }

  const comp = (a, b) => {
    if (moment(a.dateTime).isAfter(b.dateTime)) return -1;
    if (moment(a.dateTime).isAfter(b.dateTime)) return 1;
    return 0
  }

  const closeModal = () => {
    setVisibility(false)
  }

  const onSubmit = () => {
    closeModal()
  }

  const onDeleteHandler = async (index) => {
    const announcements = [...exam.announcements];
    announcements.splice(index, 1);
    await api.updateExam(exam, { announcements });
    await updateExamOnUI();
  }

  return (
    <Modal
      title={'Announcments'}
      visible={visible}
      width={520}
      height={500}
      style={{ height: '600px' }}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      footer={null}
    >
      <div style={{ maxHeight: '500px', overflow: 'auto' }}>
        {(exam.announcements || []).sort(comp).map((a, index) => (
          <AnnouncementWrapper key={Math.random().toString(16)}>
            <Row columns="1fr 1fr">
              <Tooltip mouseEnterDelay={0.5} title={a.body} placement="topLeft">
                <BodyWrapper>{a.body}</BodyWrapper>
              </Tooltip>
              <div>
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => onDeleteHandler(index)}
                >
                  <DeleteButton> x </DeleteButton>
                </Popconfirm>
              </div>
            </Row>
            <Tooltip title={smartLabel(a.securityType)}>
              <FontAwesomeIcon color="black" icon={a.securityType === PUBLIC ? faGlobeAsia : faLock} />
            </Tooltip>
            <TimeWrapper>{getTimeDiff(a.dateTime, moment())}</TimeWrapper>

          </AnnouncementWrapper>
        ))}
      </div>
    </Modal>
  )
}

export default memo(ShowAnnouncementModal, (prev, next) => {
  if (prev.exam !== next.exam) return false;
  if (prev.setVisibility !== next.setVisibility) return false;
  if (prev.visible !== next.visible) return false;
  return true;
});
