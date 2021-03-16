import styled from 'styled-components'
import React, { useState, memo } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faGlobeAsia, faLock } from '@fortawesome/free-solid-svg-icons'
import { PageHeader, RightButtonWrapper, TileHeaderWrapper } from '../../../styles/pageStyles'
import { ButtonStyled, Container } from '../../../../utitlities/styles'
import { PUBLIC } from '../../../../utitlities/constants'
import { message, Tooltip } from 'antd'
import { checkEqualObj, smartLabel } from '../../../../utitlities/common.functions'
import { useEffect } from 'react/cjs/react.development'
import api from '../../../../utitlities/api'

const ContainerStyled = styled(Container)`
  border-radius: 8px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  min-height: 260px;
  height: calc(100vh - 200px);
  min-width: 270px;
`

const Body = styled.div`
  overflow: auto;
  height: calc(100vh - 350px);
  ::-webkit-scrollbar {
    width: 0px;
  }
`

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.columns || 'auto'};
  padding: 20px;
  border-radius: 5px;
  margin-top: 10px;
  user-select: none;
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
  margin-left: 10px;
`
const BodyWrapper = styled.div`
  font-size: 16px;
  color: #24262d;
`

const Card = ({ announcement }) => (
  <Row style={{background: 'rgb(28 49 49)', color: 'white'}} columns="repeat(1, 1fr)">
    {announcement}
  </Row>
)
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
        const { payload: { announcements: newOnes } } = await api.getExamUsingFilterByID(exam._id, { announcements: 1 });
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
            <BodyWrapper>{a.body}</BodyWrapper>
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
