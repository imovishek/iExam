import { faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { setNavigaitonTabAction } from './actions'
import { push } from 'connected-react-router'
import { hasPageAccess, mapDesignations } from '../../utitlities/constants'
import React, { useState } from 'react'
import UserInfo from '../UserSettings/User/UserInfo'
import { Tooltip } from 'antd'
import { BodyWrapper, DesignationWraper, FontAwesomeIconWrapper, FooterIconWraper, FooterWraper, LabelHeader, LinkWrapper, LogoWrapper, NavWrapper, SubWrapper } from './styles'
import { navLinks } from './constants'

const NavBar = ({ user, setNavigationTab, tabKey = 'dashboard', dispatch }) => {
  const redirectTo = path => {
    setNavigationTab(path)
    dispatch(push(`/${path}`))
  }
  const { userType } = user
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  return (
    <BodyWrapper>
      <SubWrapper>
        <LogoWrapper>
          <img src="https://www.sust.edu/images/logo.png" height="80px"/>
        </LogoWrapper>
        
        {navLinks.map(navLink => {
          if (!hasPageAccess[userType] || !hasPageAccess[userType][navLink.body]) return null;
          return  (
            <LinkWrapper key={navLink.link} onClick={() => redirectTo(navLink.link)} selected={tabKey === navLink.link}>
              <NavWrapper>
                <FontAwesomeIconWrapper icon={navLink.icon} size='md' width="30px" />
                {navLink.body}
              </NavWrapper>
            </LinkWrapper>
          );
        })}

        <FooterWraper>
          <FooterIconWraper>
            <LabelHeader >{user.firstName} {user.lastName}</LabelHeader>
          </FooterIconWraper>
          <DesignationWraper>
            {user.userType === 'teacher' && mapDesignations[user.designation]}
          </DesignationWraper>
          <FooterIconWraper>
            <div>
              <Tooltip title = "Profile">
                <FontAwesomeIconWrapper
                  style={{ marginRight: '20px' }}
                  onClick={() => {
                    setShowUserInfoModal(true)
                  }}
                  color = "white" icon={faCog} size="lg"/>
              </Tooltip>
              <Tooltip title = "Logout">
                <FontAwesomeIconWrapper onClick={() => redirectTo('logout')} color = "white" icon={faSignOutAlt} size="lg" />
              </Tooltip>
            </div>
          </FooterIconWraper>
        </FooterWraper>

        <UserInfo
          selectedUser={user}
          visible={showUserInfoModal}
          setVisibility={setShowUserInfoModal}
        />
      </SubWrapper>
    </BodyWrapper>
  )
}
const mapStateToProps = (state) => ({
  tabKey: state.navBar.tabKey,
  user: state.login.user
})
const mapDispatchToProps = (dispatch) => ({
  setNavigationTab: (key) => {
    localStorage.setItem('tabKey', key)
    dispatch(setNavigaitonTabAction(key))
  },
  dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
