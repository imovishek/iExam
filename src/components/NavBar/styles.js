import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const BodyWrapper = styled.div`
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #1c3131;
  box-shadow: 4px 0px 5px 0px rgba(0,0,0,0.36);
  min-height: 300px;
  width: ${props => props.isCollapsed ? '70px' : '200px'};
  `

export const SubWrapper = styled.div`
  padding: ${({ isCollapsed }) => isCollapsed ? '10px' : '30px'} 10px;
  margin-left: ${({ isCollapsed }) => isCollapsed ? '0px' : '20px'};
  margin-right: ${({ isCollapsed }) => isCollapsed ? '0px' : '20px'};
  min-height: 300px;
  height: 100%;
  transition-duration: 200ms;
  display: grid;
  width: ${props => props.isCollapsed ? '70px' : '200px'};
  grid-template-rows: 1fr ${({ isCollapsed }) => isCollapsed ? '140px' : '55px'};
`

export const NavWrapper = styled.div`
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  padding: 10px 5px;
  justify-content: center;
  user-select: none;
  display: grid;
  grid-template-columns: ${props => props.isCollapsed ? "30px" : "30px 1fr"};
  transition-duration: 200ms;
`

export const LinkWrapper = styled.div`
  :hover{
    color: ${(props) => props.selected ? '#40a9ff' : '#ffffff'};
  }
  color: ${(props) => props.selected ? '#40a9ff' : '#ffffff'};
  margin-bottom: 10px;
  width: ${props => props.isCollapsed ? '50px' : '175px'};
  padding: 5px 10px;
  box-shadow: 3px 3px 10px #000f0f;
  border-radius: 5px;
  background: #1c3131;
  transition-duration: 200ms;
`;
export const LogoWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.isCollapsed ? 'left' : 'center'};
  margin-bottom: 20px;
`;

export const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-top: auto;
  margin-bottom: auto;
  width: 30px;
  ${({ isCollapsed }) => isCollapsed && `height: 50px;`};
`

export const FooterIconWraper = styled.div`
  display: flex;
  flex-direction: ${({ isCollapsed }) => isCollapsed ? 'column' : 'row'};
  justify-content: center;
`

export const DesignationWraper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #ced4d4;
  font-size: 11px;
  font-style: italic;
  margin-bottom: 10px;
`

export const FooterWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 140px;
`

export const LabelHeader = styled.label`
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  color: #ffffff;
`;

export const ColorBar = styled.div`
  ${props => (props.selected ? 'background: #40a9ff;' : '')}
  border-radius: 0px;
`;
