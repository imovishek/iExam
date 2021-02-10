import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBox, faAnchor, faLongArrowAltUp, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setNavigaitonTabAction } from './actions';
import { push } from 'connected-react-router';
import { hasPageAccess } from '../../utitlities/constants';
import { faMendeley } from '@fortawesome/free-brands-svg-icons';
import { LabelWrapper } from '../styles/pageStyles';

const BodyWrapper = styled.div`
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #4b555d;
  box-shadow: 4px 0px 3px 0px rgba(0,0,0,0.36);
  min-height: 300px;
  `;

const SubWrapper = styled.div`
  padding: 30px 10px;
  margin-left: 20px;
  margin-right: 20px;
  min-height: 300px;
`;


const TextWrapper = styled.div`
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  padding: 10px 5px;
  justify-content: center;
  user-select: none;
`;

const LinkWrapper = styled.div`
  color: ${(props) => props.selected ? '#40a9ff' : '#ececec'};
  :hover{
    color: #40a9aa;
  }
  margin-bottom: 10px;
  height: 40px;
`;

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  margin: auto;
  margin-right: 5px;
  height: 18px;
  width: 50px;
  cursor: pointer;
  :hover{
    color: #40a9aa;
  }
`;

const FooterIconWraper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FooterWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: calc(100vh -  190px);
`;

const LabelHeader = styled.label`
  color: white;
  margin-bottom: 10px;
`;

const NavBar = ({ user, setNavigationTab, tabKey = 'dashboard', dispatch }) => {
  const redirectTo = path => {
    setNavigationTab(path)
    dispatch(push(`/${path}`));
  };
  const { userType } = user;
  return (
    <BodyWrapper>
      <SubWrapper>
        <LinkWrapper onClick={() => redirectTo('dashboard')} selected={tabKey === "dashboard"}>
          <TextWrapper>
            <FontAwesomeIconWrapper icon={faCoffee} />
            Dashboard
          </TextWrapper>
        </LinkWrapper>
        { hasPageAccess[userType] && hasPageAccess[userType].Courses &&
          <LinkWrapper onClick={() => redirectTo('courses')} selected={tabKey === "courses"}>
            <TextWrapper>
              <FontAwesomeIconWrapper icon={faBox} />
              Courses
            </TextWrapper>
          </LinkWrapper>
        }
        { hasPageAccess[userType] && hasPageAccess[userType].Teachers &&
          <LinkWrapper onClick={() => redirectTo('teachers')} selected={tabKey === "teachers"}>
            <TextWrapper>
              <FontAwesomeIconWrapper icon={faAnchor} />
              Teachers
            </TextWrapper>
          </LinkWrapper>
        }
        { hasPageAccess[userType] && hasPageAccess[userType].Exams &&
          <LinkWrapper onClick={() => redirectTo('exams')} selected={tabKey === "exams"}>
            <TextWrapper>
              <FontAwesomeIconWrapper icon={faAnchor} />
              Exams
            </TextWrapper>
          </LinkWrapper>
        }
        { hasPageAccess[userType] && hasPageAccess[userType].Students &&
          <LinkWrapper onClick={() => redirectTo('students')} selected={tabKey === "students"}>
            <TextWrapper>
              <FontAwesomeIconWrapper icon={faMendeley} />
              Students
            </TextWrapper>
          </LinkWrapper>
        }

        <FooterWraper>
          <FooterIconWraper>
            <LabelHeader >{user.firstName} {user.lastName}</LabelHeader>
          </FooterIconWraper>
          <FooterIconWraper>
            <div>
              <FontAwesomeIconWrapper color = "white" icon={faCog} />
              <FontAwesomeIconWrapper color = "white" icon={faSignOutAlt} />
            </div>
          </FooterIconWraper>
        </FooterWraper>
        
          
      </SubWrapper>
    </BodyWrapper>
  )
};
const mapStateToProps = (state) => ({
  tabKey: state.navBar.tabKey,
  user: state.login.user
});
const mapDispatchToProps = (dispatch) => ({
  setNavigationTab: (key) => {
    localStorage.setItem('tabKey', key);
    dispatch(setNavigaitonTabAction(key));
  },
  dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);