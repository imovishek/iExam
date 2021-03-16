import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faCog, faUsers, faChalkboardTeacher, faBookOpen, faChartLine, faScroll, faPencilRuler, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { setNavigaitonTabAction } from './actions'
import { push } from 'connected-react-router'
import { hasPageAccess, mapDesignations } from '../../utitlities/constants'
import React, { useState } from 'react'
import UserInfo from '../UserSettings/User/UserInfo'
import { Tooltip } from 'antd'

const BodyWrapper = styled.div`
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #1c3131;
  box-shadow: 4px 0px 3px 0px rgba(0,0,0,0.36);
  min-height: 300px;
  `

const SubWrapper = styled.div`
  padding: 30px 10px;
  margin-left: 20px;
  margin-right: 20px;
  min-height: 300px;
  position: relative;
  height: 100%;
`

const TextWrapper = styled.div`
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  padding: 10px 5px;
  justify-content: center;
  user-select: none;
`

const LinkWrapper = styled.div`
  color: ${(props) => props.selected ? '#40a9ff' : '#ececec'};
  :hover{
    color: #40a9aa;
  }
  margin-bottom: 10px;
  height: 40px;
`

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  margin: auto;
  margin-right: 5px;
  height: 18px;
  width: 50px;
  cursor: pointer;
  :hover{
    color: #40a9aa;
  }
`

const FooterIconWraper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const DesignationWraper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #ced4d4;
  font-size: 11px;
  font-style: italic;
  margin-bottom: 10px;
`

const FooterWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  bottom: 50px;
  width: 140px;
`

const LabelHeader = styled.label`
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

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
        <LinkWrapper onClick={() => redirectTo('dashboard')} selected={tabKey === 'dashboard'}>
          <TextWrapper>
            <FontAwesomeIconWrapper icon={faChartLine} />
            Dashboard
          </TextWrapper>
        </LinkWrapper>
        { hasPageAccess[userType] && hasPageAccess[userType].Courses &&
          <LinkWrapper onClick={() => redirectTo('courses')} selected={tabKey === 'courses'}>
            <TextWrapper>
              <FontAwesomeIconWrapper icon={faBookOpen} />
              Courses
            </TextWrapper>
          </LinkWrapper>
        }
        { hasPageAccess[userType] && hasPageAccess[userType].Teachers &&
          <LinkWrapper onClick={() => redirectTo('teachers')} selected={tabKey === 'teachers'}>
            <TextWrapper>
              <FontAwesomeIconWrapper icon={faChalkboardTeacher} />
              Teachers
            </TextWrapper>
          </LinkWrapper>
        }
        { hasPageAccess[userType] && hasPageAccess[userType].Exams &&
          <LinkWrapper onClick={() => redirectTo('exams')} selected={tabKey === 'exams'}>
            <TextWrapper>
              <FontAwesomeIconWrapper icon={faScroll} />
              Exams
            </TextWrapper>
          </LinkWrapper>
        }
        { hasPageAccess[userType] && hasPageAccess[userType].Students &&
          <LinkWrapper onClick={() => redirectTo('students')} selected={tabKey === 'students'}>
            <TextWrapper>
              <FontAwesomeIconWrapper icon={faUsers} />
              Students
            </TextWrapper>
          </LinkWrapper>
        }
        { hasPageAccess[userType] && hasPageAccess[userType].Results &&
          <LinkWrapper onClick={() => redirectTo('results')} selected={tabKey === 'results'}>
            <TextWrapper>
              <FontAwesomeIconWrapper icon={faPencilRuler} />
              Results
            </TextWrapper>
          </LinkWrapper>
        }

        { hasPageAccess[userType] && hasPageAccess[userType].Questions &&
          <LinkWrapper onClick={() => redirectTo('questions')} selected={tabKey === 'questions'}>
            <TextWrapper>
              <FontAwesomeIconWrapper icon={faQuestion} />
              Questions
            </TextWrapper>
          </LinkWrapper>
        }

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
