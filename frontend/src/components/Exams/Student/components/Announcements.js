import styled from 'styled-components'
import React, { useState, memo, useEffect } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAsia, faLock } from '@fortawesome/free-solid-svg-icons'
import { PUBLIC } from '../../../../utitlities/constants'
import { Tooltip } from 'antd'
import { checkEqualObj, smartLabel } from '../../../../utitlities/common.functions'
import api from '../../../../utitlities/api'
import { connect } from 'react-redux'
import _ from 'underscore'

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
  background: #ffef30;
  padding: 10px;
  border-radius: 5px;
`
const BodyWrapper = styled.div`
  font-size: 16px;
  color: #000000;
  overflow: auto;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
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

const Announcements = ({ exam, user }) => {
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
    const filteredAnnouncements = (exam.announcements || []).filter(
      announcement => announcement.securityType === PUBLIC ||
      _.contains(announcement.access, user._id)
    );
    setAnnouncements(filteredAnnouncements);
    virtualState.announcements = filteredAnnouncements;
  }, [exam.announcements]);

  // useEffect(() => {
  //   if (exam && exam._id) {
  //     const interval = setInterval(async () => {
  //       let { payload: { announcements: newOnes } } = await api.getExamUsingFilterByID(exam._id, { announcements: 1 });
  //       if (!newOnes) newOnes = [];
  //       newOnes = newOnes.filter(
  //         announcement => announcement.securityType === PUBLIC ||
  //         _.contains(announcement.access, user._id)
  //       );
  //       if (!virtualState.announcements) virtualState.announcements = [];
  //       virtualState.announcements.sort(comp);
  //       newOnes.sort(comp);
  //       if (!checkEqualObj(virtualState.announcements, newOnes)) {
  //         // message.info('New announcement created!')
  //         virtualState.announcements = newOnes;
  //         setAnnouncements(newOnes);
  //       }
  //     }, 5000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [exam]);


  return (
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
  )
}
const mapStateTopProps = (state) => ({
  user: state.login.user
})
export default memo(connect(mapStateTopProps)(Announcements));
