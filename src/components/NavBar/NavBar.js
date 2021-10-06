import { faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { onSetNavbarCollapsed, setNavigaitonTabAction } from './actions'
import { push } from 'connected-react-router'
import { hasPageAccess, mapDesignations } from '../../utitlities/constants'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import UserInfo from '../UserSettings/User/UserInfo'
import { Tooltip } from 'antd'
import { AppTitle, BodyWrapper, DepartmentNameWrapper, DesignationWraper, FontAwesomeIconWrapper, FooterIconWraper, FooterNameWrapper, FooterWraper, LabelHeader, LinkWrapper, LogoWrapper, NavWrapper, SubWrapper } from './styles'
import { navLinks } from './constants'
import confirm from 'antd/lib/modal/confirm'

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const NavBar = ({ user, setNavigationTab, tabKey = 'dashboard', dispatch, isCollapsed }) => {
  if (!user.userType) return <div></div>;
  const redirectTo = path => {
    setNavigationTab(path)
    dispatch(push(`/${path}`))
  }
  const [width] = useWindowSize();
  const { userType } = user
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  useEffect(() => {
    let state = false;
    if (Number(width) === 0) return;
    if (width < 1000) {
      state = true;
    }
    dispatch(onSetNavbarCollapsed(state))
  }, [width])
  const TooltipWrapper = ({ isCollapsed, navLink }) => {
    const FontAwesome = <FontAwesomeIconWrapper icon={navLink.icon} size='md' width="30px" />;
    if (isCollapsed) return (
      <Tooltip title={navLink.body}>
        {FontAwesome}
      </Tooltip>
    );
    return FontAwesome;
  }
  return (
    <BodyWrapper isCollapsed={isCollapsed}>
      <SubWrapper isCollapsed={isCollapsed}>
        <div>
          <LogoWrapper isCollapsed={isCollapsed}>
            <img src="https://www.sust.edu/images/logo.png" height={isCollapsed ? "50px" : "80px"} style={{transitionDuration: "200ms;"}}/>
          </LogoWrapper>
          {!isCollapsed && <AppTitle>Online Examination System</AppTitle>}
          {navLinks.map(navLink => {
            if (!hasPageAccess[userType] || !hasPageAccess[userType][navLink.body]) return null;
            return  (
              <LinkWrapper isCollapsed={isCollapsed} key={navLink.link} onClick={() => redirectTo(navLink.link)} selected={tabKey === navLink.link}>
                <NavWrapper isCollapsed={isCollapsed}>
                  <div></div>
                  <TooltipWrapper navLink={navLink} isCollapsed={isCollapsed}/>
                  {!isCollapsed && navLink.body}
                </NavWrapper>
              </LinkWrapper>
            );
          })}
        </div>
        <FooterWraper isCollapsed={isCollapsed}>
          {/* {!isCollapsed && <DepartmentNameWrapper>{(user.department || {}).departmentName}</DepartmentNameWrapper>} */}
          <FooterNameWrapper isCollapsed={isCollapsed}>
            <LabelHeader >{isCollapsed ? user.firstName[0] : user.firstName}{isCollapsed ? '' : ' '}{isCollapsed ? user.lastName[0] : user.lastName}</LabelHeader>
          </FooterNameWrapper>
          {!isCollapsed && (
            <DesignationWraper>
              {user.userType === 'teacher' && mapDesignations[user.designation]}
            </DesignationWraper>
          )}
          <FooterIconWraper isCollapsed={isCollapsed}>
            <Tooltip title = "Profile">
              <FontAwesomeIconWrapper
                isCollapsed={isCollapsed}
                style={{ marginRight: '20px' }}
                onClick={() => {
                  setShowUserInfoModal(true)
                }}
                icon={faCog}
                size="lg"
              />
            </Tooltip>
            <Tooltip title = "Logout">
              <FontAwesomeIconWrapper
                isCollapsed={isCollapsed}
                onClick={() => confirm({
                  title: "Do you want to logout?",
                  okText: 'Logout',
                  onOk() {
                    redirectTo('logout');
                  },
                  onCancel () {

                  },
                  maskClosable: true,
                  keyboard: true,
                })}
                icon={faSignOutAlt}
                size="lg"
              />
            </Tooltip>
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
  user: state.login.user,
  isCollapsed: state.navBar.isCollapsed,
})
const mapDispatchToProps = (dispatch) => ({
  setNavigationTab: (key) => {
    localStorage.setItem('tabKey', key)
    dispatch(setNavigaitonTabAction(key))
  },
  dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
