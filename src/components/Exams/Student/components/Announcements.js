import styled from 'styled-components'
import React, { useState, memo } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAsia, faLock } from '@fortawesome/free-solid-svg-icons'
import { PageHeader } from '../../../styles/pageStyles'
import { Container } from '../../../../utitlities/styles'
import { PUBLIC } from '../../../../utitlities/constants'
import { Tooltip } from 'antd'
import { checkEqualObj, smartLabel } from '../../../../utitlities/common.functions'
import { useEffect } from 'react/cjs/react.development'
import api from '../../../../utitlities/api'

const ContainerStyled = styled(Container)`
  border-radius: 8px;
  min-height: 260px;
  height: calc(100vh - 160px);
  min-width: 270px;
  padding: 20px;
  box-shadow: 3px 3px 15px #bbbbbb;
`

const Body = styled.div`
  overflow: auto;
  height: calc(100vh - 260px);
  ::-webkit-scrollbar {
    width: 0px;
  }
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
  background: #ffd030;
  padding: 10px;
  border-radius: 5px;
`
const BodyWrapper = styled.div`
  font-size: 16px;
  color: #000000;
  overflow: hidden;
  text-overflow: elipsis;
  white-space: nowrap;
`

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

const Announcements = ({ exam }) => {
  const comp = (a, b) => {
    if (moment(a.dateTime).isAfter(b.dateTime)) return -1;
    if (moment(a.dateTime).isAfter(b.dateTime)) return 1;
    return 0
  }
  const virtualState = {
    announcements: []
  };
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    setAnnouncements(exam.announcements);
    virtualState.announcements = exam.announcements;
  }, [exam.announcements]);

  useEffect(() => {
    if (exam && exam._id) {
      const interval = setInterval(async () => {
        let { payload: { announcements: newOnes } } = await api.getExamUsingFilterByID(exam._id, { announcements: 1 });
        if (!newOnes) newOnes = [];
        if (!virtualState.announcements) virtualState.announcements = [];
        virtualState.announcements.sort(comp);
        newOnes.sort(comp);
        if (!checkEqualObj(virtualState.announcements, newOnes)) {
          // message.info('New announcement created!')
          virtualState.announcements = newOnes;
          setAnnouncements(newOnes);
        }
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [exam]);


  return (
    <ContainerStyled rows="55px 1fr">
      <PageHeader>Announcements</PageHeader>
      <Body>
        {(announcements || []).sort(comp).map((a, index) => (
          <AnnouncementWrapper key={Math.random().toString(16)}>
            <Tooltip mouseEnterDelay={0.5} title={a.body} placement="topLeft">
              <BodyWrapper>{a.body}</BodyWrapper>
            </Tooltip>
            <Tooltip title={smartLabel(a.securityType)}>
              <FontAwesomeIcon color="black" icon={a.securityType === PUBLIC ? faGlobeAsia : faLock} />
            </Tooltip>
            <TimeWrapper style={{ display: 'inline', marginLeft: '10px' }}>{getTimeDiff(a.dateTime, moment())}</TimeWrapper>
          </AnnouncementWrapper>
        ))}
      </Body>
      
    </ContainerStyled>
  )
}

export default memo(Announcements);
